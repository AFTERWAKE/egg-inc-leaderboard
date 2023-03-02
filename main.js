function fetchResults (form) {
  var artifact = form.artifact.value;
  var numShips = form.numShips.value;
  var numShips_person = form.numShips_person.value;

  // var url = "https://egg-brosssh.vercel.app/getLeaderboard"
  var url = "https://egg-brosssh-euzfz5iep-brosssh.vercel.app/";
  var params = "?element=" + encodeURIComponent(artifact) +
                "&n=" + encodeURIComponent(numShips) +
                "&top_n=" + encodeURIComponent(numShips_person);
  fetch(url + params, {
    mode: "no-cors"
  })
  .then((data) => {
    // BEGIN Temporary
    data = '{"code":1,"content":[["1","SirFrankOfMan",7,157,3,3,1,0,81],["2","Obiwan KeNOOBie",7,157,6,2,1,0,78],["2","CarpetSage",7,315,6,2,1,0,78],["3","afrefde",7,472,4,2,1,0,76],["3","mennoo1996",7,157,4,2,1,0,76],["4","lnternaIScreaming",7,315,9,1,1,0,75],["5","LimesLimesLimes",7,315,8,1,1,0,74],["5","oOKissMyAsheOo",7,157,2,2,1,0,74],["6","FrawlMont7198",7,315,7,1,1,0,73],["6","abubu0524",7,315,7,1,1,0,73],["6","GoldenProphet9850",4,126,7,1,1,0,73],["7","sac7439",7,315,6,1,1,0,72],["9","Zeiram00X",7,472,10,0,1,0,70],["10","Yoot\u00ece",7,315,9,0,1,0,69],["12","UnintendedFlower4",7,157,7,0,1,0,67],["13","AllikazamOG",7,315,6,0,1,0,66],["13","Elessar49",6,294,6,0,1,0,66],["14","GarrokSR",6,147,5,0,1,0,65],["15","lyradog",7,157,4,0,1,0,64],["17","wood_420",7,157,2,0,1,0,62],["17","PandoraNox",5,136,2,0,1,0,62],["17","M3hni",7,157,2,0,1,0,62],["18","Fablol100",6,107,1,0,1,0,61],["18","Tyler_Newton",7,157,1,0,1,0,61],["22","MayContainNuts49",6,294,9,5,0,0,39]],"success":true}';
    artifact = "bob";
    numShips = 25;
    numShips_person = 1;
    return JSON.parse(data);
    // END Temporary
    // if (!data.ok) {
    //   throw Error(data.status);
    // }
    // return data.json();
  })
  .then((responseText) => {
    console.log(responseText);
    document.querySelector("#result").appendChild(makeTable(responseText.content, artifact));
  })
  .catch((error) => {
    console.error("Whoops! " + error);
  })
}

//
// Some code to make JSON into Tables
//
// return html table element from array of objects
function makeTable(json_objects_arr, artifact) {
  var table = document.createElement('table');
  var keys = getKeysFromArray(json_objects_arr);
  table.appendChild(makeTHEAD(artifact));
  table.appendChild(makeTBODY(json_objects_arr, keys));
  return table;
}

// make header row from array of keys
function makeTHEAD(artifact) {
  var thead = document.createElement('thead');
  var tr = document.createElement('tr');

  var heading = ["Pos", "Name", "Stars", "Capacity", "T1", "T2", "T3", "T4", "Total "+artifact];
  if (artifact == "gold" || artifact == "titanium" || artifact == "tau") {
    delete heading[7];
  }
  heading.forEach(function(header){
    var th = document.createElement('th');
    th.textContent = header;
    tr.appendChild(th)
  });

  // keys.forEach(function(key){
  //   var th = document.createElement('th');
  //   th.textContent = key;
  //   tr.appendChild(th)
  // });
    thead.appendChild(tr);
    return thead;
}

// make rows from key values in json
function makeTBODY(json, keys) {
      var tbody = document.createElement('tbody');
  json.forEach(function(object){
      let tr = document.createElement('tr');
    keys.forEach(function(key){
      var td = document.createElement('td');
      td.textContent = object[key];
      tr.appendChild(td);
    });
      tbody.appendChild(tr);
  });
    return tbody;
}

// return alphabetized array of keys from all objects in an array
function getKeysFromArray(json_objects_arr) {
  var array_of_keys = [];
  json_objects_arr.forEach(function(obj){
    Object.keys(obj).forEach(function(key){
      if (!(array_of_keys.includes(key))) {
        array_of_keys.push(key);
      }
    });
  });
  return array_of_keys.sort();
}
