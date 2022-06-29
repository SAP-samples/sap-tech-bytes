"""
Get the result of an inference job via the Python SDK of the business entity recognition service.

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

# # Get response of single inference job
#
# # Read file with inference job id
# with open('inference_response.json', 'r') as inference_response_file:
#     inference_response = json.loads(inference_response_file.read())
#
# inference_job_id = inference_response["data"]["id"]
# # Get single inference result
# response = my_ber_client.get_inference_job(inference_job_id)
# print("SINGLE JOB INFERENCE RESULT")
# pprint(response.json())

# Get response of batch  inference job

# Read file with batch inference job id
with open('batch_inference_response.json', 'r') as batch_inference_response_file:
    batch_inference_response = json.loads(batch_inference_response_file.read())

batch_inference_job_id = batch_inference_response["data"]["id"]
# Get batch inference result
response = my_ber_client.get_batch_inference_job_result(batch_inference_job_id)
print("BATCH JOB INFERENCE RESULT")
pprint(response.json())

