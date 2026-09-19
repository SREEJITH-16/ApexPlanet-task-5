const STORAGE_KEY="focusflow_tasks";
let tasks=JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]");
let currentFilter="all";

const form=document.querySelector("#taskForm");
const input=document.querySelector("#taskInput");
const priority=document.querySelector("#priorityInput");
const list=document.querySelector("#taskList");
const empty=document.querySelector("#emptyState");

function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(tasks));}
function updateStats(){
  const done=tasks.filter(t=>t.done).length,total=tasks.length;
  document.querySelector("#totalCount").textContent=total;
  document.querySelector("#doneCount").textContent=done;
  document.querySelector("#pendingCount").textContent=total-done;
  document.querySelector("#progressPercent").textContent=total?Math.round(done/total*100)+"%":"0%";
}
function render(){
  list.innerHTML="";
  const filtered=tasks.filter(t=>currentFilter==="all"||(currentFilter==="completed"?t.done:!t.done));
  empty.hidden=filtered.length>0;
  filtered.forEach(task=>{
    const item=document.createElement("article");
    item.className=`task ${task.done?"completed":""}`;
    item.innerHTML=`
      <input class="check" type="checkbox" ${task.done?"checked":""} aria-label="Mark task complete">
      <div class="task-content"><div class="task-title"></div></div>
      <span class="priority ${task.priority}">${task.priority}</span>
      <button class="delete" aria-label="Delete task">✕</button>`;
    item.querySelector(".task-title").textContent=task.title;
    item.querySelector(".check").addEventListener("change",()=>toggleTask(task.id));
    item.querySelector(".delete").addEventListener("click",()=>deleteTask(task.id));
    list.appendChild(item);
  });
  updateStats();
}
function addTask(title,level){
  tasks.unshift({id:Date.now(),title,priority:level,done:false});
  save();render();
}
function toggleTask(id){tasks=tasks.map(t=>t.id===id?{...t,done:!t.done}:t);save();render();}
function deleteTask(id){tasks=tasks.filter(t=>t.id!==id);save();render();}

form.addEventListener("submit",e=>{
  e.preventDefault();
  const title=input.value.trim();
  if(!title)return;
  addTask(title,priority.value);
  input.value="";input.focus();
});
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelector(".filter.active").classList.remove("active");
  btn.classList.add("active");currentFilter=btn.dataset.filter;render();
}));

const themeToggle=document.querySelector("#themeToggle");
if(localStorage.getItem("focusflow_theme")==="dark"){document.body.classList.add("dark");themeToggle.textContent="☀️";}
themeToggle.addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  const dark=document.body.classList.contains("dark");
  localStorage.setItem("focusflow_theme",dark?"dark":"light");
  themeToggle.textContent=dark?"☀️":"🌙";
});
render();
