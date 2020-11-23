export const todoMethods = {
    dayMonth: (time) => {
        if (time.length < 2) {
            time = `0${time}`
        }
        return time
    }
}