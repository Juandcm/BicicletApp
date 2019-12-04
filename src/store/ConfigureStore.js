import { createStore, applyMiddleware, compose } from "redux";
import {
	persistStore,
	persistReducer,
	storage,
} from "redux-persist";
import { AsyncStorage } from "react-native";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import reducers from "../reducers";

// Middleware: Redux Thunk (Async/Await)
const middleware = [thunk];
// Middleware: Redux Logger (For Development)
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}


// Middleware: Redux Persist Config
const persistConfig = {
  // Root?
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: [
  // 'auth',
  // 'carritoconveniencia',
  ],

  // map: map,
  // round: round,
  // auth: auth,
  // tracking: tracking,
  // history: history,
  // boleteria: boleteria,
  // enviaralgo: enviaralgo,
  // conveniencia: conveniencia,
  // pagoservicios: pagoservicios,
  // cajero: cajero,
  // carritoconveniencia: carritoconveniencia,
  // ordenconveniencia: ordenconveniencia

  // // Blacklist (Don't Save Specific Reducers)
  blacklist: [
  'auth',
  'cajero',
  'enviaralgo',
  'map',
  'boleteria',
  'pagoservicios',
  'round',
  'tracking',
  'history',
  'carritoconveniencia',
  'ordenconveniencia',
  'transporte'
  ],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, reducers)

// Redux: Store
const store = createStore(
  persistedReducer,
  applyMiddleware(...middleware),
  );

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

// Exports
export {
  store,
  persistor,
};