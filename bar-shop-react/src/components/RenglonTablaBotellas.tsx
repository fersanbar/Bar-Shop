import {useNavigate} from "react-router-dom"
import Botella from "../models/Botella";
import './scss/RenglonTablaBotellas.scss'

interface RenglonTablaBotellasProps {
    botella: Botella
}

export default function RenglonTablaBotellas(
    { botella }: RenglonTablaBotellasProps
) {

    const navigate = useNavigate()

    function navegarADetalleBotella(){
        navigate(`/botellas/${botella.id}`)
    }

    return (
        <>
            <tr onClick={navegarADetalleBotella}>
                <td role="button">{botella.nombre}</td>
                <td role="button">{botella.marca}</td>
                <td role="button">{botella.capacidad}</td>
                <td role="button">{botella.fechaCreacion.toDateString()}</td>
            </tr>
        </>
    );
}
