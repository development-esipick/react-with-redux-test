import {combineReducers} from "redux";
import ContactsReducers from "./contactsReducers"

export default combineReducers({
    contacts: ContactsReducers
})