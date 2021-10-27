const fs = require("fs");
const { nanoid } = require("nanoid");
const path = require("path");

const seguimientos_path = path.join(__dirname, "seguimientos.json");

const getSeguimientos = () => {
  return JSON.parse(fs.readFileSync(seguimientos_path, "utf8"));
};

const postSeguimiento = (segumiento) => {
  const seguimientosList = getSeguimientos();
  const id = nanoid(5);
  const nuevoSeguimiento = { ...segumiento, id };
  seguimientosList.push(nuevoSeguimiento);
  const segumientoString = JSON.stringify(seguimientosList);

  fs.writeFileSync(seguimientos_path, segumientoString, function (err, result) {
    if (err) console.log("error", err);
  });

  return nuevoSeguimiento;
};

const deleteSeguimiento = (id) => {
  let seguimientosList = getSeguimientos();
  const indexSeguimiento = seguimientosList.findIndex((seg) => seg.id === id);

  if (indexSeguimiento != -1) {
    seguimientosList.splice(indexSeguimiento, 1);
    const segumientoString = JSON.stringify(seguimientosList);

    fs.writeFileSync(
      seguimientos_path,
      segumientoString,
      function (err, result) {
        if (err) console.log("error", err);
      }
    );
  }

  return getSeguimientos();
};

module.exports = {
  getSeguimientos,
  postSeguimiento,
  deleteSeguimiento,
};
