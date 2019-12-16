const INITAL_STATE = {
    id: 0,
    username : '',
    email : '',
    password : '',
    role : '',
    cart: []
}

const authReducer = (state = INITAL_STATE, action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                password: action.payload.password,
                role: action.payload.role,
                cart: action.payload.cart
            }
        case 'LOGOUT':
            return INITAL_STATE
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: action.payload
            }
        default:
            return INITAL_STATE
    } 
}

export default authReducer;
