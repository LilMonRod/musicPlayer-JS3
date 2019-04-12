(function (d) {
    const singleton = new Singleton();
    const completeMatriz = singleton.data[0];
    const playableList = null;

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
            console.log(e.target);
            const id = e.target.getAttribute('id');
            createList(id);
        }
    }, false);

    function createList(idCont) {
        const container = document.getElementById(idCont);
        const ChildList = Array.prototype.slice.apply(container.childNodes);;
        let index = ChildList[0].getAttribute('index');
        getSimilar(index);
    }

    function getSimilar(index) {
        const songData = completeMatriz[index]
        console.log(completeMatriz[index]);
        singleton.addSong('1', songData)
    }
})(document);