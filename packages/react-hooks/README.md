
# @w2solutions/react-hooks


 This package includes a set of usefull React hooks.

####  Table of contents

-  [Install](#install)

-  [Hooks](#hooks)

	-  [useAsync](#useasync)

	-  [useDebounceEffect](#usedebounceeffect)

	-  	[useFileSelect](#usefileselect)

	-  [useFormFields](#useformfields)

	-  [usePrevious](#useprevious)

	-  [useScrollPosition](#usescrollposition)

  

## Install
### npm
```npm i @w2solutions/react-hooks```
### Yarn
```yarn add @w2solutions/react-hooks```
## Hooks

### useAsync

### useDebounceEffect

### useFileSelect

### useFormFields

### usePrevious
usePrevious returns a previous value of .current property of a ref object.

```javascript
import { usePrevious } from "@w2solutions/react-hooks"

const CurrentAndPreviousValues = () => {
	const [counter, setCounter] = useState(0)
	const previousCounter = usePrevious(counter)
	
	return (
		<>
			<button onClick{()=>setCounter(counter+1)}>Counter +1</button>
			<div>{counter}</div>
			<div>{prevCounter}</div>
		</>
	)
}
```
>In the example above the variable counter is initialized with the value 0. Variable previousCounter has at the time of initialization value null. After each click event the counter is increased by one, and the prevCounter gets the value of the counter`s previous state.
### useScrollPosition