#!/bin/bash

npm run migrate:generate 
if [ $? -eq 0 ]; 
then 
    npm run migrate:up 
    echo $vmpassword
    echo $COMMIT
    cp ./migration/*.ts /root/tedDBMigration/$NODE_ENV/$COMMIT.ts
    # sshpass -p $vmpassword scp -T -o StrictHostKeyChecking=no ./migration/*.ts root@10.34.45.186:/root/tedDBMigration/$NODE_ENV/$COMMIT.ts
else echo 'No changes in database schema were found' 
exit 0
fi