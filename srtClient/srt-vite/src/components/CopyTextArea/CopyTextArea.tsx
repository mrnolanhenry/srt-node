import { useState } from 'react';
import './CopyTextArea.css';

interface CopyTextAreaProps {
  className: string;
  cols: number;
  id: string;
  isReadOnly?: boolean;
  rows: number;
  value: string;
  onChange: (event: any) => void;
}

const CopyTextArea = ({ className, cols, id, isReadOnly, rows, value, onChange }: CopyTextAreaProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const COPY_CHARACTER = '\u{1F5D0}';

  const handleCopy = async () => {
    if (!navigator.clipboard) {
      console.warn('Clipboard API not supported');
      return false;
    }
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      // Reset the "Copied!" message after timeout
      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex-column full-width">
      <div className="flex-row copy-text-row">
        { isReadOnly ? (
          <textarea readOnly id={id} className={`${className} copy-text-area`} name={id} rows={rows} cols={cols} onChange={onChange} value={value}></textarea>
        ) : (
          <textarea id={id} className={`${className} copy-text-area`} name={id} rows={rows} cols={cols} onChange={onChange} value={value}></textarea>
        )}
        <div className="copy-text-button" onClick={handleCopy}>
          <span className="copy-text-span">
            <small className="copy-text-hover">
              {isCopied ? "" : 'Copy Text'}
            </small>
            {isCopied ? <small>Copied!</small> : ""}
            <span className="copy-text-character">{COPY_CHARACTER}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CopyTextArea;
