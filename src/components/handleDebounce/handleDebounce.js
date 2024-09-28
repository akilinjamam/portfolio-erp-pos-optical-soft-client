
const handleDebounce = (setHandleQuery, targetValue) => {

    const timout = setTimeout(() => {
        setHandleQuery(targetValue)
    }, 500);

    return () => {
        clearTimeout(timout)
    }
}

export default handleDebounce