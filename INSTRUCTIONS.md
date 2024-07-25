```shell
python -m venv --upgrade-deps .venv_cf_aigenhub
source .venv_cf_aigenhub/bin/activate
```

```shell
python -m pip install --upgrade --requirement requirements_min.txt  
```

```
cf login --sso -a https://api.cf.eu10-004.hana.ondemand.com
cat ~/.cf/config.json | jq
```
