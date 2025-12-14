import { getToken } from '../Api/UserHelper';
import { createDate } from '../Api/BaseHelper';

export const CreateToken = async () => {
   const DATE_NOW = new Date();
    const EXPIRATION_DATE_KEY = 'ff'; // Clave para la fecha de expiración (milisegundos)
    const EXPIRATION_DATE_YY = 'yy';
    const EXPIRATION_DATE_MM = 'mm';
    const EXPIRATION_DATE_DD = 'dd';
    const EXPIRATION_DATE_H = 'h';
    const EXPIRATION_DATE_M = 'm';
    const TOKEN_KEY = 'token';
    let isExpired = true;
    let logMessage;
    let storedExpirationTimestamp;
    let storedToken;
    let expirationTime;

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
        localStorage.setItem(EXPIRATION_DATE_YY,data.expirationYear);
        localStorage.setItem(EXPIRATION_DATE_MM,data.expirationMonth);
        localStorage.setItem(EXPIRATION_DATE_DD,data.expirationDay);
        localStorage.setItem(EXPIRATION_DATE_H,data.expirationHour);
        localStorage.setItem(EXPIRATION_DATE_M,data.expirationMinute);
        localStorage.setItem(TOKEN_KEY, data.token);
            return data.token;
        } 
        catch (error) 
        {
            console.error("Error al obtener o almacenar el nuevo token:", error);
            throw new Error("Fallo al generar el token.");
        }
    };


    storedExpirationTimestamp = localStorage.getItem(EXPIRATION_DATE_KEY);
    storedToken = localStorage.getItem(TOKEN_KEY);
    expirationTime = storedExpirationTimestamp ? parseInt(storedExpirationTimestamp, 10) : null;

    if (expirationTime && storedToken) {
        isExpired = DATE_NOW.getTime() >= expirationTime;
    }

    if (!storedToken || isExpired) {
        logMessage = storedToken  ? "Actualizando token por vencimiento." : "Creando token por primera vez (no encontrado).";
        return fetchAndStoreNewToken();
    } 
        
    console.log("Token existente y válido. Devolviendo token almacenado.");
    return storedToken;
};