import { DragEvent, useState } from 'react';
 
export function FileDrop() {
  const [isOver, setIsOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
 
  // Define the event handlers
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(true);
  };
 
  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
  };
 
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
 
    // Fetch the files
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);
 
    // Use FileReader to read file content
    droppedFiles.forEach((file) => {
      const reader = new FileReader();
 
      reader.onloadend = () => {
        console.log(reader.result);
      };
 
      reader.onerror = () => {
        console.error('There was an issue reading the file.');
      };
 
      reader.readAsDataURL(file);
      return reader;
    });
  };
 
  return (
    <div className='
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className='dragNdrop'
    //   style={{
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     height: '200px',
    //     width: '300px',
    //     border: '1px dotted',
    //     backgroundColor: isOver ? 'lightgray' : 'white',
    //   }}
    >
      Drop you photo here!
    </div>
  );
}
