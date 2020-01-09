
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const portName = "COM3";
const port = new SerialPort(portName, { 
    baudRate: 9600
})

const parser = new Readline("\r\n")
port.pipe(parser)

port.on('open',line => console.log("Open Connection"));
parser.on('data', line => console.log(`> ${line}`))
port.write('ROBOT POWER ON\n')
//> ROBOT ONLINE