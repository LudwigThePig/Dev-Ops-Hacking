# !/bin/bash
# Get servers list:
set —f
# Variables from GitLab server:
# Note: They can’t have spaces!!

echo $SSH_PRIVATE_KEY
echo -e $SSH_PRIVATE_KEY
echo $STAGING_SERVER
ssh $STAGING_SERVER "echo 'SSHEDINT' && cd ./staging/devops-investigation && echo $(pwd) && echo 'ALEXA LAUNCH IT!' && git stash && git checkout $CI_BUILD_REF_NAME && git stash && git pull && sudo npm install && sudo npm run prod:start"

echo "Alexa, deploy to staging!"