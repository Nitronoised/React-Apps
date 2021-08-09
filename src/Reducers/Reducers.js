import { combineReducers } from 'redux'

function searchReducer(state = '', action) {
    switch (action.type) {
        case 'ADD_SEARCH_TERM':
            let newState = '';
            return newState + action.payload
        default: return state
    }
}

function favoritesReducer(state = [], action) {
    switch (action.type) {
        case 'ADD_TO_FAVORITE': return [...state, action.payload]
        case 'REMOVE_FROM_FAVORITE': return state.filter(el => el !== action.payload)
        default: return state
    }
}

const allReducers = combineReducers({
    cachedSearch: searchReducer,
    favorites: favoritesReducer

})

export default allReducers
