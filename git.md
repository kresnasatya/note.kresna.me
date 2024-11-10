---
title: Git
outline: deep
---

# Git

## Commit Tips

Standards conventions of commit messages:
  1. Must be in quotation marks.
  2. Written in the present tense.
  3. Should be brief, 75 characters or less.

## Glossary

`git checkout HEAD filename`: Discards changes in the working directory

`git reset HEAD filename`: Unstages file changes in the staging area

`git checkout SHA`: Used for back to previous commit or specific

`git branch`: List all a Git projects branches

`git branch branch_name`: Create a new branch

`git checkout branch_name`: Used to switch from one branch to master or from one branch to another branch

`git init`: Creates a new git repository

`git status`: Inspects the contents of the working directory and staging area

`git add`: Adds files from working area to the staging area

`git diff`: Shows the difference between the working area and staging area

`git commit`: Permanently stores file changes from staging area in repository

`git log`: Shows lists of all previous commits

`git branch -d name_branch`: Delete non active branch

`git branch -m <oldname> <newname>`: Rename non active branch

`git branch -m <newname>`: Rename active branch

## Change Remote Origin

```sh
git remote set-url origin git://new.url.here
```

## Delete Local and Remote Branch

```sh
git push origin --delete <branch_name>
git branch -d <branch_name>
```

## Workflow

1. WORKING AREA: Make changes to: +additions, -deletions, modifications
2. STAGING AREA: Bring changes into the staging area
3. REPOSITORY: Save changes to the repository as a 'commit'

## How to Merge?

Use `git merge <branch_name>` command to join file changes from one branch to another.

Example: There are two branches: `dev` and `main`. I want to merge my commits from `dev` branch to `main` branch. Here are step by step:

1. Make sure you're in `dev` branch.
2. Use `git checkout main` command to move into `main` branch.
3. Use `git merge dev` command to merge from `dev` branch into `main` branch.

## Rewind Commits

> I have 5 git commits. I would like to move from the latest commit to the third commit. Then, I want to use that third commit as a HEAD->main branch origin. Please tell me step by step.

1. Check your current git commit position with command below.

```sh
git log -n 5 --oneline
```

This will show you the last 5 commits with their hash IDs.

2. Move to the third commit:

```sh
git checkout HEAD~2
```

This moves you 2 commits back from the current HEAD.

3. Create a temporary branch at this commit (optional, but recommended).

```sh
git branch temp_main
```

4. Switch to the new branch.

```sh
git checkout temp_main
```

5. Force update the `main` branch to point to this commit.

```sh
git branch -f main temp_main
```

6. Switch to the main branch.

```sh
git checkout main
```

7. Update the remote (origin) to match your local `main` branch.

```sh
git push origin main --force
```

Warning: This is a force push and will overwrite the remote branch. Make sure you're understand the implications and have backups.

8. Delete the temporary branch (if you created one).

```sh
git branch -d temp_main
```

After these steps, your local and remote main branch will be pointing to what was previously the third commit from the latest.