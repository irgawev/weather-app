export default class Scroll {
    scrollToId(id: string) {
        const el = document.querySelector(id)

        if (el) {
            window.scroll({
                behavior: 'smooth',
                // @ts-ignore
                top: el.offsetTop - 150
            })
        } else console.error('The element you want to access does not exist! | scroll.util.ts')
    }
}