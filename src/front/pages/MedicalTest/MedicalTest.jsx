import { useEffect } from "react"
import { getIncomeTest } from "../../APIServices/BACKENDservices"
import useGlobalReducer from "../../hooks/useGlobalReducer"

export const MedicalTest = () => {
    const { store, dispatch } = useGlobalReducer()
    console.log(store.test)
    useEffect(() => {
        getIncomeTest(dispatch)
    }, [])
    return (
        <div> Hola</div>
    )
}