// var main = document.getElementById("main");
// var inp = document.getElementById("inp");
// function add() {
//   console.log(inp.value);
//   if (inp.value == "") {
//     alert("Enter a message");
//   } else {
//     var li = document.createElement("li");
//     li.classList.add("inline")
//     var liText = document.createTextNode(inp.value);
//     li.appendChild(liText);
//     inp.value = "";

//     // Create Button
//     var editbtn = document.createElement("BUTTON");
//     var editbtnText = document.createTextNode("Edit Value");
//     editbtn.classList.add("button")
//     editbtn.appendChild(editbtnText);
//     editbtn.setAttribute("onclick", "editTodo(this)");
//     li.appendChild(editbtn);

//     // Del Button
//     var delbtn = document.createElement("BUTTON");
//     var editdelbtn = document.createTextNode("Delete Value");
//     delbtn.classList.add("button")
//     delbtn.appendChild(editdelbtn);
//     delbtn.setAttribute("onclick", "deleteTodo(this)");
//     li.appendChild(delbtn);
//     main.appendChild(li);
//   }
// }
function editTodo(element) {
  var newValue = prompt("Enter Updated Value");
  console.log(newValue);
  element.parentNode.firstChild.nodeValue = newValue;
//   console.log(newValue);
  // element.parentNode.firstChild.nodeValue = document.getElementById("inp").value;
//   newValue = "";
}


function delAll() {
  main.innerHTML = "";
}

      // Import the functions you need from the SDKs you need
      import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
      import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
      import { getDatabase, ref, set, onChildAdded } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
      // TODO: Add SDKs for Firebase products that you want to use
      // https://firebase.google.com/docs/web/setup#available-libraries
      
      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional

      const firebaseConfig = {
  apiKey: "AIzaSyApxGfSiZ5ehpEkEIHrYPSVdAf9181miBQ",
  authDomain: "todo-application-6c24f.firebaseapp.com",
  databaseURL: "https://todo-application-6c24f-default-rtdb.firebaseio.com",
  projectId: "todo-application-6c24f",
  storageBucket: "todo-application-6c24f.appspot.com",
  messagingSenderId: "320391008270",
  appId: "1:320391008270:web:617b114ebf0ef7d5486c5f",
  measurementId: "G-P6XBFPNXJT"
};
    // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase()

var task = document.getElementById('task')

var main = document.getElementById("main");
var inp = document.getElementById("inp");

window.deleteTodo = function(element) {
  let id = element.parentNode.getAttribute('data-id')
  const taskref = ref(database, `todo/${id}/`)
  set(taskref,null)
}

window.editTodo = function(element) {
  var newValue = prompt("Enter Updated Value");
  console.log(newValue);
  element.parentNode.firstChild.nodeValue = newValue;
  console.log(element.parentNode)
  let id = element.parentNode.getAttribute('data-id')
  const taskref = ref(database, `todo/${id}/`)
  
  set(taskref,{id:id,task:newValue}) 
  // window.location.reload()
}

function getData(){
  console.log('window loaded')
  var datalist = []
    const taskref = ref(database, "todo/")
    onChildAdded(taskref,async function(dt){
      // if(!datalist.includes(dt.val())){
        await datalist.push(dt.val())
      for(var i of datalist){
        var li = document.createElement("li");
        li.classList.add("inline")
        li.setAttribute('data-id',i['id'])
        var liText = document.createTextNode(i['task']);
        li.appendChild(liText);
        inp.value = "";
    
        // Create Button
        var editbtn = document.createElement("BUTTON");
        var editbtnText = document.createTextNode("Edit Value");
        editbtn.classList.add("button")
        editbtn.appendChild(editbtnText);
        editbtn.setAttribute("onclick", "editTodo(this)");
        li.appendChild(editbtn);
    
        // Del Button
        var delbtn = document.createElement("BUTTON");
        var editdelbtn = document.createTextNode("Delete Value");
        delbtn.classList.add("button")
        delbtn.classList.add("delbtn")
        delbtn.appendChild(editdelbtn);
        delbtn.setAttribute("onclick", "deleteTodo(this)");
        li.appendChild(delbtn);
        main.appendChild(li);
      }
      // }
    })
    // console.log(datalist)
}

window.onload = function(){
  getData()
}




document.getElementById("addbtn").addEventListener("click",function(){
  console.log(inp.value);
  if (inp.value == "") {
    alert("Enter a message");
  } else {
    var obj = {
      task: inp.value,
  }
  console.log(obj)
  obj.id = Math.random().toString().slice(2)
  console.log(database)
  const taskref = ref(database, `todo/${obj.id}/`)
  set(taskref, obj)
  window.location.reload()
  // getData()
}
})


