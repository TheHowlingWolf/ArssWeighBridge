
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const portName = "COM3";
const port = new SerialPort(portName, { 
    baudRate: 9600
})

const parser = new Readline("\r\n")
port.pipe(parser)
var x;
var y;
var z;
var temp;
port.on('open',line => console.log("Open Connection"));


parser.on('data', line => temp=line);
function dryFetch()
{
    document.querySelector('.df-btn').classList.add('d-none');
    document.querySelector('.df-val').classList.remove('d-none');
    x=temp;
    document.querySelector('.df-val').innerHTML = `${x} Kgs`;
    if(x === undefined)
    {
        setTimeout(()=>{
            document.querySelector('.df-val').innerHTML = `Error Getting Weight Please Reset`;  
            document.querySelector('.gf-btn').classList.add('d-none');
            document.querySelector('.gf-val').classList.remove('d-none');
            document.querySelector('.gf-val').innerHTML = `Exception Reading Parameters`; 
        },1000);
    }
}
function loadedFetch()
{
    document.querySelector('.lf-btn').classList.add('d-none');
    document.querySelector('.lf-val').classList.remove('d-none');
    y=temp;
    document.querySelector('.lf-val').innerHTML = `${y} Kgs`;
    if(y === undefined)
    {
        setTimeout(()=>{
            document.querySelector('.lf-val').innerHTML = `Error Getting Weight Please Reset`; 
            document.querySelector('.gf-btn').classList.add('d-none');
            document.querySelector('.gf-val').classList.remove('d-none'); 
            document.querySelector('.gf-val').innerHTML = `Exception Reading Parameters`; 
        },1000);
    }
}
z=y-x;
function grossFetch()
{
    document.querySelector('.gf-btn').classList.add('d-none');
    document.querySelector('.gf-val').classList.remove('d-none');
    document.querySelector('.gf-val').innerHTML = `${z} Kgs`;
    if(z === undefined)
    {
        setTimeout(()=>{
            document.querySelector('.gf-val').innerHTML = `Error Getting Weight Please Reset`;
        },1000);
    }
}
function reset_slip(){
    x=undefined;
    y=undefined;
    z=undefined;
    document.querySelector('.df-btn').classList.remove('d-none');
    document.querySelector('.df-val').classList.add('d-none');
    document.querySelector('.df-val').innerHTML = `${x} Kgs`;

    document.querySelector('.lf-btn').classList.remove('d-none');
    document.querySelector('.lf-val').classList.add('d-none');
    document.querySelector('.lf-val').innerHTML = `${y} Kgs`;

    document.querySelector('.gf-btn').classList.remove('d-none');
    document.querySelector('.gf-val').classList.add('d-none');
    document.querySelector('.gf-val').innerHTML = `${z} Kgs`;
}

port.write('ROBOT POWER ON\n')
//> ROBOT ONLINE