# #6 - Using the SAP Approuter at dev time - a full-stack journey with UI5 and SAP CAP

For detailed instructions on how to run this application, please refer to the corresponding blog post: [#6 - Using the SAP Approuter at dev time - a full-stack journey with UI5 and SAP CAP](https://blogs.sap.com/2023/10/13/sap-tech-bytes-using-the-sap-approuter-at-dev-time-a-full-stack-journey-with-ui5-and-sap-cap-cloud-foundry-basics-6/)

## Quick Start

Before running this application (which works in hybrid mode), make sure to execute the following commands from the `/packages/cap-server` directory to create an XSUAA service and service-key and bind to it.

```bash
cf create-service xsuaa application my-xsuaa -c ./xs-security.json
cf create-service-key my-xsuaa my-sk
cds bind -2 my-xsuaa:my-sk
```

After that, you can start the application from the project root:

```bash
npm run dev
```
