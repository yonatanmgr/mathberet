import React from 'react';
import './Header.scss';

type FilePathProps = { fileName: string; folderName: string };

const FilePath = ({ fileName, folderName }: FilePathProps) => {
  return (
    <div className='filepath'>
      <span className='filepath-folder'>{folderName} / </span>
      <span className='filepath-name'>
        {fileName}
      </span>
    </div>
  );
};

export default FilePath;
