// content.js
// Author:
// Author URI: https://
// Author Github URI: https://www.github.com/
// Project Repository URI: https://github.com/
// Description: Handles all the webpage level activities (e.g. manipulating page data, etc.)
// License: MIT

let problemlist;

let Urlofpage=window.location.href;

window.addEventListener("load",()=>{
    addBookMarkbutton();
   }
);

function addBookMarkbutton(){
     parentDiv=document.getElementsByClassName("mt-3 flex space-x-4")[0];
    const childdiv=document.createElement("p")
    childdiv.className = "btn_ref";
    childdiv.src=chrome.runtime.getURL("assets/bookmark.png");
    childdiv.alt="BookMark",
    childdiv.style.width=150,
    childdiv.style.height=150


   parentDiv.appendChild(childdiv);    

    childdiv.addEventListener("click",addNewBookMark);

}

const addNewBookMark= async ()=>{
    currentBookMarkProblems = await fetchBookMarks();


    let name=document.getElementsByClassName("mr-2 text-xl font-medium leading-8 text-label-1 dark:text-dark-label-1")[0].innerText;

    const newBookMark = {
        URL: Urlofpage,
        title: name
    }

    add=true;

    for(u of currentBookMarkProblems){
        if(u.URL == Urlofpage)
        add=false
    }

    if(add==true){
        chrome.storage.sync.set({
            [problemlist]:JSON.stringify([
                ...currentBookMarkProblems,
                newBookMark
            ])
        });
    }

    
}

const fetchBookMarks=()=>{
    return new Promise((resolve)=>{
        chrome.storage.sync.get([problemlist],(obj)=>{
            resolve(obj[problemlist]?JSON.parse(obj[problemlist]):[])
        });
    })
}