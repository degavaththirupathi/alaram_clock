const currentTimeDisplay = document.getElementById("current-time");
function updateCurrentTime() {
  const currentTimeDisplay = document.getElementById("current-time");
  if (currentTimeDisplay) {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const ampm = now.getHours() < 12 ? "AM" : "PM";
    currentTimeDisplay.innerText = `${hours}:${minutes}:${seconds} ${ampm}`;
  } else {
    console.error("Element with id 'current-time' not found.");
  }
}

window.addEventListener("DOMContentLoaded", function () {
  setInterval(updateCurrentTime, 1000);
});

let alarmList = [];

const setAlarm = () => {
  let hours = Number(document.querySelector("#setAlarm-hour").value);
  let mins = Number(document.querySelector("#setAlarm-min").value);
  let secs = Number(document.querySelector("#setAlarm-sec").value);
  let ampm = document.querySelector("#setAlarm-ampm").value;

  if (hours === "" || mins === "" || secs === "" || ampm === "") {
    alert("plz enter the Time!!");
    return;
  }
  if (ampm === "AM" && hours > 12) {
    alert(`it shoud be PM.
    plz check and enter again!!`);
    return;
  } else if (ampm === "PM" && hours <= 12) {
    alert(`it shoud be AM.
    plz check and enter again!!`);
    return;
  }


  let ifExist = alarmList.find(
    (ifexist) =>
      hours === ifexist.hours && mins === ifexist.mins && secs === ifexist.secs
  );
  console.log("ifexist", ifExist);
  if (ifExist !== undefined) {
    alert("Alarm already exist!!");
    document.querySelector("#setAlarm-hour").value = "";
    document.querySelector("#setAlarm-min").value = "";
    document.querySelector("#setAlarm-sec").value = "";
    return;
  }


  if (
    hours > 23 ||
    hours < 0 ||
    mins > 59 ||
    mins < 0 ||
    secs > 59 ||
    secs < 0 ||
    ampm === "AM/PM"
  ) {
   

    alert("plz enter a valid Time");
   
    return;
  }

 

  const Alarm = {
    id: Date.now(),
    hours,
    mins,
    secs,
    ampm,
    setime: null,
  };


  alarmList.push(Alarm);


  HandleDisplay(alarmList);
  const currtime = new Date();



  const alarmtime = new Date(
    currtime.getFullYear(),
    currtime.getMonth(),
    currtime.getDate(),
    hours,
    mins,
    secs
  );

  const currhours = currtime.getHours();
  const currmins = currtime.getMinutes();
  const currsecs = currtime.getSeconds();


  const currentmilliseconds =
    (currhours * 60 * 60 + currmins * 60 + currsecs) *
    1000;

  const alarmtimehours = alarmtime.getHours();
  const alarmtimemins = alarmtime.getMinutes();
  const alarmtimesecs = alarmtime.getSeconds();

  const alarmtimemilliseconds =
    (alarmtimehours * 60 * 60 +
      alarmtimemins * 60 +
      alarmtimesecs ) *
    1000;


  let alarmring = alarmtimemilliseconds - currentmilliseconds;

  if(alarmring<=0){
    alarmring+=24*60*60*1000;
  }

  Alarm.setime = setTimeout(() => {
    alert(`It's ${hours}:${mins}:${secs}${ampm}.
           press OK to Turn OFF the alarm!!
  `);
  }, alarmring);

  document.querySelector("#setAlarm-hour").value = "";
  document.querySelector("#setAlarm-min").value = "";
  document.querySelector("#setAlarm-sec").value = "";
};

function handleDelete(i) {
  const deletealarm = alarmList.find((alarm) => alarm.id === i);
  clearTimeout(deletealarm.setime);

  const updateAlarm = alarmList.map((items)=>{
    if(items.id === i){
      return {...items,setime:null}
    }
   return items;
  })
  HandleDisplay(updateAlarm);
  let restalarms = alarmList.filter((alarm) => alarm.id !== i);
  alarmList = restalarms;

  HandleDisplay(alarmList);
}

const HandleDisplay = (alarmList) => {
  const setAlarmlist = document.querySelector("#setAlarm-list");
  setAlarmlist.innerHTML = "";
  setAlarmlist.innerHTML += alarmList.map((item) => {
    const { hours, mins, secs, id, ampm } = item;
    const hours1 = hours.toString().padStart(2, "0");
    const mins1 = mins.toString().padStart(2, "0");
    const secs1 = secs.toString().padStart(2, "0");
    return `
    `;
  });
};