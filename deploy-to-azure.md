# Bitbucket Pipelines Deploy-to-Azure Extension #
This document describes the process of publishing to Azure Web App using FTP.

The following files were added by the 'bitbucket-pipelines-deploy-to-azure' for VS Code:
* bitbucket-pipelines.yml
* deploy-to-azure.bash
* deploy-to-azure.md (this file)

### How to use the generated artifacts: ###

* First, create a new repository and create a new web app.
* Next, enable Pipelines for your repository and add the default **`bitbucket-pipelines.yml`** file to your repo.
* Create a [Web App](https://azure.microsoft.com/en-us/documentation/articles/app-service-web-how-to-create-a-web-app-in-an-ase/) in the [Azure Portal](https://portal.azure.com).
* Download the **Publish Profile** (*your-web-app-name*.PublishSettings*) file from the Web App blade in the [Azure Portal](https://portal.azure.com).
* Set the following environment variables in your Bitbucket repo (retrieve their values from the .PublishSettings file's PublishProfile with the profileName 'your-web-app-name - FTP'):

1.  **`FTP_HOST`** (e.g.: *waws-prod-bay-039.ftp.azurewebsites.windows.net*)
2.  **`FTP_USERNAME`** (e.g.: _webappname$webappname_)
3.  **`FTP_PASSWORD`** (*IMPORTANT NOTE*: Make sure the "**Secured**" checkbox is checked!)
4.  **`FTP_SITE_ROOT`** (e.g.: _/site/wwwroot_)

* Use this extension to add a **`bitbucket-pipelines.yml`** file and a **`deploy-to-azure.bash`** file that are ready for deploying to Azure App Service.
* Push a change to your repo and watch Pipelines validate and then publish your changes to your Azure Web App!
