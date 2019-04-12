/**
 * Module for render the list
 * This class the list
 */
const ShowList = (function () {
    // private vars
    // const songs = new ListSongs();
    this.playList = new Singleton();
    
    
    // ShowList class
    return class ShowList {

        // constructor need container to add song
        constructor (containerList) {
            this.containerList = document.querySelector(containerList);

            const builder = this;
            window.addEventListener('load', function(){
                builder.render(builder, builder.containerList);
            });
        }

        render(b, container) {
            playList.map(item => b.createlist(item, container));
        }

        createlist(item, containerDom) {
            const container = document.createElement('div');
            container.setAttribute('class', 'clearfix');
            container.setAttribute('class', 'list-item');
            container.setAttribute('draggable', 'true');
            container.setAttribute('ondragstart', 'event.dataTransfer.setData("text/plain",null)');

            const star = document.createElement('img');
            star.setAttribute('class', 'floating');
            star.setAttribute('draggable', 'false');

            if (!item.stared) {
                star.src = "img/assets/star.svg"
            } else {
                star.src = "img/assets/star-selected.svg"
            }

            const title = document.createElement('p');
            title.textContent = (item.name + ' ' + '-' + ' ' + item.artist);
            title.setAttribute('class', 'floating');
            title.setAttribute('class', 'info');

            const datos = document.createElement('p');
            datos.textContent = (item.year + ' ' + '-' + ' ' + item.album);
            datos.setAttribute('class', 'floating');
            datos.setAttribute('class', 'info');
            
            
            container.appendChild(star);
            container.appendChild(title);
            container.appendChild(datos);
            containerDom.appendChild(container);
        }

        
    };  
})();