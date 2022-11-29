import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import Botella from "../models/Botella"
import BotellasService from "../services/BotellasService"
import FormularioActualizarBotella from "../components/FormularioActualizarBotella"
import { toast } from "react-toastify"

export default function DetalleBotella(){
    const {idBotella} = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const [botella, setBotella] = useState<Botella | undefined>(undefined)
    const navigate = useNavigate()


    async function cargarBotella(){
        const id = parseInt(idBotella as string)

        if(isNaN(id)){
            navigate("/botellas")
            return
        }
        
        try{
            const servicioBotellas = new BotellasService()
            const botellaEncontrada = await servicioBotellas.obtenerPorId(id)
            setBotella(botellaEncontrada)
        }
        catch(e){
            if (e instanceof Error && e.message === "ErrorBotellaNoEncontrada"){
            } else{
                toast('Ha ocurrido un error desconocido.', { type: 'error' });
                navigate("/botellas")
                return
            }
        }
        setIsLoaded(true)
    }

    useEffect(() => {
        if(!isLoaded){
            cargarBotella();
        }
    })

    if (!isLoaded){
        return <>Loading...</>
    }

    if(!botella){
        return(
        <>
            <h1>ERROR 404: Botella No Encontrada</h1>
        </>
        )
    }

    return (
        <>
            <>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h3 className="text-center">{botella.nombre}</h3>
                        <Link to="/botellas">&lt; Regresar</Link>
                        <FormularioActualizarBotella botella={botella}/>
                    </Col>
                </Row>
            </>
        </>
    )

}