let stick = document.querySelector(".stickyNote");
stick.addEventListener("click",createTicket)
function createTicket(){
    let div= document.createElement("div");
    div.setAttribute("class","ticket-container");
    div.innerHTML=` <div class="head">
    <button class="hide ticket-btn"><i class="fas fa-minus ticketicon"></i></button>
   
   <button class="delete ticket-btn"><i class="fas fa-times ticketicon"></i></button>
 
 </div>
 <div class="ticket-data" contenteditable="true"></div>`;
 document.body.appendChild(div);
 let ticketContainer=document.querySelectorAll(".ticket-container");
 //to delete Ticket
 let deletebtns=document.querySelectorAll(".delete");
   for(let i=0;i<deletebtns.length;i++){
     deletebtns[i].addEventListener("click",function(e){
       console.log(e.target);
      deletebtns[i].parentNode.parentNode.remove();
     })
   }
 //to hide Ticket
 let ticketData=document.querySelectorAll(".ticket-data");
 let allheads=document.querySelectorAll(".head");
 let ticketDataFlag=false;
 let hidebtns=document.querySelectorAll(".hide");
 for(let i=0;i<hidebtns.length;i++){
   hidebtns[i].addEventListener("click",function(e){
    let children=e.currentTarget.parentNode.parentNode.children;
    if(ticketDataFlag==false){
      children[1].style.display="none";
     
   }else{
       children[1].style.display="block";
   }
     ticketDataFlag=!ticketDataFlag;
  
   })
  
 }
 let flag=false;
 for(let i=0;i<allheads.length;i++){
     allheads[i].onmousedown=dragMouseDown;
   }
 
   for(let i=0;i<ticketData.length;i++){
     ticketData[i].addEventListener("click",function(){
       ticketData[i].focus();
     })
   }
  
    return div;
}
function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
  //console.log(e.currentTarget.parentNode);
    elmnt=e.currentTarget.parentNode;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.body.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.body.onmousemove = elementDrag;
  }
  
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }
  
  function closeDragElement() {
    // stop moving when mouse button is released:
    document.body.onmouseup = null;
    document.body.onmousemove = null;
  }
 
  }) 