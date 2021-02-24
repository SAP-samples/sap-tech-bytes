#!/bin/bash
set -e
source env_tpcds.sh
log_file=${myTemp_folder}/${0}__$(date +%Y%m%e%H%M).log

if [ ! -f ${tpcds_kit_tools_folder}/dsdgen ]; then
  echo "You should have dsdgen installed and the environment configured in env_tpcds.sh!"
  exit 1
fi

datasets_tpcds_files_folder=${datasets_root_folder}/tpcds-data/${prefixObj}/init
echo -e ${datasets_tpcds_files_folder}
if [ ! -d ${datasets_tpcds_files_folder} ]
then
  mkdir -p ${datasets_tpcds_files_folder}
fi

touch ${log_file}
tables=$(grep table ${tpcds_kit_tools_folder}/tpcds.sql | grep  --invert-match returns | cut -d' ' -f3)
for t in ${tables}
do
  echo "Working on the table: "$t | tee -a ${log_file}
  ${tpcds_kit_tools_folder}/dsdgen  -QUIET Y -FORCE \
  -TABLE $t -SCALE ${tpcds_scale_factor} \
  -DIR ${datasets_tpcds_files_folder} -DISTRIBUTIONS ${tpcds_kit_tools_folder}/tpcds.idx
  for f in ${datasets_tpcds_files_folder}/*.dat; do
    wc -l $f >> ${log_file}
    tail -3 $f >> ${log_file} 
    mv -- "$f" "${f%.dat}.csv"
  done
  aws s3 mv --recursive ${datasets_root_folder}/tpcds-data s3://${s3bucket}
done
