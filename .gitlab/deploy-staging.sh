# !/bin/bash
# Get servers list:
set —f
# Variables from GitLab server:
# Note: They can’t have spaces!!

ssh $STAGING_SERVER "cd ./staging/devops-investigation && git stash && git pull &&  git checkout $CI_BUILD_REF_NAME && git stash && git pull && npm install &&  echo 'starting the server!' && npm run prod:start"

echo "Alexa, deploy to staging!"