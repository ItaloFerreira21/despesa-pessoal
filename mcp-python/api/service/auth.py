import os
import requests
from dotenv import load_dotenv

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
