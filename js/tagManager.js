dataLayer = [];

const songList = document.getElementsByClassName('list-item');
let containerSongData = "";
let songData = "";
let userMusicName = "";
let userArtist = "";

window.addEventListener('click', function(e) {
    if (e.path[0].dataset.index != undefined ) {
        containerSongData = e.path[0].children[1].children[0].innerText;
    } else if (e.path[1].dataset.index != undefined ) {
        containerSongData = e.path[1].children[1].children[0].innerText;
    } else if (e.path[2].dataset.index != undefined ) {
        containerSongData = e.path[2].children[1].children[0].innerText;
    }

    userArtist = containerSongData.split(' - ')[1];
    userMusicName = containerSongData.split(' - ')[0];
    
    dataLayer.push({'musicName': userMusicName, 'artist': userArtist});
});