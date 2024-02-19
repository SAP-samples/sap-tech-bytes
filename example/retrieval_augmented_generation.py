from gen_ai_hub.proxy.langchain.openai import ChatOpenAI
from gen_ai_hub.proxy.langchain.openai import OpenAIEmbeddings

from langchain.text_splitter import CharacterTextSplitter
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import Chroma

from langchain.chains import RetrievalQA

loader = TextLoader('time_travel.txt')
documents = loader.load()
text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
texts = text_splitter.split_documents(documents)

embedding_model = OpenAIEmbeddings(proxy_model_name='text-embedding-ada-002')
db = Chroma.from_documents(texts, embedding_model)
retriever = db.as_retriever()

chat_llm = ChatOpenAI(proxy_model_name='gpt-35-turbo')  

qa = RetrievalQA.from_llm(
    llm=chat_llm, retriever=retriever)

query = "Tell me what Stephen Hawking thinks of time travel. Is it possible or not? Has he conducted any experiments?"
print('\nRESPONSE:')
print(qa.invoke(query)['result'])