import { getToken } from '../Api/UserHelper';
import { createDate } from '../Api/BaseHelper';


export const CreateToken = async () => {
    const DATE_NOW = new Date();
    const EXPIRATION_DATE_KEY = 'ExpirationDate';
    const TOKEN_KEY = 'token';

    const fetchAndStoreNewToken = async () => {
    try {
            console.log("Obteniendo nuevo token...");
            const data = await getToken('admin', '1234');
            
            const expirationDate = createDate(
                data.expirationYear, 
                data.expirationMonth, 
                data.expirationDay, 
                data.expirationHour, 
                data.expirationMinute
            );
            
            localStorage.setItem(EXPIRATION_DATE_KEY, expirationDate.getTime());
            localStorage.setItem(TOKEN_KEY, data.token);
            console.log("Token y fecha de expiración actualizados.");
            return data.token;
        } 
        catch (error) 
        {
            console.error("Error al obtener o almacenar el nuevo token:", error);
            throw new Error("Fallo al generar el token.");
        }
    };

    const storedExpirationTimestamp = localStorage.getItem(EXPIRATION_DATE_KEY);
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const expirationTime = storedExpirationTimestamp ? parseInt(storedExpirationTimestamp, 10) : null;
    
    let isExpired = true;
    if (expirationTime && storedToken) {
        isExpired = DATE_NOW.getTime() >= expirationTime;
    }

    if (!storedToken || isExpired) {
        const logMessage = storedToken  ? "Actualizando token por vencimiento."    : "Creando token por primera vez (no encontrado).";
        console.log(logMessage);
        return fetchAndStoreNewToken();
    } 
        
    console.log("Token existente y válido. Devolviendo token almacenado.");
    return storedToken;
};