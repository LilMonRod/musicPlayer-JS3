(function(){
    // variables
    let player = null;
    let builder = null;
    let playlist = null;
   

    // methods
    function main () {

        // init the player
        player = new Player('#songTitle', '#songSlider', '#currentTime', '#duration', '#volumeSlider', 'starPlayer');
        
        // render the songs
        playlist = new CompleteList('completeList');

        
        // events
        // controls.addEventListener('click', controlAction);


        // subscriptions
        // Mediator.Subscribe(playlist.Subscriptions.CELL_SELECTED, controlsSelected);
        // Mediator.Subscribe(Singleton.Subscriptions.CELL_UPDATED, controlsSelected);
    }

    // waits for the dom to load
    document.addEventListener('DOMContentLoaded', main);
})();

