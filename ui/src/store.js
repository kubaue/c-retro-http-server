import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from "./reducers/reducers";
import { rootEpic } from './epics/epics';

export const createOrnnStore = () => {
  const epicMiddleware = createEpicMiddleware();

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(reducers, composeEnhancers(
    applyMiddleware(
      epicMiddleware,
    )
  ));

  epicMiddleware.run(rootEpic);

  return store;
};
