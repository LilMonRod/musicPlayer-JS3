(function(){
    // variables
    let player = null;
    let builder = null;

    // methods
    function main () {      

        // init the player
        player = new Player('#songTitle', '#songSlider', '#currentTime', '#duration', '#volumeSlider');
        
        // render the songs
        builder = new ShowList('#complete-list');


    }


    // waits for the dom to load
    document.addEventListener('DOMContentLoaded', main);
})();