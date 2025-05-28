import os
import json
import difflib
import google.generativeai as genai
from dotenv import load_dotenv
from api.api_client import login, criar_despesa, listar_despesas, atualizar_despesa, deletar_despesa


# Carrega variáveis do .env
load_dotenv()
email = input("Digite seu e-mail: ")
senha = input("Digite sua senha: ")

print(login(email, senha))

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Modelo correto: sem "models/"
model = genai.GenerativeModel(model_name="gemini-1.5-flash")

def ask_llm(input_text: str) -> str:
    prompt = f"Responda sempre em português brasileiro. Entrada do usuário: {input_text}"
    result = model.generate_content(prompt)
    return result.candidates[0].content.strip()

# Rotas conhecidas para comando (simples)
rotas = {
    "listar despesas": "listar_despesas",
    "criar despesa": "criar_despesa",
    "atualizar despesa": "atualizar_despesa",
    "deletar despesa": "deletar_despesa",
}

def encontrar_rota_mais_proxima(entrada: str):
    entrada = entrada.lower()
    melhores = difflib.get_close_matches(entrada, rotas.keys(), n=1, cutoff=0.5) #0.5 = 50% de similaridade com os nomes das rotas
    if melhores:
        return rotas[melhores[0]]
    return None


def executar_comando(entrada: str) -> str:
    comando = encontrar_rota_mais_proxima(entrada)
    if not comando:
        # fallback para LLM
        prompt = f"Responda em português: {entrada}"
        response = model.generate_content(prompt)
        return response.candidates[0].content.strip()

    if comando == "listar_despesas":
        despesas = listar_despesas()
        despesas_filtradas = [
            {"id": d.get("id"), "titulo": d.get("titulo"), "valor": d.get("valor"), "data": d.get("data")}
            for d in despesas
        ]
        return json.dumps(despesas_filtradas, indent=2, ensure_ascii=False)

    if comando == "criar_despesa":
        try:
            titulo = input("Digite o título da despesa: ")
            valor = float(input("Digite o valor da despesa: "))
            categoria = input("Digite o ID da categoria (ou deixe vazio): ")
            categoria_id = categoria if categoria else None
            despesa = criar_despesa(titulo, valor, categoria_id)
            return json.dumps(despesa, indent=2, ensure_ascii=False)
        except ValueError:
            return "Valor inválido. Tente novamente."

    if comando == "atualizar_despesa":
        try:
            id_para_atualizar = int(input("Digite o ID da despesa para atualizar: "))
            novo_titulo = input("Novo título: ")
            novo_valor = float(input("Novo valor: "))
            dados = {"titulo": novo_titulo, "valor": novo_valor}
            despesa_atualizada = atualizar_despesa(id_para_atualizar, dados)
            return json.dumps(despesa_atualizada, indent=2, ensure_ascii=False)
        except ValueError:
            return "ID ou valor inválido. Tente novamente."

    if comando == "deletar_despesa":
        try:
            id_para_deletar = int(input("Digite o ID da despesa para deletar: "))
            resultado = deletar_despesa(id_para_deletar)
            return json.dumps(resultado, indent=2, ensure_ascii=False)
        except ValueError:
            return "ID inválido. Tente novamente."


if __name__ == "__main__":
    while True:
        entrada = input("Você: ")
        if entrada.lower() in ["sair", "exit", "quit"]:
            break

        resposta = executar_comando(entrada)
        print("Inteligencia:", resposta)
