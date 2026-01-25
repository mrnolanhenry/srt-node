import type { FileContent } from '../../interfaces/FileContent';
import './FileViewer.css';

interface FileViewerProps {
  fileContents: FileContent[];
}

const FileViewer = ({ fileContents }: FileViewerProps) => {
  const handleMouseOver = (evt: any, cityName: string) => {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("file-viewer-tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      (tabcontent[i] as HTMLElement).style.display = "none";
    }
    tablinks = document.getElementsByClassName("file-viewer-tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    var cityTab = document.getElementById(cityName) as HTMLElement;
    cityTab.style.display = "block";
    evt.currentTarget.className += " active";
  }

  const getAbbreviatedFileName = (fileName: string, maxLength: number): string => {
    if (fileName.length <= maxLength) {
      return fileName;
    }
    return fileName.substring(0, maxLength) + "...";
  };

  return (
    <>
      {fileContents.length > 0 ? (
        <div className="flex-row">
          <div className="file-viewer-tab">
            {fileContents.map((file, index) => (
              <button key={`file-viewer-tablinks-${index}`} className="file-viewer-tablinks" onMouseOver={(event) => handleMouseOver(event, `file-viewer-tabContent-${file.name}`)}>{getAbbreviatedFileName(file.name, 8)}</button>
            ))}
          </div>
          {fileContents.map((file, index) => (
              <div key={`file-viewer-tabContent-${index}`} id={`file-viewer-tabContent-${file.name}`} className="file-viewer-tabcontent">
                <h3>{file.name}</h3>
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
