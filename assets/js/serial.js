const SerialPort = require("serialport");
const byteLength= require("@serialport/parser-readline");
const portName = "COM1";
const http = require("http");
const nodemailer = require("nodemailer");

const { remote } = require("electron");


const w = remote.BrowserWindow.getFocusedWindow();

// const w =  remote.getCurrentWindow();



function winclose() {
    w.close();
}

function winmin() {
  w.minimize();
}



const port = new SerialPort(portName, {
  baudRate: 2400,
  dataBits:7,
  stopBits:1,
parity:"none",

}).setEncoding('utf8');

const parser =new byteLength("W\n");
port.pipe(parser);
var x;
var y;
var z;
var temp;

var dryTime, loadedTime, grossTime;

port.on("open", line => console.log("Open Connection"));

parser.on("data", line => {temp= Number(line.substring(1,8)) ; console.log(line); });



function dryFetch() {
  dryTime = new Date().toString();
  document.querySelector(".df-btn").classList.add("d-none");
  document.querySelector(".df-val").classList.remove("d-none");
  x = Number(temp);
  console.log(temp);
  
  
  document.querySelector(
    ".df-val"
  ).innerHTML = `${x} Kgs<p class="h6 font-weight-normal text-muted">Time:${dryTime}</p>`;

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
  loadedTime = new Date().toString();
  document.querySelector(".lf-btn").classList.add("d-none");
  document.querySelector(".lf-val").classList.remove("d-none");
  y = Number(temp);
  time_y = new Date().toString();
  document.querySelector(
    ".lf-val"
  ).innerHTML = `${y} Kgs<p class="h6 font-weight-normal text-muted">Time:${loadedTime}</p>`;
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
  grossTime = new Date().toString();
  z = y - x;
  document.querySelector(".gf-btn").classList.add("d-none");
  document.querySelector(".gf-val").classList.remove("d-none");
  time_z = new Date().toString();
  document.querySelector(
    ".gf-val"
  ).innerHTML = `${z} Kgs <p class="h6 font-weight-normal text-muted">Time:${grossTime}</p>`;
  if (z === undefined) {
    setTimeout(() => {
      document.querySelector(
        ".gf-val"
      ).innerHTML = `Error Getting Weight Please Reset`;
    }, 1000);
  } else {
    let ticketNo;
    await db.collection("ticketsCount")
      .get()
      .then(snapshots => {
        ticketNo = Number(snapshots.docs[0].data().NoOfTickets) + 1;
      });
    console.log(ticketNo);
    var cname = document.getElementById("c_name").value;
    var mname = document.getElementById("m_name").value;
    var vname = document.getElementById("v_name").value;
    var sname = document.getElementById("s_name").value;
    console.log(x);
    if (cname !== "" && vname !== "" && !isNaN(x) && !isNaN(y) && !isNaN(z)) {
      var userData = {
        Ticket_No: ticketNo,
        Customer_Name: cname,
        Vehicle_Number: vname,
        Material: mname,
        Supplier: sname,
        Tire_Weight: x,
        Tire_Weight_Time: dryTime,
        Loaded_Weight: y,
        Loading_Time: loadedTime,
        Gross_Weight: z,
        Gross_Weight_Time: grossTime,
        Timestamp: Date.now()
      };
      console.log(userData);
      const tick = await db
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("Ticket")
        .add(userData);
      document.querySelector(".slip").classList.add("d-none");
      document.querySelector(".tick-reg").classList.remove("d-none");
      setTimeout(() => {
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

        document.getElementById("c_name").value = "";
        document.getElementById("v_name").value = "";
        document.querySelector(".tick-reg").classList.add("d-none");
        document.querySelector(".components").classList.remove("d-none");


      }, 2000);
  let count=0;
      db.collection("ticketsCount")
        .doc("8Wb4NtiBXO8coiKwRTW7")
        .update({ NoOfTickets: ticketNo });
      db.collection("users")
        .doc(auth.currentUser.uid)
        .collection("Ticket")
        .where("Timestamp", ">=", new Date().setHours(0, 0, 0, 0))
        .where("Timestamp", "<=", new Date().setHours(23, 59, 59, 59))
        .get()
        .then(snapshots => {
          snapshots.forEach(doc => {
            count++;
          });
          document.querySelector(".slip-gen").textContent = `${count}`;
          document.querySelector(".tick-gen").textContent = `${ticketNo}`;
        });

      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "exigencyaid@gmail.com",
          pass: "qwertY123."
        }
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: "ARSS group<ARSS@gmail.com>", // sender address
        to: "rahul.122293@gmail.com,theuniqueraj@gmail.com", // list of receivers
        subject: `ARSS Weighbridge info for Ticket:${ticketNo}` , // Subject line
        text: "New Vehicle Weighed", // plain text body
        html: `<table style=" border:2px solid red">

            <tbody>
            <tr>
              <td>Ticket Number ::</td>
              <td>${ticketNo}</td>
             </tr>
              <tr>
                  <td>Customer Name ::</td>
                  <td>${cname}</td>
              </tr>
              <tr>
                  <td>Vehicle Number ::</td>
                  <td>${vname}</td>
              </tr>
              <tr>
                  <td>Material Name ::</td>
                  <td>${mname}</td>
              </tr>
              <tr>
                  <td>Supplier Name ::</td>
                  <td>${sname}</td>
              </tr>
              <tr>
                  <td>-------------</td>
                  <td>-------------</td>
              </tr>
              <tr>
                  <td>Tyre Weight ::</td>
                  <td>${x}</td>
              </tr>
              <tr>
                  <td>Loaded Weight ::</td>
                  <td>${y}</td>
              </tr>
              <tr>
                  <td>Gross Weight ::</td>
                  <td>${z}</td>
              </tr>
              <tr>
                  <td>-------------</td>
                  <td>-------------</td>
              </tr>
              <tr>
                  <td>Tyre Weight Time ::</td>
                  <td>${dryTime}</td>
              </tr>
              <tr>
                  <td>Loaded Weight Time ::</td>
                  <td>${loadedTime}</td>
              </tr>
              <tr>
                  <td>Gross Weight Time ::</td>
                  <td>${grossTime}</td>
              </tr>
              
              
            </tbody>
        </table>
        <p><b>ARSS Group Connect</b></p>` // html body
      });

      console.log("Mail sent: %s", info.messageId);
    } else {
      document.getElementById("form-cau").classList.remove("d-none");
    }
  }
}

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

document.getElementById("reset").addEventListener("click", e => {
  e.preventDefault();
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

  document.getElementById("c_name").value = "";
  document.getElementById("v_name").value = "";
});

port.write("ROBOT POWER ON\n");
//> ROBOT ONLINE
