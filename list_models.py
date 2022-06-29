"""
List all (pretrained) models via the Python SDK of the business entity recognition service (SAP AI Business Services)

For more information and example code on the Python SDK visit:
https://github.com/SAP/business-entity-recognition-client-library
"""

__author__ = "Nora von Thenen"
__contact__ = "nora.von.thenen@sap.com"
__date__ = "2022/03/07"


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

# List all available models trained and pretrained
response = my_ber_client.get_trained_models()
print("ALL AVAILABLE MODELS")
pprint(response.json())

# Get model details
model_name = "sap_email_business_entity"
pprint(my_ber_client.get_trained_model_versions(model_name).json())

model_name = "sap_invoice_header"
pprint(my_ber_client.get_trained_model_versions(model_name).json())

model_name = "sap_address_entity"
pprint(my_ber_client.get_trained_model_versions(model_name).json())

model_name = "sap_generic_entities"
pprint(my_ber_client.get_trained_model_versions(model_name).json())

