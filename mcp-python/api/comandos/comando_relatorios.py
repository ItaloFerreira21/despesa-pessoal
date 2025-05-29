# comandos/relatorios.py
import json
from service.relatorios import relatorio_total, relatorio_mensal

def comando_relatorio_total():
    relatorio = relatorio_total()
    return json.dumps(relatorio, indent=2, ensure_ascii=False)

def comando_relatorio_mensal():
    # Exemplo fixo por enquanto
    relatorio = relatorio_mensal(mes=5, ano=2025)
    return json.dumps(relatorio, indent=2, ensure_ascii=False)
