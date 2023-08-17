import {HttpHook} from "@hooks/http.hook"

export default function WeatherService() {
    const {loading, error, request} = HttpHook()

    const getWeather = async (params: any) => {
        return await request(`?${params}`, 'get')
    }

    return {loading, error, getWeather}
}