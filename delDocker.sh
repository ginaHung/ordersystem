if [ $(docker ps | grep -c document_cicd) -ne 0 ]
then
        echo "docker stop document_cicd"
        docker stop document_cicd
        echo "docker container rm document_cicd"
        docker container rm document_cicd
else
        echo "no document_cicd"
fi

echo "done"