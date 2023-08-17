import {useCallback} from "react"
import {useSelector} from "react-redux"
import {selectWeatherState} from "@store/slices/weatherSlice"
import {transformDate} from "@utils/index"
import Image from "next/image"

import image1 from '@resources/images/weather/Sunny.jpg'
import image2 from '@resources/images/weather/Partly cloudy.jpg'
import image3 from '@resources/images/weather/Cloudy.jpg'
import image4 from '@resources/images/weather/Overcast.jpg'
import image5 from '@resources/images/weather/Mist.jpg'
import image6 from '@resources/images/weather/Clear-night.jpg'
import image7 from '@resources/images/weather/Partly cloudy-night.jpg'
import image8 from '@resources/images/weather/Cloudy-night.jpg'
import image9 from '@resources/images/weather/Overcast-night.jpg'
import image10 from '@resources/images/weather/Mist-night.jpg'

import styles from './intro.module.scss'

const images: any = {
    ['Sunny']: image1,
    ['Clear']: image1,
    ['Partly cloudy']: image2,
    ['Cloudy']: image3,
    ['Overcast']: image4,
    ['Mist']: image5,
    ['Clear-night']: image6,
    ['Partly cloudy-night']: image7,
    ['Cloudy-night']: image8,
    ['Overcast-night']: image9,
    ['Mist-night']: image10,
}

export default function IntroSection() {
    // ** STORE
    const weatherState = useSelector(selectWeatherState)

    // ** HANDLE CHANGE BACKGROUND IMAGE
    const getImage = useCallback(() => {
        if (weatherState[weatherState.active]) {
            if (weatherState[weatherState.active].current.is_day) {
                return images[weatherState[weatherState.active].current.condition.text]
            } else {
                return images[`${weatherState[weatherState.active].current.condition.text}-night`]
            }
        }
    }, [weatherState])

    return (
        <section className={styles.intro}>
            {/* BRAND */}
            <h1 className={styles.intro__brand}>
                the.weather
            </h1>

            {weatherState[weatherState.active] && !weatherState[weatherState.active].status ? <>
                <div className={styles.intro__box}>
                    <h2 className={styles.intro__c}>
                        {Math.round(weatherState[weatherState.active].current.temp_c)}°
                    </h2>

                    <div className={'d-flex align-items-end justify-content-between w-100'}>
                        <div>
                            <h3 className={styles.intro__place}>
                                {weatherState[weatherState.active].location.name}
                            </h3>

                            <h5 className={styles.intro__date}>
                                {transformDate(weatherState[weatherState.active].location.localtime, true)}
                                {' - '}
                                {transformDate(weatherState[weatherState.active].location.localtime)}
                            </h5>
                        </div>

                        <div className={styles.intro__condition}>
                            <Image
                                src={'https:' + weatherState[weatherState.active].current.condition.icon}
                                alt={weatherState[weatherState.active].current.condition.text}
                                width={64}
                                height={64}
                                className={styles.intro__icon}
                            />

                            <h6 className={styles.intro__condition__text}>
                                {weatherState[weatherState.active].current.condition.text}
                            </h6>
                        </div>
                    </div>
                </div>

                <Image
                    src={getImage()}
                    alt={weatherState[weatherState.active].current.condition.text}
                    width={1920}
                    height={1080}
                    className={styles.intro__background}
                />
            </> : (
                <div className={styles.intro__box}>
                    <div>
                        <h3 className={styles.intro__place}>
                            Not Found
                        </h3>
                    </div>
                </div>
            )}
        </section>
    )
}