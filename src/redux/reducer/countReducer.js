const INITIAL_STATE = {
    count: 100,
    contoh: 123
}

const countReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'PLUS':
           return{...state, count: state.count + 1} 
        case 'MINUS':
            return{...state, count: state.count - 1}
        case 'GANTI':
            return{...state, count: action.payload}
        default:
            return state
    }
}

export default countReducer