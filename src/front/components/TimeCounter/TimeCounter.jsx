import { useEffect, useState } from "react"
import './TimeCounter.css'
export const TimeCounter = ({ startTime, priority }) => {
    const [count, setCount] = useState(0)

    const getTime = (priority) => {
        switch (priority) {
            case 1: return 0
            case 2: return 600
            case 3: return 3600
            case 4: return 7200
            case 5: return 14400
            default: Infinity
        }
    }
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
        const minute = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0')
        const seconds = Math.floor((totalSeconds % 60)).toString().padStart(2, '0')

        return `${hour}:${minute}:${seconds}`
    }

    return (
        <span className="d-flex justify-content-center align-items-center">
            <div className="d-flex justify-content-center w-50">
                <div className={`${priority && count > getTime(priority) ? 'opacity-100'
                    : 'opacity-0'} circle pulse bg-white d-flex justify-content-center align-items-center me-3 flex-shrink-0`}>
                    <i className="fa-solid fa-triangle-exclamation text-danger"></i>
                </div>
                <div className="d-flex justify-content-center align-items-center w-50">
                    {formatTime(count)}
                </div>

            </div>

        </span >
    )
}
