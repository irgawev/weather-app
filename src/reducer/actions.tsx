import {GET_DEFAULT_DATA} from './actionTypes'

const createAction = (type: any, payload: any) => ({type, payload})

const getDefaultData = () => createAction(GET_DEFAULT_DATA, {})

export {getDefaultData}