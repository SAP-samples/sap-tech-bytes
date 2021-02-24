myTemp_folder=~/tmp
myProjects_folder=~/Projects
tpcds_kit_folder=${myProjects_folder}/tpcds-kit
tpcds_kit_tools_folder=${tpcds_kit_folder}/tools
tpcds_scale_factor=1

datasets_root_folder=~/Datasets
prefixObj=sf$(printf "%04d" ${tpcds_scale_factor})/data

aws_region=eu-central-1
s3bucket=tpcds4hdbc

aws_ro_s3user=S3TPC-reader
aws_key_file_folder=${myTemp_folder}
aws_key_file=${aws_ro_s3user}-access-key.json

HDB_USE_IDENT=AWSCloudShell
saphc_hdb_endpoint=8e1a286a-21d7-404d-8d7a-8c77d2a77050.hana.trial-eu10.hanacloud.ondemand.com:443
