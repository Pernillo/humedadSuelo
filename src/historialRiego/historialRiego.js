const fs = require("fs");
const { nanoid } = require("nanoid");
const path = require("path");

const historialRiego_path = path.join(__dirname, "historialRiego.json");

const getHistorialRiego = () => {
  return JSON.parse(fs.readFileSync(historialRiego_path, "utf8"));
};

const postHistorialRiego = (histroialRiego) => {
  const historialRiegoList = getHistorialRiego();
  const id = nanoid(5);
  const nuevoSeguimiento = { ...histroialRiego, id };
  historialRiegoList.push(nuevoSeguimiento);
  const histroialRiegoString = JSON.stringify(historialRiegoList);

  fs.writeFileSync(historialRiego_path, histroialRiegoString, function (err, result) {
    if (err) console.log("error", err);
  });

  return nuevoSeguimiento;
};

const deleteHistorialRiego = (id) => {
  let historialRiegoList = getHistorialRiego();
  const indexSeguimiento = historialRiegoList.findIndex((seg) => seg.id === id);

  if (indexSeguimiento != -1) {
    historialRiegoList.splice(indexSeguimiento, 1);
    const segumientoString = JSON.stringify(historialRiegoList);

    fs.writeFileSync(
      historialRiego_path,
      segumientoString,
      function (err, result) {
        if (err) console.log("error", err);
      }
    );
  }

  return getHistorialRiego();
};

module.exports = {
  getHistorialRiego,
  postHistorialRiego,
  deleteHistorialRiego,
};
