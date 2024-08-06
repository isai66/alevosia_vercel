function Buscar()
  {
    let CodigoPostal=document.querySelector("#CP").value;
    consultarAPI(CodigoPostal);
  }
  const consultarAPI=async(CodigoPostal)=>{
  const ApiKey='cff1095c-acf3-47ab-8bb0-ed0979e4f30b';
  
  const urlApi= `https://api.copomex.com/query/info_cp/${CodigoPostal}?type=simplified&token=${ApiKey}`;

  console.log(urlApi)
  fetch(urlApi)
  .then(response=>response.json())
  .then(result=>{
    if(!result.error){

    document.getElementById('CP').className = 'content';

    document.getElementById('txtestado').value = result.response.estado; 
    document.getElementById('txtmunicipio').value = result.response.municipio; 
    LimpiarSelect();
    crearOpciones(result.response.asentamiento);}
    else
    {
      document.getElementById('CP').className = 'form-control is-invalid';
      document.getElementById('error_message').innerText = result.error_message;

      // Limpiar inputs
      document.getElementById('txtestado').value = ''; 
      document.getElementById('txtmunicipio').value = ''; 
      // Limpiar opciones de select en caso de que existan
      LimpiarSelect();
    }
  })
  .catch(err => console.error(err));
}

function crearOpciones(arreglo) {
  let select = document.getElementById('txtcolonia');
  for (let i = 0; i < arreglo.length; i++) {
      let opcion = document.createElement('option');
      // Asigna el valor de la opcion
      opcion.value = arreglo[i];
      // Asigna el contenido de text de la opcion
      opcion.textContent = arreglo[i];
      select.options.add(opcion);
  }
}

function LimpiarSelect() {
  // Recorre y elimina la opciones que tenga el select y solo deja la opcion por defecto
  for (let i = document.getElementById('txtcolonia').options.length; i >= 1; i--) {
      document.getElementById('txtcolonia').remove(i);
  }
};