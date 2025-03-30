# Create deployment user with restricted access

sudo adduser deployer
sudo mkdir -p /home/deployer/.ssh
sudo chmod 700 /home/deployer/.ssh
sudo cp ~/.ssh/authorized_keys /home/deployer/.ssh/
sudo chown -R deployer:deployer /home/deployer/.ssh
sudo chmod 700 /home/deployer/.ssh
sudo chmod 600 /home/deployer/.ssh/authorized_keys

# Set ownership to deployer

sudo chown -R deployer:deployer /home/coding-family/**app**

# Set directory permissions

sudo chmod 755 /home/coding-family/**app**

# Ensure parent directory is accessible

sudo chmod 755 /home/coding-family

- create file in /home/deployer/deploy-commands.sh

```
#!/bin/bash

ALLOWED_DIR="/home/coding-family/__app__"
LOG_FILE="/tmp/deploy.log"

echo "$(date): $SSH_ORIGINAL_COMMAND" >> $LOG_FILE

case "$SSH_ORIGINAL_COMMAND" in
    "git --version")
        /usr/bin/git --version
        ;;
    "deploy")
        if [ ! -d "$ALLOWED_DIR" ]; then
            echo "Directory $ALLOWED_DIR does not exist"
            exit 1
        fi

        if [ ! -w "$ALLOWED_DIR" ]; then
            echo "No write permission on $ALLOWED_DIR"
            exit 1
        fi

        cd "$ALLOWED_DIR" && \
        /usr/bin/git fetch origin production && \
        /usr/bin/git reset --hard origin/production && \
        /usr/local/bin/pm2 restart all
        ;;
    *)
        echo "Command not allowed: $SSH_ORIGINAL_COMMAND"
        exit 1
        ;;
esac
```

- Set script permissions:

```
sudo chmod 755 /home/deployer/deploy-commands.sh
sudo chown root:root /home/deployer/deploy-commands.sh
```
