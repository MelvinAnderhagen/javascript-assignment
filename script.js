//DOM element
const sectionList = document.getElementById('sectionList')
const sectionNew = document.getElementById('sectionNew')
const sectionEdit = document.getElementById('sectionEdit')
const playerTableBody = document.getElementById('playerTableBody')
const submitNewButton = document.getElementById('submitNewButton')
const listLink = document.getElementById('listLink')
const newLink = document.getElementById('newLink')
const newName = document.getElementById('newName')
const newJersey = document.getElementById('newJersey')
const newAge = document.getElementById('newAge')
const newBorn = document.getElementById('newBorn')
const editName = document.getElementById('editName')
const editJersey = document.getElementById('editJersey')
const editAge = document.getElementById('editAge')
const editBorn = document.getElementById('editBorn')
const submitEditButton = document.getElementById('submitEditButton')
const url = ('https://hockeyplayers.systementor.se/melvin/player');

//Hockeyplayer class
class hockeyPlayer{
    constructor(id, name, jersey, age, born){
        this.id = id;
        this.name = name;
        this.jersey = jersey;
        this.age = age;
        this.born = born;
    }
}

//Event handlers

newLink.addEventListener("click",()=>{ 
    showSection('sectionNew');    
});

listLink.addEventListener("click",()=>{ 
showSection('sectionList');    
});

submitNewButton.addEventListener("click",()=>{ 
    // let highestId = 0;

    fetch(url,{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify({namn: newName.value, jersey: newJersey.value, age: newAge.value, born: editBorn.value})
    })
        .then(res=>res.json())
        .then(json=>{
            console.log(json);
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
    
    // players.forEach( (player) => {
    //     if(player.id >  highestId)
    //         highestId = player.id;
    // }  );
});

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

//Metoder / funktioner

function showSection(sectionsId){
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

let editingPlayer = null;

function editPlayer(id){
    editingPlayer = players.find((player) => player.id == id);
    editName.value = editingPlayer.name;
    editJersey.value = editingPlayer.jersey;
    editAge.value = editingPlayer.age;
    editBorn.value = editingPlayer.born;
    showSection('sectionEdit');

}

function renderTr(player){
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

function refreshPlayers(){
    players = [];
    playerTableBody.innerHTML = '';

    fetch(url)
        .then(response=>response.json())
        .then(array=>{
            //json -> items
            console.log(array)
            array.forEach(player=>{
                p = new hockeyPlayer(player.id,
                    player.namn,
                    player.jersey,
                    player.age,
                    player.born)                    
                players.push(p)
            });


            players.forEach( (player) => {
                renderTr(player);
            });
    })

}

players = [];
refreshPlayers();

showSection('sectionList');

