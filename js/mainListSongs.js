const CompleteList = (function () {
    const containerPlayableList = document.getElementById('container-playable');
    const PREFIX = 'List';

    return class CompleteList {
        static Subscriptions = Object.freeze({
            'CELL_SELECTED': Symbol(`${PREFIX}_CELL_SELECTED`)
        });

        constructor (container){
            this.container = document.getElementById(container);
            this.completeMatriz = new Singleton();
            this.matriz = this.completeMatriz.data[0];

            // subscriptions
            Mediator.Subscribe(Singleton.Subscriptions.SONG_ADDED, this.addSong.bind(this));
            Mediator.Subscribe(Singleton.Subscriptions.SONG_REMOVED, this.removeSong.bind(this));

            // print the table in the DOM
            this.render(this.container, this.matriz);
        }

        render(container, matriz) {
            for (let i = 0; i < matriz.length; i+=1) {
                this.createItemSong(matriz[i], container);
                console.log(matriz[i]);
            }
        }

        createItemSong(item, containerDom) {
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


        /**
         * Select a song item
         * @param {event} event
         * @returns {boolean}
         */
        selectCell (event, element = null) {
            let td = element ? element : event.target;

            if(td.tagName !== 'TD') return false;

            // td.setAttribute('tabindex', 0);
            td.classList.toggle('selected-cell');

            if(this.selectedCell) this.selectedCell.classList.remove('selected-cell');
            this.selectedCell = td;

            // publish the selected cell
            Mediator.Publish(Table.Subscriptions.CELL_SELECTED, {td: this.selectedCell});
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
        removeSong (data) {
            // reset the selected row
            this.selectedRow = null;
            this._footerMessage(`Row Removed: ${data.index+1}`);

            // finds all the rows
            let rows = Array.from(this.tbody.children);

            // takes only the trs to update
            rows.splice(data.index, rows.length)
                .forEach((row, i) => {
                    if(i === 0) return row.parentNode.removeChild(row);

                    // update the row tr
                    row.setAttribute('data-row', data.index);
                    row.firstChild.innerText = data.index+1;
                    row.firstChild.setAttribute('data-row', data.index);

                    // update the row columns coords
                    Array.from(row.children)
                        .filter(column => column.tagName !== 'TH') // ignores the th
                        .forEach((column, columnIndex) => {
                            column.setAttribute('data-cell', `${data.index}:${columnIndex}`);
                        });

                    data.index++;
                });
        }


    }
})();