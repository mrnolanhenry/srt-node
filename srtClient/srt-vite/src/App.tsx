import { useEffect, useState, type BaseSyntheticEvent } from 'react';
import './App.css';
import MultiFileReader from './components/MultiFileReader';
import type { FileContent } from './interfaces/FileContent';

function App() {
  const [fileInputs, setFileInputs] = useState<string[]>([]);
  const [textInputs, setTextInputs] = useState<string[]>(['Upload or paste your SRT files here.']);
  const [fileContents, setFileContents] = useState<FileContent[]>([]);

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

  return (
    <>
      <div className="flex-wrapper">
        <MultiFileReader 
          fileContents={fileContents} 
          handleTextChange={handleTextChange}
          setFileContents={setFileContents} 
          textInputs={textInputs} 
          // setTextInputs={setTextInputs}
        />
        <div className="flex-column padded-column">
            {/* <input multiple type="file" id="srtInputFile" name="srtInputFile" accept=".srt, .txt" onChange={handleFileChange} /> */}
            <textarea id="srtInputDisplay" name="srtInputDisplay" rows={12} cols={40} onChange={handleTextChange} value={textInputs[0]}></textarea>
        </div>
        <div className="flex-column padded-column">
          <div className="flex-row">
            <input type="number" id="quantity" name="quantity" min={0} max={10} step={1} size={2}></input> :
            <input type="number" id="quantity" name="quantity" min={0} max={10} step={1} size={2}></input> :
            <input type="number" id="quantity" name="quantity" min={0} max={10} step={1} size={2}></input>,
            <input type="number" id="quantity" name="quantity" min={0} max={999} step={1} size={3}></input>
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
