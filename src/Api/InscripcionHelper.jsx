import { Fill } from './BaseHelper';


export const FindInscripcion = async (id) =>
{
let data;
let tempdata;
let url = 'api/Inscripcion/Find';
let param =  [{ "IdTipoContacto": id }] ;
try 
{
    tempdata = await Fill(url,param,'GET');
    data = await tempdata.inscripciones;
}
catch(ex)
{
    console.error('Error en find inscripcion',ex);
}
return data;
}


