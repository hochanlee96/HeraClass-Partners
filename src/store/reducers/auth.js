import { AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState = {
    email: '',
    username: '',
    expires: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                ...state,
                email: action.userData.email,
                username: action.userData.username
            }
        case LOGOUT:
            return initialState;
        default: return state;
    }
}