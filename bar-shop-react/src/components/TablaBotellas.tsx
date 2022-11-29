import { useState, useEffect } from 'react';
import {Table } from 'react-bootstrap';
import Botella from '../models/Botella';
import BotellasService from '../services/BotellasService';
import RenglonTablaBotellas from './RenglonTablaBotellas';

export default function TablaBotellas() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [botellas, setBotellas] = useState<Botella[]>([]);
    const [search, setSearch] = useState("");
    const [filtro, setFiltro] = useState(0)


    async function loadBotellas() {
        const servicioBotellas = new BotellasService();
        const listaBotellas = await (await servicioBotellas.obtenerLista());
        setBotellas(listaBotellas);
        setIsLoaded(true);
    }

    useEffect(() => {
        if (!isLoaded) {
            loadBotellas();
        }
    });



    if (!isLoaded) {
        return <>Loading...</>;
    }

    function renderBotellas() {
        return botellas.filter((botella) => botella.nombre.toUpperCase().includes(search)
        ).sort((a, b) => (a.nombre < b.nombre ? -1 : 1)).map(botella => (
            <RenglonTablaBotellas key={botella.id} botella={botella} />
        ));
    }

    function renderBotellasMarca() {
        return botellas.filter((botella) => botella.nombre.toUpperCase().includes(search)
        ).sort((a, b) => (a.marca < b.marca ? -1 : 1)).map(botella => (
            <RenglonTablaBotellas key={botella.id} botella={botella} />
        ));
    }
    
    if (filtro == 0){
        return (
            <>
                <div>
                    <input placeholder='Search' onChange={e=>setSearch(e.target.value.toUpperCase())} className='form-control'></input>
                    <p></p>
                </div>
                <p></p>
                <Table bordered hover>
                    <thead >
                        <tr className="text-center">
                            <th id='nombre' role="button" onClick={() => setFiltro(0)}>Nombre</th>
                            <th role="button" onClick={() => setFiltro(1)}>Marca</th>
                            <th  >Capacidad</th>
                            <th  >Fecha Creacion</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {renderBotellas()}
                    </tbody>
                </Table>
            </>
        );
    }
    else
    {
        return (
            <>
                <div>
                    <input placeholder='Search' onChange={e=>setSearch(e.target.value.toUpperCase())} className='form-control'></input>
                    <p></p>
                </div>
                <p></p>
                <Table bordered hover>
                    <thead >
                        <tr className="text-center">
                            <th id='nombre' role="button" onClick={() => setFiltro(0)}>Nombre</th>
                            <th role="button" onClick={() => setFiltro(1)}>Marca</th>
                            <th role="button" >Capacidad</th>
                            <th role="button" >Fecha Creacion</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {renderBotellasMarca()}
                    </tbody>
                </Table>
            </>
        );
    }
    
}
