#!/bin/bash
set -e

source env_tpcds.sh

if [ ! -f ~/sap/hdbclient/hdbsql ]; then
  echo "You should have ~/sap/hdbclient/hdbsql installed!"
  exit 1
fi

keyid=$(jq -r ".AccessKey.AccessKeyId" ${aws_key_file_folder}/${aws_key_file})
keysecret=$(jq -r ".AccessKey.SecretAccessKey" ${aws_key_file_folder}/${aws_key_file})

tables=$(grep table ${tpcds_kit_tools_folder}/tpcds.sql | cut -d' ' -f3)
for t in ${tables}
do
  echo -n "Inserting into $t"
  query="IMPORT FROM CSV FILE 's3-${aws_region}://${keyid}:${keysecret}@${s3bucket}/${prefixObj}/${t}.csv' INTO TPCDS.${t} WITH FIELD DELIMITED BY '|' THREADS 2"
  # echo ${query//${keysecret}/'***'}
  ~/sap/hdbclient/hdbsql -U HANACloudTrial_DBAdmin -f "${query}" >> ${myTemp_folder}/${0}.log 
  echo ": " $(~/sap/hdbclient/hdbsql -U HANACloudTrial_DBAdmin -xa "SELECT COUNT(1) FROM TPCDS.${t}") " records"
done
