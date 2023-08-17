import Head from "next/head"
import Header from "../components/Header/Header"
import IntroSection from "../components/Sections/Intro"

export default function HomePage() {
    return <>
        {/* SEO */}
        <Head>
            <title>
                Weather App
            </title>
        </Head>

        {/* WRAPPER */}
        <main>
            <IntroSection/>
        </main>

        {/* HEADER */}
        <Header/>
    </>
}