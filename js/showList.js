/**
 * Module for render the list
 * This class the list
 */
const ShowList = (function () {
    // private vars
    // const songs = new ListSongs();
    const playList = [
        {
          name: 'Tengo tu love',
          artist: 'Sie7e',
          album: 'Mucha Cosa Buena',
          year: '2011',
          cover: 'img/album/sie7e.jpg',
          stared: false,
          src: 'Sie7e - Tengo Tu Love.mp3'
        },
        {
          name: 'Por amor al arte',
          artist: 'Ivan Guevara',
          album: 'Por amor al arte',
          year: '2003',
          cover: '',
          stared: false,
          src: 'Por amor al arte - Ivan Guevara.mp3'
        },
        {
          name: 'Thinking Out Loud',
          artist: 'Ed Sheeran',
          album: 'Thinking Out Loud',
          year: '2014',
          cover: 'img/album/thinking.jpg',
          stared: false,
          src: 'Ed Sheeran - Thinking Out Loud.mp3'
        },
        {
          name: 'Tu Sin Mi',
          artist: 'Dread Mar I',
          album: '10 Años',
          year: '2005',
          cover: 'img/album/10años.png',
          stared: false,
          src: 'Dread Mar I - Tu Sin Mi.mp3'
        }
      ];
    
    
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

        
    };  
})();