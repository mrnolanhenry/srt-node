import TimeUtils from "../utilities/TimeUtils";

interface SubtitleConverterProps {
  lineStartInput: number;
  lineEndInput: number | null;
  shouldScrubNonDialogue: boolean;
  timeInputString: string;
  textInput: string;
  handleConvertCallback: (convertedText: string) => void;
}

const SubtitleConverter = ({ lineStartInput, lineEndInput, shouldScrubNonDialogue, timeInputString, textInput, handleConvertCallback }: SubtitleConverterProps) => {
  const handleConvert = (): void => {
      const dataArr = textInput.split("\n");
      const offset = getOffsetAmount(dataArr);
      if (offset === 0 || isNaN(offset)) {
        return console.error('no difference from current time');
      }
      const newData = offsetData(dataArr,offset);
      handleConvertCallback(newData);
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
    const newStartTime = TimeUtils.convertStringToMillisecs(startTimeString) as number + offset;
    const newEndTime = TimeUtils.convertStringToMillisecs(endTimeString) as number + offset;
    const newStartString = TimeUtils.convertMillisecsToString(newStartTime);
    const newEndString = TimeUtils.convertMillisecsToString(newEndTime);
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
    const oldInitialTime = TimeUtils.convertStringToMillisecs(oldInitialString) as number;
    const newInitialTime = TimeUtils.convertStringToMillisecs(newInitialString) as number;
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
  
  return (
    <>
      <button id="btnConvert" onClick={handleConvert}>Convert</button>
    </>
  );
};

export default SubtitleConverter;
