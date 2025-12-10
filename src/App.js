import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Components/Home";
import NoPage from "./Components/NoPage";
import { NuevosContactos } from "./Components/NuevosContactos";
import { Contactados} from "./Components/Contactados";
import { Recontactados} from "./Components/Recontactados";
import { useEffect } from "react";
import { getToken } from './Api/UserHelper';
import { createDate } from './Api/BaseHelper';

function App() {


  const CreateToken = () => {
    const DateNow = new Date();
    let ExpirationDate;

    console.log(localStorage.getItem('ExpirationDate'));

    if (localStorage.length === 0) {

        getToken('admin', '1234').then(async data => {
        
        await new Promise(resolve => setTimeout(resolve, 1000)); // un segundo de espera para evitar colapso
        console.log("Luego de la espera dentro del then");

        ExpirationDate = createDate(data.expirationYear, data.expirationMonth, data.expirationDay, data.expirationHour, data.expirationMinute);
        localStorage.setItem('ExpirationDate',ExpirationDate);
        localStorage.setItem('token', data.token);
      });
    }
        
    if(localStorage.length > 0){
      ExpirationDate = localStorage.getItem('ExpirationDate');
    }

    if ( (localStorage.length !== 0) && (new Date(ExpirationDate).getTime() < new Date(DateNow).getTime() )  ) {

      getToken('admin', '1234').then(async data => 
      {
        await new Promise(resolve => setTimeout(resolve, 1000)); // un segundo en la demora para pedir credenciales nuevamente.
        ExpirationDate = createDate(data.expirationYear, data.expirationMonth, data.expirationDay, data.expirationHour, data.expirationMinute);
        localStorage.setItem('ExpirationDate',ExpirationDate);
        localStorage.setItem('token', data.token);
      });
      console.log("Actualizo");
    }
  }


  useEffect(() => {

    const observer = new MutationObserver((mutations) => {
      CreateToken();
      //Aquí podes manejar los cambios en el DOM
      //console.log('El DOM ha cambiado:', mutations);
    });

    observer.observe(document.body, { childList: true, subtree: true, });
        return () => {
      observer.disconnect();
    };

  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar



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

