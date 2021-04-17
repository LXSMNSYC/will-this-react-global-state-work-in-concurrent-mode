import React, { useCallback } from 'react';
import { createStore } from 'redux';
import { createStoreAdapter, StoreAdapterRoot, useStoreAdapter } from 'react-store-adapter';

import {
  reducer,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const store = createStore(reducer);

const storeAdapter = createStoreAdapter({
  read: () => store.getState(),
  subscribe: (callback) => store.subscribe(callback),
});

const useCount = () => useStoreAdapter(storeAdapter, {
  getSnapshot: selectCount,
});

const useIncrement = () => useCallback(() => store.dispatch(incrementAction), []);

const useDouble = () => useCallback(() => store.dispatch(doubleAction), []);

const Root = ({ children }) => <StoreAdapterRoot>{children}</StoreAdapterRoot>;

export default createApp(useCount, useIncrement, useDouble, Root);
