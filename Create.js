//Imports
import { hockeyPlayer } from "./Players.js"
import { url } from "./Fetch.js"
import { showSection, renderTr } from "./script.js"

//DOM Elements
export const newName = document.getElementById('newName')
export const newJersey = document.getElementById('newJersey')
export const newAge = document.getElementById('newAge')
export const newBorn = document.getElementById('newBorn')
export const submitNewButton = document.getElementById('submitNewButton')

//Events
submitNewButton.addEventListener("click",()=>{ 
    fetch(url,{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify({namn: newName.value, jersey: newJersey.value, age: newAge.value, born: newBorn.value})
    })
        .then(res=>res.json())
        .then(json=>{
            console.log(json);
            let players = [];
            const player = new hockeyPlayer(
                json.id, 
                newName.value,
                newJersey.value, 
                newAge.value,
                newBorn.value)

            players.push(player); 
            renderTr(player);
            showSection('sectionList');    
            console.log(player);
        });
});