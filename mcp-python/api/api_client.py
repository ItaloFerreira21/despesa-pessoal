""" import os
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

def tentar_login():
    global session_token

    while True:
        email = input("Digite seu e-mail: ")
        senha = input("Digite sua senha: ")

        response = requests.post(
            f"{BASE_URL}/auth/login",
            json={"email": email, "senha": senha}
        )

        if response.status_code == 201:
            session_token = response.json().get("access_token")
            print("Login realizado com sucesso!\n")
            break
        else:
            print("Falha no login. Verifique e-mail e senha.\n")

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

def relatorio_total():
    response = requests.get(f"{BASE_URL}/relatorios/total", headers=get_headers())
    return response.json()

def relatorio_mensal(ano, mes):
    params= {
        "ano": ano,
        "mes": mes
    }
    response = requests.get(f"{BASE_URL}/relatorios/mensal", params=params, headers=get_headers())
    return response.json() """