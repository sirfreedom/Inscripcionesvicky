//const BASEURL = 'https://sirfreedom.somee.com/';
//const BASEURL = 'https://localhost:5000/';
const BASEURL = 'http://localhost:8080/';
 
function toQueryString(params) {
  if (!Array.isArray(params) || params.length === 0) return '';
  const obj = params[0];
  return Object.entries(obj)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

export const Fill = async (Url, lParam, Method,Token) => {
  let response;
  let data = [];
  let Parameters;
  const headers = {};
  try {
  
    // Construye el objeto de opciones para fetch
    const fetchOptions = {
      method: Method,
      credentials: 'include'
    };

      if (Token && Token.trim() !== '') 
      {
        headers['Authorization'] = 'Bearer ' + Token;
      }
    
    // Agrega Content-Type solo si el método no es GET (asumiendo que GET no tiene body)
    // Puedes ajustar esta condición según tus necesidades (ej: si envías body en POST)
    if (Method !== 'GET' && Method !== 'HEAD') {
      headers['Content-Type'] = 'application/json';
      fetchOptions.body = JSON.stringify(lParam); // Usa lParam como body para POST
    }

    if(Method === 'GET' || Method === 'DELETE' || Method === 'PATCH' ){
      Parameters = toQueryString(lParam);
    }
    
    // Si hay headers, agrégalos a las opciones de fetch
    if (Object.keys(headers).length > 0) {
      fetchOptions.headers = headers;
    }

    //Se envian como paramentros
    if(Method === 'GET' || Method === 'DELETE' || Method === 'PATCH' ){
    response = await fetch(BASEURL + Url + '?' + Parameters, fetchOptions);
    }

    if(Method === 'PUT' || Method === 'POST'  ){
      response = await fetch(BASEURL + Url, fetchOptions);
    }

    if (response.ok && Method === 'GET') {
      data = await response.json();
    }

    if(Method === 'POST' && response.status === 200) //Si es post y 200 devuelvo datos
    {
      data = await response.json();
    }

    if(Method === 'POST' && response.status === 201) //Si es 201 es insercion y no devuelvo nada.
    {
      //console.log(response);
    }

  }
  catch (ex) {
    console.error('Error Fill', ex);
  }
  return data;
};


export const EmptyAllProperties = (obj) => {
  const objVaciado = {};

  for (const key in obj) {
    
    if (obj.hasOwnProperty(key)) 
    {
        objVaciado[key] = null;
    }
  }
  return objVaciado;
}

export const ChangePropertyValue = (obj, propiedad, nuevoValor) => {
   
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('El primer argumento debe ser un objeto válido.');
  }
  if (typeof propiedad !== 'string') {
    throw new Error('La propiedad debe ser una cadena.');
  }
  return {
    ...obj,
    [propiedad]: nuevoValor
  };
};


export const createDate = (year, month, day, hour, minute) => {
  var fecha;
  try {

    if (
      typeof year !== 'number' ||
      typeof month !== 'number' ||
      typeof day !== 'number' ||
      typeof hour !== 'number' ||
      typeof minute !== 'number'
    ) {
      throw new Error('Todos los parámetros deben ser números');
    }
    // Ajustamos el mes (JavaScript usa 0-11)
    const monthIndex = month - 1;

    // Creamos el objeto Date
    fecha = new Date(year, monthIndex, day, hour, minute);

    // Verificamos si la fecha es válida
    if (isNaN(fecha.getTime())) {
      throw new Error('Fecha inválida');
    }

    // Verificamos que los valores ingresados coincidan con los de la fecha creada
    // (por si JavaScript ajustó automáticamente valores fuera de rango)
    if (
      fecha.getFullYear() !== year ||
      fecha.getMonth() !== monthIndex ||
      fecha.getDate() !== day ||
      fecha.getHours() !== hour ||
      fecha.getMinutes() !== minute
    ) {
      throw new Error('Los valores proporcionados no corresponden a una fecha válida');
    }

  }
  catch (e) {
    throw e;
  }
  return fecha;
}