import setData from "./savedata";
import SetUserData from "./SetUserData";
import saveAddListingData from "./saveAddListingData";
import { combineReducers } from "redux";

const rootReducer=combineReducers({

    setData,
    SetUserData,
    saveAddListingData,
});





export default rootReducer;