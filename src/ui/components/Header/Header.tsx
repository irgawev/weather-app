import {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {selectWeatherState, setWeatherState} from "@store/slices/weatherSlice"
import cities from "../../../helper/cities"
import WeatherService from "@services/weather.service"

import Image from "next/image"
import searchIcon from '@resources/images/icons/search.svg'

import styles from './Header.module.scss'

export default function Header() {
    // ** STORE
    const weatherState = useSelector(selectWeatherState)
    const dispatch = useDispatch()

    // ** STATES
    const [active, setActive] = useState(false)

    // ** SERVICES
    const {getWeather} = WeatherService()

    // ** CHECK STORE
    const hasPlace = useCallback((key: string) => {
        return !!weatherState[key]
    }, [weatherState])

    // ** HANDLE UPDATE WEATHER
    const updateWeather = useCallback((key: string, searchText: string = '') => {
        if (hasPlace(key) && !searchText) {
            dispatch(setWeatherState({
                ...weatherState,
                active: key,
            }))
        } else {
            const params = new URLSearchParams()
            const activeKey = searchText ? searchText : key

            params.set('key', String(process.env.NEXT_PUBLIC_DB_KEY))

            if (searchText) {
                params.set('q', searchText)
            } else {
                params.set('q', key)
            }

            getWeather(params)
                .then((response: any) => {
                    dispatch(setWeatherState({
                        ...weatherState,
                        active: activeKey,
                        [activeKey]: response
                    }))
                })
        }
    }, [weatherState])

    const onSubmit = useCallback((e: any) => {
        e.preventDefault()
        updateWeather(weatherState.active, e.target[0].value)
    }, [])

    // ** TOGGLE MOBILE MENU
    const toggleMenu = useCallback(() => {
        setActive(active => !active)
    }, [])

    useEffect(() => {
        updateWeather(weatherState.active)
    }, [])

    return (
        <header className={active ? `${styles.header} ${styles.header_active}` : styles.header}>
            <div className={styles.header__inner}>
                <form className={'form'} onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder={'Another location'}
                        className={`${styles.header__field} form__field`}
                        required
                    />

                    <button className={styles.header__search} type={'submit'}>
                        <Image
                            src={searchIcon}
                            alt={'search'}
                        />
                    </button>
                </form>

                <RegionsList handleClick={updateWeather}/>
                <RegionInfo/>
            </div>
        </header>
    )
}

function RegionsList({handleClick}: any) {
    // ** STORE
    const weatherState = useSelector(selectWeatherState)

    return (
        <ul className={styles.header__list}>
            {cities.map((item: any) => (
                <li
                    key={item.id}
                    className={
                        weatherState.active === item.title
                            ? `${styles.header__list__item} ${styles.header__list__item_active}`
                            : styles.header__list__item
                    }
                >
                    <button onClick={() => handleClick(item.title)}>
                        {item.title}
                    </button>
                </li>
            ))}
        </ul>
    )
}

function RegionInfo() {
    // ** STORE
    const weatherState = useSelector(selectWeatherState)

    if (weatherState[weatherState.active] && !weatherState[weatherState.active].status) {
        return <>
            <hr/>

            <h5 className={styles.header__title}>
                Weather Details
            </h5>

            <ul className={styles.header__info}>
                <li className={styles.header__info__item}>
                    Cloudy

                    <span>
                        {weatherState[weatherState.active].current.cloud}%
                    </span>
                </li>

                <li className={styles.header__info__item}>
                    Humidity

                    <span>
                        {weatherState[weatherState.active].current.humidity}%
                    </span>
                </li>

                <li className={styles.header__info__item}>
                    Wind

                    <span>
                        {weatherState[weatherState.active].current.wind_kph}km/h
                    </span>
                </li>

                <li className={styles.header__info__item}>
                    Pressure

                    <span>
                        {weatherState[weatherState.active].current.pressure_mb}
                    </span>
                </li>
            </ul>
        </>
    } else return null
}