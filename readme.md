# SAP Tech Bytes - 2022-02-18

The content in this branch accompanies the post post [SAP Tech Byte: Running a UI5 app with an express server and deploying it to Cloud Foundry](https://blogs.sap.com/2022/02/18/sap-tech-bytes-running-a-ui5-app-with-an-express-server-and-deploying-it-to-cloud-foundry/).

To try this out for yourself, once you have this branch of the repo locally, follow these steps:

**Prerequisites**

- You need to have [Node.js](https://nodejs.org/en/download/) (**version 14 or higher** ⚠️) installed.
- You need to have the [Cloud Foundry CLI](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html) installed.
- You need a [SAP Business Technology Platform account](https://developers.sap.com/group.btp-setup.html) with the Cloud Foundry environment to be able to deploy the app.

**Install the dependencies**

```shell
$ npm install
```

**Build the uimodule**

```shell
$ npm run build:ui
```

**Authenticate with Cloud Foundry**

```shell
$ cf login
```

**Deploy the app**

```shell
$ cf push
```

**Open the URL in your browser**

To access your app, look for the URL in the `route` information for your app and open it in the browser.

```
Waiting for app to start...

name:              ui5express
requested state:   started
routes:            ui5express.cfapps.eu10.hana.ondemand.com
last uploaded:     Fri 18 Feb 16:20:39 CET 2022
stack:             cflinuxfs3
buildpacks:        nodejs
```

Please head over to the [blog post](https://blogs.sap.com/2022/02/18/sap-tech-bytes-running-a-ui5-app-with-an-express-server-and-deploying-it-to-cloud-foundry/) for more information.

---

[More info about this repository](https://github.com/SAP-samples/sap-tech-bytes)
