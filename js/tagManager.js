dataLayer = [];

const songList = document.getElementsByClassName('list-item');
let containerSongData = "";
let songData = "";
let userMusicName = "";
let userArtist = "";

window.addEventListener('click', function(e) {
    if (e.path[0].dataset.index != undefined ) {
        containerSongData = e.path[0];
    } else if (e.path[1].dataset.index != undefined ) {
        containerSongData = e.path[1];
    } else if (e.path[2].dataset.index != undefined ) {
        containerSongData = e.path[2];
    }
    
    songData = containerSongData.children[1].children[0].innerText
    userArtist = songData.split('-')[1];
    userMusicName = songData.split('-')[0];
    
    dataLayer.push({'musicName': userMusicName, 'artist': userArtist});
});