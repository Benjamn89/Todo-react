export const todoMethods = {
    dayMonth: (time) => {
        if (time.length < 2) {
            time = `0${time}`
        }
        return time
    }
}
export const caulcPages = (currentPage, array) => {
    const startIndex = (currentPage - 1) * 6
    const endIndex = (currentPage * 5) + ((currentPage - 1) * 1) + 1
    const displayArray = array.slice(startIndex, endIndex)
    return displayArray
}