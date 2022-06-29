from sap_ber_client import ber_api_client
from pprint import pprint
import json

# Read service key from file
with open('ber_service_key.json', 'r') as sk_file:
    sk_data = sk_file.read()

# Load from file
config_json = json.loads(sk_data)

# Assign authentication info
url = config_json['url']
uaa_clientid = config_json['uaa']['clientid']
uaa_clientsecret = config_json['uaa']['clientsecret']
uaa_url = config_json['uaa']['url']

my_ber_client = ber_api_client.BER_API_Client(url, uaa_clientid, uaa_clientsecret, uaa_url)

# Post a batch inference job using the sap_address_entity model

# Define pretrained model to use
model_name = "sap_address_entity"
model_version = 2

# Create and upload inference dataset
response = my_ber_client.create_dataset("inference")
pprint(response.json())
inference_dataset_id = response.json()["data"]["datasetId"]
print(inference_dataset_id)
# Write dataset id to file
with open('dataset_id.txt', 'w') as f:
    f.write(inference_dataset_id)

inference_dataset_folder = 'data_batch_inference.json'
print("Uploading inference documents to the dataset")
response = my_ber_client.upload_document_to_dataset(inference_dataset_id, inference_dataset_folder)
print("Finished uploading inference documents to the dataset")
pprint(response.json())

# Post batch inference job
response = my_ber_client.post_batch_inference_job(inference_dataset_id, model_name, model_version)
pprint(response.json())

# Write response of submitted batch inference job to file
with open('batch_inference_response.json', 'w') as f:
    json.dump(response.json(), f)
