import { useState, useEffect } from "react";
import { FindInscripcion } from "../Api/InscripcionHelper";

export const NuevosContactos = () => {
    const [Nuevos, setNuevos] = useState([]);

    useEffect(() => {

        FindInscripcion(2).then(data => {
            setNuevos(data);
            console.log(data);
        });

    }, []);

    return (
        <>
            <h4>Lista de Nuevos</h4>

            <div className="list-group">

                    {Nuevos?.map((item, index) => {
                    return (

                    <a href="#" className="list-group-item list-group-item-action">

                            <div key={'row' + item.id} id={'row' + item.id} className="row">

                                <div key={'col21' + item.id} className="col-1">
                                    <a href="#" key={'a_danger' + item.id} className="list-group-item list-group-item-action list-group-item-danger">
                                        <input key={'chk1' + item.id} id={'chk1' + item.id} type="checkbox" /> X
                                    </a>
                                </div>

                                <div key={'col22' + item.id} className="col-1">
                                    <a href="#" key={'a_info' + item.id} className="list-group-item list-group-item-action list-group-item-info">
                                        <input key={'chk2' + item.id} id={'chk2' + item.id} type="checkbox" /> ✓
                                    </a>
                                </div>

                                <div key={'col23' + item.id} className="col-10">
                                    <a key={'alink' + item.id} id={'alink' + item.id}
                                        href={`https://api.whatsapp.com/send?phone=+${item.telefono}&text=${encodeURIComponent(item.texto)}`}
                                        target="_blank"
                                    >
                                    <div className={item.tiponumero === 'ERROR' ? 'spinner-grow text-danger' : 'hidden'} role="status" > </div>

                                        {item.tiponumero} 
                                        
                                        - {item.telefono} - {item.nombre} - {item.carrera}
                                    </a>
                                </div>

                            </div>

                        </a>
                        )
                    })}





            </div>












            {/*




        {Test.map((rowTest, indexTest) => 
        
         <div key={indexTest}>
            {rowTest.imageText}
         </div>
         
        )}
      
        <input id='txtkey' type='texbox' value={Token} onChange={e => TestInput(e.value)} ></input>

        <Button key="modalfinish_btnTest" variant="secondary" >
         Test
        </Button>

        <Button key="modalfinish_btnLogin" variant="secondary" onClick={TestMethodLogin}>
         Login
        </Button>

        <Button key="modalfinish_btnGet" variant="secondary" onClick={TestMethodGet}>
         Prueba Test Get
        </Button>
        
        <Button key="modalfinish_btnPut" variant="secondary" onClick={TestMethodPut}>
         Prueba Test Put
        </Button>

        
        <Button key="modalfinish_btnpost" variant="secondary" onClick={TestMethodPost}>
         Prueba Test Post
        </Button>

                
        <Button key="modalfinish_btnDelete" variant="secondary" onClick={TestMethodDelete}>
         Prueba Test Delete
        </Button>

                
        <Button key="modalfinish_btnPatch" variant="secondary" onClick={TestMethodPatch}>
         Prueba Test Patch
        </Button>


        <Button key="modalfinish_btnGet" variant="secondary" onClick={TestMethodGet}>
         Prueba Test Get
        </Button>

        */}





        </>

    )
}

export default NuevosContactos