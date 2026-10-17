import { Fill } from './BaseHelper';

export const List = async () =>
{
let data;
let tempdata;
let url = 'api/TipoInscripcion/ListMenu';
let param =  [];
try 
{
    tempdata = await Fill(url,param,'GET');
    data = await tempdata;
}
catch(ex)
{
    console.error('Error en find inscripcion',ex);
}
return data;
}

