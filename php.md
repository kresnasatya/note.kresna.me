---
title: PHP
outline: deep
---

# PHP

PHP is a programming language that mostly used for web development. [According to w3techs.com in 2024, PHP used by 75.7%](https://w3techs.com/technologies/details/pl-php) to build websites around the world.

## Tools

There are two tools that I used to develop website with PHP:

- [Laragon](https://laragon.org) for Windows.
- [Herd](http://herd.laravel.com) for macOS.

## Basics

You can interact with PHP by using command `php -a`. This command will show you an [interactive shell](https://www.php.net/manual/en/features.commandline.interactive.php), so you can execute program here.

```bash
php -a

# output
$ php -a
Interactive shell

# Play around in interactive shell
php > echo 5+8;
13
php > function addTwo($n)
php > {
php { return $n + 2;
php { }
php > var_dump(addtwo(2));
int(4)
php >

# Type exit if you are done with interactive shell.
php > exit
```

### Print Data

Use `echo` to print data that return single value and use `print_r` to print data that return multiple values.

```php
<?php

echo "Hello world";
echo 1;
echo 1.5;
```

### Data Type

So far, I use 7 data types in PHP when programming web:

1. String.
2. Int.
3. Boolean.
4. Double.
5. Float.
6. Array.
7. Object.

### Debugging

Until this day, I don't use XDebug and haven't try it ✌️. I use `exit();` or `die();` to stop program execution and debug it.

```php
// Option 1
echo $var;
exit();

// Option 2
echo $var;
die();

// Option 3
print_r($var);
die();

// Option 4
print_r($var);
exit();

// Option 5
var_dump($var);
exit();

// Option 6
var_dump($var);
die();
```

### Function

If I see a sequence of code program that repeated in one file that's a sign that I need to make a function. For naming convention, I use pascalCase when create function in Class and I use snake_case when create function in non-Class. This rule is not rigid.

```php
<?php

// Class
class Human {
    function canSpeak($language)
    {
        return "I can speak language: {$language}";
    }
}
$kresna = new Human();
echo $kresna->canSpeak('Bahasa Indonesia');

// Non-class

function say_hello($language) {
    return "{$language}";
}
echo say_hello();
```

## Create PHP Package

Most PHP developer use [Composer](https://getcomposer.org/doc/03-cli.md#init) as a tool to develop PHP package (library and project scaffolding). Example, let's create a PHP package called `kisara-php` by using `composer init --no-interaction` command. The `--no-interaction` is an option to disable prompt (like question and answer) from Composer.

```bash
composer init --no-interaction \
--name="ristekusdi/kisara-php" \
--description="Keycloak Service Account library using PHP" \
--type="library" \
--author="Riset dan Teknologi USDI <usdi@unud.ac.id>" \
--stability="stable"
```

This command will generate `composer.json` file. Other options after `--no-interaction` are:

- `name`: Package name. Format: <vendor/package-name>. In this example, the name of package is `ristekusdi/kisara-php`.
- `description`: Package description.
- `type`: Package type. Available options: `library`, `project`.
- `author`: Author name or organization name with email. Format: `Organization name <your-organization-email@mail.com>`
- `stability`: I always use `stable` value to ensure that this package is stable.

::: warning ATTENTION!
- For `vendor`, I use username of organization name or my personal username e.g. `senkulabs` or `kresnasatya`.
- For `author`, I use organization name or my personal name e.g. `Senku Labs <halo@senku.stream>` or `Kresna Satya <halo@kresna.me>`.
:::

### Setup .gitignore

When develop PHP package with composer and connected with Git, there are files or directory that you need to ignored. Create file with name `.gitignore` in root directory project and fill the `.gitignore` with value below.

```.git
vendor
.DS_Store
.env
composer.lock
example.php
```

### Install PHP Package in Web App

#### Dev Mode

As illustration, we install `kisara-php` in `web-app` project. Here's the directory tree.

```
.
└── Projects/
    ├── web-app
    └── kisara-php
```

Next, edit `composer.json` file in `web-app`. We add `kisara-php` location in key `repositories`.

```json
{
    "repositories": [
        {
            "type": "path",
            "url": "../kisara-php",
            "options": {
                "symlink": true
            }
        }
    ]
}
```

Next, add `kisara-php` in `require` key.

```json
{
    "require": {
        "ristekusdi/kisara-php": "@dev"
    }
}
```

The `@dev` value is a sign to download `kisara-php` library in `kisara-php` directory that has been defined in `repositories` key.

::: warning ATTENTION!
Make sure the package name in `require` key equals to package name that we defined in package `kisara-php`.
:::

Last, run `composer update` command to download `ristekusdi/kisara-php`.

**Reference**

[Installing a local Composer package in your PHP project](https://aschmelyun.com/blog/installing-a-local-composer-package-in-your-php-project/).

#### Production Mode

If package works properly in dev mode the next phase is use it in production mode. There are two ways to install PHP package in production mode.

##### VCS

We can utilize GitHub or GitLab, Version Control System (VCS) or Git hosting platform to store PHP package. Here are the brief steps how to install `ristekusdi/kisara-php` in VCS way.

Edit file `composer.json` di `web-app`. Change, `kisara-php` location in `repositories` key.

```json
{
    "repositories": [
        {
            "type": "path", // [!code --]
            "type": "vcs", // [!code ++]
            "url": "../kisara-php", // [!code --]
            "url": "https://github.com/ristekusdi/kisara-php.git" // [!code ++]
            "options": {   // [!code --]
                "symlink": true // [!code --]
            } // [!code --]
        }
    ]
}
```

Next, change value of `ristekusdi/kisara-php` in `require` key from `@dev` to `dev-main`. The `dev-main` value means Composer will download `ristekusdi/kisara-php` package in branch `main`.

```json
{
    "require": {
        "ristekusdi/kisara-php": "@dev" // [!code --]
        "ristekusdi/kisara-php": "dev-main" // [!code ++]
    }
}
```

Then, run `composer update` command.

**Reference**

[Loading a package from a VCS repository](https://getcomposer.org/doc/05-repositories.md#vcs)

##### Packagist

Packagist is a central repository to store PHP package created with Composer. The installation process in Packagist is easier than VCS. The requirement is the `ristekusdi/kisara-php` package has been uploaded to Packagist. Please [see **Publishing Packages** section in Packagist's site](https://packagist.org/). After that, run `composer require ristekusdi/kisara-php` comand.

## Frameworks

> *We choose framework because it organized our mind and code program. Also make sure that framework is comfortable with our style*.

I have use two PHP frameworks: CodeIgniter version 3 and Laravel. Maybe, I should add WordPress too because it's a framework for Content Management System (CMS). Usually, PHP frameworks adopts Model View Controller (MVC) design pattern. Model for query data to database, data transform (accessor and mutator). View to display data from Model. Controller as a bridge between Model and View.

### Laravel

Here are my habits I use when use Laravel framework.

#### Interact with Complex Query

Software in real-world is 80% mess and 20% is our idealism. There are case when I cannot use Eloquent Model from Laravel because of I confuse how to translate entity in English (naming is hard), query is complex (multiple join and nested join), and deadline. Luckily, Laravel shipped `DB::select()` in Query Builder. Here's the example.

```php
// Get role and permission based on user_id
<?php

use Illuminate\Support\Facades\DB;

// Use query binding, folks!
$result = DB::select("select role.name, permission.name from role_user
inner join role on role.id = role_user.role_id
inner join permission_role on permission_role.role_id = role_user.role_id
inner join permission on permission.id = permission_role.perm_id
where role_user.user_id = ?", [1]);
dd($result);

// Name query binding. Why not!?
$result = DB::select("select role.name, permission.name from role_user
inner join role on role.id = role_user.role_id
inner join permission_role on permission_role.role_id = role_user.role_id
inner join permission on permission.id = permission_role.perm_id
where role_user.user_id = :user_id", ['user_id' => 1]);
dd($result);
```

#### Create PHP helpers inside Laravel

Laravel News give tip how to create PHP helpers inside Laravel which is great. But, personally I don't like the approach, so I create my own style.

1.  Create `helpers` directory inside root project. Inside the helpers directory create a `index.php` file.

```
.
├── app
├── helpers/
│   └── index.php
└── ...
```

2. In `composer.json` file, add `files` key inside `autoload` key and update the value with `helpers/index.php`.

```json
"autoload": {
    "files": [
        "helpers/index.php"
    ],
    "classmap": [
        "database/seeds",
        "database/factories"
    ],
    "psr-4": {
        "App\\": "app/"
    }
},
```

3. Dump the autoloader by run `composer dump-autoload`.

Inside `helpers/index.php`, we can defined functions for spell number and display formatted timestamp. You can see that I add `function_exists` function. This function come from PHP to make sure that our function don't conflict with the framework. If the framework has define the same function name with our function then framework get the first seat.

```php
<?php
// helpers/index.php

/**
 * Display timestamp in certain format
 * @param $date
 * @param $isoFormat
 * @param $locale
 */
if (!function_exists('display_formatted_timestamp')) {
    function display_formatted_timestamp($date = null, $isoFormat = 'DD MMMM YYYY', $locale = null)
    {
        if (empty($date)) {
            $date = date('Y-m-d');
        }
    
        if (!empty($locale)) {
            return \Carbon\Carbon::parse($date)->locale($locale)->isoFormat($isoFormat);
        }
    
        return \Carbon\Carbon::parse($date)->isoFormat($isoFormat);
    }
}

// Usage example
// echo display_formatted_timestamp('2024/03/20');
// $date =\Carbon\Carbon::createFromFormat('d/m/Y', '10/07/2024');
// echo display_formatted_timestamp($date);

/**
 * Spell number to words
 * @param $number
 * @param $locale
 */
if (!function_exists('spell_numbers')) {
    function spell_number($number = 0, $locale = 'id_ID')
    {
        $fr = new NumberFormatter($locale, NumberFormatter::SPELLOUT);
        return $fr->format($number);
    }
}

// Usage example
// echo spell_number(0); => output "Nol"
```

::: info QUESTION
Do you have solution if `index.php` inside helpers bloated (more than 1000 lines)?

We can use `require_once` keyword to solve this. Let say inside `index.php` helpers I see a lot of functions that used for date manipulation. So I move them into a file named `date.php` inside helpers directory.

```
.
└── helpers/
    ├── index.php
    └── date.php
```

Then in the top of `index.php`, I call `required_once 'date.php'`.

```php
<?php

// helpers/index.php

require_once 'date.php';

// ... the rest of functions remove for brevity.
```

That's it! I don't need `composer dump-autoload`! Sweet!
:::

## Deployment

Showing your project develop in Laravel framework in internet is an exciting part. I use GitLab CI/CD or GitHub actions + [Deployer](https://deployer.org) for Virtual Private Server (VPS) or I use `serversideup/docker-php` from [Server Side Up](https://github.com/serversideup/docker-php) for Cloud Service that support Docker like [Fly.io](https://fly.io/docs/laravel/).

### Deployer + GitLab CI/CD / GitHub Actions

Make sure you generate SSH Private Key and SSH Known Hosts and store it into GitLab or GitHub variable. I create `PRO_SSH_PRIVATE_KEY` variable name to store SSH Private Key and `PRO_SSH_KNOWN_HOSTS` to store SSH Known Hosts.

#### CodeIgniter V3

Put the `.env` content file inside the GitLab or GitHub variable. I create `PRO_DOTENV` variable name to store the `.env` content file.

```php
// deploy.php

<?php
namespace Deployer;

require 'recipe/codeigniter.php';
require 'contrib/rsync.php';
require 'recipe/deploy/cleanup.php';

// Config
set('application', 'webapp.tld');
set('ssh_multiplexing', true); // Speed up deployment
set('keep_releases', 5); // Keep 5 releases

set('rsync_src', function () {
    return __DIR__;
});

// Configure rsync exclude dirs and files.
add('rsync', [
    'exclude' => [
        '.git',
        '.htaccess',
        '.env.example',
    ]
]);

add('shared_files', ['.env']);
// Symlink directory. So it still align with next deployment iteration.
add('shared_dirs', ['application/cache', 'application/logs', 'uploads', 'webapp_file']);
add('writable_dirs', ['application/cache', 'application/logs', 'uploads', 'webapp_file']);

// Hosts
host('webapp.tld')
    ->set('hostname', '<IP_ADDRESS>')
    ->set('remote_user', 'non-root-user') // Create ssh private key and ssh known hosts inside this user
    ->set('deploy_path', '/var/www/webapp.tld/web');

// Deploy secrets
task('deploy:secrets', function () {
    file_put_contents(__DIR__ .'/.env', getenv('PRO_DOTENV'));
    upload('.env', get('deploy_path') . '/shared');
});

// Hooks
// Disable git clone and use rsync to pull the repository
task('deploy:update_code')->disable();
after('deploy:update_code', 'rsync');

task('deploy', [
    'deploy:prepare',
    'deploy:secrets',
    'deploy:vendors',
    'deploy:publish',
]);

after('deploy:failed', 'deploy:unlock');
```

```yml
# .gitlab-ci.yml

image: docker.io/ristekusdi/webapp-builder:8.1

.init_ssh_pro: &init_ssh_pro |
  eval $(ssh-agent -s)
  echo "$PRO_SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add - > /dev/null
  mkdir -p ~/.ssh
  chmod 700 ~/.ssh
  echo "$PRO_SSH_KNOWN_HOSTS" >> ~/.ssh/known_hosts
  chmod 644 ~/.ssh/known_hosts

# Replace the last line with the following lines if you'd rather
# leave StrictHostKeyChecking enabled (replace yourdomain.com):
#
#  ssh-keyscan yourdomain.com >> ~/.ssh/known_hosts
#  chmod 644 ~/.ssh/known_hosts

.change_file_permissions: &change_file_permissions |
  find . -type f -not -path "./vendor/*" -exec chmod 664 {} \;
  find . -type d -not -path "./vendor/*" -exec chmod 775 {} \;

workflow:
  rules:
    - if: $CI_COMMIT_TAG
      when: never
    - if: $CI_COMMIT_BRANCH == 'main'

composer:
  stage: build
  tags:
    - docker
  cache:
    key: ${CI_COMMIT_REF_SLUG}-composer
    paths:
      - vendor
  script:
      - composer install --prefer-dist --no-ansi --no-interaction --no-progress --no-scripts
  artifacts:
    expire_in: 1 month
    paths:
      - vendor

pro-deployment:
    stage: deploy
    tags:
      - docker
    script:
        - *init_ssh_pro
        - *change_file_permissions
        - php vendor/bin/dep --file=deploy.php deploy webapp.tld --revision="${CI_COMMIT_SHA}"
```

#### Laravel

```php
<?php
// deploy.php
namespace Deployer;

require 'recipe/laravel.php';
require 'contrib/rsync.php';
require 'recipe/deploy/cleanup.php';

// Config
set('application', 'webapp.tld');
set('ssh_multiplexing', true); // Speed up deployment
set('keep_releases', 5); // Keep 5 releases

set('rsync_src', function () {
    return __DIR__; // If your project isn't in the root, you'll need to change this.
});

// Configuring the rsync exclusions.
// You'll want to exclude anything that you don't want on the production server.
add('rsync', [
    'exclude' => [
        '.git',
        '/.env',
        // '/vendor/',
        // '/node_modules/',
        'deploy.php',
    ],
]);

host('webapp.tld') // Name of the server
    ->set('hostname', '<IP_ADDRESS>') // Hostname or IP address
    ->set('remote_user', 'non-root-user') // Create ssh private key and ssh known hosts inside this user
    ->set('deploy_path', '/var/www/webapp.tld/web');

// Deploy secrets
task('deploy:secrets', function () {
    file_put_contents(__DIR__ .'/.env', getenv('PRO_DOTENV'));
    upload('.env', get('deploy_path') . '/shared');
});

task('deploy:update_code')->disable();
after('deploy:update_code', 'rsync');
task('deploy', [
    'deploy:prepare',
    'deploy:secrets', // Deploy secrets
    'artisan:storage:link', // |
    'artisan:view:cache',   // |
    'artisan:config:cache', // | Laravel specific steps
    'artisan:optimize',     // |
    'artisan:migrate',      // | Run artisan migrate if you need it, if not then just comment it!
    'artisan:horizon:terminate',
    'artisan:horizon:publish',
    'deploy:symlink',
    'deploy:unlock',
    'deploy:cleanup',
]);

after('deploy:failed', 'deploy:unlock');
```

```yml
# .gitlab-ci.yml

image: docker.io/ristekusdi/webapp-builder:8.1
# Add a `.` in front of a job to make it hidden.
# Add a `&reference` to make it a reusable template.
# Note that we don't have dashes anymore.
.init_ssh_pro: &init_ssh_pro |
  eval $(ssh-agent -s)
  echo "$PRO_SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add - > /dev/null
  mkdir -p ~/.ssh
  chmod 700 ~/.ssh
  echo "$PRO_SSH_KNOWN_HOSTS" >> ~/.ssh/known_hosts
  chmod 644 ~/.ssh/known_hosts

# Replace the last line with the following lines if you'd rather
# leave StrictHostKeyChecking enabled (replace yourdomain.com):
#
#  ssh-keyscan yourdomain.com >> ~/.ssh/known_hosts
#  chmod 644 ~/.ssh/known_hosts

.change_file_permissions: &change_file_permissions |
  find . -type f -not -path "./vendor/*" -exec chmod 664 {} \;
  find . -type d -not -path "./vendor/*" -exec chmod 775 {} \;

composer:
  stage: build
  tags:
    - docker
  cache:
    key: ${CI_COMMIT_REF_SLUG}-composer
    paths:
      - vendor
  script:
      - composer install --prefer-dist --no-ansi --no-interaction --no-progress --no-scripts
      - cp .env.example .env
      - php artisan key:generate
  artifacts:
    expire_in: 1 month
    paths:
      - vendor
      - .env
  only:
    - main

npm:
    # The job's stage (build, test or deploy).
    stage: build
    tags:
      - docker
    # What to run on the job.
    script:
        - pnpm install
        - pnpm run build

    artifacts:

        # (Optional) Give it an expiration date,
        # after that period you won't be able to
        # download them via the UI anymore.
        expire_in: 1 month

        # Define what to ouput from the job.
        paths:
            - node_modules
            - public/js
            - public/css
            - public/build

    cache:
        key: ${CI_COMMIT_REF_SLUG}-composer
        # Define what to cache.
        paths:
            - node_modules
    only:
      - main

pro-deployment:
    stage: deploy
    tags:
      - docker
    script:
        - *init_ssh_pro
        - *change_file_permissions
        - php vendor/bin/dep --file=deploy.php deploy webapp.tld --revision="${CI_COMMIT_SHA}"
    only:
        - main
```

### Server Side Up Docker PHP

```Dockerfile
#
# Stage 1: PNPM dependencies as public
#
FROM docker.io/node:20-slim AS public
ENV PNPM_HOME="/pnpm"
ENV PATH="${PNPM_HOME}:$PATH"
RUN corepack enable

# COPY package.json vite.config.js tailwind.config.js postcss.config.js pnpm-lock.yaml /app/
COPY package.json vite.config.js tailwind.config.js postcss.config.js pnpm-lock.yaml /app/
COPY resources/ /app/resources/

WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

#
# Stage 2: Composer dependencies as vendor
#
FROM docker.io/serversideup/php:8.3-cli AS vendor

COPY --chown=www-data:www-data . /var/www/html

RUN composer install --no-interaction --optimize-autoloader --no-dev

#
# Web App
#
FROM docker.io/serversideup/php:8.3-fpm-nginx-alpine AS webapp

ARG build=develop

ENV BUILD ${build}
ENV PHP_OPCACHE_ENABLE=1

USER www-data

COPY  --from=vendor --chown=www-data:www-data /var/www/html /var/www/html
COPY  --from=public --chown=www-data:www-data /app/public /var/www/html/public
```