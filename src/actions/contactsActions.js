import axios from "./../config/axios"

export const getContactsListAction = (params) => async dispatch => {
    loadingContactsStarted(dispatch)
    const response = await axios.get('/api/contacts.json', params)
    dispatch({
        type: 'CONTACTS_LIST',
        payload: {contacts: response.data.contacts, contactIds: response.data.contacts_ids, totalContacts: response.data.total, contactSearchQuery: params.params.query}
    })
    loadingContactsEnded(dispatch)
}

export const loadingContactsStarted = (dispatch) => {
    dispatch({
        type: 'CONTACTS_LOADING_STARTED',
        payload: {isLoading: true}
    })
}

export const loadingContactsEnded = (dispatch) => {
    dispatch({
        type: 'CONTACTS_LOADING_ENDED',
        payload: {isLoading: false}
    })
}

export const checkboxChanged = (callback) => dispatch => {
    dispatch({
        type: 'CHECKBOX_CHANGED',
        payload: {}
    })
    if(callback)
        setTimeout(() => callback(), 0);
}

export const setContactIds = (ids) => {
    return {
        type: 'SET_CONTACT_IDS',
        payload: {contactIds: ids}
    }
}

export const setName = (name, callback) => dispatch => {
    dispatch({
        type: 'SET_NAME',
        payload: {name: name}
    })
    if(callback)
        setTimeout(() => callback(), 0);
}

export const setContactDetail = (contactDetail) => dispatch => {
    actionContactDetail(true, dispatch)
    dispatch({
        type: 'SET_CONTACT_DETAIL',
        payload: {'contactDetail': contactDetail}
    })
}

export const actionContactDetail = (show, dispatch = null) => {
    let data = {
        type: 'ACTION_CONTACT_DETAIL',
        payload: {contactOpen: show}
    }
    if(dispatch === null)
        return data
    else
        dispatch(data)
}

export const setContactSearchQuery = (query, callback) => dispatch => {
    dispatch({
        type: 'SET_CONTACT_SEARCH_QUERY',
        payload: {contactSearchQuery: query}
    })
    if(callback)
        setTimeout(() => callback(), 0);
}

export const setPrevY = (value) => {
    return {
        type: 'SET_PREV_Y',
        payload: {prevY: value}
    }
}

export const resetToInitialState = () => {
    return {
        type: 'RESET_TO_INITIAL_STATE',
        payload: {}
    }
}