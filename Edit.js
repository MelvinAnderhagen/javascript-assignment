//Imports
import { hockeyPlayer } from "./Players.js"
import { refreshPlayers , url, fetchplayers } from "./Fetch.js"
import { showSection, playerTableBody, renderTr} from "./script.js"

//DOM Elements
export const editName = document.getElementById('editName')
export const editJersey = document.getElementById('editJersey')
export const editAge = document.getElementById('editAge')
export const editBorn = document.getElementById('editBorn')
export const submitEditButton = document.getElementById('submitEditButton')

let editingPlayer = null;

// fetch(url)
// .then(response => response.json())
// .then(data => {
//     data.forEach(player => {
//         let p = new hockeyPlayer(
//             player.id,
//             player.namn,
//             player.jersey,
//             player.age,
//             player.born)
//             players.push(p);
//     });
// })

// Functions

let players = fetchplayers();

export function editPlayer(id){
    editingPlayer = players.find((player) => player.id == id);
    console.log(editingPlayer)
    editName.value = editingPlayer.name;
    editJersey.value = editingPlayer.jersey;
    editAge.value = editingPlayer.age;
    editBorn.value = editingPlayer.born;
    showSection('sectionEdit');

}



//Events
submitEditButton.addEventListener("click",()=>{

    fetch(url + '/' + editingPlayer.id,{
        method:"PUT",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify({namn: editName.value, jersey: editJersey.value, age: editAge.value, born: editBorn.value})
    })
        .then(res=>{
            console.log(res);
            console.log(res)
           refreshPlayers();
           showSection('sectionList'); 
        });
    editingPlayer.name = editName.value;
    editingPlayer.jersey = editJersey.value;
    editingPlayer.age = editAge.value;
    editingPlayer.born = editBorn.value;
    playerTableBody.innerHTML = '';
    players.forEach(player => {
        renderTr(player);
    });

    showSection('sectionList');
});

