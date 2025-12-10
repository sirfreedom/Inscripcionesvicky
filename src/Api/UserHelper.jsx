import { Fill } from './BaseHelper';


//Token, ExpirationYear, ExpirationMonth, ExpirationDay,ExpirationHour, ExpirationMinutes
export const getToken = async (User, Pass) => 
{
    let data;
    try 
    {
        data = await Fill('Account/login',{ user: User, pass: Pass },'POST');
    } 
    catch (ex) 
    {
        console.error('Error en gettoken',ex);
    }
    return data;
}
