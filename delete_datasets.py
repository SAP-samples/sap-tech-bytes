"""
Delete datasets via the Python SDK of the business entity recognition service.

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

# Read file with dataset id and delete file
with open('dataset_id.txt', 'r') as dataset_id_file:
    dataset_id = dataset_id_file.read()
response = my_ber_client.delete_dataset(dataset_id)
pprint(response.json())

# List all datasets
response = my_ber_client.get_datasets()
pprint(response.json())

