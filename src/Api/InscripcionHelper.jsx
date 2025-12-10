import { Fill } from './BaseHelper';

export const FindInscripcion = async (id,token) =>
{
let data;
let tempdata;
let url = 'api/Inscripcion/Find';
let param =  [{ "IdTipoContacto": id }] ;
try 
{
    tempdata = await Fill(url,param,'GET',token);
    data = await tempdata.inscripciones;
}
catch(ex)
{
    console.error('Error en find inscripcion',ex);
}
return data;
}


export const Contacted = async (id,iscontacted) =>
{
let data;
let url = 'api/Inscripcion/Contacted';
let param =  [{ "Id": id  ,"IsContacted": iscontacted } ];
try 
{
    data = await Fill(url,param,'PATCH');
}
catch(ex)
{
    console.error('Error en Contacted',ex);
}
return data;
}

export const Error = async (id,iserror) =>
{
let data;
let url = 'api/Inscripcion/Error';
let param =  [{ "Id": id, "IsError": iserror }];
try 
{
    data = await Fill(url,param,'PATCH');
}
catch(ex)
{
    console.error('Error en Error',ex);
}
return data;
}