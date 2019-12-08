export const add = () => {
    return{
        type: 'PLUS'
    }
}

export const minus = () => {
    return{
        type: 'MINUS'
    }
}

export const ganti = (data) => {
    return{
        type: 'GANTI',
        payload: data
    }
}