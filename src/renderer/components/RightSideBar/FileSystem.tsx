import React from 'react';
import {
  UncontrolledTreeEnvironment,
  Tree,
  StaticTreeDataProvider,
} from 'react-complex-tree';
import './FileSystem.scss';
//import 'react-complex-tree/lib/style-modern.css';

const items = {
  root: {
    index: 'root',
    isFolder: true,
    children: ['child1', 'child2'],
    data: 'Root item',
  },
  child1: {
    index: 'child1',
    children: [],
    data: 'Child item 1',
  },
  child2: {
    index: 'child2',
    isFolder: true,
    children: ['child3'],
    data: 'Child item 2',
  },
  child3: {
    index: 'child3',
    children: [],
    data: 'Child item 3',
  },
};

function FileSystem() {
  const dataProvider = new StaticTreeDataProvider(items);

  return (
    <div className='file-system'>
      <span className='header'>המחברות שלי</span>
      <div className='files-tree-container'>
        <UncontrolledTreeEnvironment
          dataProvider={dataProvider}
          getItemTitle={(item) => item.data}
          viewState={{}}
          canReorderItems={true}
        >
          <Tree treeId='tree-2' rootItem='root' treeLabel='Tree Example' />
        </UncontrolledTreeEnvironment>
        ;
      </div>
    </div>
  );
}

export default FileSystem;
