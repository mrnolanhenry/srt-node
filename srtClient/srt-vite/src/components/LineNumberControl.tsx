import './LineNumberControl.css';

interface LineNumberControlProps {
  lineStartInput: number;
  lineEndInput: number | null;
  handleLineStartInputChange: (event: any) => void;
  handleLineEndInputChange: (event: any) => void;
}

const LineNumberControl = ({ lineStartInput, lineEndInput, handleLineStartInputChange, handleLineEndInputChange }: LineNumberControlProps) => {

  return (
    <>
      <div className="flex-column">
        <div className="flex-row centered-row spaced-between-row">

            <small>Line Number to convert to new time:</small>
            <input type="number" id="lineStartInput" className="line-input" name="lineStartInput" step={1} size={5} onChange={handleLineStartInputChange} value={lineStartInput} />

        </div>
        <div className="flex-row padded-row spaced-between-row">
          <div className="flex-column align-start-column">
            <small>Line Number to stop converting:</small>
            <small>{`(leave blank to convert to end)`}</small>
          </div>        
          <div className="flex-column centered-column">
            <input type="number" id="lineEndInput" className="line-input" name="lineEndInput" step={1} size={5} onChange={handleLineEndInputChange} value={lineEndInput as number ?? ""} /> 
          </div>
        </div>
      </div>
    </>
  );
};

export default LineNumberControl;
