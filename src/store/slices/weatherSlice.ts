import {createSlice} from "@reduxjs/toolkit"
import {HYDRATE} from "next-redux-wrapper"
import {AppState} from "@store/store"

// ** Type for state
export interface WeatherState {
    weatherState: any
}

// ** Initial state
const initialState: WeatherState = {
    weatherState: {active: 'Tashkent'}
}

// ** Slice
export const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setWeatherState(state, action) {
            state.weatherState = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.weather,
            }
        },
    }
})

export const {setWeatherState} = weatherSlice.actions

export const selectWeatherState = (state: AppState) => state.weather.weatherState

export default weatherSlice.reducer