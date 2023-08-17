import {AppProps} from 'next/app'
import {wrapper} from '@store/store'

// ** STYLES
import '@styles/globals.scss'

function App({Component, pageProps}: AppProps) {
    return (
        <Component {...pageProps}/>
    )
}

export default wrapper.withRedux(App)