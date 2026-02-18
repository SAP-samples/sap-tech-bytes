# SAP Tech Bytes - 2026-02-18

The related blog posts are work-in-progress. Please contact https://profile.sap.com/u/Vitaliy-R if you have any questions.

Prerequisites
* Access to [SAP-RPT-1 Playground](https://rpt.cloud.sap/dashboard) and [SAP-RPT-1 OSS model](https://huggingface.co/SAP/sap-rpt-1-oss)
* When running in SAP Business Application Studio as per https://pytorch.org/get-started/locally/:
```shell
pip install torch --index-url https://download.pytorch.org/whl/cpu
pip install 'pandas<3' 'matplotlib'
pip install git+https://github.com/SAP-samples/sap-rpt-1-oss
```
or simply
```shell
pip install --require-venv -r requirements.txt
```
...but then you need to update the version of the CPU-only `torch` manually.

---

[More info about this repository](https://github.com/SAP-samples/sap-tech-bytes)
