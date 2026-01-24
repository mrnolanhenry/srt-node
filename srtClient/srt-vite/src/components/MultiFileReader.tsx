// import { useState, type BaseSyntheticEvent } from 'react';
import { type BaseSyntheticEvent } from 'react';
import type { FileContent } from '../interfaces/FileContent';

interface MultiFileReaderProps {
  fileContents: FileContent[];
  setFileContents: React.Dispatch<React.SetStateAction<FileContent[]>>;
}

const MultiFileReader = ({ fileContents, setFileContents }: MultiFileReaderProps) => {
  const handleFileChange = (event: BaseSyntheticEvent) => {
    const files = event.target.files as FileList;
    if (files && files.length > 0) {
      const contents: FileContent[] = [];
      // Use a Promise to handle asynchronous file reading
      const promises = Array.from(files).map(file => {
        return new Promise<void>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            // Store the file name and content
            var fileContent: FileContent = { name: file.name, content: e.target?.result || null };
            contents.push(fileContent);
            resolve();
          };
          reader.onerror = (error) => reject(error);
          // Read the file as text, or use readAsDataURL for images/other file types
          reader.readAsText(file); 
        });
      });

      // Wait for all files to be read before updating the state
      Promise.all(promises).then(() => {
        setFileContents(contents);
      });
    }
  };

  return (
    <>
      <input multiple type="file" id="srtInputFile" name="srtInputFile" accept=".srt, .txt" onChange={handleFileChange} />
      {fileContents.length > 0 ? (
        <>
          <h3>Uploaded Files:</h3>
          <ul>
            {fileContents.map((file, index) => (
              <>
                <textarea key={index} id={file.name} name={file.name} rows={12} cols={50} value={(file.content as string) ?? ""}></textarea>
              </>
            ))}
          </ul>
        </>
      ) : (
        <>
            <p>No files selected yet.</p>
        </>
      )}
    </>
  );
};

export default MultiFileReader;
