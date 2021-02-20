# Approuter User API Service

The content in this branch accompanies the post [SAP Tech Bytes: Approuter User API Service](https://blogs.sap.com/2021/02/20/sap-tech-bytes-a…user-api-service/).

To try this out for yourself, once you have this branch of the repo locally, follow these steps.

**Authenticate with Cloud Foundry**

```shell
$ cf login
```

**Create the xsuaa service instance**

```shell
$ cf create-service xsuaa application xsuaa-application -c xs-security.json
```

**Create and deploy the app**

```shell
$ cf push -f manifest.yml
```

**Open the URL in your browser to see the data**

To see what the User API Service returns for you, look for the URL in the route information for your app (it will be randomly generated). It will look something like this (the value for `routes`):

```
Waiting for app to start...

name:                userapitest
requested state:     started
isolation segment:   trial
routes:              userapitest-appreciative-bilby-wy.cfapps.eu10.hana.ondemand.com
last uploaded:       Sat 20 Feb 17:07:17 GMT 2021
stack:               cflinuxfs3
buildpacks:          nodejs
```

Open that as a URL in your browser. You should information shown similar to what was described in the blog post.
