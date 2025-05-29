import requests
from service.auth import get_headers, BASE_URL

def relatorio_total():
    response = requests.get(f"{BASE_URL}/relatorios/total", headers=get_headers())
    return response.json()

def relatorio_mensal(ano, mes):
    params = {"ano": ano, "mes": mes}
    response = requests.get(f"{BASE_URL}/relatorios/mensal", params=params, headers=get_headers())
    return response.json()
