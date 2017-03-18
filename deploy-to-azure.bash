#!/bin/bash -ex

# These variables should be defined in the Builds environment variables.
# Retrieve them from an Azure Web App's Publishing Profile (.publishsettings).
# - FTP_HOST (e.g.: waws-prod-bay-039.ftp.azurewebsites.windows.net)
# - FTP_USERNAME (e.g.: webappname$webappname)
# - FTP_PASSWORD
# - FTP_SITE_ROOT (e.g.: /site/wwwroot)

# Upload all files recursively from local directory to the remote directory under the Azure Web App:
# NOTE: If the FTP_PASSWORD environment variable was added with the "Secured" checkbox checked,
#       then the password will not be shown in cleartext in the build logs, and will instead be replaced
#       with the "$FTP_PASSWORD" token. Another cool feature of Bitbucket Pipelines.

# 1) Upload all files:
# ncftpput -v -u "$FTP_USERNAME" -p "$FTP_PASSWORD" -R $FTP_HOST $FTP_SITE_ROOT *

# 2) Upload all folders recursively (except hidden folders like .git):
# ncftpput -v -u "$FTP_USERNAME" -p "$FTP_PASSWORD" -R $FTP_HOST $FTP_SITE_ROOT */

filezilla ftps://$FTP_USERNAME:$FTP_PASSWORD@$FTP_HOST/$FTP_SITE_ROOT

echo Finished uploading files to $FTP_HOST$FTP_SITE_ROOT.
