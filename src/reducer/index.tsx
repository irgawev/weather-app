import * as actions from './actionTypes'

export const reducer = (state: any, action: any) => {
    console.log(action)

    switch (action.type) {
        case actions.GET_DEFAULT_DATA: {
            return {data: 'default data'}
        }
        default:
            return {}
    }
}