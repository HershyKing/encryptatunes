//Function accepts inputString argument to process
function stringToMidi(inputString){
  var returnMidiArray = []; //integer value of MIDI Note
  var stringLength = inputString.length;
  
  var midicodeArray = [
        "C0","C#0","D0","D#0","E0","F0","F#0","G0","G#0","A0","A#0","B0","C1","C#1","D1","D#1","E1","F1","F#1","G1","G#1","A1","A#1","B1","C2","C#2","D2"
        ,"D#2","E2","F2","F#2","G2","G#2","A2","A#2","B2","C3","C#3","D3","D#3","E3","F3","F#3","G3","G#3","A3","A#3","B3","C4","C#4","D4","D#4","E4","F4"
        ,"F#4","G4","G#4","A4","A#4","B4","C5","C#5","D5","D#5","E5","F5","F#5","G5","G#5","A5","A#5","B5","C6","C#6","D6","D#6","E6","F6","F#6","G6","G#6"
        ,"A6","A#6","B6","C7","C#7","D7","D#7","E7","F7","F#7","G7","G#7","A7","A#7","B7","C8","C#8","D8","D#8","E8","F8","F#8","G8","G#8","A8","A#8","B8"
        ,"C9","C#9","D9","D#9","E9","F9","F#9","G9","G#9","A9","A#9","B9","C10","C#10","D10","D#10","E10","F10","F#10","G10","G#10","A10","A#10","B10"];
  
  
  for (z = 0; z < length; z++)
  {
  	//takes each input value and gets the ASCII value of it
  	var inputValue = inputString.charCodeAt(z);
  	var outputValue = MidiCodeArray[inputValue];
  	returnMidiArray[z] = outputValue;
  	
  	playNote(inputValue); //Pass input values as they come in, to the playNote function
  }
  writeToFile(returnMidiArray); //Pass array to writeToFile function
}

//Play musical note based on inputted value
function playNote(inputValue) {
  MIDI.loadPlugin({
    soundfonturl: "./soundfont/",
    instrument: "acoustic_grand_piano",
    onsuccess: function(){
      var delay = 0;
      var note = inputValue; //Note played corresponding to inputValue
      var velocity = 120; //How hard the note is played
      MIDI.setVolume(0,120);
      MIDI.noteOn(0, note, velocity, delay);
      MIDI.noteOff(0, note, delay + 0.50);
      keyToNote(note);
    }
  });
}

//Function accepts array object containing the notes that must be written to file
function writeToFile(midiArray){
  var noteEvents = [];
  midiArray.forEach(function(note) {
    Array.prototype.push.apply(noteEvents, MidiEvent.createNote(note));
  });
  
  var track = new MidiTrack({ events: noteEvents });
  
  var song = MidiWriter({ tracks: [track] });
  song.save(); //Opens a new window where file can be downloaded
}