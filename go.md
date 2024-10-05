---
title: Learn TDD with Go
description: Learn Test-driven Development with Go Programming Language
outline: deep
---

# Learn TDD with Go

Welcome! This site is a place for you to learn Test-driven Development (TDD) with Go programming language. I will borrow definition of TDD from Wikipedia.

> TDD is a way of writing code that involves writing an automated unit-level test case that fails, then writing just enough code to make the test pass, then refactoring both the test code and the production code, then repeating with another new test case.

So, in other words in TDD you will be:

1. Writing a test that fails first,
2. Writing enough code in order to make the test pass,
3. Refactoring both of test code code and the production (actual code),
4. Repeat again.

By implement the TDD approach, you and me will get more confident with the production code because it backups with test. I usually write the production code and test after that a.k.a manual test. It leads me to take waste more time to manual test and when the production code change I do the manual test and sometimes it leads a bug in production code.

## Background

Until this day, I don't apply the TDD in any projects either personal projects or projects belongs to my company that I'm working on. I usually write the production code and test it after that (manual test). My friend, Wayan Jimmy encourages me to learn TDD in Go programming language by using [Learn Go with tests by Chris James](https://quii.gitbook.io/learn-go-with-tests). I know Go at 2016 and learn it little bit by using [Dasar Pemrograman Golang (Bahasa Indonesia) by Noval Agung](https://dasarpemrogramangolang.novalagung.com). At that time, I was fascinate with the simplicity syntax that offered by Go especially the short syntax `:=` to declare variable. Until this day I remember that Go enforce us to use all declared variables. The main reason is for code cleanliness. Unfortunately, because in my company doesn't adopt Go, I discontinue to learn Go. Also at that time, I'm confused what the personal project that I need to create with Go. I'm bit regret with my decision.

> Let the past be the past.

In this site, you will see similarity content with Chris James's resource. But, I do improvements by show the structure folder for each section, swap example or term with my own language. I also maybe use the Noval Agung's resource as an introduction for several section.

## Install Go

I use homebrew to install Go.

```bash
brew install go
```

To check Go version run `go version`.

```bash
go version
# Output
# go version go1.22.6 darwin/arm64
```

## Text Editor

I use [Visual Studio Code](https://code.visualstudio.com) as text editor for programming Go. It has [official Go extension (Go Team at Google)](https://marketplace.visualstudio.com/items?itemName=golang.Go) for rich language support for Go.