/**
 * Module for player class
 * This class manages audio
 */


const Player = (function () {
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
          src: 'songs/Sie7e - Tengo Tu Love.mp3'
        },
        {
          name: 'Por amor al arte',
          artist: 'Ivan Guevara',
          album: 'Por amor al arte',
          year: '2003',
          cover: 'img/album/por amor.jpg',
          stared: false,
          src: 'songs/Por amor al arte - Ivan Guevara.mp3'
        },
        {
          name: 'Thinking Out Loud',
          artist: 'Ed Sheeran',
          album: 'Thinking Out Loud',
          year: '2014',
          cover: 'img/album/thinking.jpg',
          stared: false,
          src: 'songs/Ed Sheeran - Thinking Out Loud.mp3'
        },
        {
          name: 'Tu Sin Mi',
          artist: 'Dread Mar I',
          album: '10 Años',
          year: '2005',
          cover: 'img/album/10años.png',
          stared: false,
          src: 'songs/Dread Mar I - Tu Sin Mi.mp3'
        }
        
    ];

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
        
        // The player must display the current song playing name, artist and album
        // When the user clicks a song on both panels (available or playing song lists), then the song is selected
        // When a song is selected the Delete and Edit song buttons are enabled
        constructor (songTitle, songSlider, currentTime, duration, volumeSlider) {
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
                player.updateSongSlider(player)}, 1000);
            // register the pomodoro data subscriptions
            // this.registerSubscritions();
        }

        
        loadSong(p, img = false) {
            const dataSong = playList[p.currentSong];
            
            p.song.src = dataSong.src;
            p.songTitle.textContent = (p.currentSong + 1 + '.' + dataSong.name + ' ' + '-' + ' ' + dataSong.artist);
            p.song.playbackRate = 1;
            p.song.volume = p.volumeSlider.value;
            if (dataSong.cover !== '') {
                p.imgSong.src = dataSong.cover;
            } else {
                p.imgSong.src = "img/main/lot.webp";
            }
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
        
    };
})();
