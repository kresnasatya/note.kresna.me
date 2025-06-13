---
title: Setup
outline: deep
---

# Setup

Kresna Satya's personal setup on Computer.

## macOS

### Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Zsh Config

- [.zshrc](https://raw.githubusercontent.com/kresnasatya/dotfiles/refs/heads/main/.zshrc)

### Text Editor

- Visual Studio Code (VS Code).
- [VS Code settings](https://raw.githubusercontent.com/kresnasatya/dotfiles/refs/heads/main/vscode/settings.json) and [keybindings](https://raw.githubusercontent.com/kresnasatya/dotfiles/refs/heads/main/vscode/keybindings.json)
- Zed editor

### Additional Software

- Table Plus
- DBngin
- Postman
- Notion
- Figma
- [Herd by Laravel](https://herd.laravel.com)
- [Bezel](https://getbezel.app/)
- [Orbstack for Docker](https://orbstack.dev/)
- [App Cleaner](https://freemacsoft.net/appcleaner/)
- [The Unarchiver](https://theunarchiver.com/)
- Discord
- Cloudflare Warp
- Google Chrome
- Firefox
- [Zotero for Citation Paper (alternative of Mendeley)](https://www.zotero.org/) -> Optional
- Android Studio -> Optional
- Swift Playgrounds -> Optional
- Office 365 -> Optional
- [Screenflow](https://www.telestream.net/screenflow/overview.htm) -> Optional

## Windows

First of all, please install [Windows Terminal](https://apps.microsoft.com/detail/9n0dx20hk701) on Microsoft Store in order to make it easier to manage terminal between environment Windows and WSL itself.

### WSL2

This step below is a WSL2 fresh install of WSL2. Open Windows Shell and run as administrator.

```sh
wsl --install -d --web-download Ubuntu
```

After Ubuntu distro downloaded, you must restart your computer to make it works properly.

Next, open Windows Terminal then choose option for Ubuntu terminal (?). For the first time, the Ubuntu will set an update then there will be a prompt to set username and password.

> Usually, I set the password same with the username. 😅

Next, update the Ubuntu distro.

```sh
sudo apt -y update && sudo apt -y full-upgrade
```

Additional information.

```sh
# To get list of distro
wsl -l -v
# Shutdown WSL
wsl --shutdown
# Unregister the distro
wsl --unregister Ubuntu
# Close the terminal and open again
```

**Reference**

[Install Ubuntu on WSL2 with GUI Support](https://ubuntu.com/tutorials/install-ubuntu-on-wsl2-on-windows-11-with-gui-support#1-overview)

#### Utilities

- Install ZSH.

```sh
sudo apt -y install wget git zsh
sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```

- Install Net Tools to check IP on computer with `ifconfig` command.

```sh
sudo apt install -y net-tools
ifconfig
```

#### Homebrew {#homebrew-wsl2}

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

After download, then add Homebrew to the PATH.

```sh
(echo; echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"') >> /home/usdidev/.zshrc
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
```

Next, install Homebrew's dependencies.

```bash
sudo apt-get install -y build-essential
```

Install PHP, Composer, Volta, and PNPM.

```sh
brew install volta php composer
```

Install NodeJS and PNPM with Volta.

```sh
volta install node pnpm
```

#### MySQL

I use MariaDB instead of MySQL server. MariaDB has same features like MySQL server.
    
```sh
sudo apt install -y mariadb-server
```

Enable MariaDB and start MariaDB.

```sh
sudo systemctl enable mariadb
sudo systemctl start mariadb
```

##### Secure MySQL

> This is in development mode.

Run the script below to secure MySQL.

```sh
sudo mysql_secure_installation
```

- Press `Enter` to select `none` as the current root password.

```
Enter current password for root (enter for none): 
```

- Enter `n` and press `Enter` to use MariaDB without unix_socket authentication.

```
Switch to unix_socket authentication [Y/n]
```

- Enter `y` and press `Enter` to change the default root user password.

```
Change the root password? [Y/n]
```

- Enter a new strong password for the root user. In this case I use password `Root@123`.

```
New password:
```

- Re-enter the new root user password and press `Enter` to save changes.

```
Re-enter new password: 
```

- Enter `n` and press `Enter` to not delete anonymous users on the MariaDB server.

```
Remove anonymous users? [Y/n]
```

- Enter `n` and press Enter to keep remote access to the database server root user.

```
Disallow root login remotely? [Y/n]
```

- Enter `n` and press Enter to keep test database.

```
Remove test database and access to it? [Y/n]
```

- Enter `y` to refresh your MariaDB privilege tables and apply your new configuration changes.

```
Reload privilege tables now? [Y/n]
```

Next, I use different port (33061) to access MariaDB. This will prevent conflict with MySQL in Laragon.

Edit file `50-server.cnf` in `/etc/mysql/mariadb.conf.d/50-server.cnf` and add set port 33061.

```
[mysqld]
port = 33061
```

Save it and restart MariaDB server.

```
sudo systemctl restart mariadb
```

#### Redis

```bash
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

sudo apt-get -y update
sudo apt-get install -y redis
```

Enable and run Redis server and client use commands below.

```bash
sudo systemctl enable redis-server
redis-cli
# Test connection inside redis-cli with "ping" command
```

If I want to make Redis can be accessed with my computer IP address then I need to change the redis configuration file.

```bash
# First, stop the Redis server
# Next, go to redis.conf file
sudo vi /etc/redis/redis.conf
# Change value of bind directive
bind 0.0.0.0
# Change protected-mode from yes to no
protected-mode no
# Save it and restart Redis Server
sudo service redis-server restart
```

Install PHP Redis Extension with PECL command then just HIT ENTER.

```bash
pecl install redis
# Then check if redis module or extension has been installed in PHP
php -m
```

**Reference**

[Install Redis on Windows](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-windows/)