import './TimeControl.css';

interface TimeControlProps {
  hoursInput: number;
  minutesInput: number;
  secondsInput: number;
  millisecondsInput: number;
  handleHoursChange: (event: any) => void;
  handleMinutesChange: (event: any) => void;
  handleSecondsChange: (event: any) => void;
  handleMillisecondsChange: (event: any) => void;
}

const TimeControl = ({ hoursInput, minutesInput, secondsInput, millisecondsInput, handleHoursChange, handleMinutesChange, handleSecondsChange, handleMillisecondsChange }: TimeControlProps) => {

  const timeInputString = `${hoursInput.toString().padStart(2, '0')}:${minutesInput.toString().padStart(2, '0')}:${secondsInput.toString().padStart(2, '0')},${millisecondsInput.toString().padStart(3, '0')}`;

  return (
    <>
      <div className="flex-column">
        <div className="flex-row">
          <div className="flex-column centered-column">
            <div className="flex-row">
              <small>Hours</small>
            </div>
            <div className="flex-row">
              <input type="number" id="hoursInput" name="hoursInput" min={0} max={99} step={1} size={2} onChange={handleHoursChange} value={hoursInput} />
              <span className="time-separator"> : </span>
            </div>
          </div>
          <div className="flex-column centered-column">
            <div className="flex-row">
              <small>Minutes</small>
            </div>
            <div className="flex-row">
              <input type="number" id="minutesInput" name="minutesInput" min={0} max={99} step={1} size={2} onChange={handleMinutesChange} value={minutesInput} />
              <span className="time-separator"> : </span>
            </div>
          </div>
          <div className="flex-column centered-column">
            <div className="flex-row">
              <small>Seconds</small>
            </div>
            <div className="flex-row">
              <input type="number" id="secondsInput" name="secondsInput" min={0} max={99} step={1} size={2} onChange={handleSecondsChange} value={secondsInput} />
              <span className="time-separator"> , </span>
            </div>
          </div>
          <div className="flex-column centered-column">
            <div className="flex-row">
              <small>Milliseconds</small>
            </div>
            <div className="flex-row">
              <input type="number" id="millisecondsInput" name="millisecondsInput" min={0} max={999} step={1} size={3} onChange={handleMillisecondsChange} value={millisecondsInput} />
            </div>
          </div>
        </div>
        <div className="flex-row centered-row">
          <div className="flex-column">
            <p>Selected Time:</p>
            <p>{timeInputString}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeControl;
