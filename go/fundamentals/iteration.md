---
title: Iteration
outline: deep
---

# Iteration

In this section we will implement iteration in Go. To do stuff repeatly in Go, you only have `for` keyword. 
There are no `while`, `do`, `until` keywords in order to make iteration in Go.

Let's write a test for a function that repeats a character 5 times.

There's nothing new so far, so try and write it yourself for practice.

Here's the folder structure.

```
- tdd-go
  - ...
  - 03-iteration
    - iteration_test.go
  - go.mod
```

## Write the test

```go
// iteration_test.go

package iteration

import "testing"

func TestRepeat(t *testing.T) {
    repeated := Repeat("a")
    expected := "aaaaa"

    if repeated != expected {
        t.Errorf("expected %q but got %q", expected, repeated)
    }
}
```

## Try and run the test

If we run `go test` inside `03-iteration` directory, Go compiler complain to us because we don't have `Repeat` function.

```bash
go test
# tdd-go/03-iteration [tdd-go/03-iteration.test]
./iteration_test.go:6:14: undefined: Repeat
```

## Write enough code

Let's write enough code to satisfy Go compiler by create file named `iteration.go`. We will do step by step.

```go
// iteration.go

package iteration

func Repeat(character string) string {
	return ""
}
```

Run test again with command `go test` and now Go compiler complain to us because it doesn't get what it wants.

```bash
go test
--- FAIL: TestRepeat (0.00s)
    iteration_test.go:10: expected "aaaaa" but got ""
FAIL
```

Let's satisfy the Go compiler by change the return value in `Repeat` function.

```diff
// iteration.go

...

func Repeat(character string) string {
-   return ""
+   return "aaaaa"
}
```

If we run again, the compiler satisfy with our effort but we see that the return value is static value. What we want is it returns a value based on input value in the arguments. Let's change the return value in `Repeat` function by using `for` keyword.

```diff
// iteration.go

...

func Repeat(character string) string {
-   return "aaaaa"
+   var repeated string
+   for i := 0; i < 5; i++ {
+      repeated = repeated + character
+   }
+   return repeated
}
```

If we run `go test`, everything pass and Go compiler still satisfy with our effort.

```bash
go test
PASS
```

## Refactor

Now it's time to refactor and introduce the compound assignment operator `+=`. This adds the right operand to the left operand and assigns the result to the left operand. It works with other types like integers.

In programming, the statement `x = x + y` can be shortened to `x += y`. Let's refactor it into `Repeat` function.

```diff
// iteration.go

...

func Repeat(character string) string {
    var repeated string
    for i := 0; i < 5; i++ {
-       repeated = repeated + character
+       repeated += character
    }
    return repeated
}
```

If we run `go test` again, Go compiler give us PASS to our test.

### Benchmarking

Writing [benchmarks](https://pkg.go.dev/testing#hdr-Benchmarks) in Go is another first-class feature of the language and it's very similar to writing tests.

```go
// iteration_test.go

...

func BenchmarkRepeat(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Repeat("a")
    }
}
```

As you see, the code above is very similar as we write a test.

The `testing.B` gives you access to the cryptically named `b.N`.

When the benchmark code is executed, it runs `b.N` times and measures how long it takes.

The amount of times the code run shouldn't matter to you, the framework will determine what is a "good" value
for that to let you have some decent results.

To run the benchmarks run command `go test -bench=.` (If you're in Windows Powershell run command `go test -bench="."`).

```bash
go test -bench=.
goos: linux
goarch: amd64
pkg: tdd-go/03-iteration
cpu: Intel(R) Core(TM) i5-6500 CPU @ 3.20GHz
BenchmarkRepeat-4        8879187               129.7 ns/op
PASS
ok      tdd-go/03-iteration     1.296s
```

This benchmark give the result `129.7 ns/op`. It means our function takes on average 136 nanoseconds to run (on my local machine). Which is pretty ok! To test this it runs 8.879.187 times.

> By default, Benchmarks are run sequentially.

## Practice excercises

- Change the test so a caller can specify how many times the character is repeated and then fix the code.
- Write `ExampleRepeat` to document your function
- Have a look through the [strings](https://golang.org/pkg/strings) package. Find functions you think could be useful and experiment with them by writing tests like we have here. Investing time learning the standard library will really pay off over time.