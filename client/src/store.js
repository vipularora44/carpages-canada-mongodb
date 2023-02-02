import rootReducer from "./reducers";
import { persistReducer,persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { legacy_createStore} from 'redux';


const persistConfig={
    key:'persist-config',
    storage
}
const PersistReducer=persistReducer(persistConfig,rootReducer);
const myStore=legacy_createStore(PersistReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const PersistStore=persistStore(myStore);
export default myStore;