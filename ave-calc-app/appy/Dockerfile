FROM node:16
ENV MYSQL_ROOT_USER: 'root'
ENV MYSQL_ROOT_PASSWORD: 'shayanA-123'
ENV MYSQL_DATABASE: 'numbers'

WORKDIR /appy
COPY ./appy /appy

RUN apt-get update
RUN npm install -g npm@8.5.2

RUN apt-get -y install nodejs
RUN apt-get -y install python3-pip
RUN pip3 install pymongo
RUN pip3 install mysql-connector-python

EXPOSE 3001

CMD [ "node", "index.js"  ]