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

  const CreateToken = async () => {
    const DATE_NOW = new Date();
    const EXPIRATION_DATE_KEY = 'ExpirationDate';
    const TOKEN_KEY = 'token';

    // Función auxiliar para obtener un nuevo token y almacenarlo
    const fetchAndStoreNewToken = async () => {
        try {
            console.log("Obteniendo nuevo token...");
            // Asegúrate de que getToken maneje errores (idealmente)
            const data = await getToken('admin', '1234');
            
            // Usar Date.parse() para crear la fecha es más seguro y estándar 
            // si la API devuelve una cadena de fecha ISO.
            // Si 'createDate' es tu función, asumo que devuelve un objeto Date o una cadena/timestamp
            const expirationDate = createDate(
                data.expirationYear, 
                data.expirationMonth, 
                data.expirationDay, 
                data.expirationHour, 
                data.expirationMinute
            );
            
            // Guardar el timestamp (en milisegundos) es mejor que el objeto Date 
            // o una cadena de fecha compleja para la comparación
            localStorage.setItem(EXPIRATION_DATE_KEY, expirationDate.getTime());
            localStorage.setItem(TOKEN_KEY, data.token);
            console.log("Token y fecha de expiración actualizados.");
            return data.token;
        } catch (error) {
            console.error("Error al obtener o almacenar el nuevo token:", error);
            // Re-lanzar el error para que el llamador sepa que falló
            throw new Error("Fallo al generar el token.");
        }
    };

    // 1. Obtener los valores actuales del almacenamiento local
    const storedExpirationTimestamp = localStorage.getItem(EXPIRATION_DATE_KEY);
    const storedToken = localStorage.getItem(TOKEN_KEY);
    
    // Convertir el timestamp almacenado a número
    const expirationTime = storedExpirationTimestamp ? parseInt(storedExpirationTimestamp, 10) : null;
    
    // 2. Comprobar si el token es nulo o está expirado
    let isExpired = true;
    if (expirationTime && storedToken) {
        // Comprobar si la fecha actual es menor que la fecha de expiración
        // DATE_NOW.getTime() < expirationTime significa que AÚN ES VÁLIDO
        isExpired = DATE_NOW.getTime() >= expirationTime;
    }

    if (!storedToken || isExpired) {
        // La lógica de actualizar o crear es la misma: ¡solicitar uno nuevo!
        const logMessage = storedToken  ? "Actualizando token por vencimiento."    : "Creando token por primera vez (no encontrado).";
        console.log(logMessage);
        return fetchAndStoreNewToken();
    } 
    
    // 3. Si no ha expirado, devolver el token almacenado
    console.log("Token existente y válido. Devolviendo token almacenado.");
    return storedToken;
};


  useEffect(() => {

    const observer = new MutationObserver(async (mutations) => {
      await CreateToken();
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

