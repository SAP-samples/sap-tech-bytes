# SAP Tech Bytes - 2021-08-02 Using GitHub Actions to Deploy Continuously to your Kyma/Kubernetes Cluster

The content in this branch accompanies the post [SAP Tech Bytes: Using GitHub Actions to Deploy Continuously to your Kyma/Kubernetes Cluster](https://blogs.sap.com/2021/08/02/sap-tech-bytes-using-github-actions-to-deploy-continuously-to-kyma-kubernetes/).

To try this out for yourself, follow these steps.
## 0. Preparations
It probably won’t surprise you that you need a Kyma cluster and a GitHub account for this hands-on. Besides, you also need to have the following tools and runtimes installed:

- Node.js
- git Client (and log onto GitHub)
- Docker
- kubectl client

## 1. The Express App
The main app (`server.js`) is straightforward and starts an HTTP server that returns a hello world message when called.

The `package.json` descriptor lists the usual properties and the dependencies of the project. As we don’t need a big test suite for this small server, I just added a pseudo-test that is always successful.

Note that there is also a build script in this file. During the build step, `buildScript.js` will replace the fixed version string in the application with the current version. You probably won’t do this in your app and instead call cds build or a similar command here.

If you want, you can run the following commands to test the app locally:
```
npm install
npm start
```
## 2. Create a Service Account
You might know that regular .kubeconfig sessions from the Kyma console expire after eight hours. It would cause many problems in your CI/CD pipeline if there weren’t an alternative. Luckily there is one: [Creating a Kyma service account](https://developers.sap.com/tutorials/kyma-create-service-account.html). This tutorial shows you how to create a.kubeconfig for the new service account that has the right to deploy to one specific namespace.

Save the created file as we’ll need it again in the next step.

## 3. Set up the GitHub Repository
In case you haven’t done so yet, clone this repository on GitHub

Add the previously generated service account to GitHub so that GitHub Actions can deploy the Docker image to Kyma. Create an encrypted secret `DEV_KUBECONFIG` to store the `.kubeconfig` next to your repository securely. Don’t just drop the value of the file but make sure it’s base-64-encoded before you create the GitHub secret.

> Don't forget to adapt the `k8s/dev_deployment.yaml` file to use the name of your GitHub user and your repository name.

Another essential detail of this YAML file is the used imagePullSecret `regcred`. This secret is required as GitHub only allows authenticated pull by default. Make sure you are logged in to kubectl and run the following commands to set this secret up. 
```
kubectl create secret docker-registry regcred --docker-server=https://ghcr.io  --docker-username=<github user>  --docker-password=<github personal access token>
```
This guide might help you if you are not sure how to create a [personal access token](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token).


## 4. Understand the three GitHub Workflows

 - The first flow is triggered on every push to the main branch, and it uses two default actions to check the repository out and install Node.js. Then, it executes two npm scripts to trigger the tests.

 
- Let’s gear up and look at the second workflow `github/workflows/deploy.yaml`. This flow won’t be trigger automatically and can only be executed by a button press on the GitHub website.

- The last workflow `.github/workflows/publish.yaml`, will be invoked on every push that contains a new tag. This flow triggers the creation of a new image and ensures Kyma pulls the image from GitHub packages and applies it.


## 5. Trigger the Deployment Manually
Go to the repository on the GitHub website and navigate to the Actions tab.

Once the task is completed, go to the Kyma console to find the URL of the demo application and access it.

## 6. Trigger the Pipeline
Now it’s time to see all of this in action. Go to your local project and run the following two commands to kick everything off and watch GitHub Actions do the rest of the work for you.
```
npm version patch
git push --follow-tags
```

---

[More info about this repository](https://github.com/SAP-samples/sap-tech-bytes)
