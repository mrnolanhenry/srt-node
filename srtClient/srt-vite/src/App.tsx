import { useEffect, useState, type BaseSyntheticEvent } from 'react';
import './App.css';

function App() {
  const [fileInputs, setFileInputs] = useState<string[]>([]);
  const [textInputs, setTextInputs] = useState<string[]>(['Upload or paste your SRT files here.']);

  useEffect(() => {
    console.log('useEffect - fileInputs changed:');
    console.log(fileInputs);
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
      const newFileInputs = [...fileInputs];
      newFileInputs[index] = evt.target.result as string;
      console.log("onloadReader newFileInputs:");
      console.log(newFileInputs);
      setFileInputs(newFileInputs);
    }
  };

  const handleFileChange = (event: BaseSyntheticEvent) => {
    // console.log("handleFileChange event");
    // console.log(event);
    setFileInputs([]); // Clear existing file inputs

    if (event.target.files) {
      const targetFiles = [...event.target.files];
      console.log("handleFileChange targetFiles");
      console.log(targetFiles);

      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = (evt) => onloadReader(evt, i);
        reader.readAsText(event.target.files[i]);
      }

      // targetFiles.forEach((file: any, index: number) => {
      //   const reader = new FileReader();
      //   reader.onload = (evt) => onloadReader(evt, index);
      //   reader.readAsText(file);
      // });
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
        <div className="flex-column padded-column">
            <input multiple type="file" id="srtInputFile" name="srtInputFile" accept=".srt, .txt" onChange={handleFileChange} />
            <textarea id="srtInputDisplay" name="srtInputDisplay" rows={12} cols={50} onChange={handleTextChange} value={textInputs[0]}></textarea>
        </div>
        <div className="flex-column padded-column">
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
