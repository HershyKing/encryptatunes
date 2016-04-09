//Play musical note based on inputted value
function playNote(inputValue) {
  MIDI.loadPlugin({
    soundfonturl: "./soundfont/",
    instrument: "acoustic_grand_piano",
    onsuccess: function(){
      var delay = 0;
      var note = inputValue; //Currently only accepts integer values
      var velocity = 120; //How hard the note is played
      MIDI.setVolume(0,120);
      MIDI.noteOn(0, note, velocity, delay);
      MIDI.noteOff(0, note, delay + 0.50);
      keyToNote(note);
    }
  });
}

//Take inputted value and convert to musical note to write later
function keyToNote(note) {
  
}