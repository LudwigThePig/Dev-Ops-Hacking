# !/bin/bash
# Get servers list:
set —f
# Variables from GitLab server:
# Note: They can’t have spaces!!

ssh $STAGING_SERVER "cd ./staging/devops-investigation && git stash && echo 'pulling' && git pull && echo 'checking out' && git checkout $CI_BUILD_REF_NAME && git stash && echo 'pulling again' && git pull && echo 'Installing!' && npm install &&  echo 'starting the server!' && npm run prod:start"

echo "Alexa, deploy to staging!"