import React, { useState, useEffect, useReducer } from 'react';

interface UseAsyncState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  calledOnce: boolean;
}

export const useAsync = <A extends any[], R>(
  fn: (...args: A) => (Promise<R> | R)
) => {
  const [params, setParams] = useState<A>(null);
  const [state, dispatch] = useReducer(
    asyncReducer as React.Reducer<UseAsyncState<R>, AsyncAction<R>>,
    { data: null, error: null, loading: false, calledOnce: false }
  );

  useEffect(() => {
    let didCancel = false;
    if (params) {
      const callAsync = async () => {
        dispatch(startAsync());
        try {
          const result = await fn(...params);
          didCancel || dispatch(succeedAsyncTask<R>(result));
        } catch (error) {
          didCancel || dispatch(failedAsyncTask(error));
        }
      };
      callAsync();
    }
    return () => {
      didCancel = true;
    };
  }, [fn, params]);

  return [(...args: A) => setParams(args), state] as [
    (...args: A) => void,
    UseAsyncState<R>
  ];
};

export default useAsync;

const asyncReducer = <T>(
  state: UseAsyncState<T>,
  action: AsyncAction<T>
): UseAsyncState<T> => {
  switch (action.type) {
    case AsyncActionType.START:
      return {
        ...state,
        loading: true,
        error: null,
        calledOnce: true,
      };
    case AsyncActionType.SUCCESS:
      return {
        ...state,
        error: null,
        data: action.payload.data,
      };
    case AsyncActionType.FAILED:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

enum AsyncActionType {
  START = 'useAsync/start',
  SUCCESS = 'useAsync/success',
  FAILED = 'useAsync/failed',
}

interface StartAsyncAction {
  type: AsyncActionType.START;
}

interface AsyncActionSuccess<T> {
  type: AsyncActionType.SUCCESS;
  payload: { data: T };
}

interface AsyncActionFailed {
  type: AsyncActionType.FAILED;
  payload: { error: Error };
}

type AsyncAction<T> =
  | StartAsyncAction
  | AsyncActionSuccess<T>
  | AsyncActionFailed;

const startAsync = () => ({
  type: AsyncActionType.START as AsyncActionType.START,
});
const succeedAsyncTask = <T>(data: T) => ({
  type: AsyncActionType.START as AsyncActionType.START,
  payload: { data },
});
const failedAsyncTask = (error: Error) => ({
  type: AsyncActionType.FAILED as AsyncActionType.FAILED,
  payload: { error },
});
