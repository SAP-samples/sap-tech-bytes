#!/bin/bash
source env_tpcds.sh
aws_ro_s3user=S3TPC-reader

eval "echo \"$(cat S3TPC-reader-inline-policy-template.json)\"" > ${myTemp_folder}/${aws_ro_s3user}-inline-policy.json

aws iam create-user --user-name ${aws_ro_s3user}
aws iam put-user-policy --user-name ${aws_ro_s3user} \
  --policy-name inline_S3ReadTPCDSbucket \
  --policy-document file://${myTemp_folder}/${aws_ro_s3user}-inline-policy.json
aws iam create-access-key --user-name ${aws_ro_s3user} > ${myTemp_folder}/${aws_ro_s3user}-access-key.json
cat ${myTemp_folder}/${aws_ro_s3user}-access-key.json
