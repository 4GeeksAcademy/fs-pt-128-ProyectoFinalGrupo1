import { calculateTime } from "../../utils/calculateTime";
import { UrgencyCard } from "./UrgendyCard";

export const UrgencyBtn = ({ test }) => {



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