$("#target").submit(function (event) {
  let descripcion = document.getElementById("descripcion");
  let costo = document.getElementById("costo");
  let fecha = document.getElementById("fecha");
  const nuevoSeguimiento = {
    descripcion: descripcion.value,
    costo: costo.value,
    fecha: fecha.value,
  };

  fetch(`http://localhost:3000/seguimientos`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevoSeguimiento),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
       descripcion.value = "";
       costo.value = "";
       fecha.value = "";
    });

  event.preventDefault();
});
