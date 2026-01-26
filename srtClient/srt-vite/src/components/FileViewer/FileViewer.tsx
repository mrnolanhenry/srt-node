import { useEffect, useState } from 'react';
import type { FileContent } from '../../interfaces/FileContent';
import './FileViewer.css';

interface FileViewerProps {
  fileContents: FileContent[];
}

const FileViewer = ({ fileContents }: FileViewerProps) => {
  // const [activeTab, setActiveTab] = useState<string>(fileContents && fileContents.length ? fileContents[0].name : "");
  const [activeTab, setActiveTab] = useState<string>("");

    useEffect(() => {
      // console.log('useEffect - fileInputs changed:');
      // console.log(fileInputs);
      if (fileContents && fileContents.length) {
        setActiveTab(fileContents[0].name);
      }
    }, [fileContents[0]]);

  const getAbbreviatedFileName = (fileName: string, maxLength: number): string => {
    if (fileName.length <= maxLength) {
      return fileName;
    }
    return fileName.substring(0, maxLength) + "...";
  };

  return (
    <>
      {fileContents.length > 0 ? (
        <div className="flex-row inner-tabcontent-container">
          <div className="file-viewer-tab">
            {fileContents.map((file, index) => (
              <button key={`file-viewer-tablinks-${index}`} className={`file-viewer-tablinks ${activeTab === file.name ? 'active' : ''}`} onMouseOver={(event) => setActiveTab(file.name)}>{getAbbreviatedFileName(file.name, 14)}</button>
            ))}
          </div>
          {fileContents.map((file, index) => (
              <div key={`file-viewer-tabContent-${index}`} id={`file-viewer-tabContent-${file.name}`} className={`file-viewer-tabcontent ${activeTab === file.name ? '' : 'hidden'}`}>
                <h4>{file.name}</h4>
                <textarea readOnly id={file.name} name={file.name} rows={12} cols={50} value={(file.content as string) ?? ""}></textarea>
              </div>      
          ))}
          <div className="clearfix"></div>
        </div>
      ) : (
        <>
            <p>No files selected yet.</p>
        </>
      )}
    </>
  );
};

export default FileViewer;
