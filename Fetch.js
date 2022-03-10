import { hockeyPlayer } from "./Players.js";
import { playerTableBody, renderTr } from "./script.js";
export const url = ('https://hockeyplayers.systementor.se/melvin/player');

export function refreshPlayers(){
    let players = [];
    playerTableBody.innerHTML = '';

    fetch(url)
        .then(response=>response.json())
        .then(array=>{
            //json -> items
            console.log(array)
            array.forEach(player=>{
                let p = new hockeyPlayer(
                    player.id,
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

export function fetchplayers(){
    let players = [];
    fetch(url)
    .then(response => response.json())
    .then(data => {
    data.forEach(player => {
        let p = new hockeyPlayer(
            player.id,
            player.namn,
            player.jersey,
            player.age,
            player.born)
            players.push(p);
    });
})
return players;
}