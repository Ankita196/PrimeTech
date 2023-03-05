import { USER_DATA } from './constant';

const initialState = {
    userData: {}
};

export default function UserReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
        case USER_DATA:
            return {
                ...state,
                userData: action.payload
            };
        default: return state;
    }
};