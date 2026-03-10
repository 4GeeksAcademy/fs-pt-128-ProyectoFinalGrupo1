import { useEffect, useState } from "react"

export const TimeCounter = ({ startTime, priority }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const start = new Date(startTime).getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            setCount(Math.floor((now - start) / 1000))
        }, 1000)
        return () => clearInterval(interval)
    }, [startTime])

    const formatTime = (totalSeconds) => {
        const hour = Math.floor((totalSeconds / 3600)).toString().padStart(2, '0')
        const minute = Math.floor((totalSeconds % 3600)/60).toString().padStart(2, '0')
        const seconds = Math.floor((totalSeconds % 60)).toString().padStart(2, '0')

        return `${hour}:${minute}:${seconds}`
    }

    return (
        <span>{formatTime(count)}</span>
    )
}
