const CLIENTS=[
["Shreyas","BRCLT-45871293","SHR129",4500000000,3855],
["Zain","BRCLT-797555","ZAI129",11000000000,3855],
["Rana","BRCLT-808835","RAN129",6500000000,3855],
["Nadeem","BRCLT-91274051","NAD129",9500000,3855],
["Gani","BRCLT-34781926","GAN129",2400000,3855],
["Dhanush","BRCLT-62845017","DHA129",1400000,3655],
["Vinayak","BRCLT-73456218","VIN129",9500000,5000],
["Shabana","BRCLT-SHABANA","SHA129",650000,3000],
["Devraj","BRCLT-DEVRAJ","DEV129",5600000,3000],
["Bharth","BRCLT-BHARTH","BHA129",460000,3000],
["Yashvantha","BRCLT-YASHVANTHA","YAS129",6000000,3000],
["Adarsh","BRCLT-ADARSH","ADA129",200,3000],
["Sadik","BRCLT-ADIK","SAD129",2500,1000],
["Tanveer","BRCLT-TANVEER","TAN129",550000,1500]
];
const $=id=>document.getElementById(id);
const money=n=>"₹"+Math.round(n).toLocaleString("en-IN");
const key=id=>"mtdemo_"+id;
let client=null,state=null,price=24850,series=Array.from({length:50},(_,i)=>price-(50-i)*3+Math.random()*18);

CLIENTS.forEach(c=>{let o=document.createElement("option");o.value=c[1];o.textContent=`${c[0]} — ${c[1]}`;$("clientId").appendChild(o)});
function load(c){client=c;state=JSON.parse(localStorage.getItem(key(c[1]))||'{"investment":0,"profit":0,"trades":[],"withdrawals":[],"comments":[]}');$("loginView").classList.add("hidden");$("appView").classList.remove("hidden");$("sideName").textContent=c[0];$("sideId").textContent=c[1];$("topClient").textContent=c[0]+" • "+c[1];$("welcome").textContent="Welcome, "+c[0];$("available").textContent=money(c[3]+state.profit);$("total").textContent=money(c[3]+state.profit+state.investment);$("investment").textContent=money(state.investment);$("pending").textContent=money(c[4]);$("profit").textContent=(state.profit>=0?"+":"")+money(state.profit);$("nextPayment").textContent="Not provided";renderTrades();renderWithdrawals();renderComments()}
function save(){localStorage.setItem(key(client[1]),JSON.stringify(state))}
$("loginBtn").onclick=()=>{let c=CLIENTS.find(x=>x[1]==$("clientId").value);if($("password").value!==c[2]){$("loginError").textContent="Invalid demo password.";return} $("loginError").textContent="";load(c)};
$("password").onkeydown=e=>{if(e.key==="Enter")$("loginBtn").click()};
$("logoutBtn").onclick=()=>{client=null;$("appView").classList.add("hidden");$("loginView").classList.remove("hidden");$("password").value=""};
document.querySelectorAll(".nav").forEach(b=>b.onclick=()=>{document.querySelectorAll(".nav").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.querySelectorAll(".page").forEach(p=>p.classList.remove("active-page"));$(b.dataset.target).classList.add("active-page");drawAll()});
function tick(){let old=price;price=Math.max(100,price+(Math.random()-.49)*34);series.push(price);series=series.slice(-50);let pct=(price-24850)/24850*100;$("niftyHero").textContent=price.toFixed(2);$("niftyHeroPct").textContent=(pct>=0?"+":"")+pct.toFixed(2)+"%";$("tradePrice").textContent=price.toFixed(2);drawAll();$("clock").textContent=new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit",second:"2-digit"});if(client&&Math.random()<.18){state.profit+=Math.round((price-old)*3);$("profit").textContent=(state.profit>=0?"+":"")+money(state.profit);$("available").textContent=money(client[3]+state.profit);save()}}
function draw(canvas){if(!canvas)return;let ctx=canvas.getContext("2d"),w=canvas.clientWidth,h=canvas.clientHeight,d=devicePixelRatio||1;canvas.width=w*d;canvas.height=h*d;ctx.scale(d,d);ctx.clearRect(0,0,w,h);ctx.strokeStyle="#1c2a3b";ctx.lineWidth=1;for(let i=1;i<5;i++){ctx.beginPath();ctx.moveTo(0,h*i/5);ctx.lineTo(w,h*i/5);ctx.stroke()}let min=Math.min(...series),max=Math.max(...series),range=max-min||1;ctx.beginPath();series.forEach((v,i)=>{let x=i*(w-16)/(series.length-1)+8,y=h-14-(v-min)/range*(h-28);i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.strokeStyle="#42dfb3";ctx.lineWidth=2;ctx.stroke()}
function drawAll(){draw($("chart"));draw($("tradeChart"))}
function renderTrades(){$("tradeHistory").innerHTML=state.trades.length?state.trades.slice().reverse().map(t=>`<div class="trade-item"><span><b>${t.side}</b> ${t.symbol}<br><small>${t.time}</small></span><span>${money(t.amount)}<br><small>@ ${t.price}</small></span></div>`).join(""):`<div class="history empty">No trades yet.</div>`}
$("buyBtn").onclick=()=>trade("BUY");$("sellBtn").onclick=()=>trade("SELL");
function trade(side){let amount=Number($("tradeAmount").value),symbol=$("symbol").value;if(!amount||amount<=0){$("tradeMsg").textContent="Enter a valid demo amount.";return}state.trades.push({side,symbol,amount,price:price.toFixed(2),time:new Date().toLocaleString()});state.investment+=side==="BUY"?amount:-amount;state.profit+=Math.round((Math.random()-.35)*amount*.012);save();load(client);$("tradeMsg").textContent=`Demo ${side} order recorded.`;$("tradeAmount").value=""}
$("clearTrades").onclick=()=>{state.trades=[];save();renderTrades()};
$("policyBtn").onclick=()=>{if(!$("withdrawAmount").value||!$("bankAccount").value){alert("Enter the demo withdrawal amount and demo bank account.");return}$("policyBox").classList.remove("hidden")};
$("agree").onchange=()=>{$("feeBtn").disabled=!$("agree").checked};
$("feeBtn").onclick=()=>{$("feeBox").classList.remove("hidden");$("feeBtn").textContent="Policy Accepted"};
$("withdrawBtn").onclick=()=>{let a=Number($("withdrawAmount").value),u=$("utr").value.trim();if(!u){alert("Enter a demo UTR/reference.");return}state.withdrawals.push({amount:a,utr:u,time:new Date().toLocaleString()});save();renderWithdrawals();alert("Demo withdrawal submitted. No real transaction was made.");$("withdrawAmount").value="";$("bankAccount").value="";$("utr").value=""};
function renderWithdrawals(){$("withdrawHistory").innerHTML=state.withdrawals.length?state.withdrawals.slice().reverse().map(x=>`<div class="withdraw-item"><b>${money(x.amount)}</b> • DEMO • ${x.utr}<br><small>${x.time}</small></div>`).join(""):`<div class="history empty">No demo withdrawals yet.</div>`}
$("commentBtn").onclick=()=>{let v=$("commentInput").value.trim();if(!v)return;state.comments.push({text:v,time:new Date().toLocaleString()});save();$("commentInput").value="";renderComments()};
function renderComments(){$("commentsList").innerHTML=state.comments.length?state.comments.slice().reverse().map(x=>`<div class="comment">${x.text}<time>${x.time}</time></div>`).join(""):`<div class="history empty">No updates yet.</div>`}
function watch(){let names=["NIFTY 50","SENSEX","RELIANCE","TATA MOTORS","INFOSYS","HDFC BANK"];$("watchlist").innerHTML=names.map((n,i)=>{let p=price*(i?1+(i-2)*.006:1)+(Math.random()-0.5)*8;let up=Math.random()>.45;return `<div class="watch-row"><b>${n}</b><span>${p.toFixed(2)} <i class="${up?"up":"down"}">${up?"+":"-"}${(Math.random()*1.4).toFixed(2)}%</i></span></div>`}).join("")}
setInterval(()=>{tick();watch()},1000);watch();setTimeout(drawAll,100);
window.addEventListener("resize",drawAll);
