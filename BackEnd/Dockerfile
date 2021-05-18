FROM chnbohwr/node:12

WORKDIR /myapp
RUN ls
ADD package.json /myapp/
ADD index.js /myapp/ 
ADD src /myapp/src/
ADD config /myapp/config/
ADD public /myapp/public/
RUN npm install
RUN node -v

CMD exec node index.js