# install node
echo "---------------------------------"
echo "INSTALLING NODEJS"
echo "---------------------------------"
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
nvm install v7
nvm use v7
node -v
# ------

# install dependencies
echo "---------------------------------"
echo "INSTALLING APP DEPENDENCIES"
echo "---------------------------------"
npm install
(
  cd rest-server
  npm install
)
# ------