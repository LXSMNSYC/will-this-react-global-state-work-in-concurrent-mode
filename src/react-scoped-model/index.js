import { createReducerModel, useSelector } from '@lxsmnsyc/react-scoped-model';
import React, { useCallback } from 'react';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const context = createReducerModel(reducer, initialState);

const useCount = () => useSelector(context, (v) => selectCount(v[0]));

const useIncrement = () => {
  const dispatch = useSelector(context, (v) => v[1]);
  return useCallback(
    () => dispatch(incrementAction),
    [dispatch],
  );
};

const useDouble = () => {
  const dispatch = useSelector(context, (v) => v[1]);
  return useCallback(
    () => dispatch(doubleAction),
    [dispatch],
  );
};

const Root = ({ children }) => (
  <context.Provider>
    {children}
  </context.Provider>
);

export default createApp(useCount, useIncrement, useDouble, Root);
