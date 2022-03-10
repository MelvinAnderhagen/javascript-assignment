//Import 
import {fetchplayers, refreshPlayers} from './Fetch.js'
import {editPlayer} from './Edit.js'
import { hockeyPlayer } from './Players.js'

//DOM element
export const sectionList = document.getElementById('sectionList')
export const sectionNew = document.getElementById('sectionNew')
export const sectionEdit = document.getElementById('sectionEdit')
export const playerTableBody = document.getElementById('playerTableBody')
const listLink = document.getElementById('listLink')
const newLink = document.getElementById('newLink')
const search = document.getElementById('search');
const sortlist = document.getElementById('sort')

//Commented DOM Elements
// export const editName = document.getElementById('editName')
// export const editJersey = document.getElementById('editJersey')
// export const editAge = document.getElementById('editAge')
// export const editBorn = document.getElementById('editBorn')
// const submitNewButton = document.getElementById('submitNewButton')
// const newName = document.getElementById('newName')
// const newJersey = document.getElementById('newJersey')
// const newAge = document.getElementById('newAge')
// const newBorn = document.getElementById('newBorn')
// const submitEditButton = document.getElementById('submitEditButton')
// const url = ('https://hockeyplayers.systementor.se/melvin/player');


//Hockeyplayer class
// class hockeyPlayer{
//     constructor(id, name, jersey, age, born){
//         this.id = id;
//         this.name = name;
//         this.jersey = jersey;
//         this.age = age;
//         this.born = born;
//     }
// }

//Events
let players = [];
players = fetchplayers();

// sortlist.addEventListener("click",() => {
//     let sort = players.sort(player => player.name);

// });

search.addEventListener("keyup",() =>{
    let filter = players.filter(player => player.name.toLowerCase().includes(search.value.toLowerCase()));
    console.log(fetchplayers())
    playerTableBody.innerHTML = '';
    filter.forEach(player => {
        renderTr(player);
    });
});



newLink.addEventListener("click",()=>{ 
    showSection('sectionNew');    
});

listLink.addEventListener("click",()=>{ 
showSection('sectionList');    
});

// submitNewButton.addEventListener("click",()=>{ 
//     fetch(url,{
//         method:"POST",
//         headers:{
//             "Content-Type" : "application/json"
//         },
//         body:JSON.stringify({namn: newName.value, jersey: newJersey.value, age: newAge.value, born: newBorn.value})
//     })
//         .then(res=>res.json())
//         .then(json=>{
//             console.log(json);
//             const player = new hockeyPlayer(
//                 json.id, 
//                 newName.value,
//                 newJersey.value, 
//                 newAge.value,
//                 newBorn.value)

//             players.push(player); 
//             renderTr(player);
//             showSection('sectionList');    
//             console.log(player);
//         });
// });

// submitEditButton.addEventListener("click",()=>{

//     fetch(url + '/' + editingPlayer.id,{
//         method:"PUT",
//         headers:{
//             "Content-Type" : "application/json"
//         },
//         body:JSON.stringify({namn: editName.value, jersey: editJersey.value, age: editAge.value, born: editBorn.value})
//     })
//         .then(res=>{
//             console.log(res);
//             console.log(res)
//            refreshPlayers();
//            showSection('sectionList'); 
//         });
//     editingPlayer.name = editName.value;
//     editingPlayer.jersey = editJersey.value;
//     editingPlayer.age = editAge.value;
//     editingPlayer.born = editBorn.value;
//     playerTableBody.innerHTML = '';
//     players.forEach(player => {
//         renderTr(player);
//     });

//     showSection('sectionList');
// });

//Functions

export function showSection(sectionsId){
    if(sectionsId == 'sectionList'){
        sectionList.style.display = "block";
        sectionNew.style.display = "none";
        sectionEdit.style.display = "none";
    }
    else if(sectionsId == 'sectionNew'){
        sectionList.style.display = "none";
        sectionNew.style.display = "block";
        sectionEdit.style.display = "none";
    }
    else if(sectionsId == 'sectionEdit'){
        sectionList.style.display = "none";
        sectionNew.style.display = "none";
        sectionEdit.style.display = "block";
    }
};



// export function editPlayer(id){
//     editingPlayer = players.find((player) => player.id == id);
//     editName.value = editingPlayer.name;
//     editJersey.value = editingPlayer.jersey;
//     editAge.value = editingPlayer.age;
//     editBorn.value = editingPlayer.born;
//     showSection('sectionEdit');

// }

// const editplayer = editPlayer();

export function renderTr(player){
    let jsCall = `editPlayer(${player.id})`;
    let template = `<tr>
                        <td>${player.name}</td>
                        <td>${player.jersey}</td>
                        <td>${player.age}</td>
                        <td>${player.born}</td>
                        <td><a href="#" onclick="${jsCall}">Edit</a></td>
                    </tr>`
    playerTableBody.innerHTML = playerTableBody.innerHTML + template;
} 

// function refreshPlayers(){
//     players = [];
//     playerTableBody.innerHTML = '';

//     fetch(url)
//         .then(response=>response.json())
//         .then(array=>{
//             //json -> items
//             console.log(array)
//             array.forEach(player=>{
//                 p = new hockeyPlayer(player.id,
//                     player.namn,
//                     player.jersey,
//                     player.age,
//                     player.born)                    
//                 players.push(p)
//             });


//             players.forEach( (player) => {
//                 renderTr(player);
//             });
//     })

// }

window.editPlayer = editPlayer;



// let players = [];

refreshPlayers();

showSection('sectionList');

