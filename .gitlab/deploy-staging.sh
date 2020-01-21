# !/bin/bash
# Get servers list:
set —f
# Variables from GitLab server:
# Note: They can’t have spaces!!
ssh $STAGING_SERVER "cd ./staging/devops-investigation && git stash && git checkout $CI_BUILD_REF_NAME && git stash && git pull && sudo npm install && sudo npm run prod:start"

echo "Alexa, deploy to staging!"