#!/usr/bin/bash
source env_tpcds.sh

if [ ! -f ~/sap/hdbclient/hdbsql ]; then
  echo "You should have ~/sap/hdbclient/hdbsql installed!"
  exit 1
fi

keyid=jq -r ".AccessKey.AccessKeyId" ${aws_key_file_folder}/${aws_key_file}
keysecret=mtCI4zQUmFa6B0VNf0RaiZl2nBfX9QRuEWcEu2df

tables=$(grep table ~/tpcds-kit/tools/tpcds.sql | cut -d' ' -f3)
for t in ${tables}
do
  echo -e "Working on the table: "$t
  query="IMPORT FROM CSV FILE 's3-${aws_region}://${keyid}:${keysecret}@${s3bucket}/${prefixObj}/${t}.csv' INTO TPCDS.${t} WITH FIELD DELIMITED BY '|' THREADS 2"
  echo -e ${query}
  ~/sap/hdbclient/hdbsql -n ${saphc_hdb_endpoint} -u DBADMIN -p ${dbu_pwd} -e -ssltrustcert "${query}"
done
