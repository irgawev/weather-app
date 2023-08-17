// ** TIME
export const transformDate = (dateString: string, hour: boolean = false) => {
    let options: object = {}
    const today: any = new Date(dateString)

    if (hour) {
        options = {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        }

        return today.toLocaleDateString("en-US", options).slice(11, 16)
    } else {
        options = {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
        }

        return today.toLocaleDateString("en-US", options)
    }



}