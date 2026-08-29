let data={balance:125000,pending:25000,status:"Processing",message:"Your information was updated successfully."};
let countdown=5;
function formatMoney(amount){return "₹"+amount.toLocaleString("en-IN")}
function updateScreen(){
  document.getElementById("balance").textContent=formatMoney(data.balance);
  document.getElementById("pending").textContent=formatMoney(data.pending);
  document.getElementById("status").textContent=data.status;
  document.getElementById("message").textContent=data.message;
  document.getElementById("time").textContent=new Date().toLocaleTimeString("en-IN");
  countdown=5;
}
function automaticUpdate(){
  data.balance+=1000;
  data.pending+=500;
  const statuses=["Processing","Updated","Pending","Completed"];
  data.status=statuses[Math.floor(Math.random()*statuses.length)];
  data.message="Latest information received at "+new Date().toLocaleTimeString("en-IN");
  updateScreen();
}
updateScreen();
setInterval(()=>{
  countdown--;
  document.getElementById("countdown").textContent=countdown;
  document.getElementById("progressBar").style.width=((5-countdown)/5)*100+"%";
  if(countdown<=0){automaticUpdate();document.getElementById("progressBar").style.width="0%";}
},1000);
