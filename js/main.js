(function(){
    // variables
    let player = null;
    let builder = null;
    let playlist = null
    const btnConfigDelete = document.getElementById('btn-config-delete');
    const btnConfigEdit = document.getElementById('btn-config-edit');


    /**
     * Method when a control has been selected
     * @param {Event} event
     * @returns {boolean}
     */
    function controlAction (event){
        let icon = event.target;
        if(icon.tagName !== 'I') return false;

        table.style(icon.getAttribute('data-style'), icon.getAttribute('data-value'));
    }

    /**
     * Method to toggle the controls of the selected cell
     */
    function controlsSelected () {
        let styles = table.cellStyles;

        // remove previus selected
        Array.from(controls.querySelectorAll('li'))
            .forEach(li => li.classList.remove('selected'));

        // reset font size selct
        fontSize.value = '';

        // set the selected styles
        Object.keys(styles)
            .forEach(style => {
                let query = `i[data-style="${style}"]`;
                if(style === 'text-align') query += `[data-value="${styles[style]}"]`;
                else if(style === 'font-size') return fontSize.value = styles[style];

                let icon = controls.querySelector(query);
                if(icon) icon.parentNode.classList.toggle('selected');
            });

        // focus the table for the keyboard events
        table.table.focus();
    }


    // methods
    function main () {

        // init the player
        player = new Player('#songTitle', '#songSlider', '#currentTime', '#duration', '#volumeSlider', 'starPlayer');
        
        // render the songs
        playlist = new CompleteList('completeList');

        // controlls
        btnDelete = document.querySelector('#controls');
        btnEdit = document.querySelector('#controls');


        // events
        // controls.addEventListener('click', controlAction);


        // subscriptions
        console.log(playlist.Subscriptions)
        // Mediator.Subscribe(playlist.Subscriptions.CELL_SELECTED, controlsSelected);
        // Mediator.Subscribe(Singleton.Subscriptions.CELL_UPDATED, controlsSelected);
    }

    // waits for the dom to load
    document.addEventListener('DOMContentLoaded', main);

    
    const listItems = Array.prototype.slice.apply(document.querySelectorAll('list-item'));

    document.getElementById('container-list').addEventListener('click', e => {
        if (e.target.classList.contains('list-item')) {
            listItems.map(listItem => listItem.classList.remove('active'));
            e.target.classList.add('active');
            btnConfigDelete.removeAttribute('disabled');
            btnConfigEdit.removeAttribute('disabled');
        };
        if (!e.target.classList.contains('list-item')) {
            listItems.map(listItem => listItem.classList.remove('active'));
            e.target.classList.add('active');
            btnConfigDelete.setAttribute('disabled', 'true');
            btnConfigEdit.setAttribute('disabled', 'true');
        };
    });

})();

