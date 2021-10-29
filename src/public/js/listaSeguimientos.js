/* LLamar al listado de seguimientos */
fetch("http://192.168.1.116:3000/seguimientos")
  .then((response) => response.json())
  .then((data) => listarSeguimientos(data));

/* Funcion que escribre el html para e listado */
const listarSeguimientos = (data) => {
  let tbdoySeguimiento = document.getElementById("tbodySeguimiento");

  let html = "";

  /* Se construye le html para el listado */
  data.forEach(
    (seguimiento) =>
      (html += `
  <tr>
    <td class="tm-product-name">${seguimiento.descripcion}</td>
    <td class="text-center">Q.${seguimiento.costo}</td>
    <td>${seguimiento.fecha}</td>
    <td><i class="fas fa-trash-alt tm-trash-icon" onClick="eliminarSeguimiento('${seguimiento.id}')"></i></td>
  </tr>
  `)
  );

  tbdoySeguimiento.innerHTML = html;
};

/* Elimina el seguimiento por su id */
const eliminarSeguimiento = (idSeguimiento) => {
  fetch(`http://192.168.1.116:3000/seguimientos/${idSeguimiento}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => listarSeguimientos(data));
};
