(function (d) {
    
    // Loop through empty boxes and add listeners
    let draggedElement;
    d.addEventListener('dragstart', (e) => {
        draggedElement = e.target;
    }, false);
    d.addEventListener('dragover', (e) => {
        e.preventDefault();
    }, false);
    d.addEventListener('drop', (e) => { // eslint-disable-line
        if(e.target.classList[1] === 'cont-drag-js') {
            e.target.appendChild(draggedElement);
        }
    }, false);
})(document);