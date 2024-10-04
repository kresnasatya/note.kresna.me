---
title: Hello, World
description: First stop to learn TDD with Go by create a Hello, World program.
outline: deep
---

# Hello World

> Please re-type instead of copy paste! It's a part of learning process to make you understand.

`Hello, World` is a traditional way to run the first program in any programming language. In this section, we will create a `Hello, World` program with a Test-driven development (TDD) approach. Here's the folder structure.

```
- tdd-go
  - 01-hello-world
    - hello.go
```

In `hello.go` file, type code below.

```go
// hello.go

package main

import "fmt"

func main() {
    fmt.Println("Hello, World")
}
```

Use `go run hello.go` command to run the program.

```bash
go run hello.go
# Output
# Hello, World
```

When you write a program in Go, you will have a package name `main` with a `main` function inside it. Package is a way of grouping up related Go code together. The `func` keyword defines a function with a name and a body. The `import "fmt"` is a imported package that contains the `Println` function to print the `Hello, World`.

### Add TDD to Hello, World

How to test the `Hello, World` program? It's a good separate your "domain" code from outside world (side-effects). The `fmt.Println` is a side effect (printing out stdout) and the string we send in is a "domain" code. Let's separate these concerns so it's easier to test.

```diff
// hello.go
package main

import "fmt"

+ func Hello() string {
+   return "Hello, World"    
+ }

func main() {
-   fmt.Println("Hello, World")
+   fmt.Println(Hello())
}
```

The code above tells us that we have create a new function name `Hello()` and return value with data type `string`.

Next, create a new file name `hello_test.go`. We are going to write a test for our `Hello` function. Here is the updated folder structure.

```
- tdd-go
  - 01-hello-world
    - hello.go
    - hello_test.go
```

```go
// hello_test.go

package main

import "testing"

func TestHello(t *testing.T) {
    got := Hello()
    want := "Hello, World"

    if got != want {
        t.Errorf("got %q want %q", got, want)
    }
}
```

Run command `go test` inside `01-hello-world` directory to test the program.

```bash
$ cd 01-hello-world
$ go test
go: cannot find main module; see 'go help modules'
```

### Add Go modules

Since Go version 1.16, if you need to run a test, Go requires you to add `go modules`. Go modules is a collection of Go packages stored in a file tree with a `go.mod` file at its root. The purposes are manage dependencies explicitly and reproducibly, enable version selection of dependencies, and allow working with packages outside of GOPATH.

The `go.mod` file defines the module path, Go version, and dependencies. It recommends to have a single `go.mod` file at the root of repository/directory/project. If you're starting a new project or working on a typical Go application, it's best to stick with recommended single-module approach. This simplifies dependency management and makes it easier for others to use and understand your project structure.

To create a go modules, use command `go mod init <module-name>` and do it in the root directory which is `tdd-go`.

```bash
# Make sure you are in tdd-go to run go mod init
$ go mod init tdd-go
```

It will create a `go.mod` file inside the `tdd-go` folder.

```
- tdd-go
  - 01-hello-world
    - hello.go
    - hello_test.go
  - go.mod
```

The content of `go.mod` file will be like this.

```
// go.mod
module tdd-go

go 1.22
```

### Continue add TDD to Hello, World

Run `go test` in your terminal and it should be passed! Just to check, try deliberatly breaking the test by changing the `want` string.

Notice how you have not had to pick between multiple testing frameworks and the figure out how to install them. Everything you need is built into the language, and the syntax is the same as the rest of the code you will write.

### Writing test in Go

A few rules to write test in Go:

- It needs to be in a file with a name like `xxx_test.go`

::: code-group
``` [✅ Good]
- hello.go
- hello_test.go
```

``` [❌ Bad]
- hello.go
- foo_test.go
```
:::

- The test function must start with word `Test`.
- The test function takes one argument only `t *testing.T`.
- To use the `*testing.T` type, you need to `import "testing"`.

### Add features to Hello, World

The `Hello, World` program is kinda boring. I would like to add two features:

- You can replace the `World` with your name e.g. `Hello, Kresna`. 
- You can replace the greeting of `Hello` with your own language. 
    - If user choose language `Indonesia` it will be `Halo, Kresna`.
    - If language `Japanese` it will be `Konnichiwa, Kresna`.
    - If language `Korean` it will be `Annyeonghaseo, Kresna`.

### First Feature

Let's start with the first feature. Update the `hello_test.go` file with code below.

```diff
// hello_test.go

package main

import "testing"

func TestHello(t *testing.T) {
-   got := Hello()
-   want := "Hello, World"
+   got := Hello("Kresna")
+   want := "Hello, Kresna"

    if got != want {
        t.Errorf("got %q want %q", got, want)
    }
}
```

Now, run `go test` and the compiler will be complain.

```bash
$ go test
./hello_test.go: too many arguments in call to Hello
    have(string)
    want()
```

Go is a compiled programming language and statically typed language. It's important to Go to listen the compiler. The compiler understands how your code should snap together and work so you don't have to. In those error message above, the compiler is telling you to change the `Hello` function to accept the argument.

Edit `hello.go` file and add argument called `name` into the `Hello` function.

```diff
// hello.go

package main

import "fmt"

- func Hello() string {
+ func Hello(name string) string {
   return "Hello, World"    
}

func main() {
-   fmt.Println(Hello())
+   fmt.Println(Hello("Kresna"))
}
```

Now, run the test and the error message change like this.

```bash
$ go test
hello_test.go: got 'Hello, World' want 'Hello, Kresna'
```

The compiler tell use that the output doesn't match. It happens because we don't pass `name` argument to the return `Hello` function. Let's change it!

```diff
// hello.go

func Hello(name string) string {
-   return "Hello, World"
+   return "Hello, " + name
}
```

Run `go test` again and everything works.

### Second Feature

Let's add the second feature: Greeting with different language.

We will use subtests with method `t.Run()` inside `TestHello()` function. There are 4 subtests:

- Say Hello with your name
- Say Hello with your name in Bahasa Indonesia
- Say Hello with your name in Japanese
- Say Hello with your name in Korean

Let's update the `hello_test.go` file.

```diff
// hello_test.go

func TestHello(t *testing.T) {
-   got := Hello("Kresna")
-   want := "Hello, Kresna"

-    if got != want {
-        t.Errorf("got %q want %q", got, want)
-    }

+   t.Run("Say Hello with your name", function (t *testing.T) {
+       got := Hello("Kresna", "")
+       want := "Hello, Kresna"
+       if got != want {
+           t.Errorf("got %q want %q", got, want)
+       }
+   })

+   t.Run("Say Hello with your name in Bahasa Indonesia", function (t *testing.T) {
+       got := Hello("Kresna", "Indonesia")
+       want := "Halo, Kresna"
+       if got != want {
+           t.Errorf("got %q want %q", got, want)
+       }
+   })

+   t.Run("Say Hello with your name in Japanese", function (t *testing.T) {
+       got := Hello("Kresna", "Japanese")
+       want := "Konnichiwa, Kresna"
+       if got != want {
+           t.Errorf("got %q want %q", got, want)
+       }
+   })

+   t.Run("Say Hello with your name in Korean", function (t *testing.T) {
+       got := Hello("Kresna", "Korean")
+       want := "Annyeonghaseo, Kresna"
+       if got != want {
+           t.Errorf("got %q want %q", got, want)
+       }
+   })
}
```

Now, run `go test` command. It will give error messages below.

```bash
$ go test
# tdd-go/01-hello-world [tdd-go/01-hello-world.test]
./hello_test.go:7:26: too many arguments in call to Hello
	have (string, string)
	want (string)
./hello_test.go:16:26: too many arguments in call to Hello
	have (string, string)
	want (string)
./hello_test.go:25:26: too many arguments in call to Hello
	have (string, string)
	want (string)
./hello_test.go:34:26: too many arguments in call to Hello
	have (string, string)
	want (string)
FAIL	tdd-go/01-hello-world [build failed]
```

We get 4 error messages because we run 4 sub-tests. The compiler tell us to add another argument inside `Hello` function in `hello.go`. We will give the name of that another argument with the name: `language`. Let's update the `hello.go` file.

```diff
// hello.go

- func Hello(name string) string {
+ func Hello(name string, language string) string {
-   return "Hello, " + name
+   var greeting = "Hello"
+   if language == "Indonesia" {
+       greeting = "Halo"
+   } else if language == "Japanese" {
+       greeting = "Konnichiwa"
+   } else if language == "Korean" {
+       greeting = "Annyeonghaseo"
+   }
+   return greeting + ", " + name
}

func main() {
-   fmt.Println(Hello("Kresna"))
+   fmt.Println(Hello("Kresna", ""))
}
```

Now, run the test and everything works.

```bash
$ go test
PASS
ok  	tdd-go/01-hello-world	0.308s
```

### Refactoring

In programming, refactoring is a process of restructure code program without changing the behavior of program. The main purpose is to make code more organize and readable. In the `Hello` function, we see that this function do two things:

1. Get the greeting based on language.
2. Return the greeting with name.

I would like to separate greeting based on language into a function named `greetingPrefix`.

```diff
// hello.go

+ func greetingPrefix(language string) string {
+   var greeting = "Hello"
+   if language == "Indonesia" {
+       greeting = "Halo"
+   } else if language == "Japanese" {
+       greeting = "Konnichiwa"
+   } else if language == "Korean" {
+       greeting = "Annyeonghaseo"
+   }
+ }

func Hello(name string, language string) string {
-   var greeting = "Hello"
-   if language == "Indonesia" {
-       greeting = "Halo"
-   } else if language == "Japanese" {
-       greeting = "Konnichiwa"
-   } else if language == "Korean" {
-       greeting = "Annyeonghaseo"
-   }
+   greeting := greetingPrefix(language)
    return greeting + ", " + name
}
```

Then, run `go test` again to make sure everything works.

Imagine if the language grows up then it will be more `if else` statement to create. We can refactor it to the `switch-case` statement.

```diff
func greetingPrefix(language string) string {
-   var greeting = "Hello"
-   if language == "Indonesia" {
-       greeting = "Halo"
-   } else if language == "Japanese" {
-       greeting = "Konnichiwa"
-   } else if language == "Korean" {
-       greeting = "Annyeonghaseo"
-   }

+   switch language {
+   case "Indonesia":
+       return "Halo"
+   case "Japanese":
+       return "Konnichiwa"
+   case "Korean":
+       return "Annyeonghaseo"
+   default:
+       return "Hello"
+   }
}
```

As always, run `go test` to make sure our test pass.

### Default Value

I would like to make `Hello` function to print out `Hello, World` if there are no value pass to `name` and `language` parameters. Let's test it out.

```diff
// hello_test.go

func TestHello(t *testing.T) {
+   t.Run("Say 'Hello, World' if there are no value pass to `name` and `language`", func (t *testing.T) {
+       got := Hello("", "")
+       want := 'Hello, World'
+
+       if got != want {
+          t.Errorf("got %q want %q", got, want)
+       }
+   })

// The rest of subtests below.
}
```

Run `go test` and you will get error message below.

```
--- FAIL: TestHello (0.00s)
    --- FAIL: TestHello/Say_'Hello,_World'_if_there_are_no_value_pass_to_`name`_and_`language` (0.00s)
        hello_test.go:11: got "Hello, " want "Hello, World"
```

The error message tell us that we get `Hello, ` instead of `Hello, World`. If we check the `Hello` function in `hello.go`, we see that we don't give a `World` as a default value if there is no value in pass into `name` parameter. Let's add this!

```diff
// hello.go

func Hello(name string, language string) string {
	greeting := greetingPrefix(language)

+   if name == "" {
+       name = "World"
+   }

	return greeting + ", " + name
}
```

Run `go test` to see if everything works.

I'm bit uncomfortable with the `Hello("", "")` in `hello_test.go` because it's not elegant. As a designer of the code program, I would like to use `Hello()` instead of `Hello("", "")`.

```diff
// hello_test.go

func TestHello(t *testing.T) {
   t.Run("Say 'Hello, World' if there are no value pass to `name` and `language`", func (t *testing.T) {
-       got := Hello("", "")
+       got := Hello()
        want := 'Hello, World'

        if got != want {
            t.Errorf("got %q want %q", got, want)
        }
    })

// The rest of subtests below.
}
```

Run `go test` and I will get error message below.

```
./hello_test.go:7:10: not enough arguments in call to Hello
	have ()
	want (string, string)
```

It says that I don't pass anything to the actual `Hello` function in `hello.go` file. How about I set default value in `name` and `language` parameter inside `Hello` function in `hello.go`? Does it work?

```diff
// hello.go

- func Hello(name string, language string) string {
+ func Hello(name string = "World", language string = "") string {
// The rest inside the code still same
}
```

Unfortunately, it doesn't work after I run `go test`.

```
./hello.go:31:24: syntax error: unexpected = in parameter list; possibly missing comma or )
FAIL	tdd-go/01-hello-world [build failed]
```

The error says that Go doesn't accept default value in that way. In another programming languages like PHP, JavaScript, or Python accept that way. Then, why Go take that approach? How to solve it?

> One feature missing from Go is that it does not support default function arguments. This was a deliberate simplification. Experience tells us that defaulted arguments make it too easy to patch over API design flaws by adding more arguments, resulting in too many arguments with interactions that are difficult to disentangle or even understand. The lack of default arguments requires more functions or methods to be defined, as one function cannot hold the entire interface, but that leads to a clearer API that is easier to understand. Those functions all need separate names, too, which makes it clear which combinations exist, as well as encouraging more thought about naming, a critical aspect of clarity and readability.

> One mitigating factor for the lack of default arguments is that Go has easy-to-use, type-safe support for variadic functions.

[Go at Google: Language Design in the Service of Software Engineering](https://go.dev/talks/2012/splash.article#TOC_10.)

### Variadic Function

I would like to borrow definition of [variadic function from Gopher Guides in Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-use-variadic-functions-in-go).

> Variadic function is a function that accept zero, one, or more values as a single argument.

In Go, a variadic function is declared with elipsis `(...)` symbol. Let's implement it in `hello.go`.

```diff
// hello.go

- func Hello(name string, language string) string {
+ func Hello(args ...string) string {

+	name := "World"
+	if len(args) > 0 {
+		name = args[0]
+	}

+	language := ""
+	if len(args) > 1 {
+		language = args[1]
+	}

-   if name == "" {
-       name = "World"
-   }

// The rest of code is same
}
```

Let's describe the code above:

1. `Hello(args ...string)` is the variadic function, not `args` itself.
2. `args` is a parameter of the function `Hello`. Specifically:
    - `args` is the variadic parameter of the function.
    - Inside the function, `args` treated as a slice of strings.
3. The `...string` syntax in the function declaration is what makes `Hello` be a variadic function. It allows the function to accept any number of string arguments.
4. The `args` doesn't act as a variadic function. Rather, it's the receiver of the variadic arguments passed to the function.

In short:

> The `Hello` function is a variadic function because it uses `...string` syntax in its parameter list. The `args` parameter inside the function receives all the variadic arguments as a slice (dynamic array without explicit tell the size of array) of strings.

Let's run `go test` and everything works properly.

### Wrapping Up

Congrats! You finished the chapter `Hello, World` with TDD approach. You learn many things:

- Install Go.
- Setup VS Code.
- Structure the code for `Hello, World` program.
- Create the first test.
- Use Go modules.
- Add more features with subtests.
- Refactoring.
- Use variadic functions to set default value.