import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import rootReducer from '.';

import appReducer from './appReducer'


// const createStore = () => reduxCreateStore(rootReducer);

// export default ({ element }) => (
//   <Provider store={createStore()}>{element}</Provider>
// );
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export default preloadedState => {
//     return createStore(rootReducer, preloadedState);
// };

export default (preloadedState = {}) => {

  let appData = {}
  if (typeof window !== 'undefined') {
    if(window && window.localStorage){
      let defData = localStorage.getItem('persist:root')
      if(defData){

        // console.log('origiin : ', defData)

        defData = defData.replaceAll('\\\\\\"', '"')
        defData = defData.replaceAll('\\\\"', '"')
        defData = defData.replaceAll('\\"', '"')
        defData = defData.replaceAll('"{', '{')
        defData = defData.replaceAll('}"', '}')
        defData = defData.replaceAll('"[', '[')
        defData = defData.replaceAll(']"', ']')
        // console.log('defData: ', defData)
        appData = JSON.parse(defData)
      }
      console.log(' 123123123>>>>>>>  >>> >>> >>  localstorage: appData',  appData)

    }
  }
 
  console.log(' &&&&& >>> ***************** preloadedState : ', preloadedState)

  const store = createStore(
    persistedReducer,
    appData ? appData : preloadedState, // initial state
  );
  const persistor = persistStore(store);

  // return persistor
  // return store
  return { store, persistor };
}





