import { UrgencyCard } from "./UrgendyCard";

export const UrgencyBtn = ({ test }) => {

    const calculateTime = (time) => {
        const diffMs = new Date() - new Date(time);
        const diffMin = Math.floor(diffMs / 60000);
        if (diffMin < 1) return 'Ahora mismo'
        else if (diffMin < 60) return `Hace ${diffMin} minutos`
        else if (diffMin < 1440) return `Hace ${Math.floor(diffMin / 24)} horas`
        else if (diffMin < 2880) return `Hace ${Math.floor(diffMin / 1440)} dias`
    }



    return (
        <div>
            {
                test
                    .filter(t => Number(t.urgency) < 4)
                    .sort((a, b) => a.prioridad - b.prioridad)
                    .map(t => (
                        <UrgencyCard key={t.id} t={t} calculateTime={calculateTime} />
                    ))
            }

        </div>

    )
}