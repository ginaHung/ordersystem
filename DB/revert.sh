#!/bin/bash

cp /root/tedDBMigration/$NODE_ENV/$COMMIT.ts ./migration/$COMMIT.ts
# sshpass -p $vmpassword scp -T -o StrictHostKeyChecking=no root@10.34.45.186:/root/tedDBMigration/$NODE_ENV/$COMMIT.ts ./migration/$COMMIT.ts
if [ $? -eq 0 ]; 
then 
    ls ./migration
    npm run migrate:down
    if [ $? -eq 0 ];
     then echo 'Reverted done' 
    else echo 'Can not be reverted twice' 
    exit 0
    fi
else echo 'Nothing can be reverted' 
exit 0
fi