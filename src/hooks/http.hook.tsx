import {useCallback, useState} from "react"
import axios from "axios"

// ** GENERATE CONFIG FOR REQUESTS
function generateConfig(
    url: any,
    method: any,
    payload: any,
    isFormData: boolean
) {
    // ** REQUEST CONFIG
    let config: any = {
        method,
        headers: {}
    }

    // ** SET REQUEST HEADERS
    if (!isFormData) config.headers['Content-Type'] = 'application/json'

    // ** SET REQUEST URL
    const isDifferentUrl = url.includes('://')

    if (!isDifferentUrl && url && url[0] !== '?')  config.url = process.env.NEXT_PUBLIC_DB_HOST + '/' + url
    else  config.url = process.env.NEXT_PUBLIC_DB_HOST + url

    if (!isDifferentUrl && !url) config.url = process.env.NEXT_PUBLIC_DB_HOST

    // ** SET REQUEST PAYLOAD
    if (payload) config.data = payload

    return config
}

// ** REQUEST FUNC
async function axiosRequest(url: any, method: any, payload: any, isFormData: any) {
    return await axios(generateConfig(url, method, payload, isFormData))
        .then((response: any) => {
            return {...response}
        })
        .catch((error: any) => {
            console.error(`${error} | http.hook.tsx`)

            if (error.response) return {...error.response}
            else return error
        })
}

// ** FOR SERVER SIDE REQUESTS
export async function httpRequest(
    url: string = '',
    method: string = 'get',
    payload = null,
    isFormData: boolean = false
) {
    // ** REQUEST
    let response: any = await axiosRequest(url, method, payload, isFormData)

    // ** RESPONSE
    if (response.statusText === 'OK') return response.data
    else return response
}

// ** FOR CLIENT SIDE REQUESTS
export function HttpHook() {
    // ** STATES
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const request = useCallback(async (
        url: string = '',
        method: string = 'get',
        payload = null,
        isFormData: boolean = false
    ) => {
        setError(false)
        setLoading(true)

        // ** REQUEST
        let response: any = await axiosRequest(url, method, payload, isFormData)
        setLoading(false)

        // ** RESPONSE
        if (response.status > 199 && response.status < 300) return response.data
        else return response
    }, [])

    return {loading, error, request}
}