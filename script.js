setInterval(showTime, 1000);

function showTime() {
   let date = new Date();
   let h = date.getHours();
   let m = date.getMinutes();
   let s = date.getSeconds();
   let session = "AM";

   if (h == 0) h = 12;
   else if (h > 12) {
      h = h - 12;
      session = "PM";
   }

   h = h < 10 ? "0" + h : h;
   m = m < 10 ? "0" + m : m;
   s = s < 10 ? "0" + s : s;

   let time = `${h} : ${m} : ${s} ${session}`;
   document.getElementById("myClock").innerHTML = time;

   let _timeStamp = Math.floor(date.getTime() / 1000); // calculate the timestamp of evennow(date) in seconds
   if (_timeStamp === alarm_timeStamp) showAlarm();
}

let alarm_timeStamp;
const set_btn = document.getElementById("set");
const dismiss_btn = document.getElementById("dismiss");
const remove_btn = document.getElementById("remove");

set_btn.addEventListener("click", setAlarm);

function setAlarm() {
   let alarmTime = document.getElementById("inputTime").value;
   let alarmDate = document.getElementById("inputDate").value;
   if (alarmTime && alarmDate) {
      // if either inputs are empty, do nothing
      let alarm = `${alarmDate}T${alarmTime}`; // make the standard string template for date constructor function
      alarm_timeStamp = new Date(alarm).getTime() / 1000; // construct the associated Date object and convert it to timestamp in seconds
      remove_btn.classList.remove("hidden"); // show the remove button
   }
}

function showAlarm() {
   myAlarm = setInterval(() => {
      document.body.classList.toggle("alarm");
   }, 400); // change the body color every 400ms
   remove_btn.classList.add("hidden"); // hide the remove button
   dismiss_btn.classList.remove("hidden"); // show the dismiss button
   set_btn.removeEventListener("click", setAlarm); // make the setAlarm btn disabled until the user clicks on dismiss button
}

dismiss_btn.addEventListener("click", () => {
   clearInterval(myAlarm); // stop the body color blinking
   document.body.classList.remove("alarm"); // if the body is still colored, make it back to normal color
   dismiss_btn.classList.add("hidden"); // hide the dismiss button
   set_btn.addEventListener("click", setAlarm); // enable the setAlarm btn again
});

remove_btn.addEventListener("click", () => {
   alarm_timeStamp = 0; // clear the alarm timestamp
   remove_btn.classList.add("hidden"); // hide the remove button
});
