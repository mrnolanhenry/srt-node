import './OutputContainer.css';
import { useState } from 'react';
import CopyTextArea from '../CopyTextArea/CopyTextArea';
import type { FileContent } from '../../interfaces/FileContent';

interface OutputContainerProps {
  textOutput: string;
  handleTextOutputChange: (event: any) => void;
}

const OutputContainer = ({ textOutput, handleTextOutputChange }: OutputContainerProps) => {
    const OUTPUT_SUBTITLES = "outputSubtitles";

    const [activeTab, setActiveTab] = useState<string>(OUTPUT_SUBTITLES);

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
    };

    return (
        <>
            <div className="flex-row">
                <div className="output-container-tab">
                    <button className={`output-container-tablinks ${activeTab === OUTPUT_SUBTITLES ? 'active' : ''}`} onClick={(event) => setActiveTab(OUTPUT_SUBTITLES)}>Fixed Subtitles</button>
                </div>
            </div>
            <div className="flex-row output-tab-content-row">
                <div className="flex-column full-width">
                    <div id="outputSubtitles" className={`output-container-tabcontent padded-container ${activeTab === OUTPUT_SUBTITLES ? '' : 'hidden'}`}>
                        <div className="inner-tabcontent-container">
                            <div className="flex-row">  
                                <CopyTextArea 
                                    className="full-width no-resize" 
                                    cols={50} 
                                    id="srtOutput"
                                    rows={14} 
                                    onChange={handleTextOutputChange} 
                                    value={textOutput}
                                />             
                            </div>
                            <div className="flex-row padded-row">
                                <button id="btnDownload" onClick={handleDownload}>Download</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OutputContainer;
