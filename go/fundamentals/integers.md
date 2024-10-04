---
title: Integers
outline: deep
---

# Integers

In this section, we will play with integers (numbers) with TDD approach. Here's the folder structure.

```
- tdd-go
  - 01-hello-world/
  - 02-integers
    - adder_test.go
  - go.mod
```

## Write the test

```go
// adder_test.go

package integers

import "testing"

func TestAdder(t *testing.T) {
	sum := Add(2, 2)
	expected := 4

	if sum != expected {
		t.Errorf("expected '%d' but got '%d'", expected, sum)
	}
}
```

We use `%d` as format string instead of `%q` in the previous chapter, Hello World. The reason is we want to print an integer than a string. Also, we are no longer use the `main` package, instead we defined a new package called `integers`. This package will group functions for working with integers such as `Add`.

## Try and run the test

Run `go test` inside `02-integers` directory to test the `Add` function. You will see that the `Add` function is undefined.

```bash
go test
# tdd-go/02-integers [tdd-go/02-integers.test]
./adder_test.go:6:9: undefined: Add
FAIL    tdd-go/02-integers [build failed]
```

## Write enough code

Let's write enough code to satisfy the Go compiler. Remember, we want to check that our tests fail for the correct reason.

```go
// adder.go

package integers

func Add(a, b int) int {
	return 0
}
```

Usually, when you have more than one argument of the same type we put the type in each argument. For example: `(a int, b int)`. This is valid in Go, but Go give us a shorten form: `(a, b int)`.

Run the test, and we will see that compiler complain.

```bash
go test
--- FAIL: TestAdder (0.00s)
    adder_test.go:10: expected '4' but got '0'
```

The compiler complain that we return `0` value instead of `4`. We can change the return value inside the `Add` function.

```diff
// adder.go

func Add(a, b int) int {
- return 0
+ return 4
}
```

If we run again, the compiler satisfy with our effort but we see that the return value is static value. What we want is it returns a value based on input value in the arguments. Let's change the return value in `Add` function.

```diff
// adder.go

func Add(a, b int) int {
- return 4
+ return a + b
}
```

Now, we re-run the test, the compiler satisfy, and we are more confident with our `Add` function.

## Refactor

We can add documentation to a function with comments in order to make our self in the future understand what's going on in a function.

```diff
// adder.go

+ // Add takes two integers and returns sum of them.
func Add(a, b int) int {
  return a + b
}
```

## Testable Examples

If you really want to go the extra mile, you can make [Testable Examples](https://go.dev/blog/examples). You will find many examples in the standard library documentation.

Often the code examples that can be found outside the codebase, such as README file can be out of date and incorrect compared to the actual code because the don't get checked.

Testable Examples are compiled whenever tests are executed. Because such examples are validated by the Go compiler, you can be confident with your documentation's examples always reflect current code behaviour.

Testable functions begin with `Example` word (much like test functions begin with `Test` word) and located in `_test.go` files. Add the following `ExampleAdd` function to the `adder_test.go`.

```go
// adder_test.go

function ExampleAdd() {
  sum := Add(1, 5)
  fmt.Println(sum)
  // Output: 6
}
```

> If your editor doesn't automatically import package for you, the compilation step will fail because you will be missing `import "fmt"` in `adder_test.go`. That's why I recommend you to use VS Code in earlier chapter in order to solve this problem.

Adding this code will cause the example to appear in your `godoc` documentation, making your code even more accessible. If ever your code changes so that example is no longer valid, your build will fail.

Running the package's test suite, we can see the example `ExampleAdd` function is executed with no further arrangement from us:

```bash
go test -v
=== RUN   TestAdder
--- PASS: TestAdder (0.00s)
=== RUN   ExampleAdd
--- PASS: ExampleAdd (0.00s)
PASS
```

Notice the special format of the comment `// Output: 6`. While the example will always be compiled, adding this comment means the example will also be executed. Go ahead and temporarily remove the comment `// Output: 6`, then run `go test`, and you will see `ExampleAdd` no longer executed.

To view example documentation, let's take a quick look at godoc. Run `godoc -http=:6060` and open a web browser to `http://localhost:6060/pkg/`. Inside here you'll see a list of all of Go's Standard Library packages, plus Third Party packages you have installed, under which you should see your example documentation for `tdd-go`. Now look under Integers, then under func Add, then expand Example and you should see the example you added for `sum := Add(1, 5)`.

## Wrapping Up

Congrats! You finished the chapter `Integers` with TDD approach. You learn many things:

- More practice of the TDD workflow
- Integers, addition
- Writing better documentation so users of our code can understand its usage quickly
- Examples of how to use our code, which are checked as part of our tests
