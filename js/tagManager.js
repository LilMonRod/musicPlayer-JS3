dataLayer = [];

const songList = document.getElementsByClassName('list-item');

console.log(songList);

for (let i = 0; i < songList.length; i++) {
    songList[i].addEventListener("click", function() {
        console.log(songList[i].children);
        console.log(songList[i].childNode);
        dataLayer.push({'musicName': userMusicCategory, 'artist': userArtist});
    });
}
