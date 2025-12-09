import { useState, useEffect } from "react";
import { FindInscripcion } from "../Api/InscripcionHelper";
import { Contacted } from "../Api/InscripcionHelper";
import { Error } from "../Api/InscripcionHelper";
import '../Css/bootstrap.min.css';

export const Inscripcion = (props) => {
    const [Nuevos, setNuevos] = useState([]);

    useEffect(() => {

        FindInscripcion(props.IdTipoInscripcion).then(data => {
            setNuevos(data);
        });

    }, []);


const CheckIsContacted = (ischecked,id) => {
    Contacted(ischecked,id).then(data => {
    });
};

const CheckIsError = (ischecked,id) => {
    Error(ischecked,id).then(data => {
    });
    
};

    return (
        <>
            <h3> Lista {props.TipoInscripcion}  </h3>

            <div className="list-group">

                    {Nuevos?.map((item, index) => {
                    return (

                    <a key={'aprincipal' + item.id} id={'aprincipal' + item.id} href="#" className="list-group-item list-group-item-action">

                            <div key={'row' + item.id} id={'row' + item.id} className="row">

                                <div key={'col21' + item.id} className="col-1">
                                    <a href="#" key={'a_danger' + item.id} className="list-group-item list-group-item-action list-group-item-danger">
                                        <input key={'chk1' + item.id} id={'chk1' + item.id} type="checkbox" defaultChecked={item.iserror} 
                                        onChange={e => CheckIsError (item.id,e.target.checked)}
                                        /> X
                                    </a>
                                </div>

                                <div key={'col22' + item.id} className="col-1">
                                    <a href="#" key={'a_info' + item.id} className="list-group-item list-group-item-action list-group-item-info">
                                        <input key={'chk2' + item.id} id={'chk2' + item.id} type="checkbox" defaultChecked={item.iscontacted} 
                                        onChange={e => CheckIsContacted(item.id,e.target.checked)}
                                        /> ✓
                                    </a>
                                </div>

                                <div key={'col23' + item.id} className="col-10">
                                    <a key={'alink' + item.id} id={'alink' + item.id}
                                        href={`https://api.whatsapp.com/send?phone=+${item.telefono}&text=${item.texto}`}
                                        target="_blank"
                                    >
                                        <div className={item.tiponumero === 'ERROR' ? 'spinner-grow text-danger' : 'hidden'} role="status" > </div>
                                        - {item.telefono} - {item.nombre} - {item.carrera}
                                    </a>
                                </div>

                            </div>

                        </a>

                        )
                    })}


            </div>


        </>

    )
}

export default Inscripcion