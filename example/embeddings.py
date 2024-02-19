from gen_ai_hub.proxy.native.openai import embeddings

response = embeddings.create(
    input="dog",
    model_name="text-embedding-ada-002"
)
print(response.data)
