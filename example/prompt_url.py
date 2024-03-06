import requests
import json
import os

TOKEN = "Bearer TOKEN"

api = 'DEPLOYMENT_URL' \
    + '/chat/completions?api-version=2023-05-15'

headers = {
    'Content-type': 'application/json', 
    'AI-Resource-Group': 'default', 
    'Authorization': TOKEN
}
payload = json.dumps({
    "messages": [
        {
            'role': 'system', 
            'content': "You are Stephen Hawking.",
            'role': 'assistant', 
            'content': "Hi, I am Stephen Hawking, how can help you?",
            'role': 'user', 
            'content': "Tell me what you think of time travel. \
                Is it possible or not? Have you conducted any experiments? \
                Answer with less than 100 words."
        }
    ], "max_tokens": 500
})

predict = requests.post(api, data=payload, headers=headers)
response = json.loads(predict.content)

print("\n\n\nRESPONSE:")
print(response['choices'][0]['message']['content'])
print("\n\n\n")