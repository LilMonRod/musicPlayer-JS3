const CompleteList = (function () {
    const containerPlayableList = document.getElementById('container-playable');
    const PREFIX = 'List';
    btnConfigDelete = document.getElementById('btn-config-delete');
    btnConfigEdit = document.getElementById('btn-config-edit');



    return class CompleteList {
        static Subscriptions = Object.freeze({
            'CELL_SELECTED': Symbol(`${PREFIX}_CELL_SELECTED`)
        });

        constructor (container){
            this.container = document.getElementById(container);
            this.completeMatriz = new Singleton();
            this.matriz = this.completeMatriz.data[0];
            const btnConfigDelete = document.getElementById('btn-config-delete');
            const btnConfigEdit = document.getElementById('btn-config-edit');
            const main = this;  
            const listItems = Array.prototype.slice.apply(document.querySelectorAll('list-item'));          

            // subscriptions
            Mediator.Subscribe(Singleton.Subscriptions.SONG_ADDED, this.addSong.bind(this));
            Mediator.Subscribe(Singleton.Subscriptions.SONG_REMOVED, this.removeSong.bind(this));

            // print the list of songs
            this.render(this.container, this.matriz);

            // listen the element that has been selected
            document.getElementById('container-list').addEventListener('click', e => {
                if (e.target.classList.contains('list-item')) {
                    listItems.map(listItem => listItem.classList.remove('active'));
                    e.target.classList.add('active');
                    btnConfigDelete.removeAttribute('disabled');
                    btnConfigEdit.removeAttribute('disabled');

                    // listen the onclick
                    btnConfigDelete.addEventListener('click', function(){
                    main.getConfirmation(this, e.target, main);
            });

                };
                if (!e.target.classList.contains('list-item')) {
                    listItems.map(listItem => listItem.classList.remove('active'));
                    e.target.classList.add('active');
                    btnConfigDelete.setAttribute('disabled', 'true');
                    btnConfigEdit.setAttribute('disabled', 'true');
                };
            });

        }

        render(container, matriz) {
            for (let i = 0; i < matriz.length; i+=1) {
                this.createItemSong(matriz[i], container, i);
            }
        }

        createItemSong(item, containerDom, index) {
            const container = document.createElement('div');
            container.setAttribute('class', 'clearfix');
            container.setAttribute('index', index);
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

        addSong (data){
            // pintar los datos del form
            const container = document.createElement('div');
            container.setAttribute('class', 'clearfix');
            container.setAttribute('class', 'list-item');
            container.setAttribute('draggable', 'true');
            container.setAttribute('ondragstart', 'event.dataTransfer.setData("text/plain",null)');

            const star = document.createElement('img');
            star.setAttribute('class', 'floating');
            star.setAttribute('draggable', 'false');

            if (item.stared) {
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

        /**
         * Remove a table row
         * Reset the selected row
         * @param data
         */
        removeSong (data, main) {
            // get index to remove from single ton
            const index = data.getAttribute('index');

            // remove the song
            main.completeMatriz.removeSong('0', index);

            Mediator.Publish(Singleton.Subscriptions.SONG_REMOVED, {index});
        }


        
        /**
         * Method when btnConfigDelete  has been clicked
         * @param {Event} event
         * @returns {boolean} */
        getConfirmation(event, elementToDelete, main) {

            var retVal = confirm("Do you really want to delete this song?");
            if( retVal == true ) {
                main.removeSong(elementToDelete, main);
                return true;
            } else {
                document.write ("User does not want to continue!");
                return false;
            }
            }


    }
})();