import google.generativeai as genai

genai.configure(api_key="AIzaSyDlDUhwryA_IQHLUG3LauCbDhFFkUcP-Gc")

models = genai.list_models()
for model in models:
    print(model.name)