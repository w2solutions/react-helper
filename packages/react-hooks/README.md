
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

	const [fetchProfile, data] = useAsync(API.fetchProfile)

	return (
		<>
			<button disabled={data.calledOnce} onClick={fetchProfile}>
				Fetch profile asynchronously
			</button>
			{data.loading && <div>Loading...</div>}
			<div>Profile data: {data.data}</div>
			{data.error && <div>Error: {data.error}</div>}
		</>
	)
}
```

>Note: `API.fetchProfile` should be a callback function, otherwise `Maximum update depth exceeded` error is raised.


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
	const [debouncedCounter, setDebouncedCounter] = useState(1)

	const square = () => {
		setDebouncedCounter(counter**2)
	}

	useDebounceEffect(square, 300, [counter])

	return (
		<>
			<button onClick={() => setCounter(counter + 1)}>
				Counter +1
			</button>
			<div>{counter}</div>
			<div>{debouncedCounter}</div>
		</>
	)
}
```
>300 ms after the button is clicked, the function `square` is invoked.
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

	const handleClick = async () => {
		const files = await selectFiles()
		setFileName(files[0].name)
	}
	
	return (
		<>
			<button onClick={handleClick}>
				Select files
			</button>
			<div>Selected file: {fileName}</div>
		</>
	)
}
```
> `useFileSelect` creates an asynchronous function `selectFiles`, which accepts 1 .txt file in this case and resolves with `FileList`. See for more info on [FileList](https://developer.mozilla.org/en-US/docs/Web/API/FileList).
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
	const { bindings, reset, setValue } = useFormFields(
		{color: '', shape: ''}
	)

	return (
		<form>
			<input {...bindings.color} type="text"  />
			<input {...bindings.shape} type="text"/>
		    <button onClick={() => setValue('color', 'red')}>
			    Set color
		    </button>
		    <button onClick={reset}>Reset</button>
		</form>
	)
}
```
>Take your time to play with the parameters so that they work the way you want!
## `usePrevious<SomeType>(value)`
`usePrevious` returns a previous value of `.current` property of a ref object.
#### Input
```javascript
value: T
```
#### Output
```javascript
T
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