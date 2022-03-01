FROM python:3.9

WORKDIR /

COPY analytics.py ./

RUN apt-get update
RUN apt-get -y install python3-pip
RUN pip3 install Flask
RUN pip3 install pymongo
RUN pip3 install mysql-connector-python
RUN apt-get install python3-mysqldb
CMD [ "python3", "analytics.py" ]