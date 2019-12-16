import Axios from "axios"
import { API_URL } from "../../helpers/apiUrl"

// export const login = (data) => {
//     return {
//         type: 'LOGIN',
//         payload: data
//     }
// }

export const login = (username,password) => {
    // let { username, password } = data
    return(dispatch) => {
        Axios.get(API_URL + `/users?username=${username}&password=${password}`)
        .then((res) => {
            console.log(res.data)
            dispatch({
                type: 'LOGIN',
                payload: res.data[0]
            })
        })
        .catch((err) => {
            dispatch(({
                type: 'LOGOUT'
            }))
            console.log(err)
        })
    }
}

export const logout = () => {
    return{
        type: 'LOGOUT'
    }
}

export const addToCart = (data) => {
    return{
        type: 'ADD_TO_CART',
        payload: data
    }
}

export const keepLogin = () => {
    return((dispatch) => {
        let username = localStorage.getItem('username')
        Axios.get(API_URL + `/users?username=${username}`)
        .then((res) => {
            dispatch({
                type: 'LOGIN',
                payload: res.data[0]
            })
        })
        .catch((err) => {
            console.log(err)
        })
    })
}