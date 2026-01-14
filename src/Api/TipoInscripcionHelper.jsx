import { Fill } from './BaseHelper';

export const List = async (token) =>
{
let data;
let tempdata;
let url = 'api/TipoInscripcion/ListMenu';
let param =  [];
try 
{
    tempdata = await Fill(url,param,'GET',token);
    data = await tempdata.tipoinscripciones;
}
catch(ex)
{
    console.error('Error en find inscripcion',ex);
}
return data;
}

