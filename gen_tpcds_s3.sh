#!/usr/bin/bash
source env_tpcds.sh

if [ ! -f ${tpcds_kit_tools_folder}/dsdgen ]; then
  echo "You should have dsdgen installed and the environment configured in env_tpcds.sh!"
  exit 1
fi

datasets_tpcds_files_folder=${datasets_root_folder}/tpcds-data/${prefixObj}
echo -e ${datasets_tpcds_files_folder}
if [ ! -d ${datasets_tpcds_files_folder} ]
then
  mkdir -p ${datasets_tpcds_files_folder}
fi

tables=$(grep table ${tpcds_kit_tools_folder}/tpcds.sql | grep  --invert-match returns | cut -d' ' -f3)
for t in ${tables}
do
  echo -e "Working on the table: "$t
  ${tpcds_kit_tools_folder}/dsdgen  -QUIET Y -FORCE \
  -TABLE $t -SCALE ${tpcds_scale_factor} \
  -DIR ${datasets_tpcds_files_folder} -DISTRIBUTIONS ${tpcds_kit_tools_folder}/tpcds.idx
  for f in ${datasets_tpcds_files_folder}/*.dat; do
    mv -- "$f" "${f%.dat}.csv"
  done
  aws s3 mv --recursive ${datasets_root_folder}/tpcds-data s3://${s3bucket}
done
