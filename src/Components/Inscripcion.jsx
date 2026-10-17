import { useState, useEffect } from "react";
import { FindInscripcion } from "../Api/InscripcionHelper";
import { Contacted } from "../Api/InscripcionHelper";
import { Error } from "../Api/InscripcionHelper";
import '../Css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';


export const Inscripcion = (props) => {
    const [Contactos, setContactos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        initializeToken();

    }, []);


const CheckIsContacted = async (ischecked,id) => 
{
    await Contacted(ischecked,id);
};

const CheckIsError = async (ischecked,id) => 
{
    await Error(ischecked,id);
};

const initializeToken = async () => 
{
    let data;
    try 
    {
        data = await FindInscripcion(1);
        setContactos(data);
        setIsLoading(false);

        console.log('dsadasdas');

    } 
    catch (error) 
    {
        console.error("Fallo crítico en la inicialización del token:", error);
    } 
    finally 
    {
    }
};

    return (
        <>
            <h3> Lista {props.TipoInscripcion}  </h3>

            {(isLoading) && 
            (
            <div className="d-flex gap-2 justify-content-center py-5"> 
            <Spinner animation="border" variant="warning" />
            <span role="status">Cargando contactos ...</span> 
            </div>
            )}

            <div className="list-group">

                    {Contactos?.map((item, index) => {
                    return (
            
                    <div key={'aprincipal' + item.id} id={'aprincipal' + item.id} className="list-group-item list-group-item-action">
            
                            <div className="row">

                                <div key={'col21' + item.id} className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-5">
                                    <a href="#" key={'a_danger' + item.id} className="list-group-item list-group-item-action list-group-item-danger">
                                        <input key={'chk1' + item.id} id={'chk1' + item.id} type="checkbox" defaultChecked={item.iserror} 
                                        onChange={e => CheckIsError (item.id,e.target.checked)}
                                        /> X
                                    </a>
                                </div>
                                <div key={'col22' + item.id} className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-5">
                                    <a href={`https://api.whatsapp.com/send?phone=+${item.telefono}&text=${item.texto}`} key={'a_info' + item.id} className="list-group-item list-group-item-action list-group-item-info">
                                        <input key={'chk2' + item.id} id={'chk2' + item.id} type="checkbox" defaultChecked={item.iscontacted} 
                                        onChange={e => CheckIsContacted(item.id,e.target.checked)}
                                        /> ✓
                                    </a>
                                </div>
                                <div key={'col22' + item.id} className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-5">
                                    <a href={`https://api.whatsapp.com/send?phone=+${item.telefono}&text=${item.sinvacante}`} key={'a_warning' + item.id} className="list-group-item list-group-item-action list-group-item-warning">
                                        <input key={'chk3' + item.id} id={'chk3' + item.id} type="checkbox" defaultChecked={item.iscontacted} 
                                        onChange={e => CheckIsContacted(item.id,e.target.checked)}
                                        /> Sin Vacantes
                                    </a>
                                </div>

                                <div className={item.tiponumero === 'ERROR' ? 'col spinner-grow text-danger' : 'hidden'}  >
                                    {(item.tiponumero === 'Normal' ? '' : ' ERROR ')}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <br></br>
                                </div>
                            </div>

                            <div className="row">
                              <div className="col">
                              </div>
                              <div key={'col23' + item.id} className="col-xl-9 col-md-9 col-xxl-9 col-lg-9 col-sm-11">
                                    <a key={'alink' + item.id} id={'alink' + item.id}
                                        href={`https://api.whatsapp.com/send?phone=+${item.telefono}&text=${item.texto}`}
                                        target="_blank"
                                    >
                                      {item.telefono} - {item.nombre} - {item.carrera}
                                    </a>
                              </div>
                                        
                              <div>
                                {item.fecha}
                              </div>
                            </div>
                        </div>
                        )
                    })}


            </div>


        </>

    )
}

export default Inscripcion