const clients={
Shreyas:{id:"BRCLT-45871293",password:"SHR129",balance:2000000000,limit:1000000,pending:3855},
Zain:{id:"BRCLT-58392147",password:"ZAI129",balance:11000000000,limit:2500000,pending:3855},
Rana:{id:"BRCLT-76120438",password:"RAN129",balance:3500000000,limit:1500000,pending:3855},
Nadeem:{id:"BRCLT-91274051",password:"NAD129",balance:9000000,limit:700000,pending:3855},
Gani:{id:"BRCLT-34781926",password:"GAN129",balance:2400000,limit:40000,pending:3855},
Dhanush:{id:"BRCLT-62845017",password:"DHA129",balance:6800000,limit:400000,pending:3855},
Vinayak:{id:"BRCLT-73456218",password:"VIN129",balance:9500000,limit:500000,pending:5000}
};let current="Zain";let orderCount=12;
function money(n){return "₹"+n.toLocaleString("en-IN")}
function login(){let n=document.getElementById("username").value.trim();let cid=document.getElementById("clientId").value.trim();let p=document.getElementById("password").value;if(!clients[n]||clients[n].id!==cid||clients[n].password!==p){toast("Check the fictional username, client ID and password");return}current=n;const c=clients[n];document.getElementById("login").classList.add("hidden");document.getElementById("app").classList.remove("hidden");document.getElementById("sideName").textContent=n;document.getElementById("sideId").textContent=c.id;document.getElementById("avatar").textContent=n[0];document.getElementById("balance").textContent=money(c.balance);document.getElementById("limit").textContent=money(c.limit);document.getElementById("pendingBalance").textContent=money(c.pending);renderCharts();renderActivity();renderClientWithdrawalUpdates()}
function logout(){location.reload()}
function go(page){document.querySelectorAll(".page").forEach(x=>x.classList.add("hidden"));document.getElementById(page).classList.remove("hidden");document.querySelectorAll(".nav").forEach(x=>x.classList.toggle("active",x.dataset.page===page));document.getElementById("pageTitle").textContent=page==="trading"?"Paper Trading":page[0].toUpperCase()+page.slice(1)}
document.querySelectorAll(".nav").forEach(x=>x.onclick=()=>go(x.dataset.page));
function renderActivity(){document.getElementById("activity").innerHTML=`<div class="activity"><b>Paper order filled</b><div class="muted">MSN Energy · BUY · ₹1,20,000</div><small>Today, 10:20</small></div><div class="activity"><b>Payment pending</b><div class="muted">₹2,500 · SIM-2508-001</div><small>Today, 08:40</small></div><div class="activity"><b>Withdrawal recorded</b><div class="muted">₹75,000 · SIM-WD-8841</div><small>21 Aug 2026</small></div>`}
let chartInstance, selectedInstrument="MSN Energy", tradeSide="BUY";
const prices={"MSN Energy":1284.20,"Demo Bank":842.60,"Atlas Motors":516.35,"Nova IT":2108.75};
const changes={"MSN Energy":"+2.14%","Demo Bank":"+0.81%","Atlas Motors":"-0.42%","Nova IT":"+1.32%"};

function renderCharts(){
  const el=document.getElementById("performance");
  if(el) new Chart(el,{type:"line",data:{labels:["1","5","10","15","20","25","30"],datasets:[{label:"Simulated value",data:[90,91,89.5,92,93,94.5,95],tension:.35}]},options:{plugins:{legend:{display:false}},scales:{x:{grid:{display:false}},y:{grid:{color:"#202837"}}}}});
  const m=document.getElementById("market");
  if(m){const base=prices[selectedInstrument];const data=[-18,-7,4,-12,10,18,3,25,11,31,22,base/52].map((x,i)=>+(base-35+x*(i<11?1:0)).toFixed(2));chartInstance=new Chart(m,{type:"line",data:{labels:["09:15","09:45","10:15","10:45","11:15","11:45","12:15","12:45","13:15","13:45","14:15","15:15"],datasets:[{label:"Mock price",data:data,tension:.35,fill:true}]},options:{plugins:{legend:{display:false}},scales:{x:{grid:{display:false}},y:{grid:{color:"#202837"}}}}});}
  updateEstimate();
}
function setSide(side){tradeSide=side;document.getElementById("buyTab").classList.toggle("active",side==="BUY");document.getElementById("sellTab").classList.toggle("active",side==="SELL");document.getElementById("tradeButton").textContent=`Place ${side} order`}
function selectInstrument(name){selectedInstrument=name;document.getElementById("instrumentTitle").textContent=name;document.getElementById("livePrice").textContent=money(prices[name]);document.getElementById("liveChange").textContent=changes[name];if(chartInstance){chartInstance.destroy();chartInstance=null}renderCharts();toast(`${name} selected`)}
function updateEstimate(){const q=Number(document.getElementById("qty")?.value||0);const lp=Number(document.getElementById("limitPrice")?.value||0);const p=lp||prices[selectedInstrument]||0;const out=document.getElementById("estimatedValue");if(out)out.textContent=money(q*p)}
document.addEventListener("input",e=>{if(e.target.id==="qty"||e.target.id==="limitPrice")updateEstimate()});
function setIntervalLabel(btn){document.querySelectorAll(".intervals button").forEach(x=>x.classList.remove("active"));btn.classList.add("active");toast(`Chart interval changed to ${btn.textContent}`)}
function filterInstruments(){const q=document.getElementById("stockSearch").value.toLowerCase();document.querySelectorAll("#tickerStrip>div").forEach(x=>x.style.display=x.innerText.toLowerCase().includes(q)?"grid":"none")}
function paperOrder(){const inst=document.getElementById("instrument").value;const q=Number(document.getElementById("qty").value)||1;const side=tradeSide;const ref="SIM-"+Math.floor(Math.random()*900000+100000);orderCount++;document.getElementById("ordersCount").textContent=orderCount;document.getElementById("ordersBadge").textContent=orderCount+" orders";const tr=document.getElementById("orderHistory").insertRow(0);tr.innerHTML=`<td>${new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}</td><td class="${side==="BUY"?"success":"rejected"}">${side}</td><td>${inst}</td><td>${q}</td><td><span class="status approved">Filled</span></td>`;toast(`${side} ${q} × ${inst} recorded · ${ref}`)}
function withdraw(){const a=Number(document.getElementById("withdrawAmount").value);if(!a||a<=0){toast("Enter a valid simulated amount");return}const tr=document.getElementById("withdrawTable").insertRow(0);tr.innerHTML=`<td>30 Aug 2026</td><td>${money(a)}</td><td>SIM-WD-${Math.floor(Math.random()*9000+1000)}</td><td><span class="status pending">Pending</span></td>`;toast("Simulated withdrawal request added")}
function paperOrder(side){const inst=document.getElementById("instrument").value;const q=Number(document.getElementById("qty").value)||1;orderCount++;document.getElementById("ordersCount").textContent=orderCount;toast(`${side} ${q} × ${inst} recorded as paper order`)}
function mockUpload(kind){
  if(kind==="Bank proof"){const s=document.getElementById("bankProofStatus");if(s)s.textContent="Submitted (mock)";}
  if(kind==="Aadhaar address proof"){const s=document.getElementById("aadhaarAddressStatus");if(s)s.textContent="Submitted (mock)";}
  toast(`${kind} upload is mocked — no document is transmitted or verified`);
}
function submitClientDetails(){
  const name=(document.getElementById("clientFullName")?.value||"").trim();
  const phone=(document.getElementById("clientPhone")?.value||"").trim();
  const status=document.getElementById("clientSubmitStatus");
  if(!name||!phone){if(status)status.textContent="Enter fictional name and phone details to continue.";return;}
  if(status)status.textContent=`Client details submitted to the local simulation record for ${name}.`;
  toast("Client details saved in simulation only");
}
function postComment(){let v=document.getElementById("comment").value.trim();if(!v)return;let d=document.createElement("div");d.className="message";d.innerHTML=`<b>Client note</b><p>${v.replace(/[<>&]/g,m=>({"<":"&lt;",">":"&gt;","&":"&amp;"}[m]))}</p><small>Just now · Simulation</small>`;document.getElementById("comments").prepend(d);document.getElementById("comment").value=""}
function downloadCSV(type){const rows=type==="account"?"Date,Type,Reference,Amount,Status\\n2026-08-30,Payment,SIM-2508-001,2500,Pending\\n2026-08-21,Withdrawal,SIM-WD-8841,75000,Approved":"Date,Instrument,Side,Quantity,Price\\n2026-08-30,MSN Energy,BUY,10,1284.20\\n2026-08-28,Demo Bank,SELL,20,842.60";const blob=new Blob([rows],{type:"text/csv"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`msn-brock-${type}-simulation.csv`;a.click()}
function toast(t){let x=document.createElement("div");x.textContent=t;x.style="position:fixed;right:20px;bottom:20px;z-index:50;background:#20283a;color:#fff;padding:14px 18px;border:1px solid #344058;border-radius:12px;box-shadow:0 15px 40px #0008";document.body.appendChild(x);setTimeout(()=>x.remove(),2500)}

function renderClientWithdrawalUpdates(){
  const box=document.getElementById("clientUpdateGrid"); if(!box)return;
  const names=Object.keys(clients);
  box.innerHTML=names.map(n=>{
    const c=clients[n];
    return `<div class="client-update"><div><b>${n}</b><small>${c.id}</small></div><div><span>Balance</span><b>${money(c.balance)}</b></div><div><span>Pending</span><b>${money(c.pending)}</b></div><div><span>Withdrawal limit</span><b>${money(c.limit)}</b></div></div>`;
  }).join("");
}

function renderLoginClients(){
  const box=document.getElementById("clientList"); if(!box)return;
  box.innerHTML=Object.entries(clients).map(([name,c])=>
    `<button class="client-select" onclick="selectLoginClient('${name.replace(/'/g,"\\'")}')"><span class="client-avatar">${name[0]}</span><span><b>${name}</b><small>${c.id}</small></span><i>›</i></button>`
  ).join("");
}
function selectLoginClient(name){
  const c=clients[name]; if(!c)return;
  document.getElementById("username").value=name;
  document.getElementById("clientId").value=c.id;
  document.getElementById("password").value=c.password;
}
document.addEventListener("DOMContentLoaded",renderLoginClients);
