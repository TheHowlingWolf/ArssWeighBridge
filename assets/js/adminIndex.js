function moreDetails(siteObj) {
    document.querySelector(".scrollable").classList.add("d-none");
    document.querySelector(".details-site").classList.remove("d-none");
    document.querySelector("#download-slips").classList.add("d-none");
    siteChose = siteObj;
    
    db.collection("users")
      .doc(siteChose)
      .collection("Ticket")
      .orderBy('Ticket_No','desc')
      .limit(50)
      .get()
      .then(snapshot => {
        var siteTable = document.getElementById("site-details");
        siteTable.innerHTML = "";
        console.log(snapshot.docs);
        snapshot.docs.map(doc => {
          datas = doc.data();
          
          siteTable.innerHTML += `<tr>
              <td >${datas.Ticket_No}</td>
              <td >${datas.Customer_Name}</td>
              <td > ${datas.Vehicle_Number}</td> 
              <td > ${datas.Material}</td>
              <td > ${datas.Supplier}</td>
              <td > ${datas.Tire_Weight}</td>
              <td>${datas.Loaded_Weight} </td>
              <td>${datas.Gross_Weight}</td>
              <td>${new Date(datas.Gross_Weight_Time).toLocaleTimeString()}</td>
              <td>${new Date(datas.Gross_Weight_Time).toLocaleDateString()}</td>
              </tr>
              `;
        });
      });
  }
  

  
  function back() {
    document.querySelector(".scrollable").classList.remove("d-none");
    document.querySelector(".details-site").classList.add("d-none");
    document.querySelector("#download-slips").classList.add("d-none");
    document.querySelector(".settings-menu").classList.add("d-none");
    document.querySelector(".settings-menu-updatepass").classList.add("d-none");
    document.querySelector(".settings-menu-updateauth").classList.add("d-none");
    document.getElementById("site-details").innerHTML = "";
  
  }
  
  function settings(){
    document.querySelector(".scrollable").classList.add("d-none");
    document.querySelector(".details-site").classList.add("d-none");
    document.querySelector("#download-slips").classList.add("d-none");
    document.querySelector(".settings-menu").classList.remove("d-none");
    document.querySelector(".settings-menu-updatepass").classList.add("d-none");
    document.querySelector(".settings-menu-updateauth").classList.add("d-none");
  }
  
  function updatePass()
  {
    document.querySelector(".scrollable").classList.add("d-none");
    document.querySelector(".details-site").classList.add("d-none");
    document.querySelector("#download-slips").classList.add("d-none");
    document.querySelector(".settings-menu").classList.add("d-none");
    document.querySelector(".settings-menu-updatepass").classList.remove("d-none");
    document.querySelector(".settings-menu-updateauth").classList.add("d-none");
  }
  
  function authPass()
  {
    document.querySelector(".scrollable").classList.add("d-none");
    document.querySelector(".details-site").classList.add("d-none");
    document.querySelector("#download-slips").classList.add("d-none");
    document.querySelector(".settings-menu").classList.add("d-none");
    document.querySelector(".settings-menu-updatepass").classList.add("d-none");
    document.querySelector(".settings-menu-updateauth").classList.remove("d-none");
  }
  
  function setBack(){
      document.querySelector(".scrollable").classList.add("d-none");
    document.querySelector(".details-site").classList.add("d-none");
    document.querySelector("#download-slips").classList.add("d-none");
    document.querySelector(".settings-menu").classList.remove("d-none");
    document.querySelector(".settings-menu-updatepass").classList.add("d-none");
    document.querySelector(".settings-menu-updateauth").classList.add("d-none");
    document.querySelector('.auth-error').innerHTML = '';
    document.querySelector('.pass-error').innerHTML = '';
  }
  
  var sites = document.getElementById("sites");
  var siteChose;
  db.collection("UserProfile")
    .get()
    .then(snapshot => {
      snapshot.docs.map(doc => {
        if (doc.data().siteName.toLowerCase() != "admin")
          sites.innerHTML += ` <div class="col-7 bg-warning p-3 m-2  text-center  ">
              <span>
              <i class="text-dark fa-3x fas fa-map-marker-alt p-2"></i>
          </span>
               <h4 class="text-uppercase text-dark ">
                  ${doc.data().siteName}
                  </h4>
                  <button class="btn  border-danger bg-dark text-white mt-1 " onclick="moreDetails('${
                    doc.data().uid
                  }')">View
                      Details</button>
              </div>`;
      });
    });
  
  const filter = document.getElementById("date-form");
  filter.addEventListener("submit", e => {
    e.preventDefault();
  
    const startDate = new Date(filter["startDate"].value).getTime();
    const endDate = new Date(filter["endDate"].value).getTime();
  
    
    var fileTitle;
    db.collection("UserProfile")
      .where("uid", "==", siteChose)
      .get()
      .then(snapshot => {
        fileTitle = Date.now() + snapshot.docs[0].data().siteName;
      });
    db.collection("users")
      .doc(siteChose)
      .collection("Ticket")
      .where("Timestamp", ">=", startDate)
      .where("Timestamp", "<=", endDate)
      .get()
      .then(snapshot => {
        var Details = [];
        snapshot.docs.forEach(doc => {
          const detail = doc.data();
          Details.push(detail);
        });
  
        exportCSVFile(headers, Details, fileTitle);
        // var tableData = document.getElementById('site-details');
        // snapshot.docs.map(doc => {
        //     datas = doc.data();
        //     console.log(datas);
        //     tableData.innerHTML += `<tr>
        //    <td >${datas.Customer_Name}</td>
        //    <td>${datas.Gross_Weight}</td>
        //    <td>${new Date(datas.Gross_Weight_Time).toLocaleTimeString()}</td>
        //    <td>${datas.Loaded_Weight} </td>
        //    <td > ${new Date(datas.Loading_Time).toLocaleTimeString()}</td>
        //    <td > ${datas.Material}</td>
        //    <td > ${datas.Supplier}</td>
        //    <td > ${datas.Tire_Weight}</td>
        //    <td > ${new Date(datas.Tire_Weight_Time).toLocaleTimeString()}</td>
        //    <td > ${datas.Vehicle_Number}</td>
  
        //    <td > ${new Date(datas.Tire_Weight_Time).toLocaleDateString()}</td>
        //    </tr>
        //    `;
        // })
      });
  });
  
  function downloadPage() {
    document.querySelector(".scrollable").classList.add("d-none");
    document.querySelector(".details-site").classList.add("d-none");
    document.querySelector("#download-slips").classList.remove("d-none");
    document.querySelector(".settings-menu").classList.add("d-none");
    document.querySelector(".settings-menu-updatepass").classList.add("d-none");
    document.querySelector(".settings-menu-updateauth").classList.add("d-none");
  }
  
  function convertToCSV(objArray) {
    var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    var str = "";
  
    for (var i = 0; i < array.length; i++) {
      var line = "";
      for (var index in array[i]) {
        if (line != "") line += ",";
  
        line += array[i][index];
      }
  
      str += line + "\r\n";
    }
  
    return str;
  }
  
  function exportCSVFile(headers, items, fileTitle) {
    if (headers) {
      items.unshift(headers);
    }
  
    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);
  
    var csv = this.convertToCSV(jsonObject);
  
    var exportedFilenmae = fileTitle + ".csv" || "export.csv";
  
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) {
        // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", exportedFilenmae);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
  
  var headers = {
    Customer_Name: "Customer Name".replace(/,/g, ""),
    Gross_Weight: "Gross Weight",
    Gross_Weight_Time: "Gross Weight Time".replace(/,/g, ""),
    Loaded_Weight: "Loaded Weight",
    Loading_Time: "Loading Time".replace(/,/g, ""),
    Material: "Material",
    Supplier: "Supplier",
    Ticket_No: "Ticket No",
    Timestamp: "Timestamp",
    Tire_Weight: "Tire Weight",
    Tire_Weight_Time: "Tire Weight Time".replace(/,/g, ""),
    Vehicle_Number: "Vehicle Number"
  };
  
  function adminback() {
    document.querySelector(".scrollable").classList.add("d-none");
    document.querySelector(".details-site").classList.remove("d-none");
    document.querySelector("#download-slips").classList.add("d-none");
  }
  
  
  const searchBar = document.getElementById('search-ticket');
  searchBar.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('tableBack').classList.add('d-none');
    document.getElementById('searchBack').classList.remove('d-none');
    var searchItem = searchBar['searchTicket'].value;
    console.log(searchItem)
    document.getElementById('site-details').innerHTML = "";
    db.collection("users")
      .doc(siteChose)
      .collection("Ticket")
      .where("Ticket_No", "==", Number(searchItem))
      .get()
      .then(snapshot => {
        dataLength = snapshot.docs.length;
        datas = snapshot.docs;
        console.log(datas);
        
  
        if (dataLength > 0) {
          document.getElementById('site-details').innerHTML = `
            <tr>
            <td >${datas[0].data().Ticket_No}</td>
            <td >${datas[0].data().Customer_Name}</td>
            <td > ${datas[0].data().Vehicle_Number}</td> 
            <td > ${datas[0].data().Material}</td>
            <td > ${datas[0].data().Supplier}</td>
            <td > ${datas[0].data().Tire_Weight}</td>
            <td>${datas[0].data().Loaded_Weight} </td>
            <td>${datas[0].data().Gross_Weight}</td>
            <td>${new Date(datas[0].data().Gross_Weight_Time).toLocaleTimeString()}</td>
            <td>${new Date(datas[0].data().Gross_Weight_Time).toLocaleDateString()}</td>
            
            </tr>
          `
        }
        else{
          document.getElementById('site-details').innerHTML = '<tr> <td colspan="9"><b>  No Results Found </b> </td> </tr>';
        }
      })
  
  })
  
  function SearchBack(){
    document.getElementById('tableBack').classList.remove('d-none');
    document.getElementById('searchBack').classList.add('d-none');
    moreDetails(siteChose);
  }
  
  document.querySelector('.update-auth-btn').addEventListener('click',(e)=>{
    e.preventDefault();
    
    (async function updateAuthPass(){
        var newAuthKey = document.getElementById('authUpdatePass').value;
        var oldAuthKey = document.getElementById('authOldPass').value;
        var adminKey;
        await db.collection("ticketsCount").get().then((snapshot)=>{
            adminKey=snapshot.docs[0].data().adminKey;   
        });

            if(adminKey === oldAuthKey && oldAuthKey !== newAuthKey && newAuthKey!= "" && oldAuthKey!=="")
            {
                await db.collection("ticketsCount").doc("8Wb4NtiBXO8coiKwRTW7")
                .update({ adminKey: newAuthKey });

                document.querySelector('.con-reg').classList.remove('d-none');
                document.querySelector(".settings-menu-updateauth").classList.add("d-none");
                setTimeout(()=>{
                    document.querySelector('.con-reg').classList.add('d-none');
                    document.querySelector(".settings-menu").classList.remove("d-none");
                },2000);

            }
            else if ( adminKey !== oldAuthKey)
            {
                document.querySelector('.auth-error').innerHTML = `OPPS! Old Auth Key Doesn't Match`;
            }
            else if(oldAuthKey === newAuthKey )
            {
                document.querySelector('.auth-error').innerHTML = `OPPS! New And Old Keys Cannot Be Same`;
            }
            else
            {
                document.querySelector('.auth-error').innerHTML = `OPPS! Please Fill The Fields`;
            }
    })();
    
  });


  document.querySelector('.update-pass-btn').addEventListener('click',(e)=>{
    e.preventDefault();
    
    (async function updateAuthPass(){
        var newPassKey = document.getElementById('updatePass').value;
        var oldPassKey = document.getElementById('oldPass').value;
        var adminKey;
        
        var user = auth.currentUser;
        var credential = firebase.auth.EmailAuthProvider.credential(user.email, oldPassKey);
        await user.reauthenticateWithCredential(credential).then(function() {
            if(oldPassKey !== newPassKey && newPassKey!= "" && oldPassKey!=="")
            {
                user.updatePassword(newPassKey).then(()=>{
                    document.querySelector('.con-reg').classList.remove('d-none');
                    document.querySelector(".settings-menu-updatepass").classList.add("d-none");
                    setTimeout(()=>{
                        document.querySelector('.con-reg').classList.add('d-none');
                        document.querySelector(".settings-menu").classList.remove("d-none");
                    },2000);
                })
                .catch((error)=>{
                    var errorMessage = error.message;
                    document.querySelector('.pass-error').innerHTML = `OPPS! ${errorMessage}`;
                });

            }
            else if(oldPassKey === newPassKey )
            {
                document.querySelector('.pass-error').innerHTML = `OPPS! New And Old Keys Cannot Be Same`;
            }
            else
            {
                document.querySelector('.pass-error').innerHTML = `OPPS! Please Fill The Fields`;
            }
          })
          .catch(function(error) {
            var errorMessage = error.message;
                    document.querySelector('.pass-error').textContent = `OPPS! ${errorMessage}`;
          }); 
    })();
    
  });