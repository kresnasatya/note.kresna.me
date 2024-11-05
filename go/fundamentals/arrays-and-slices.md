---
title: Arrays and Slices
outline: deep
---

Arrays allow you to store multiple elements of the same type in a variable in a particular order.

When ever you have an array, it's very common to have to iterate over them. So let's use our new-found knowledge `for` to make a `Sum` function. `Sum` will take an array of numbers and return the total.

Let's use our TDD skills.

## Write the test

Create a new folder named `03-array-slices`. Then, create a file named `sum_test.go` inside the folder.

```go
// sum_test.go

package arrayslices

import "testing"

func TestSum(t *testing.T) {
    numbers := [5]int{1, 2, 3, 4, 5}

    got := Sum(numbers)
    want := 15

    if got != want {
        t.Errorf("got %d want %d given, %v", got, want, numbers)
    }
}
```

In Go, Arrays have a fixed capacity which you define when you declare the variable. We can initialize an array into two ways:

- [N]type{value1, value2, ..., valueN} e.g. `numbers := [5]int{1, 2, 3, 4, 5}`
- [...]type{value, value2, ..., valueN} e.g. `numbers := [...]int{1, 2, 3, 4, 5}`

It is sometimes useful to print the inputs to the function in the error message. Here, we are using the `%v` placeholder to print the "default" format, which works well for arrays.

[Read more about the format strings](https://golang.org/pkg/fmt/).

## Run the test

If you run `go test` compiler, it will fail with the familiar `undefined: Sum` error. Now, we can proceed with writing the actual method to be tested.

## Write minimal code

Create file named `sum.go` inside the `03-array-slices` folder. Then, type this code program below.

```go
// sum.go
package arrayslices

func Sum(numbers [5]int) int {
    return 0
}
```

Run `go test` again and you should see a clear error message.

`got 0 want 15 given, [1 2 3 4 5]`

## Write enough code

To make the test pass, we need to update the code program in `sum.go` file.

```diff
func Sum(numbers [5]int) int {
    return 0 // [!code --]
    sum := 0 // [!code ++]
    for i := 0; i < 5; i++ { // [!code ++]
        sum += numbers[i] // [!code ++]
    } // [!code ++]
    return sum // [!code ++]
}
```

Use `array[index]` syntax to get the value out of an array at a particular index. In this case, we are using `for` to iterate 5 times to work through the array and add each item onto `sum`.

## Refactor

Let's use `range` to help clean up our code program in `sum.go` file.

```diff
func Sum(numbers [5]int) int {
    sum := 0
    for i := 0; i < 5; i++ { // [!code --]
        sum += numbers[i] // [!code --]
    for _, number := range numbers { // [!code ++]
        sum += number // [!code ++]
    }
    return sum
}
```

The `range` lets you iterate over an array. On each iteration, `range` returns two values - the index and the value. We are choosing ingore the index value by using `_` [blank identifier](https://golang.org/doc/effective_go.html#blank).

### Arrays and their type

An interesting property of arrays is that the size is encoded in it's type. If you try to pass an `[4]int` into a function that expects `[5]int`, it won't compile. They are different types so it's just the same as trying to pass a `string` into a function that wants an `int`.

You maybe thinking it's quite cumbersome that arrays have a fixed length, and most of the time you probably won't be using them!

Go has *slices* which do not encode the size of the collection and instead can have any size.

The next requirement will be to sum collections of varying sizes.

## Write the test

We will now use the [slice type](https://golang.org/doc/effective_go.html#slices) which allows us to have collections of any size. The syntax is very similar with arrays, you just ommit the size when declaring them.

Example: `num_slice := []int{1, 2, 3}` rather than `num_array := [3]int{1, 2, 3}`.

```go
func TestSum(t *testing.T) {

	t.Run("collection of 5 numbers", func(t *testing.T) {
		numbers := [5]int{1, 2, 3, 4, 5}

		got := Sum(numbers)
		want := 15

		if got != want {
			t.Errorf("got %d want %d given, %v", got, want, numbers)
		}
	})

	t.Run("collection of any size", func(t *testing.T) {
		numbers := []int{1, 2, 3}

		got := Sum(numbers)
		want := 6

		if got != want {
			t.Errorf("got %d want %d given, %v", got, want, numbers)
		}
	})

}
```

## Run the test

It doesn't compile and you will get an error message.

`cannot use numbers (type []int) as type [5]int in argument to Sum`.

## Write minimal code

There are two solutions to solve the problem:

- Break the existing API by changing the argument to `Sum` to be a slice rather than an array. When we do this, we will potentially ruin someone's day because our *other* test will no longer compile!
- Create a new function.

In our case, no one else is using our function, so rather than having two functions to maintain, let's have just one.

```diff
// sum.go

func Sum(numbers [5]int) int { // [!code --]
func Sum(numbers []int) int { // [!code ++]
    sum := 0
    for _, number := range numbers {
        sum += number
    }

    return sum
}
```

If you try to run the tests they will still not compile, you will have to change the first test to pass in a slice rather than an array.

## Refactor

We already refactored `Sum` - all we did was replace arrays with slices, so no extra changes are required. Remember that we must not neglect our test code in the refactoring stage - we can further improve our `Sum` tests.

```diff
func TestSum(t *testing.T) {

	t.Run("collection of 5 numbers", func(t *testing.T) {
        numbers := [5]int{1, 2, 3, 4, 5} // [!code --]
		numbers := []int{1, 2, 3, 4, 5} // [!code ++]

		got := Sum(numbers)
		want := 15

		if got != want {
			t.Errorf("got %d want %d given, %v", got, want, numbers)
		}
	})

	t.Run("collection of any size", func(t *testing.T) {
		numbers := []int{1, 2, 3}

		got := Sum(numbers)
		want := 6

		if got != want {
			t.Errorf("got %d want %d given, %v", got, want, numbers)
		}
	})

}
```

It's important to question the value of your tests. It should not to be a goal to have as many tests as possible, but rather to have as much *confidence* as possible in your code base. Having too many tests can turn into a real problem and it just adds more overhead in maintenance.

> **Every test has a cost**.

In our case, you can see that having two tests for this function is redundant. If it works for a slice of one size it's very likely it'll work for a slice of any size (within reason).

Go's built-in testing toolkit features a [coverage tool](https://blog.golang.org/cover). Whilst striving for 100% coverage should not be your end goal, the coverage tool can help identify areas of your code not covered by tests. If you have been strict with TDD, it's quite likely you'll have close to 100% coverage anyway.

Try running `go test -cover`.

You should see:

```sh
PASS
coverage: 100.0% of statements
```

Now delete one of the tests and check the coverage again.

Now that we are happy we have a well-tested function you should commit your great work before taking on the next challenge.

We need a new function called `SumAll` which will take a varying number of slices, returning a new slice containing the totals for each slice passed in.

For example

`SumAll([]int{1,2}, []int{0,9})` would return `[]int{3,9}`

or

`SumAll([]int{1,1,1})` would return `[]int{3}`.

## Write the test

```go
// sum_test.go
func TestSumAll(t *testing.T) {

	got := SumAll([]int{1, 2}, []int{0, 9})
	want := []int{3, 9}

	if got != want {
		t.Errorf("got %v want %v", got, want)
	}
}
```

## Run the test

`undefined: SumAll`

## Write minimal code

We need to define `SumAll` according to what our test wants.

Go can let you write *[variadic functions](https://gobyexample.com/variadic-functions)* that can take a variable number of arguments.

```go
// sum.go

func SumAll(numbersToSum ...[]int) []int {
    return nil
}
```

This is valid, but our tests still won't compile!

`invalid operation: got != want (slice can only be compared to nil)`.

Go does not let you use equality operators with slices. You *could* write a function to iterate over each `got` and `want` slice and check their values but for convinience sake, we can use `reflect.DeepEqual` which is useful for seeing if any two variables are the same.

```diff
import "testing" // [!code --]
import ( // [!code ++]
	"reflect" // [!code ++]
	"testing" // [!code ++]
) // [!code ++]

..

func TestSumAll(t *testing.T) {

	got := SumAll([]int{1, 2}, []int{0, 9})
	want := []int{3, 9}

    if got != want { // [!code --]
	if !reflect.DeepEqual(got, want) { // [!code ++]
		t.Errorf("got %v want %v", got, want)
	}
}
```

> Make sure you `import reflect` in the top of your file to have access to `DeepEqual`.

It's important to note that `reflect.DeepEqual` is not "type safe" - the code will compile even if you did something a bit silly. To see this in action, temporarily change the test to:

```diff
func TestSumAll(t *testing.T) {

	got := SumAll([]int{1, 2}, []int{0, 9})
    want := []int{3,9} // [!code --]
	want := "bob" // [!code ++]

	if !reflect.DeepEqual(got, want) {
		t.Errorf("got %v want %v", got, want)
	}
}
```

What we have done here is try to compare a `slice` with a `string`. This makes no sense, but the test compiles! So while using `reflect.DeepEqual` is a convinient way of comparing slices (and other things) you must be careful when using it.

> From Go 1.21, [slices](https://pkg.go.dev/slices#pkg-overview) standard package is available, which has [slices.Equal](https://pkg.go.dev/slices#Equal) function to do a simple shallow compare on slices, where you don't need to worry about the types like the above case. Note that this function expects the elements to be [comparable](https://pkg.go.dev/builtin#comparable). So, it can't be applied to slices with non-comparable elements like 2D slices.

Change the test back again and run it. You should have test output like the following:

`sum_test.go:30: got [] want [3 9]`.

## Write enough code

What we need to do is iterate over the varargs, calculate the sum using our existing `Sum` function, then add it to the slice we will return:

```go
func SumAll(numbersToSum ...[]int) []int {
	lengthOfNumbers := len(numbersToSum)
	sums := make([]int, lengthOfNumbers)

	for i, numbers := range numbersToSum {
		sums[i] = Sum(numbers)
	}

	return sums
}
```

Lots of new things to learn!

There's a new way to create a slice. `make` allows you to create a slice with a starting capacity of the `len` of the `numbersToSum` we need to work through. The length of a slice is the number of elements it holds `len(mySlice)`, while the capacity is the number of elements it can hold in the underlying array `cap(mySlice)`, e.g., `make([]int, 0, 5)` creates a slice with length 0 and capacity 5.

You can index slices like arrays with `mySlice[N]` to get the value out or assign it a new value with `=`.

The tests should now pass.

## Refactor

As mentioned, slices have a capacity. If you have a slice with a capacity of 2 and try to do `num_slice[10] = 1` you will get a *runtime error*.

However, you can use the `append` function which takes a slice and a new value, then returns a new slice with all the items in it.

```diff
func SumAll(numbersToSum ...[]int) []int {
    lengthOfNumbers := len(numbersToSum) // [!code --]
	sums := make([]int, lengthOfNumbers) // [!code --]

	for i, numbers := range numbersToSum { // [!code --]
		sums[i] = Sum(numbers) // [!code --]
	} // [!code --]

	var sums []int // [!code ++]
	for _, numbers := range numbersToSum { // [!code ++]
		sums = append(sums, Sum(numbers)) // [!code ++]
	} // [!code ++]

	return sums
}
```

In this implementation, we are worrying less about capacity. We start with an empty slice `sums` and append to it the result of `Sum` as we work through the varargs.

Our next requirement is to change `SumAll` to `SumAllTails`, where it will calculate the totals of the "tails" of each slice. The tail of a collection is all items in the collection except the first one (the "head").

## Write the test

```go
// sum_test.go

func TestSumAllTails(t *testing.T) {
	got := SumAllTails([]int{1, 2}, []int{0, 9})
	want := []int{2, 9}

	if !reflect.DeepEqual(got, want) {
		t.Errorf("got %v want %v", got, want)
	}
}
```

## Run the test

`undefined: SumAllTails`

## Write minimal code

Rename function from `SumAll` to `SumAllTrails`.

```diff
func SumAll(numbersToSum ...[]int) []int { // [!code --]
func SumAllTrails(numbersToSum ...[]int) []int { // [!code ++]
	var sums []int
	for _, numbers := range numbersToSum {
		sums = append(sums, Sum(numbers))
	}

	return sums
}
```

Then, re-run the test.

`got [3 9] want [2 9]`.

## Write enough code

```diff
func SumAllTrails(numbersToSum ...[]int) []int {
	var sums []int
	for _, numbers := range numbersToSum {
        tail := numbers[1:] // [!code ++]
		sums = append(sums, Sum(numbers))
	}

	return sums
}
```

Slices can be sliced! The syntax is `slice[low:high]`. If you omit the value on one of the sides of the `:` it captures everything to that side of it. In our case, we are saying "take from 1 to the end" with `numbers[1:]`. You may wish to spend some time writing other tests around slices and experiment with the slice operator to get more familiar with it.

## Refactor

> Not refactor this time.

> What do you think would happen if you passed in an empty slice into our function? What is the "tail" of an empty slice? What happens when you tell Go to capture all elements from myEmptySlice[1:]?

## Write the test

```diff
func TestSumAllTails(t *testing.T) {

	t.Run("make the sums of some slices", func(t *testing.T) { // [!code ++]
		got := SumAllTails([]int{1, 2}, []int{0, 9})
		want := []int{2, 9}

		if !reflect.DeepEqual(got, want) {
			t.Errorf("got %v want %v", got, want)
		}
	}) // [!code ++]

	t.Run("safely sum empty slices", func(t *testing.T) { // [!code ++]
		got := SumAllTails([]int{}, []int{3, 4, 5}) // [!code ++]
		want := []int{0, 9} // [!code ++]

		if !reflect.DeepEqual(got, want) { // [!code ++]
			t.Errorf("got %v want %v", got, want) // [!code ++]
		} // [!code ++]
	}) // [!code ++]
}
```

## Run the test

```sh
panic: runtime error: slice bounds out of range [recovered]
    panic: runtime error: slice bounds out of range
```

Oh no! It's important to note that while the test *has compiled*, it has *a runtime error.*

Compile time errors are our friend because they help us write software that works,
runtime errors are our enemies because they affect our users.

## Write enough code

```
func SumAllTails(numbersToSum ...[]int) []int {
	var sums []int
    for _, numbers := range numbersToSum { // [!code --]
		tail := numbers[1:] // [!code --]
		sums = append(sums, Sum(tail)) // [!code --]
	} // [!code --]

	for _, numbers := range numbersToSum { // [!code ++]
		if len(numbers) == 0 { // [!code ++]
			sums = append(sums, 0) // [!code ++]
		} else { // [!code ++]
			tail := numbers[1:] // [!code ++]
			sums = append(sums, Sum(tail)) // [!code ++]
		} // [!code ++]
	} // [!code ++]

	return sums
}
```

## Refactor

Our tests have some repeated code around the assertions again, so let's extract those into a function.

```diff
func TestSumAllTails(t *testing.T) {

	checkSums := func(t testing.TB, got, want []int) { // [!code ++]
		t.Helper() // [!code ++]
		if !reflect.DeepEqual(got, want) { // [!code ++]
			t.Errorf("got %v want %v", got, want) // [!code ++]
		} // [!code ++]
	} // [!code ++]

	t.Run("make the sums of tails of", func(t *testing.T) {
		got := SumAllTails([]int{1, 2}, []int{0, 9})
		want := []int{2, 9}

        if !reflect.DeepEqual(got, want) { // [!code --]
			t.Errorf("got %v want %v", got, want) // [!code --]
		} // [!code --]

		checkSums(t, got, want) // [!code ++]
	})

	t.Run("safely sum empty slices", func(t *testing.T) {
		got := SumAllTails([]int{}, []int{3, 4, 5})
		want := []int{0, 9}

        if !reflect.DeepEqual(got, want) { // [!code --]
			t.Errorf("got %v want %v", got, want) // [!code --]
		} // [!code --]

		checkSums(t, got, want) // [!code ++]
	})

}
```

We could've created a new function `checkSums` like we normally do, but in this case, we're showing a new technique, assigning a function to a variable. It might look strange but, it's no different to assigning a variable to a `string`, or an `int`, functions in effect are values too.

It's not shown here, but this technique can be useful when you want to bind a function to other local variables in "scope" (e.g between some `{}`). It also allows you to reduce the surface area of your API.

By defining this function inside the test, it cannot be used by other functions in this package. Hiding variables and functions that don't need to be exported is an important design consideration.

A handy side-effect of this is this adds a little type-safety to our code. If a developer mistakenly adds a new test with `checkSums(t, got, "chris")` the compiler will stop them in their tracks.

```sh
cannot use "chris" (type string) as type []int in argument to checkSums
```

## Wrapping up

We have covered

- Arrays.
- Slices
    - The various ways to make them.
    - How they have a fixed capacity but you can create new slices from old ones using append.
    - How to slice, slices!
    - The `len` to get the length of an array or slice.
    - Test coverage tool.
    - `reflect.DeepEqual` and why it's useful but can reduce the type-safety of your code.

We've used slices and arrays with integers but they work with any other type too, including arrays/slices themselves. So you can declare a variable of `[][]string` if you need to.

[Check out the Go blog post on slices](https://blog.golang.org/go-slices-usage-and-internals) for an in-depth look into slices. Try writing more tests to solidify what you learn from reading it.

Another handy way to experiment with Go other than writing tests is the Go playground. You can try most things out and you can easily share your code if you need to ask questions.