import React from 'react';
import './Header.scss';

type FilePathProps = { filePath: string };

const FilePath = ({ filePath }: FilePathProps) => {
  const resolvedFilePath = filePath
    ? filePath.split(/[\/\\]/)
    : [''];
  
  const folderPath = resolvedFilePath.slice(resolvedFilePath.length - 2)[0];
  const fileName = resolvedFilePath.pop().replace('.json', '');

  return (
    <div className='filepath'>
      <span className={`filepath-folder${folderPath == 'files' || fileName == '' ? ' hide': ''}`}>
        {folderPath == 'files' || fileName == '' ? '' : `${folderPath} /`}
      </span>
      <span className='filepath-name'>{fileName}</span>
    </div>
  );
};

export default FilePath;
