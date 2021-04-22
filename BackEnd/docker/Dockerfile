FROM node:10.17.0-slim


WORKDIR /myapp
ADD package.json /myapp/
ADD index.js /myapp/ 
ADD src /myapp/src/
ADD config /myapp/config/
ADD public /myapp/public/
RUN npm install
RUN node -v

CMD exec node index.js