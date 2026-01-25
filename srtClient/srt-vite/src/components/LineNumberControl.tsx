import './LineNumberControl.css';

interface LineNumberControlProps {
  lineStartInput: number;
  lineStopInput: number | null;
  handleLineStartInputChange: (event: any) => void;
  handleLineStopInputChange: (event: any) => void;
}

const LineNumberControl = ({ lineStartInput, lineStopInput, handleLineStartInputChange, handleLineStopInputChange }: LineNumberControlProps) => {

  return (
    <>
      <div className="flex-column">
        <div className="flex-row centered-row spaced-between-row">
          <div className="flex-column align-start-column">
            <small>First Line Number to convert to new time:</small>
          </div>        
          <div className="flex-column centered-column">
            <input type="number" id="lineStartInput" className="line-input" name="lineStartInput" step={1} size={5} onChange={handleLineStartInputChange} value={lineStartInput} />
          </div>
        </div>
        <div className="flex-row padded-row spaced-between-row">
          <div className="flex-column align-start-column">
            <small>Last Line Number to convert:</small>
            <small>{`(leave blank to convert to end)`}</small>
          </div>        
          <div className="flex-column centered-column">
            <input type="number" id="lineStopInput" className="line-input" name="lineStopInput" step={1} size={5} onChange={handleLineStopInputChange} value={lineStopInput as number ?? ""} /> 
          </div>
        </div>
      </div>
    </>
  );
};

export default LineNumberControl;
