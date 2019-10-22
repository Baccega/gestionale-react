FROM postgres:9.6.15

COPY *.sql /docker-entrypoint-initdb.d/
ADD database.sql /docker-entrypoint-initdb.d
RUN chmod a+r /docker-entrypoint-initdb.d/*
EXPOSE 6666