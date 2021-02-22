#!/bin/bash
source env_tpcds.sh
aws_ro_s3user=S3TPC-reader

mkdir -p ${myTemp_folder}
inline_policy_template='
{
	    "Version": "2012-10-17",
	        "Statement": [
		        {
				            "Sid": "ListObjectsInBucket",
					                "Effect": "Allow",
							            "Action": "s3:ListBucket",
								                "Resource": "arn:aws:s3:::${s3bucket}"
										        },
										        {
												            "Sid": "AllowObjectRead",
													                "Effect": "Allow",
															            "Action": "s3:GetObject",
																                "Resource": "arn:aws:s3:::${s3bucket}/*"
																		        }
																		    ]
																	    }'

echo ${inline_policy_template//'${s3bucket}'/${s3bucket}} > ${myTemp_folder}/${aws_ro_s3user}-inline-policy.json

aws iam create-user --user-name ${aws_ro_s3user}
aws iam put-user-policy --user-name ${aws_ro_s3user} \
  --policy-name inline_S3ReadTPCDSbucket \
  --policy-document file://${myTemp_folder}/${aws_ro_s3user}-inline-policy.json
aws iam create-access-key --user-name ${aws_ro_s3user} > ${myTemp_folder}/${aws_ro_s3user}-access-key.json
cat ${myTemp_folder}/${aws_ro_s3user}-access-key.json
