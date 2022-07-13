dataLayer = [];

const songList = document.getElementsByClassName('list-item');
let containerSongData = "";

window.addEventListener('click', function(e) {
    if (e.path[0].dataset.index != undefined ) {
        containerSongData = e.path[0];
        console.log(e.path[0]);
    } else if (e.path[1].dataset.index != undefined ) {
        containerSongData = e.path[1];
        console.log(e.path[1]);
    } else if (e.path[2].dataset.index != undefined ) {
        containerSongData = e.path[2];
        console.log(e.path[2]);
    }

    dataLayer.push({'musicName': userMusicCategory, 'artist': userArtist});
});