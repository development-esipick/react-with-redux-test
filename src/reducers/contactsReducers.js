const initialState = {
    contactSearchQuery: '',
    contactOpen: false,
    contactDetail: {},
    totalContacts: 0,
    isLoading: false,
    isChecked: false,
    companyId: 171,
    countryId: 226,
    contactIds: [],
    currentPage: 1,
    contacts: {},
    prevY: 0,
    name: '',
}

export default (prevState = initialState,  action) => {

    switch (action.type){
        case 'CONTACTS_LIST':
            const returnEven = (arr) => arr.filter((x) => x % 2 === 0)
            let contactIds = [];
            if(prevState.isChecked)
                contactIds = returnEven(prevState.contactIds).concat(returnEven(action.payload.contactIds))
            else
                contactIds = prevState.contactIds.concat(action.payload.contactIds)
            return {...prevState, contacts: {...prevState.contacts, ...action.payload.contacts}, totalContacts: action.payload.totalContacts, contactIds: [...new Set(contactIds)], currentPage: (parseInt(prevState.currentPage)+1)}
        case 'CONTACTS_LOADING_STARTED':
        case 'CONTACTS_LOADING_ENDED':
        case 'ACTION_CONTACT_DETAIL':
        case 'SET_CONTACT_DETAIL':
        case 'SET_CONTACT_IDS':
        case 'SET_PREV_Y':
        case 'SET_NAME':
            return {...prevState, ...action.payload}
        case 'CHECKBOX_CHANGED':
            let isChecked = !prevState.isChecked
            if(isChecked)
                return {...prevState, isChecked: isChecked}
            else
                return {...prevState, isChecked: isChecked, currentPage: 1, contacts: {}, contactIds: []}
        case 'SET_CONTACT_SEARCH_QUERY':
            return {...prevState, ...action.payload, currentPage: 1, contacts: {}, contactIds: []}
        case 'RESET_TO_INITIAL_STATE':
            return {...initialState}
        default:
            return prevState
    }

}