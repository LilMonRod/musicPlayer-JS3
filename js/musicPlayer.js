/**
 * Module for player class
 * This class manages audio
 */


const Player = (function () {
    // private vars
    const completeMatriz = new Singleton();
    const playList = completeMatriz.data[0];
    
    // Player class
    return class Player {
        
        /**
         * Init the player
         * 
         */
        songTitle = null;
        songSlider = null;
        currentTime = null;
        duration = null;
        volumeSlider = null;

        previous = null;
        backward = null;
        playOrPause = null;
        forward = null;
        next = null;
        song = null;

        completeDomList = null;

        constructor (songTitle, songSlider, currentTime, duration, volumeSlider, star, completeDomList) {
            // elements
            this.songTitle = document.querySelector(songTitle);
            this.songSlider = document.querySelector(songSlider);
            this.currentTime = document.querySelector(currentTime);
            this.duration = document.querySelector(duration);
            this.volumeSlider = document.querySelector(volumeSlider);
            this.imgSong = document.getElementById('logo-song');

            this.previous = document.getElementById('previous');
            this.backward = document.getElementById('backward');
            this.playOrPause = document.getElementById('playOrPause');
            this.forward = document.getElementById('forward');
            this.next = document.getElementById('next');
            this.star = document.getElementById(star);
            

            this.song = new Audio();
            this.currentSong = 0;

            const player = this;

            // event
            window.addEventListener('load', function(){
                player.loadSong(player, player.playOrPause);
            });

            this.previous.addEventListener('click', function(){
                player.back(player)});
            this.backward.addEventListener('click', function(){
                player.decreasePlaybackRate(player)
            });
            this.playOrPause.addEventListener('click', function(){
                player.playOrPauseSong(player.playOrPause, player);
            });
            this.forward.addEventListener('click', function(){
                player.increasePlaybackRate(player)
            });
            this.next.addEventListener('click', function(){
                player.nextSong(player)
            });

            this.songSlider.addEventListener('change', function(){
                player.seekSong(player)
            });
            this.volumeSlider.addEventListener('change', function(){
                player.adjustVolume(player)});
            
            setInterval(function(){
                player.updateSongSlider(player)
            }, 1000);
            // register the pomodoro data subscriptions
            // this.registerSubscritions();

            /*
            Change song using list 
            */
            this.completeDomList = document.querySelector('list-item');
            window.addEventListener('click', function(e) {
                console.log(e);

                if (e.path[0].dataset.index != undefined ) {
                    console.log("entró en la primera iteracion (0)")
                } else if (e.path[1].dataset.index != undefined ) {
                    console.log("entró en la segunda iteracion (1)")
                } else if (e.path[1].dataset.index != undefined ) {
                    console.log("entró en la tercera iteracion (2)")
                } else {
                    console.log("failed. no. entró en ninguna iteracion")
                }
                // player.loadSong(player, player.playOrPause);
            });

        }

        
        loadSong(p, img = false) {
            const dataSong = playList[p.currentSong];
            const name = document.createElement('span');
            name.setAttribute('class', 'nameSong');
            name.setAttribute('class', 'textTitle');
            name.textContent = dataSong.name;

            const artist = document.createElement('span');
            artist.setAttribute('class', 'artistSong');
            artist.setAttribute('class', 'textTitle');
            artist.textContent = dataSong.name;

            const year = document.createElement('span');
            year.setAttribute('class', 'yearSong');
            year.setAttribute('class', 'textTitle');
            year.textContent = dataSong.year;

            p.song.src = dataSong.src;
            p.songTitle.innerText = '';
            p.songTitle.appendChild(name);
            p.songTitle.appendChild(artist);
            p.songTitle.appendChild(year);
            p.song.playbackRate = 1;
            p.song.volume = p.volumeSlider.value;

            if (dataSong.cover !== '') {
                p.imgSong.src = dataSong.cover;
            } else {
                p.imgSong.src = "img/main/lot.webp";
            };


            if (!dataSong.stared) {
                p.star.src = "img/assets/star.svg"
            } else {
                p.star.src = "img/assets/star-selected.svg"
            };

            p.song.play().then(()=>{
                setTimeout(() => {
                    p.showduration(p);
                }, 1000);
            });
            if (img) {
                img.src = "img/assets/pause.svg"; 
            }
            
            
        }
        updateSongSlider(p) {
            let c = Math.round(p.song.currentTime);
            p.songSlider.value = c;
            p.currentTime.textContent = p.convertTime(c);
            if (p.song.ended) {
                p.nextSong(p);
            }
        }

        convertTime(secs) {
            let min = Math.floor(secs/60);
            let sec = secs % 60;
            min = (min < 10) ? '0' + min : min;
            sec = (sec < 10) ? '0' + sec : sec;
            return (min + ':' + sec);
        }

        showduration(p) {
            let d = Math.floor(p.song.duration);
            p.songSlider.setAttribute('max', d);
            p.duration.textContent = p.convertTime(d);
        }

        playOrPauseSong(img, p) {
            p.song.playbackRate = 1;
            if (p.song.paused) {
                p.song.play();
                img.src = "img/assets/pause.svg";
            } else {
                p.song.pause();
                img.src = "img/assets/play.svg";
            }
        }

        nextSong(p) {
            
            p.currentSong = p.currentSong + 1 % playList.length;
            p.currentSong = (p.currentSong > playList.length - 1) ? p.currentSong - p.currentSong : p.currentSong;
            p.loadSong(p);
        }

        back(p) {
            p.currentSong = p.currentSong - 1;
            p.currentSong = (p.currentSong < 0) ? playList.length - 1 : p.currentSong;
            p.loadSong(p);
        }
        
        seekSong(p) {
            p.song.currentTime = p.songSlider.value;
            p.currentTime.textContent = p.convertTime(p.song.currentTime)
        }
        
        adjustVolume(p) {
            p.song.volume = p.volumeSlider.value;
        }

        increasePlaybackRate(p) {
            p.song.playbackRate += 0.5;
        }

        decreasePlaybackRate(p) {
            p.song.playbackRate -= 0.5;
        }
        


        /*****************************************************************************************
         * ***************************************************************************************
         * ***************************************************************************************
         *****************************************************************************************
        registerSubscritions () {
            for(let sub in PomodoroTask.Subscritions){
                switch (sub) {
                    case 'ADDED':
                        Mediator.Subscribe(PomodoroTask.Subscritions.ADDED, this.added.bind(this));
                        break;
                    case 'FINISHED':
                        Mediator.Subscribe(PomodoroTask.Subscritions.FINISHED, this.finished.bind(this));
                        break;
                    case 'REMOVE':
                        Mediator.Subscribe(PomodoroTask.Subscritions.REMOVE, this.remove.bind(this));
                        break;
                    case 'REMOVED':
                        Mediator.Subscribe(PomodoroTask.Subscritions.REMOVED, this.onRemoved.bind(this));
                        break;
                    default:
                        break;
                }
            }
        }

        */
        
    };
})();