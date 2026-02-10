import './OutputContainer.css';
import { useState } from 'react';
import CopyTextArea from '../CopyTextArea/CopyTextArea';

interface OutputContainerProps {
  textOutput: string;
  handleTextOutputChange: (event: any) => void;
}

const OutputContainer = ({ textOutput, handleTextOutputChange }: OutputContainerProps) => {
    const OUTPUT_SUBTITLES = "outputSubtitles";

    const [activeTab, setActiveTab] = useState<string>(OUTPUT_SUBTITLES);

    return (
        <>
            <div className="flex-row">
                <div className="output-container-tab">
                    <button className={`output-container-tablinks ${activeTab === OUTPUT_SUBTITLES ? 'active' : ''}`} onClick={() => setActiveTab(OUTPUT_SUBTITLES)}>Fixed Subtitles</button>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OutputContainer;
