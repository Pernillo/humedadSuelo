const SerialPort = require("serialport");
const Delimiter = require("@serialport/parser-delimiter");
const yenv = require("yenv");

const env = yenv();
const port = new SerialPort(env.SERIAL_PORT);
const parser = port.pipe(new Delimiter({ delimiter: "\n" }));

module.exports = { parser };
