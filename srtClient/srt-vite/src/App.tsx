import { useEffect, useState } from 'react';
import './App.css';
import type { FileContent } from './interfaces/FileContent';
import TimeControl from './components/TimeControl/TimeControl';
import LineNumberControl from './components/LineNumberControl/LineNumberControl';
import SubtitleConverter from './components/SubtitleConverter/SubtitleConverter';
import TimeUtils from './utilities/TimeUtils';
import Time from './classes/Time';
import InputContainer from './components/InputContainer/InputContainer';
import OutputContainer from './components/OutputContainer/OutputContainer';

function App() {
  // TODO: Consider making textInputs a single string vs. string[]
  const [textInputs, setTextInputs] = useState<string[]>([
    `Update timecodes on existing .srt files with ease!
    \nEnter your subtitles here or upload multiple .srt files using the button below.
    \nBy default, the contents of the first file uploaded will appear here.
    \nClick the 'Uploaded Files' tab above to work with your other files.`]);
  const [textOutput, setTextOutput] = useState<string>('Your converted .srt file with new timecodes will appear here.');
  const [fileContents, setFileContents] = useState<FileContent[]>([]);
  const [lineStartInput, setLineStartInput] = useState<number>(1);
  const [lineStopInput, setLineStopInput] = useState<number | null>(null);
  const [timeInput, setTimeInput] = useState<Time>(new Time(0, 0, 0, 0));

  const shouldScrubNonDialogue = false;

  useEffect(() => {
    if (fileContents && fileContents.length) {
      setTextInputs(fileContents.map((fileContent) => fileContent.content as string));
    }
  }, [fileContents.length]);

  const handleTextInputChange = (event: any) => {
    const newTextInputs = [...textInputs];
    newTextInputs[0] = event.target.value;
    setTextInputs(newTextInputs);
  };

  const handleTextOutputChange = (event: any) => {
    setTextOutput(event.target.value);
  };

  const handleHoursChange = (event: any) => {
    if (event.target.validity.valid) {
      const validNumber = !isNaN(event.target.valueAsNumber) ? event.target.valueAsNumber : 0;
      const newTimeInput = TimeUtils.getNewTimeWithHours(timeInput, validNumber);
      setTimeInput(newTimeInput);
    }
    else {
      console.log("TODO: Handle Invalid number input later");
    }
  };

  const handleMinutesChange = (event: any) => {
    if (event.target.validity.valid) {
      const validNumber = !isNaN(event.target.valueAsNumber) ? event.target.valueAsNumber : 0;
      const newTimeInput = TimeUtils.getNewTimeWithMinutes(timeInput, validNumber);
      setTimeInput(newTimeInput);
    }
    else {
      console.log("TODO: Handle Invalid number input later");
    }
  };

  const handleSecondsChange = (event: any) => {
    if (event.target.validity.valid) {
      const validNumber = !isNaN(event.target.valueAsNumber) ? event.target.valueAsNumber : 0;
      const newTimeInput = TimeUtils.getNewTimeWithSeconds(timeInput, validNumber);
      setTimeInput(newTimeInput);
    }
    else {
      console.log("TODO: Handle Invalid number input later");
    }
  };

  const handleMillisecondsChange = (event: any) => {
    if (event.target.validity.valid) {
      const validNumber = !isNaN(event.target.valueAsNumber) ? event.target.valueAsNumber : 0;
      const newTimeInput = TimeUtils.getNewTimeWithMilliseconds(timeInput, validNumber);
      setTimeInput(newTimeInput);
    }
    else {
      console.log("TODO: Handle Invalid number input later");
    }
  };

  const handleLineStartInputChange = (event: any) => {
    if (event.target.validity.valid) {
      if (!isNaN(event.target.valueAsNumber)) {
        setLineStartInput(event.target.valueAsNumber);
      }
      else {
        setLineStartInput(1);
      }
    }
    else {
      console.log("TODO: Handle Invalid number input later");
    }
  };

  const handleLineStopInputChange = (event: any) => {
    if (event.target.validity.valid) {
      setLineStopInput(event.target.valueAsNumber);
    }
    else {
      console.log("TODO: Handle Invalid number input later");
    }
  };

  return (
    <>
      <div className="flex-wrapper">
        <div className="flex-column full-width centered-column padded-column">
          <div id="headerRow" className="flex-row section-row">
            <div className="flex-column">
              <h3>Convert Subtitles</h3>
            </div>
          </div>
        </div>
        <div className="flex-column full-width centered-column">
          <div className="flex-row section-row">
            <div id="inputContainerColumn"className="flex-column padded-column">
              <InputContainer
                fileContents={fileContents} 
                textInputs={textInputs}
                handleTextInputChange={handleTextInputChange}
                setFileContents={setFileContents} 
              />
            </div>
            <div id="outputContainerColumn" className="flex-column padded-column">
              <OutputContainer
                  textOutput={textOutput}
                  handleTextOutputChange={handleTextOutputChange}
              />
            </div>
          </div>
        </div>
        <div id="controlColumn" className="flex-column centered-column">
          <div className="section-row flex-row spaced-between-row full-width">
            <div className="flex-column padded-column">
              <LineNumberControl 
                lineStartInput={lineStartInput}
                lineStopInput={lineStopInput}
                handleLineStartInputChange={handleLineStartInputChange}
                handleLineStopInputChange={handleLineStopInputChange}
              />
            </div>
            <div className="flex-column padded-column">
              <TimeControl 
                timeInput={timeInput}
                lineStartInput={lineStartInput}
                handleHoursChange={handleHoursChange}
                handleMinutesChange={handleMinutesChange}
                handleSecondsChange={handleSecondsChange}
                handleMillisecondsChange={handleMillisecondsChange}
              />
            </div>
          </div>
        </div>
        <div id="convertColumn" className="flex-column centered-column">
          <div className="section-row flex-row full-width">
            <div className="flex-column full-width padded-column">
              <SubtitleConverter 
                lineStartInput={lineStartInput}
                lineStopInput={lineStopInput}
                shouldScrubNonDialogue={shouldScrubNonDialogue}
                timeInputString={TimeUtils.getDisplayTime(timeInput)}
                textInput={textInputs[0]}
                handleConvertCallback={setTextOutput}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
