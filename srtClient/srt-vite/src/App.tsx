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

  const shouldScrubNonDialogue = false;

  const timeInputString = `${hoursInput.toString().padStart(2, '0')}:${minutesInput.toString().padStart(2, '0')}:${secondsInput.toString().padStart(2, '0')},${millisecondsInput.toString().padStart(3, '0')}`;


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

  const handleConvert = (): void => {
      const dataArr = textInputs[0].split("\n");
      console.log('dataArr',dataArr);
      const offset = getOffsetAmount(dataArr);
      // console.log('offset',offset);
      if (offset === 0 || isNaN(offset)) {
        return console.error('no difference from current time');
      }
      const newData = offsetData(dataArr,offset);
      console.log('newData',newData);
      setTextOutput(newData);
  };
  
  const offsetData = (dataArr: string[], offset: number): string => {
    let array: string[] = [];
    let lineNumber = 1;
    const lineNumberToStartOffset = lineStartInput;
    let startOffset = false;
    dataArr.forEach(line => {
      let newLine = line;
      if (line.includes(" --> ") && startOffset) {
        newLine = getNewLineWithOffset(line, offset);
      }
      else if (isLineNumber(removeReturnFromLine(line))) {
        // newLine = lineNumber + "\r";
        newLine = lineNumber.toString();
        lineNumber++;
        if (lineNumber > lineNumberToStartOffset) {
          startOffset = true;
        }
      }
      else {
        // line is actual subtitle or dialogue
        if (shouldScrubNonDialogue) {
          // by default, will scrub lines of bits like "[chuckles]" or "(gasps)"
          newLine = scrubNonDialogue(newLine, "(",")");
          newLine = scrubNonDialogue(newLine, "[","]");
          newLine = scrubNonDialogue(newLine, "[","] ");
        }
      }
      array.push(newLine);
    });
    return array.join("\n");
  };
  
  //WIP!!
  const scrubNonDialogue = (line: string, startChar:string, endChar: string): string => {
    let newLine = line;
    const startSearch = line.indexOf(startChar);
    const endSearch = line.indexOf(endChar);
    if (startSearch == 0) {
      if (endSearch !=-1) {
        newLine = newLine.substring(endSearch + 2, newLine.length);
      }
      else {
        newLine = "";
      }
    }
    else if (startSearch != -1) {
      if (endSearch !=-1) {
        newLine = newLine.substring(0, startSearch) + newLine.substring(endSearch + 2, newLine.length);
      }
      else {
        newLine = newLine.substring(0, startSearch);
      }
    }
    else if (startSearch == -1) {
      if (endSearch !=-1) {
        newLine = newLine.substring(endSearch + 2, newLine.length);
      }
    }
    return newLine;
  };
  
  const isLineNumber = (line: string) => {
    return !isNaN(Number(line)) && !isNaN(parseInt(line)) && line.indexOf(".") !== line.length - 1;
  };
  
  const getNewLineWithOffset = (line: string, offset: number) => {
    let lineWithReturnRemoved = removeReturnFromLine(line);
    const {startTimeString, endTimeString} = getStartAndEndString(lineWithReturnRemoved);
    const newStartTime = convertStringToMillisecs(startTimeString) as number + offset;
    const newEndTime = convertStringToMillisecs(endTimeString) as number + offset;
    const newStartString = convertMillisecsToString(newStartTime);
    const newEndString = convertMillisecsToString(newEndTime);
    return newStartString + " --> " + newEndString + "\r";
  };
  
  const getOffsetAmount = (dataArr: string[]) => {
    // new Initial time for the first line in the srt file 
    // e.g. 00:01:19,111 (milliseconds format)
    // the difference between the first line's time and the new inital time will be taken and used as an offset for all times
    // e.g. 00:01:49,111 - 00:01:19,111 would return an offset of -00:00:30,000 and all following times in srt would get modified by this amount.
    const newInitialString = timeInputString;
    const lineNumberToStartOffset = lineStartInput;
    console.log('new time: ' + newInitialString);
    console.log('line number to start offset: ' + lineNumberToStartOffset);
    const firstLineToOffset = getFirstTimeLineToOffset(dataArr,lineNumberToStartOffset);
    console.log('firstLineToOffset', firstLineToOffset);
    const oldInitialString = getInitialTimeString(firstLineToOffset as string) as string;
    const oldInitialTime = convertStringToMillisecs(oldInitialString) as number;
    const newInitialTime = convertStringToMillisecs(newInitialString) as number;
    console.log('newInitialTime',newInitialTime);
    console.log('offset',newInitialTime - oldInitialTime);
    
    return newInitialTime - oldInitialTime;
  };
  
  const removeReturnFromLine = (line: string) => {
    const indexOfReturn = line.indexOf("\r");
    if (indexOfReturn === -1) {
      return line;
    }
    return line.substring(0,line.indexOf("\r"));
  };
  
  const getStartAndEndString = (lineString: string) => {
    const lineArr = lineString.split(" --> ");
    const startTimeString = lineArr[0];
    const endTimeString = lineArr[1]
    return {startTimeString, endTimeString};
  };
  
  const getFirstTimeLineToOffset = (dataArray: string[],lineNumberToStartOffset : number): string | undefined => {
    return dataArray.find((line: string, index: number, array: string[]) => {
      console.log("getFirstTimeLineToOffset index");
      console.log(index);
      console.log("getFirstTimeLineToOffset index");
      console.log(index);
      console.log("getFirstTimeLineToOffset array");
      console.log(array);
      console.log("getFirstTimeLineToOffset lineNumberToStartOffset");
      console.log(lineNumberToStartOffset);
      if (index === 0) {
        return false;
      }
      console.log("getFirstTimeLineToOffset array[index - 1]");
      console.log(array[index - 1]);
      let prevLine = removeReturnFromLine(array[index - 1]);
      console.log("getFirstTimeLineToOffset prevLine");
      console.log(prevLine);
      console.log("------------------------------------------------------------------");
      return isLineNumber(prevLine) && (Number(prevLine) >= lineNumberToStartOffset) && line.includes(" --> ");
    });
  };
  
  const getInitialTimeString = (firstLine: string): string | undefined => {
    const oldInitialString = firstLine.split(" --> ").shift();
    console.log('old time at that line: ' + oldInitialString);
    return oldInitialString;
  };
  
  const convertMillisecsToString = (totalMilliSecs: number): string => {
    let remainingMillisecs = totalMilliSecs;
    const hrs = Math.floor(remainingMillisecs/(60 * 60 * 1000));
    remainingMillisecs = remainingMillisecs - (hrs * 60 * 60 * 1000);
    const mins = Math.floor(remainingMillisecs/(60 * 1000));
    remainingMillisecs = remainingMillisecs - (mins * 60 * 1000);
    const secs = Math.floor(remainingMillisecs/(1000));
    remainingMillisecs = remainingMillisecs - (secs * 1000);
    const hrsString = formatHrMinSec(hrs);
    const minsString = formatHrMinSec(mins);
    const secsString = formatHrMinSec(secs);
    const millisecsString = formatMillisec(remainingMillisecs);
    const timeString =  hrsString + ":" + minsString + ":" + secsString + "," + millisecsString;
    return timeString;
  };
  
  const formatHrMinSec = (numberToFormat: number): string => {
    const string = numberToFormat.toString();
    let newString = string;
    if (string.length < 2) {
      newString = "0" + newString;
    }
    return newString;
  };
  
  const formatMillisec = (numberToFormat: number): string => {
    const string = numberToFormat.toString();
    let newString = string;
    if (string.length < 3) {
      if (string.length < 2) {
        newString = "0" + newString;
      }
      newString = "0" + newString;
    }
    return newString;
  };
  
  const convertStringToMillisecs = (timeString: string): number | undefined => {
    const timeArr = timeString.split(":");
    if (!isValidTimeInMillisecs(timeArr)) {
      if (!isValidTimeInFps(timeArr)) {
        console.log("time format isn't valid");
        return;
      }
      return getMillisecsFromFps(timeArr);
    }
    return getMillisecs(timeArr);
  };
  
  const getMillisecs = (timeArr: string[]): number => {
    const hrs = parseInt(timeArr[0]);
    const mins = parseInt(timeArr[1]);
    const secondArr = timeArr[2].split(",");
    const secs = parseInt(secondArr[0]);
    const millisecs = parseInt(secondArr[1]);
    const totalMilliSecs = hrs * 60 * 60 * 1000 + mins * 60 * 1000 + secs * 1000 + millisecs;
    return totalMilliSecs;
  };
  
  const getMillisecsFromFps = (timeArr: string[]): number => {
    const fps = 24;
    const hrs = parseInt(timeArr[0]);
    const mins = parseInt(timeArr[1]);
    const secs = parseInt(timeArr[2]);
    const millisecs = Math.round(parseInt(timeArr[3]) * (1000 / fps));
    const totalMilliSecs = hrs * 60 * 60 * 1000 + mins * 60 * 1000 + secs * 1000 + millisecs;
    return totalMilliSecs;
  };
  
  const isValidTimeInMillisecs = (timeArr: string[]): boolean => {
    if (timeArr.length !== 3 || !isValidHrMinSec(timeArr[0]) || !isValidHrMinSec(timeArr[1])) {
      return false;
    }
    const secondArr = timeArr[2].split(",");
    if (!isValidHrMinSec(secondArr[0])) {
      return false;
    }
    if(!isValidMilliSec(secondArr[1])) {
      return false;
    }
    return true;
  };
  
  const isValidTimeInFps = (timeArr: string[]): boolean => {
    if (timeArr.length !== 4 || !isValidHrMinSec(timeArr[0]) || !isValidHrMinSec(timeArr[1]) || !isValidHrMinSec(timeArr[2])) {
      return false;
    }
    if(!isValidFps(timeArr[3])) {
      return false;
    }
    return true;
  };
  
  const isValidTime = (timeArr: string[]): boolean => {
    return isValidTimeInMillisecs(timeArr) || isValidTimeInFps(timeArr);
  };
  
  const isValidHrMinSec = (stringToCheck: string): boolean => {
    return !isNaN(parseInt(stringToCheck)) && stringToCheck.length === 2;
  };
  
  const isValidMilliSec = (stringToCheck: string): boolean => {
    return !isNaN(parseInt(stringToCheck)) && stringToCheck.length === 3;
  };
  
  const isValidFps = (stringToCheck: string): boolean => {
    return !isNaN(parseInt(stringToCheck)) && stringToCheck.length === 2;
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
              timeInputString={timeInputString}
              handleHoursChange={handleHoursChange}
              handleMinutesChange={handleMinutesChange}
              handleSecondsChange={handleSecondsChange}
              handleMillisecondsChange={handleMillisecondsChange}
            />
          </div>  
          <button id="btnConvert" onClick={handleConvert}>Convert</button>
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
