const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const portName = "COM3";
const http = require("http");
const nodemailer = require("nodemailer");
const { remote } = require("electron");
var win = remote.BrowserWindow.getFocusedWindow();


function winclose(){
    win.close();
}
function winmin(){
    win.minimize();
}

const port = new SerialPort(portName, {
  baudRate: 9600
});

const parser = new Readline("\r\n");
port.pipe(parser);
var x,time_x;
var y,time_;
var z,time_;
var temp;
port.on("open", line => console.log("Open Connection"));

parser.on("data", line => (temp = line));
function dryFetch() {
  document.querySelector(".df-btn").classList.add("d-none");
  document.querySelector(".df-val").classList.remove("d-none");
  x = Number(temp);
  time_x= new Date().toString();
  document.querySelector(".df-val").innerHTML = `${x} Kgs<p class="h6 font-weight-normal text-muted">Time:${time_x}</p>`;

  if (x === undefined) {
    setTimeout(() => {
      document.querySelector(
        ".df-val"
      ).innerHTML = `Error Getting Weight Please Reset`;
      document.querySelector(".gf-btn").classList.add("d-none");
      document.querySelector(".gf-val").classList.remove("d-none");
      document.querySelector(
        ".gf-val"
      ).innerHTML = `Exception Reading Parameters`;
    }, 1000);
  }
}
function loadedFetch() {
  document.querySelector(".lf-btn").classList.add("d-none");
  document.querySelector(".lf-val").classList.remove("d-none");
  y = Number(temp);
  time_y= new Date().toString();
  document.querySelector(".lf-val").innerHTML = `${y} Kgs<p class="h6 font-weight-normal text-muted">Time:${time_y}</p>`;
  if (y === undefined) {
    setTimeout(() => {
      document.querySelector(
        ".lf-val"
      ).innerHTML = `Error Getting Weight Please Reset`;
      document.querySelector(".gf-btn").classList.add("d-none");
      document.querySelector(".gf-val").classList.remove("d-none");
      document.querySelector(
        ".gf-val"
      ).innerHTML = `Exception Reading Parameters`;
    }, 1000);
  }
}

async function grossFetch() {
  z = y - x;
  document.querySelector(".gf-btn").classList.add("d-none");
  document.querySelector(".gf-val").classList.remove("d-none");
  time_z= new Date().toString();
  document.querySelector(".gf-val").innerHTML = `${z} Kgs <p class="h6 font-weight-normal text-muted">Time:${time_z}</p>`;
  if (z === undefined) {
    setTimeout(() => {
      document.querySelector(
        ".gf-val"
      ).innerHTML = `Error Getting Weight Please Reset`;
    }, 1000);
  }

  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "codeventure.kiit.sce@gmail.com",
      pass: "rahul_123."
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "ARSS group<ARSS@gmail.com>", // sender address
    to:
      "rahul.122293@gmail.com,theuniqueraj@gmail.com", // list of receivers
    subject: "ARSS Weighbridge info", // Subject line
    text:
      "New Vehicle Weighed At Khorda at " +
      new Date().toString() +
      `With \n Dry Weight ${x}. Loaded Weight:${y}. Gross Weight: ${z} ` // plain text body
    // html: "<b>Hello  world?</b>" // html body
  });

  console.log("Mail sent: %s", info.messageId);

  //   var options = {
  //     method: "POST",
  //     hostname: "api.msg91.com",
  //     port: null,
  //     path: "/api/v2/sendsms?country=91",
  //     headers: {
  //       authkey: "312318AGW5Gm4OM4Tw5e16d0d0P1",
  //       "content-type": "application/json"
  //     }
  //   };

  //   var req = http.request(options, function(res) {
  //     var chunks = [];

  //     res.on("data", function(chunk) {
  //       chunks.push(chunk);
  //     });

  //     res.on("end", function() {
  //       var body = Buffer.concat(chunks);
  //       console.log(body.toString());
  //     });
  //   });

  //   req.write(
  //     JSON.stringify({
  //       sender: "ARSSGP",
  //       route: "4",
  //       country: "91",
  //       sms: [
  //         {
  //           message:
  //             "New Vehicle Weighed At Khorda at " +
  //            new Date().toString() +
  //             `With \n Dry Weight ${x}. Loaded Weight:${y}. Gross Weight: ${z} `,
  //           to: [7787847713, 7679099464, 7749803313]
  //         }
  //       ]
  //     })
  //   );
  //   req.end();
}
function reset_slip() {
  x = undefined;
  y = undefined;
  z = undefined;
  document.querySelector(".df-btn").classList.remove("d-none");
  document.querySelector(".df-val").classList.add("d-none");
  document.querySelector(".df-val").innerHTML = `${x} Kgs`;

  document.querySelector(".lf-btn").classList.remove("d-none");
  document.querySelector(".lf-val").classList.add("d-none");
  document.querySelector(".lf-val").innerHTML = `${y} Kgs`;

  document.querySelector(".gf-btn").classList.remove("d-none");
  document.querySelector(".gf-val").classList.add("d-none");
  document.querySelector(".gf-val").innerHTML = `${z} Kgs`;
}

port.write("ROBOT POWER ON\n");
//> ROBOT ONLINE
