import React, { useCallback } from 'react';
import {
  createGraphNode,
} from 'graph-state';
import {
  GraphDomain,
  useGraphNodeDispatch,
  useGraphNodeValue,
} from 'react-graph-state';

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
  set: ({ get, set }, action) => set(globalState, reducer(get(globalState), action)),
});

const useIncrement = () => {
  const dispatch = useGraphNodeDispatch(countState);
  return useCallback(() => {
    dispatch(incrementAction);
  }, [dispatch]);
};

const useCount = () => useGraphNodeValue(countState);

const useDouble = () => {
  const dispatch = useGraphNodeDispatch(countState);
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
