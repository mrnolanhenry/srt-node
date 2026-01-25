import type { FileContent } from '../../interfaces/FileContent';
import './InputContainer.css';
import FileUpload from '../FileUpload/FileUpload';
import FileViewer from '../FileViewer/FileViewer';
import { useState } from 'react';

interface InputContainerProps {
  fileContents: FileContent[];
  textInputs: string[];
  handleTextInputChange: (event: any) => void;
  setFileContents: React.Dispatch<React.SetStateAction<FileContent[]>>;
}

const InputContainer = ({ fileContents, textInputs, handleTextInputChange, setFileContents }: InputContainerProps) => {
    const [activeTab, setActiveTab] = useState<string>('inputSubtitles');

    const handleClick = (evt: any, cityName: string) => {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("input-container-tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            (tabcontent[i] as HTMLElement).style.display = "none";
        }
        tablinks = document.getElementsByClassName("input-container-tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        var cityTab = document.getElementById(cityName) as HTMLElement;
        cityTab.style.display = "block";
        evt.currentTarget.className += " active";
    }

    return (
        <>
            <div className="flex-row">
                <div className="input-container-tab">
                    <button className={`input-container-tablinks ${activeTab === 'inputSubtitles' ? 'active' : ''}`} onClick={(event) => setActiveTab('inputSubtitles')}>Input Subtitles</button>
                    <button className={`input-container-tablinks ${activeTab === 'uploadedFiles' ? 'active' : ''}`} onClick={(event) => setActiveTab('uploadedFiles')}>Uploaded Files</button>
                </div>
            </div>
            <div className="flex-row">
                <div className="flex-column">
                    <div id="inputSubtitles" className={`input-container-tabcontent ${activeTab === 'inputSubtitles' ? '' : 'hidden'}`}>
                        <textarea id="srtInputDisplay" name="srtInputDisplay" rows={12} cols={40} onChange={handleTextInputChange} value={textInputs[0]}></textarea>
                    </div>
                    <div id="uploadedFiles" className={`input-container-tabcontent ${activeTab === 'uploadedFiles' ? '' : 'hidden'}`}>
                        <FileViewer fileContents={fileContents} />
                    </div>
                    <FileUpload fileContents={fileContents} setFileContents={setFileContents} />
                </div>
            </div>
        </>
    );
};

export default InputContainer;
