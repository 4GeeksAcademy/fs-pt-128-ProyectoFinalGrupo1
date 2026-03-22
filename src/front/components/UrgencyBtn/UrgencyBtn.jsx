import { calculateTime } from "../../utils/calculateTime";
import { UrgencyCard } from "./UrgendyCard";

export const UrgencyBtn = ({ test }) => {



    return (
        <div>
            {
                test
                    .filter(t => {
                        if (Number(t.urgency) < 3 && t.status !== 'Finalizado') return true
                    })
                    .sort((a, b) => a.prioridad - b.prioridad)
                    .map(t => (
                        <UrgencyCard key={t.id} t={t} calculateTime={calculateTime} />
                    ))
            }

        </div>

    )
}