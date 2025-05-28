import os
import requests
from dotenv import load_dotenv

# Carrega variáveis do .env
load_dotenv()

BASE_URL = "http://localhost:3000"
session_token = None  

def get_headers():
    return {
        "Authorization": f"Bearer {session_token}",
        "Content-Type": "application/json"
    }

def login(email, senha):
    global session_token
    response = requests.post(
        f"{BASE_URL}/auth/login",
        json={"email": email, "senha": senha}
    )
    if response.status_code == 201:
        session_token = response.json().get("access_token")
        return "Login realizado com sucesso!"
    return "Falha no login: " + response.text

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
