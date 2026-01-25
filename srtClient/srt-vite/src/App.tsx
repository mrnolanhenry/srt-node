import { useEffect, useState } from 'react';
import './App.css';
import MultiFileReader from './components/MultiFileReader';
import type { FileContent } from './interfaces/FileContent';
import TimeControl from './components/TimeControl';
import LineNumberControl from './components/LineNumberControl';
import SubtitleConverter from './components/SubtitleConverter';
import TimeUtils from './utilities/TimeUtils';
import Time from './classes/Time';

function App() {
  const [fileInputs, setFileInputs] = useState<string[]>([]);
  const [textInputs, setTextInputs] = useState<string[]>(['Upload or paste your SRT files here.']);
  const [textOutput, setTextOutput] = useState<string>('Your converted SRT file will appear here.');
  const [fileContents, setFileContents] = useState<FileContent[]>([]);
  const [lineStartInput, setLineStartInput] = useState<number>(1);
  const [lineStopInput, setLineStopInput] = useState<number | null>(null);
  const [timeInput, setTimeInput] = useState<Time>(new Time(0, 0, 0, 0));

  const shouldScrubNonDialogue = false;

  useEffect(() => {
    // console.log('useEffect - fileInputs changed:');
    // console.log(fileInputs);
    setTextInputs(fileInputs);
  }, [fileInputs]);

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

  const handleDownload = () => {
    const filename = 'output.srt';
    downloadTextFile({name: filename, content: textOutput});
  };

  const downloadTextFile = (file: FileContent) => {
    const { name, content } = file;
    const blob = new Blob([content as BlobPart], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

  return (
    <>
      <div className="flex-wrapper">
        <div className="flex-column padded-column">
          <MultiFileReader 
            fileContents={fileContents} 
            setFileContents={setFileContents} 
          />
        </div>
        <div className="flex-column padded-column">
            <textarea id="srtInputDisplay" name="srtInputDisplay" rows={12} cols={40} onChange={handleTextInputChange} value={textInputs[0]}></textarea>
        </div>
        <div className="flex-column padded-column">
          <div className="flex-row centered-row">
            <LineNumberControl 
              lineStartInput={lineStartInput}
              lineStopInput={lineStopInput}
              handleLineStartInputChange={handleLineStartInputChange}
              handleLineStopInputChange={handleLineStopInputChange}
            />
          </div>
          <div className="flex-row">
            <TimeControl 
              timeInput={timeInput}
              lineStartInput={lineStartInput}
              handleHoursChange={handleHoursChange}
              handleMinutesChange={handleMinutesChange}
              handleSecondsChange={handleSecondsChange}
              handleMillisecondsChange={handleMillisecondsChange}
            />
          </div>  
          <SubtitleConverter 
            lineStartInput={lineStartInput}
            lineStopInput={lineStopInput}
            shouldScrubNonDialogue={shouldScrubNonDialogue}
            timeInputString={TimeUtils.getDisplayTime(timeInput)}
            textInput={textInputs[0]}
            handleConvertCallback={setTextOutput}
          />
        </div>
        <div className="flex-column padded-column">
          <textarea id="srtOutput" name="srtOutput" rows={12} cols={50} onChange={handleTextOutputChange} value={textOutput}></textarea>
          <button id="btnDownload" onClick={handleDownload}>Download</button>
        </div>
      </div>
    </>
  )
}

export default App
