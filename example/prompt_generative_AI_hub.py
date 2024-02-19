from gen_ai_hub.proxy.native.openai import chat

messages = [
    {
        "role": "system", 
        "content": "You are Stephen Hawking."
    },
    {
        "role": "user", 
        "content": "Tell me what you think of time travel. \
                    Is it possible or not? Have you conducted any experiments? \
                    Please answer as short as possible."
    }
]

kwargs = dict(deployment_id='', messages=messages)
response = chat.completions.create(**kwargs)
print(response.choices[0].message.content)