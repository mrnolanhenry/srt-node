import { useEffect, useState, type BaseSyntheticEvent } from 'react';
import './App.css';
import MultiFileReader from './components/MultiFileReader';
import type { FileContent } from './interfaces/FileContent';
import TimeControl from './components/TimeControl';

function App() {
  const [fileInputs, setFileInputs] = useState<string[]>([]);
  const [textInputs, setTextInputs] = useState<string[]>(['Upload or paste your SRT files here.']);
  const [fileContents, setFileContents] = useState<FileContent[]>([]);
  const [hoursInput, setHoursInput] = useState<number>(0);
  const [minutesInput, setMinutesInput] = useState<number>(0);
  const [secondsInput, setSecondsInput] = useState<number>(0);
  const [millisecondsInput, setMillisecondsInput] = useState<number>(0);

  let fileInputsX: string[] = [];

  useEffect(() => {
    // console.log('useEffect - fileInputs changed:');
    // console.log(fileInputs);
    setTextInputs(fileInputs);
  }, [fileInputs]);

  const onloadReader = (evt: ProgressEvent<FileReader>, index: number) => {
    console.log("onloadReader evt:");
    console.log(evt);
    console.log("onloadReader index:");
    console.log(index);
    console.log("onloadReader fileInputs:");
    console.log(fileInputs);
    if (evt.target) {
      const newFileInputs = [...fileInputsX];
      newFileInputs[index] = evt.target.result as string;
      console.log("onloadReader newFileInputs:");
      console.log(newFileInputs);
      setFileInputs(newFileInputs);
    }
  };

  const handleTextChange = (event: any) => {
    console.log("handleTextChange event");
    console.log(event);
    const newTextInputs = [...textInputs];
    newTextInputs[0] = event.target.value;
    setTextInputs(newTextInputs);
  }

    const handleHoursChange = (event: any) => {
    if (event.target.validity.valid) {
      
    }
    else {
      console.log("TODO: Handle Invalid number input later");
    }
  }

  const handleMinutesChange = (event: any) => {
    if (event.target.validity.valid) {
      
    }
    else {
      console.log("TODO: Handle Invalid number input later");
    }
  }

    const handleSecondsChange = (event: any) => {
    if (event.target.validity.valid) {
      
    }
    else {
      console.log("TODO: Handle Invalid number input later");
    }
  }

    const handleMillisecondsChange = (event: any) => {
    if (event.target.validity.valid) {
      
    }
    else {
      console.log("TODO: Handle Invalid number input later");
    }
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
            <textarea id="srtInputDisplay" name="srtInputDisplay" rows={12} cols={40} onChange={handleTextChange} value={textInputs[0]}></textarea>
        </div>
        <div className="flex-column padded-column">
          <div className="flex-row">
            <TimeControl 
              hoursInput={hoursInput}
              minutesInput={minutesInput}
              secondsInput={secondsInput}
              millisecondsInput={millisecondsInput}
              handleHoursChange={handleHoursChange}
              handleMinutesChange={handleMinutesChange}
              handleSecondsChange={handleSecondsChange}
              handleMillisecondsChange={handleMillisecondsChange}
            />
          </div>  
          <button id="btnConvert" onClick={() => {}}>Convert</button>
        </div>
        <div className="flex-column padded-column">
            <textarea id="srtInput" name="srtInput" rows={12} cols={50} defaultValue={'Your converted SRT file will appear here.'}></textarea>
            <button id="btnConvert" onClick={() => {}}>Download</button>
        </div>
      </div>
    </>
  )
}

export default App
