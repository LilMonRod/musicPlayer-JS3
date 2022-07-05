
// return object singleton
const Singleton = (function () {
    const PREFIX = 'matriz_data';

    const DEFAULT_VALUE = [
        [
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
                name: 'Somebody that i used to love',
                artist: 'Gotye',
                album: 'Making Mirrors',
                year: '2011',
                cover: 'img/album/gotye.jpg',
                stared: false,
                src: 'songs/Gotye (Legendado) Somebody That I Used To Know (feat. Kimbra).ogg'
            },
            {
                name: 'The Reason',
                artist: 'Hoobastank',
                album: 'Making Mirrors',
                year: '2003',
                cover: 'img/album/theReason.jpg',
                stared: false,
                src: 'songs/Hoobastank - The Reason.wav'
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
                stared: true,
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
            },
            {
                name: 'J&sbquo;ai cherché',
                artist: 'Amir',
                album: 'Au cœur de moi',
                year: '2016',
                cover: 'img/album/AuCœurDeMoi.jpg',
                stared: true,
                src: 'songs/Amir - Je ai cherché.mp3'
            },
            {
                name: 'Stolen dance',
                artist: 'Milky Chance',
                album: 'Sadnecessary',
                year: '2013',
                cover: 'img/album/Sadnecessary.jpg',
                stared: false,
                src: 'songs/milky_chance_stolen_dance.mp3'
            },
            {
                name: 'Yellow',
                artist: 'COldplay',
                album: 'Yellow',
                year: '2000',
                cover: 'img/album/Yellow_cover_art.jpg',
                stared: true,
                src: 'songs/coldplay_yellow.mp3'
            },
            {
                name: 'Immortals',
                artist: 'Fall Out Boy',
                album: 'Big Hero 6',
                year: '2014',
                cover: 'img/album/Fall_Out_Boy_-_Immortals.png',
                stared: true,
                src: 'songs/fall_out_boy_immortals.mp3'
            },
            {
                name: 'Hypotheticals',
                artist: 'Lake Street Dive',
                album: 'Obviously',
                year: '2021',
                cover: 'img/album/a1894322872_10.jpg',
                stared: true,
                src: 'songs/lake_street_dive_hypotheticals.mp3'
            }
        ],
        []
    ];

    // let DATA = [];
    let DATA = initData();
    let instance = null;

    /**
     * Compose the default data
     * @returns {Array[[]]} array with the default rows and columns
     * @private
     */
    function initData () {
        return DEFAULT_VALUE;
    }


    return class Singleton {
        static Subscriptions = Object.freeze({
            'SONG_ADDED': Symbol(`${PREFIX}_SONG_ADDED`),
            'SONG_REMOVED': Symbol(`${PREFIX}_SONG_REMOVED`),
        });
        
        constructor () {
            if(!instance) {
                this.getStorage();
                instance = this;
            }
            return instance;
        }

        /**
         * Getter for the data
         * @returns {Array}
         */
        get data () {
            return DATA;
        }

        /**
         * Add a new song
         */
        addSong (index, song) {
            DATA[index].push(song);

            this.updateStorage();
            Mediator.Publish(Singleton.Subscriptions.SONG_ADDED, {index, value: song});
        }

        /**
         * Remove a song
         * @param index
         * @returns {boolean}
         */
        removeSong (matriz, index) {
            if(index <= -1) return false;

            // remove the song
            DATA[0].splice(index, 1);

            this.updateStorage();
            Mediator.Publish(Singleton.Subscriptions.SONG_REMOVED, {index});
        }



        /**
         * Method to sync the data with the localstorage
         */
        updateStorage () {
            try {
                let json = JSON.stringify(DATA);
                localStorage.setItem(PREFIX, json);
            } catch (error) {
                console.error(error);
            }
        }

        /**
         * Method to the the saved data on the localstorage
         */
        getStorage () {
            try {
                let data = localStorage.getItem(PREFIX);
                data = JSON.parse(data);
                if(data && Array.isArray(data) && data.length)
                    DATA = data;
            } catch (error) {
                console.error(error);
            }
        }
    }
})();
