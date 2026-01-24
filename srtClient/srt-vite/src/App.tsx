import { useEffect, useState, type BaseSyntheticEvent } from 'react';
import './App.css';
import MultiFileReader from './components/MultiFileReader';
import type { FileContent } from './interfaces/FileContent';
import TimeControl from './components/TimeControl';
import LineNumberControl from './components/LineNumberControl';

function App() {
  const [fileInputs, setFileInputs] = useState<string[]>([]);
  const [textInputs, setTextInputs] = useState<string[]>(['Upload or paste your SRT files here.']);
  const [textOutput, setTextOutput] = useState<string>('Your converted SRT file will appear here.');
  const [fileContents, setFileContents] = useState<FileContent[]>([]);
  const [hoursInput, setHoursInput] = useState<number>(0);
  const [minutesInput, setMinutesInput] = useState<number>(0);
  const [secondsInput, setSecondsInput] = useState<number>(0);
  const [millisecondsInput, setMillisecondsInput] = useState<number>(0);
  const [lineStartInput, setLineStartInput] = useState<number>(1);
  const [lineEndInput, setLineEndInput] = useState<number | null>(null);

  useEffect(() => {
    // console.log('useEffect - fileInputs changed:');
    // console.log(fileInputs);
    setTextInputs(fileInputs);
  }, [fileInputs]);

  const handleTextInputChange = (event: any) => {
    console.log("handleTextInputChange event");
    console.log(event);
    const newTextInputs = [...textInputs];
    newTextInputs[0] = event.target.value;
    setTextInputs(newTextInputs);
  };

  const handleTextOutputChange = (event: any) => {
    console.log("handleTextOutputChange event");
    console.log(event);
    setTextOutput(event.target.value);
  };

  const handleHoursChange = (event: any) => {
    if (event.target.validity.valid) {
      if (!isNaN(event.target.valueAsNumber)) {
        setHoursInput(event.target.valueAsNumber);
      }
      else {
        setHoursInput(0);
      }
    }
    else {
      console.log("TODO: Handle Invalid number input later");
    }
  };

  const handleMinutesChange = (event: any) => {
    if (event.target.validity.valid) {
      if (!isNaN(event.target.valueAsNumber)) {
        setMinutesInput(event.target.valueAsNumber);
      }
      else {
        setMinutesInput(0);
      }
    }
    else {
      console.log("TODO: Handle Invalid number input later");
    }
  };

  const handleSecondsChange = (event: any) => {
    if (event.target.validity.valid) {
      if (!isNaN(event.target.valueAsNumber)) {
        setSecondsInput(event.target.valueAsNumber);
      }
      else {
        setSecondsInput(0);
      }
    }
    else {
      console.log("TODO: Handle Invalid number input later");
    }
  };

  const handleMillisecondsChange = (event: any) => {
    if (event.target.validity.valid) {
      if (!isNaN(event.target.valueAsNumber)) {
        setMillisecondsInput(event.target.valueAsNumber);
      }
      else {
        setMillisecondsInput(0);
      }
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

  const handleLineEndInputChange = (event: any) => {
    if (event.target.validity.valid) {
      setLineEndInput(event.target.valueAsNumber);
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
    // 1. Create a Blob object with the file content and type
    const blob = new Blob([content as BlobPart], { type: 'text/plain;charset=utf-8' });

    // 2. Create an object URL for the Blob
    const url = URL.createObjectURL(blob);

    // 3. Create a temporary anchor element
    const link = document.createElement('a');
    link.href = url;
    link.download = name; // Set the default file name

    // 4. Append the link to the body (necessary for the click event to work in some browsers)
    document.body.appendChild(link);

    // 5. Programmatically click the link to trigger the download
    link.click();

    // 6. Clean up by removing the link and revoking the object URL
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
              lineEndInput={lineEndInput}
              handleLineStartInputChange={handleLineStartInputChange}
              handleLineEndInputChange={handleLineEndInputChange}
            />
          </div>
          <div className="flex-row">
            <TimeControl 
              hoursInput={hoursInput}
              minutesInput={minutesInput}
              secondsInput={secondsInput}
              millisecondsInput={millisecondsInput}
              lineStartInput={lineStartInput}
              handleHoursChange={handleHoursChange}
              handleMinutesChange={handleMinutesChange}
              handleSecondsChange={handleSecondsChange}
              handleMillisecondsChange={handleMillisecondsChange}
            />
          </div>  
          <button id="btnConvert" onClick={() => {}}>Convert</button>
        </div>
        <div className="flex-column padded-column">
          <textarea id="srtOutput" name="srtOutput" rows={12} cols={50} onChange={handleTextOutputChange} value={textOutput}></textarea>
          <button id="btnConvert" onClick={handleDownload}>Download</button>
        </div>
      </div>
    </>
  )
}

export default App
