import requests
from service.auth import get_headers, BASE_URL

def criar_despesa(titulo, valor, categoriaId=None):
    body = {
        "titulo": titulo,
        "valor": valor,
        "categoriaId": categoriaId
    }
    response = requests.post(f"{BASE_URL}/despesas", json=body, headers=get_headers())
    return response.json()

def listar_despesas():
    response = requests.get(f"{BASE_URL}/despesas", headers=get_headers())
    return response.json()

def atualizar_despesa(id, dados):
    response = requests.patch(f"{BASE_URL}/despesas/{id}", json=dados, headers=get_headers())
    return response.json()

def deletar_despesa(id):
    response = requests.delete(f"{BASE_URL}/despesas/{id}", headers=get_headers())
    return response.json()
