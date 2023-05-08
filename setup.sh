
echo '
 _____                          _____
|  __ \                        / ____|
| |__) |___  _ __   __ _ _ __ | (___   ___ _ ____   _____ _ __ ___
|  _  // _ \| '\''_ \ / _` | '\''_ \ \___ \ / _ \ '\''__\ \ / / _ \ '\''__/ __|
| | \ \ (_) | | | | (_| | | | |____) |  __/ |   \ V /  __/ |  \__ \
|_|  \_\___/|_| |_|\__,_|_| |_|_____/ \___|_|    \_/ \___|_|  |___/



'


echo "----------------------"
echo "Setting up the project"
echo "----------------------"

echo "Installing Dependencies"
npm install
npm install --save-dev

clear

echo '
 _____                          _____
|  __ \                        / ____|
| |__) |___  _ __   __ _ _ __ | (___   ___ _ ____   _____ _ __ ___
|  _  // _ \| '\''_ \ / _` | '\''_ \ \___ \ / _ \ '\''__\ \ / / _ \ '\''__/ __|
| | \ \ (_) | | | | (_| | | | |____) |  __/ |   \ V /  __/ |  \__ \
|_|  \_\___/|_| |_|\__,_|_| |_|_____/ \___|_|    \_/ \___|_|  |___/



'

if [ -f .env ]; then
    
    echo " ---- "
    echo "[Setup] the .env file exists, skipping..."
    echo " ---- "
else
    echo "Creating .env file"
    cp .env.example .env
    # Prompt the user for the database connection options
    read -p "Enter the hostname or IP address of the database server: " db_host
    read -p "Enter the port number that the database server is listening on: " db_port
    read -p "Enter the username used to authenticate to the database server: " db_username
    read -p "Enter the password used to authenticate to the database server: " db_password
    read -p "Enter the name of the database that the project will be using: " db_database
    
    # Write the user's responses to the .env file
    echo "DB_HOST=$db_host" > .env
    echo "DB_PORT=$db_port" >> .env
    echo "DB_USERNAME=$db_username" >> .env
    echo "DB_PASSWORD=$db_password" >> .env
    echo "DB_DATABASE=$db_database" >> .env
    
    echo " "
    echo " "
    echo "Set the environment variables."
    echo " "
    echo " "
    
    
    
    
fi


read -p "Would you like me to start the server in development mode? [Yes/No] " start_dev
if [ "$start_dev" == "Yes" ]; then
    npm run start:dev
fi
