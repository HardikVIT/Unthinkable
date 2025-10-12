import requests, os
from dotenv import load_dotenv

load_dotenv()

API_URL = "https://api-inference.huggingface.co/status/nateraw/vit-base-food101"
HEADERS = {"Authorization": f"Bearer {os.getenv('HUGGINGFACE_API_KEY')}"}

r = requests.get(API_URL, headers=HEADERS)

print("Status code:", r.status_code)
print("Raw text:", r.text)
