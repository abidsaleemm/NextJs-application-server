# Multus Server Application

TODO Server application:

- Instance scaling

### Requirements:

- Node > 7 & NPM
- Express
- PassportJS
- Websockets (Socket.io)
- Azure AD
- Azure Table Storage
- Azure Blob Storage
- lodb - (Used for local testing and debugging)

### Getting started

```bash
git clone git@bitbucket.org:interbizconsulting/application-server.git
cd application-server
npm install
```

# Testing locally

```
npm run dev
```

TODO add additional run commands.

# Azure Deployment

TODO This is probably going to be handled through DockerHub CI.

# Kudu advanded tools

Provides terminal access to the server through web portal interface.  A shell can be used for debugging and viewing logs.

https://multus.scm.azurewebsites.net/

TODO Add Azure portal screenshot

NOTE:  This has been problematic and might not work.  If this is the case usually FTPS is still available (see below).

# Accesing logs and home directory via FTPS

Mounts a directory.

```
curlftpfs -d -v  -o user=multus:{PASSWORD},ssl waws-prod-bay-063.ftp.azurewebsites.windows.net ~/multusapp
```

