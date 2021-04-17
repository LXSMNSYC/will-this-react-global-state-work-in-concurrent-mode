import React from 'react';
import { createStore } from 'redux';
import { createExternalSubject, ExternalSubjectSynchronizer, useExternalSubject } from 'react-external-subject';

import {
  reducer,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const store = createStore(reducer);

const subject = createExternalSubject({
  read: () => selectCount(store.getState()),
  subscribe: (callback) => store.subscribe(callback),
});

const useCount = () => {
  const count = useExternalSubject(subject, false);
  return count;
};

const useIncrement = () => () => store.dispatch(incrementAction);

const useDouble = () => () => store.dispatch(doubleAction);

const Root = ({ children }) => (
  <ExternalSubjectSynchronizer>
    {children}
  </ExternalSubjectSynchronizer>
);

export default createApp(useCount, useIncrement, useDouble, Root);
