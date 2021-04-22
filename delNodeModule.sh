if [ $(ls ./BackEnd | grep -c node_modules) -ne 0 ]
then
        echo "rm -rf ./BackEnd/node_modules"
        rm -rf ./BackEnd/node_modules
else
        echo "no ./BackEnd/node_modules"
fi

if [ $(ls ./FrontEnd | grep -c node_modules) -ne 0 ]
then
        echo "rm -rf ./FrontEnd/node_modules"
        rm -rf ./FrontEnd/node_modules
else
        echo "no ./FrontEnd/node_modules"
fi

echo "done"