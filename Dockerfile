FROM node

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/files

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000

# TODO Should these be set on the VM instead and not here?
ENV APPSETTING_CONTAINER dicom0001
ENV APPSETTING_STORAGE2 nhf
ENV APPSETTING_STORAGE2_KEY 4l5r4ZIOvbjQJ2/QBzCk/51RasPIkmvBhbnBMrp3sCCBamPK0pTIDuS3Hna6Hpp8P6J4kfPmjbuR9EmyQ5ujew==
ENV APPSETTING_STORAGE multus
ENV APPSETTING_STORAGE_KEY w9Qei6eOoqerSmw9msraYn6nNx45lr1++8EzvAnpKCib87pMGe4uhl/IszsJsTOY006XG68AFGER3nGmBjLElQ==

CMD [ "npm", "start" ]