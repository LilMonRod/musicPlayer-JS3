# musicPlayer-JS3
## final project of JavaScript 3

### Objectives
DOM Manipulation
Objects and Arrays manipulation
JavaScript Functions
OOP with JavaScript
JavaScript design patterns
HTML5 APIs

###Description

Create a web application to play audio and import songs using JavaScript and standar HTML5 Audio, Localstorage and drag and drop APIs.


The application will include 2 views and a player, songs list view and import song view. The player will allow the user to control the music in any moment inside any view.


The songs view will allow the user to manage the songs playing, create and delete selected song, sort and search songs, it also will allow the user to drag and drop from the songs list to the playing list songs.


The import songs will allow the user to insert new songs into the application, it will also allow the user to edit existing songs.

### Requirements:
#### General
  - The application will have 2 views, songs and import song
  - The application will include a navbar or equivalent element to allow the user to navigate inside those 2 views (songs and import song)
  - The application will also include a music player that must be visible and available on any view, so the user can control the music on any moment inside any view
  - The player must be disable when no songs are added to the playing list panel
  - When the first song is added to the playing list panel the player start automatically playing the song
  - The player must allow the user to play/pause current song
  - The player must allow the user to see the current song time playing
  - The player must allow the user to go to previous/next song
  - The player must allow the user to forward on the song time
  - The player must allow the user to start the current song
  - The player must display the current song playing name, artist and album
  - The player must display the current song cover image, if the song doesn't have cover image then use a default image or placeholder
#### Songs view:
  - The songs view must include a toolbar with the songs sort dropdown/select, edit button (disabled), delete button (disabled) and the search song input
  - The songs view must include a panel with the list of available songs
  - The songs view must include a panel with the playing list
  - The songs on the available and playing songs list are mutually exclusive, so the songs can only be inside one list at the time
  - When the user clicks a song on both panels (available or playing song lists), then the song is selected
  - When a song is selected the Delete and Edit song buttons are enabled
  - The user can drag and drop a song from one panel to the other a viceversa to add/remove songs on both panel (available and playing)
  - When a song has been started, then the song item on any of the panels must be updated to reflect the change
  - The available and playing songs list are sortable by Artists, Song Name, Year, Started and Album
  - The songs are searchable only by the song name
  - When the user types on the search input, the search is performed on both panels, (available and playing lists) displaying only songs matching the search text
  - When there is a selected song and the Delete button is clicked, a confirmation dialog/modal or equivalent should be displayed to allow the user to confirm the action
  - When a song is deleted the song must be automatically removed on of the lists when it was previously
  - When a song is selected and the user clicks the Edit button, then the current selected song is loaded into the import song form for edition
#### Import song:
  - The import song view is a form that includes the following inputs; name (text and required), artist (text and required), year (date and required), album (text and required), started (boolean and optional), Image (text url and optional), mp3 source (text url and required), wav source (text url and required) and ogg source (text url and required), The form also includes a reset and save buttons
  - When editing the form must change the title to allow the user to know that is editing an existing song
  - The import song must validate the required and types for the fields before allowing the user to save/update the song
  - The reset button will reset/clear the form, in case the form is editing an existing song the form must reset the data based on the original song data before editing otherwise the reset clears the form data
  - The save button will submit the the form, creating a new song or updating an existing on the edition case
#### Technical Requirements:
  - The project must use git for the repository
  - All the DOM manipulation is done using JavaScript
  - All the DOM events must be added programatically using the JavaScript DOM api
  - All the DOM events handlers/callbacks must use named functions
  - Use prototypical/ES6 class pattern
  - Use revealing module pattern to encapsulate the logic of each script
  - Use a singleton pattern to share the available songs data
  - Use a singleton pattern to share the playing songs data
  - Use a mediator pattern to create topics and subscriptions in order to subscribe and publish programmatic events between differents parts of the application
  - Separate each script; revealing module, mediator, class/prototype and singleton in a single JavaScript file
  - The application must use HTML5 audio for the player
  - The application must sync and save the all the songs and playing data with HTML5 Localstorage so the user can refresh the page and the application state restores automatically
  - The application must use HTML5 drag and drop for the for the available and playing songs panels


