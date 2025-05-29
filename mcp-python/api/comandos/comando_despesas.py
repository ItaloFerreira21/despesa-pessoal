from service.despesa import listar_despesas, criar_despesa, atualizar_despesa, deletar_despesa
import json

def comando_listar_despesas():
    despesas = listar_despesas()
    despesas_filtradas = [
        {"id": d.get("id"), "titulo": d.get("titulo"), "valor": d.get("valor"), "data": d.get("data")}
        for d in despesas
    ]
    return json.dumps(despesas_filtradas, indent=2, ensure_ascii=False)

def comando_criar_despesa():
    try:
        titulo = input("Digite o título da despesa: ")
        valor = float(input("Digite o valor da despesa: "))
        categoria = input("Digite o ID da categoria (ou deixe vazio): ")
        categoria_id = categoria if categoria else None
        despesa = criar_despesa(titulo, valor, categoria_id)
        return json.dumps(despesa, indent=2, ensure_ascii=False)
    except ValueError:
        return "Valor inválido. Tente novamente."

def comando_atualizar_despesa():
    try:
        id_para_atualizar = int(input("Digite o ID da despesa para atualizar: "))
        novo_titulo = input("Novo título: ")
        novo_valor = float(input("Novo valor: "))
        dados = {"titulo": novo_titulo, "valor": novo_valor}
        despesa_atualizada = atualizar_despesa(id_para_atualizar, dados)
        return json.dumps(despesa_atualizada, indent=2, ensure_ascii=False)
    except ValueError:
        return "ID ou valor inválido. Tente novamente."

def comando_deletar_despesa():
    try:
        id_para_deletar = int(input("Digite o ID da despesa para deletar: "))
        resultado = deletar_despesa(id_para_deletar)
        return json.dumps(resultado, indent=2, ensure_ascii=False)
    except ValueError:
        return "ID inválido. Tente novamente."
