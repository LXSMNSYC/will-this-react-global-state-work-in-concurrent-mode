import React, { useCallback } from 'react';
import {
  createGraphNode,
  GraphDomain,
  useGraphNodeSetValue,
  useGraphNodeValue,
} from '@lxsmnsyc/react-graph-state';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const globalState = createGraphNode({
  get: initialState,
});

const countState = createGraphNode({
  get: ({ get }) => selectCount(get(globalState)),
  set: ({ get, set }, action) => {
    set(globalState, reducer(get(globalState), action));
  },
});

const useIncrement = () => {
  const dispatch = useGraphNodeSetValue(countState);
  return useCallback(() => {
    dispatch(incrementAction);
  }, [dispatch]);
};

const useCount = () => useGraphNodeValue(countState);

const useDouble = () => {
  const dispatch = useGraphNodeSetValue(countState);
  return useCallback(() => {
    dispatch(doubleAction);
  }, [dispatch]);
};

const Root = ({ children }) => (
  <GraphDomain>
    {children}
  </GraphDomain>
);

export default createApp(useCount, useIncrement, useDouble, Root);
