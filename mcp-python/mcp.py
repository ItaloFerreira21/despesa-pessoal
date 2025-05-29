# mcp.py
import sys
# mcp.py
import sys
import os

# Adiciona o caminho absoluto da pasta "api" ao sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "api")))

import difflib
import google.generativeai as genai
from dotenv import load_dotenv

# Imports dos comandos (estão em api/comandos/)
from comandos.comando_relatorios import comando_relatorio_total, comando_relatorio_mensal
from comandos.comando_despesas import (
    comando_criar_despesa,
    comando_listar_despesas,
    comando_atualizar_despesa,
    comando_deletar_despesa
)

# Imports dos serviços (estão em api/service/)
from service.auth import tentar_login
from service.despesa import criar_despesa, listar_despesas, atualizar_despesa, deletar_despesa
from service.relatorios import relatorio_total, relatorio_mensal



# Carrega variáveis
load_dotenv()
tentar_login()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel(model_name="gemini-1.5-flash")

def ask_llm(input_text: str) -> str:
    prompt = f"Responda sempre em português do Brasil e seja simpatico. Entrada do usuário: {input_text}"
    result = model.generate_content(prompt)
    return result.candidates[0].content.strip()

# Dicionário de rotas
rotas = {
    "listar despesas": comando_listar_despesas,
    "criar despesa": comando_criar_despesa,
    "atualizar despesa": comando_atualizar_despesa,
    "deletar despesa": comando_deletar_despesa,
    "relatorio total": comando_relatorio_total,
    "relatório total": comando_relatorio_total,
    "relatório mensal": comando_relatorio_mensal,
    "relatorio mensal": comando_relatorio_mensal,
    "relatório mensal 2025": comando_relatorio_mensal,
    "relatório mensal maio 2025": comando_relatorio_mensal,
}

def encontrar_rota_mais_proxima(entrada: str):
    entrada = entrada.lower()
    melhores = difflib.get_close_matches(entrada, rotas.keys(), n=1, cutoff=0.5)
    if melhores:
        return rotas[melhores[0]]
    return None

def executar_comando(entrada: str):
    comando = encontrar_rota_mais_proxima(entrada)
    if not comando:
        return ask_llm(entrada)
    return comando()

if __name__ == "__main__":
    while True:
        entrada = input("O que deseja: ")
        if entrada.lower() in ["sair", "exit", "quit"]:
            break

        resposta = executar_comando(entrada)
        print("MCP:", resposta)
