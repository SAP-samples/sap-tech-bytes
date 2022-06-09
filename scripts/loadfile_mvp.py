from io import StringIO
import streamlit as st
import hana_ml.dataframe as dataframe
from cfenv import AppEnv
import pandas as pd

st.set_page_config(
   page_title="CSV-to-HDB",
   page_icon="https://hana-cockpit.cfapps.us10.hana.ondemand.com/hcs/sap/hana/cloud/assets/images/sap_logo.svg",
   layout="wide",
)

st.title('CSV-to-HDB')

env = AppEnv()

HANA_SERVICE = 'hdb-staging-schema'
hana = env.get_service(name=HANA_SERVICE)

# Instantiate connection object
conn = dataframe.ConnectionContext(address=hana.credentials['host'],
                             port=int(hana.credentials['port']),
                             user=hana.credentials['user'],
                             password=hana.credentials['password'],
                             encrypt='true',
                             sslTrustStore=hana.credentials['certificate'])

st.write(f'1. Connected to the schema {conn.get_current_schema()}')

df_data = None

some_file = st.file_uploader("2. Upload a file to be loaded into SAP HANA Cloud db", type={"csv", "txt"})
if some_file is not None:
     # To read file as bytes:
     bytes_data = some_file.getvalue()
     #st.write(bytes_data)

     # To convert to a string based IO:
     stringio = StringIO(some_file.getvalue().decode("utf-8"))
     #st.write(stringio)

     # To read file as string:
     string_data = stringio.read().splitlines()
     st.write('File preview (up to 5 lines):', string_data[:5])

# Load CSV into pandas DataFrame

df_data = None
if some_file is not None:
    df_data = pd.read_csv(some_file, sep=None).convert_dtypes()
    
st.write(f"Pandas dataframe size: {0.0 if df_data is None else round(df_data.memory_usage(deep=True).sum()/1024/1024, 2)} MB")
st.write('Dataframe (up to 5 rows):', df_data if df_data is None else df_data.head(5))

# Load data to SAP HANA
service_schema = hana.credentials['schema']
target_table = st.text_input('HANA table name: ', 'STAGING')

if st.button('3. Persist data into the HANA db') and df_data is not None and target_table!='':
    df_remote = dataframe.create_dataframe_from_pandas(connection_context = conn, 
                                                   pandas_df = df_data, 
                                                   table_name = target_table,
                                                   schema = service_schema,
                                                   force = True,
                                                   disable_progressbar = True)

    st.write(f'Successful creation of the table {target_table}: {conn.has_table(table=target_table, schema = service_schema)}')
