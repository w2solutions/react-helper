
# @w2solutions/react-hooks


 This package includes a set of usefull React hooks.

###  Table of contents

-  [Install](#install)

-  [Hooks](#hooks)

	-  [useAsync](#useasynca-rcallback)

	-  [useDebounceEffect](#usedebounceeffectcallback-delay-dependencyarray)

	-  	[useFileSelect](#usefileselectoptions)

	-  [useFormFields](#useformfieldsinitialvalues-options)

	-  [usePrevious](#useprevioussometypevalue)

	-  [useScrollPosition](#usescrollpositionoptions)  

# Install
### npm
```npm i @w2solutions/react-hooks```
### Yarn
```yarn add @w2solutions/react-hooks```
# Hooks

## `useAsync<A, R>(callback)`
`useAsync` hook lets you call asynchronous functions nice and easy. 
#### Input
```javascript
callback: (...args: A) => Promise<R>
```
#### Output
```javascript
[
	(...args: A) => void,
	{
		data: R | null,
		error: Error | null,
		loading: boolean,
		calledOnce: boolean
	}
]
```
#### Example
```javascript
import { useAsync } from "@w2solutions/react-hooks"

const AsyncInvocation = () => {
	const [counter, setCounter] = useState(0)

	const asyncFunction = (...args: any[]): Promise<any> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(args)
			}, 1000)
		})
	}

	const callbackFn = useCallback(() => {
		return asyncFunction(counter)
	}, [counter])

	const [callAsyncFunction, stateData] = useAsync(callbackFn)

	return (
		<>
			<button onClick={() => setCounter(counter+1)}>
				Counter +1
			</button>
			<button disabled={stateData.calledOnce} onClick={() => callAsyncFunction()}>
				Call asynchronous function
			</button>
			<div style={stateData.loading ? {display: "block"} : {display: "none"}}>
				Loading...
			</div>
			<div>Data: {stateData.data}</div>
			<div>Error: {stateData.error}</div>
		</>
	)
}
```

> `asyncFunction` resolves after 1 second. The `asyncFunction` is called within `useCallback` hook, which is passed to the `useAsync` hook. The `calledOnce` flag disables the button, so that the asynchronous function can only be invoked once by this button. `Loading` flag makes a loading div visible.


## `useDebounceEffect(callback, delay, dependencyArray)`
`useDebounceEffect` invokes a callback function after a given delay if any item in the dependency array has been changed.
#### Input
```javascript
callback: EffectCallback
delay: number
dependencyArray?: DependencyList
```
#### Example
```javascript
import { useDebounceEffect } from "@w2solutions/react-hooks"

const DebounceEffect = () => {
	const [counter, setCounter] = useState(1)
	const [anotherCounter, setAnotherCounter] = useState(1)

	const square = useCallback(()=>{
		setAnotherCounter(counter**2)
	},[counter])

	useDebounceEffect(square, 300, [counter])

	return (
		<>
			<button onClick={() => setCounter(counter + 1)}>
				Counter +1
			</button>
			<div>{counter}</div>
			<div>{anotherCounter}</div>
		</>
	)
}
```
>300 ms after the button is clicked, the callback function `square` is invoked, which squares the value of counter and assigns the result to the state of `anotherCounter`.
## `useFileSelect(options)`
`useFileSelect` selects the file(s) and returns a promise, which resolves with a `FileList`.
#### Input
```javascript
options: {
	multiple: boolean,
	accept: string
}
```
#### Output
```javascript
() => Promise<FileList>
```
#### Example
```javascript
import { useFileSelect } from "@w2solutions/react-hooks"

const FileSelector = () => {
	const  selectFiles = useFileSelect(
		{multiple: false, accept: ".txt"}
	)

	const [fileName, setFileName] = useState<string | null>(null)

	const callSelectFiles = useCallback(async () => {
		const files = await selectFiles()
		setFileName(files[0].name)
	}, [selectFiles, setFileName])
	
	return (
		<>
			<button onClick={()=>callSelectFiles()}>
				Select files
			</button>
			<div>Selected file: {fileName}</div>
		</>
	)
}
```
> `useFileSelect` creates an asynchronous function `selectFiles`, which accepts 1 .txt file and resolves with `FileList`, which is stored in `files`. See for more info on [FileList](https://developer.mozilla.org/en-US/docs/Web/API/FileList).
## `useFormFields(initialValues, options)`
`useFormFields` builds binding objects for input fields initialized with `initialValues`. Additionally the hook returns the current values of input fields, the boolean, which tells you if the form has been changed compared to the initial state, a reset function and a `setValue` function. `ResetOnInitialValueChange` boolean decides if the form should be reseted to new inital values (if they have been changed) and hence set the `isDirty` flag to false.
#### Input
```javascript
initialValues = {
	[key: string]: any
}
options = {
	resetOnInitialValueChange?: boolean
}
```
#### Output
```javascript
{
	bindings: {
		[key in keyof initialValues]: {
			{
				name: string,
				value: initialValues[key],
				onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
			}
		}
	},
	values: {
		[key in keyof initialValues]: initialValue[key]
	},
	isDirty: boolean,
	reset: () => void,
	setValue: (key, value) => void
}
```
#### Example
```javascript
import { useFormFields } from "@w2solutions/react-hooks"

const Form = () => {
	const [color, setColor] = useState("red")
	const { bindings, values, isDirty, reset, setValue } = useFormFields(
		{color: color, shape: ''},
		{resetOnInitialValueChange: true}
	)

	const submit = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault()
			setValue("shape",values.shape.toUpperCase())
			setColor("very " + values.color.toUpperCase())
			setTimeout(()=>{
				if (isDirty) {
					reset()
				}
			},2000)
		}, [values, setValue, reset, isDirty]
	)

	return (
		<form onSubmit={(e) => submit(e)}>
			<input {...bindings.color} type="text"  />
			<input {...bindings.shape} type="text"/>
			<button type="submit">Submit</button>
		</form>
	)
}
```
>We use `useFormFields` hook to build binding objects for two text input fields: `color` and `shape`. These binding objects contain following properties: `value`, `name` and `onChange` callback if the field is a string input field. The binding objects are placed to the input fields. On the submit event we make the use of the rest of return parameters. We set the color state to upper case and add a string to it. At the same time the initial value of the form field `color` changes and depending on `resetOnInitialValueChange` the values will be reseted or not. `Shape` value will be changed to upper case, but note that its initial value stays still empty and finally we set both fields to initial values after the timeout.
>
>Take your time to play with the parameters so that they work the way you want!
## `usePrevious<SomeType>(value)`
`usePrevious` returns a previous value of `.current` property of a ref object.
#### Input
```javascript
value: SomeType
```
#### Output
```javascript
SomeType
```
#### Example
```javascript
import { usePrevious } from "@w2solutions/react-hooks"

const CurrentAndPreviousValues = () => {
	const [counter, setCounter] = useState(0)
	const previousCounter = usePrevious(counter)
	
	return (
		<>
			<button onClick{()=>setCounter(counter+1)}>
				Counter +1
			</button>
			<div>{counter}</div>
			<div>{prevCounter}</div>
		</>
	)
}
```
>In the example above the variable `counter` is initialized with the value 0. Variable `previousCounter` has at the time of initialization value null. After each click event the `counter` is increased by one, and the `prevCounter` gets the value of the counter`s previous state.
## `useScrollPosition(options)`
`useScrollPosition` returns current `pageXOffset` and `pageYOffset`, updated `throttle` milliseconds after the scroll event has occured. If within the update time another scroll event happens, the position is going to be updated only after the timer of the latest event runs out.
#### Input
```javascript
options = {
	throttle?: number
}
```
#### Output
```javascript
position = {
	x: number,
	y: number
}
```
#### Example
```javascript
import { useScrollPosition } from "@w2solutions/react-hooks"

const ScrollPosition = () => {
	const  currentPosition = useScrollPosition({throttle: 50})

	return (
		<div style={{height: "20000px"}}>
			<div 
				style={{
					position: "absolute",
					left: currentPosition.x, 
					top: currentPosition:y
				}}
			>
				(x: {currentPosition.x}, y: {currentPosition.y})
			</div>
		</div>
	)
}
```

>We place a big div container into the page, so that we can scroll a bit. `useScrollPosition` hook updates the `currentPosition` variable 50 ms after the scroll event stops.
