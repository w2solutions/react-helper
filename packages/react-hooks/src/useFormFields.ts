import {
  useState,
  useCallback,
  useMemo,
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
} from 'react';
import { equals } from 'ramda';

type InitalValuesType = { [key: string]: any };
type SetValueFn<T> = <K extends keyof T>(key: K, value: T[K]) => void;
type StringInputFieldBindings<T, K extends keyof T> = {
  name: K;
  value: T[K];
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};
type InputFieldBindings<T, K extends keyof T> = { name: K; value: T[K] };
type Bindings<T> = {
  [Key in keyof T]: T[Key] extends string
    ? StringInputFieldBindings<T, Key>
    : InputFieldBindings<T, Key>;
};

interface UseFormFieldOptions {
  resetOnInitialValueChange?: boolean;
}

export const useFormFields = <T extends InitalValuesType, K extends keyof T>(
  initalValues: T,
  options: UseFormFieldOptions = {}
) => {
  const [state, setState] = useState(initalValues);
  const isDirty = useMemo(() => !equals(state, initalValues), [
    state,
    initalValues,
  ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reset = useCallback(() => setState(initalValues), [
    JSON.stringify(initalValues),
  ]);
  const setValue = useCallback<SetValueFn<T>>(
    (key, value) => setState((prevState) => ({ ...prevState, [key]: value })),
    []
  );

  useEffect(() => {
    if (options.resetOnInitialValueChange) {
      reset();
    }
  }, [options.resetOnInitialValueChange, reset]);

  const keys = Object.keys(initalValues) as K[];
  const onChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = evt.target;
      if (!(name in initalValues)) {
        throw new Error(
          `Field name "${name}" is not a valid value. Must be one of [${keys}].`
        );
      }
      setValue(name as K, value as T[K]);
    },
    [initalValues, keys, setValue]
  );

  const bindings = keys.reduce((res, key) => {
    // @ts-ignore
    res[key] = {
      name: key,
      value: state[key],
    };
    if (typeof state[key] === 'string') {
      // @ts-ignore
      res[key].onChange = onChange;
    }
    return res;
  }, {} as Bindings<T>);

  return {
    values: state,
    isDirty,
    reset,
    setValue,
    bindings,
  };
};

export default useFormFields;
