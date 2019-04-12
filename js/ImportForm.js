(function(){
    const form = document.getElementById(formSongs);
    let completeList = new Singleton();
    let List = completeList.data[0];
    document.addEventListener('submit', getInfo);

    function getInfo(event) {
        event.preventDefault();

        console.log(List);
        const Datos = new Object;

        Datos.name = event.target[0].value;
        Datos.artist = event.target[2].value;
        Datos.album = event.target[1].value;
        Datos.year = event.target[3].value;
        Datos.cover = event.target[5].value; 
        Datos.stared = event.target[4].value;
        Datos.src = event.target[0].value;

        if (event.target[6].value !== '') {
            Datos.src = event.target[6];
        } else if (event.target[7].value !== '') {
            Datos.src = event.target[7];
        } else if (event.target[8].value !== '') {
            Datos.src = event.target[8];
        } else {
            prompt("Please digit a source");  
        }

        completeList.addSong('0', Datos);


        // form.reset();
    }
})();
