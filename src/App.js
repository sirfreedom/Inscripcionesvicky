import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Components/Home";
import NoPage from "./Components/NoPage";
import { NuevosContactos } from "./Components/NuevosContactos";
import { Contactados} from "./Components/Contactados";
import { Recontactados} from "./Components/Recontactados";
import {CreateToken} from './Helper/TokenHelper';

import { useEffect } from "react";

function App() {

useEffect(() => 
  {
    const observer = new MutationObserver(async (mutations) => 
    {
      await CreateToken();
      //console.log('El DOM ha cambiado:', mutations);
    });
    observer.observe(document.body, { childList: true, subtree: true, });
        return () => {
      observer.disconnect();
    };
  }, []);




  return (
    <>

      <div className='container' >
        <div className='row'>
          <div className='col-12'>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="NuevosContactos" element={<NuevosContactos />} />
                  <Route path="Contactados" element={<Contactados />} />
                  <Route path="Recontactados" element={<Recontactados />} />
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

