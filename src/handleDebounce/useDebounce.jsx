import { useEffect, useState } from "react"

export const useDebounce = (value, delay) => {
    
    const [debounse ,setDebounce] = useState(value);

    useEffect(() => {
       const handler =  setTimeout(() => {
            setDebounce(value)
        }, delay)

        return () => clearInterval(handler)
    }, [value, delay])

    return debounse
    
}