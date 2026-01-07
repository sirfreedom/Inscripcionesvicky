import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "./Components/Layout";
import Home from "./Components/Home";
import NoPage from "./Components/NoPage";
import {Inscripcion} from "./Components/Inscripcion";
import { CreateToken } from './Helper/TokenHelper';
import { List } from "./Api/TipoInscripcionHelper";

function App() {

    const [TipoInscripcion, setTipoInscripcion] = useState([]);

    useEffect(() => {

      CreateMenu();

    }, []);


const CreateMenu = async () => 
{
    let Token;
    let data;
    try 
    {
        Token = await CreateToken();
        data = await List(Token);
        setTipoInscripcion(data);
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

      <div className='container' >
        <div className='row'>
          <div className='col-12'>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />

                  {TipoInscripcion?.map((item, index) => {
                  return (
                  <Route key={"route" + index} path={item.tipo} element={<Inscripcion key={index} IdTipoInscripcion={item.id} TipoInscripcion={item.tipo} ></Inscripcion>} />
                  )
                  })}

                  <Route path="*" element={<NoPage />} />
                </Route>
              </Routes>
            </BrowserRouter>

          </div>
        </div>
      </div>

    </>
  );
}

export default App;

