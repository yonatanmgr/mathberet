import React, { useEffect, useState } from 'react';
import { Tree, ControlledTreeEnvironment } from 'react-complex-tree';
import './FileSystem.scss';

function FileSystem() {
  const [focusedItem, setFocusedItem] = useState();
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [items, setItems] = useState({
    root: {
      index: 'root',
      data: '',
    },
  });

  useEffect(() => {
    window.api.getNotebooks();
  }, []);

  useEffect(() => {
    window.api.receive('gotNotebooks', (data) => {
      setItems(data.root);
    });
  }, []);

  return (
    <div className='file-system'>
      <span className='header'>המחברות שלי</span>
      <div className='files-tree-container'>
        <ControlledTreeEnvironment
          items={items}
          getItemTitle={(item) => item.data}
          viewState={{
            ['tree-2']: {
              focusedItem,
              expandedItems,
              selectedItems,
            },
          }}
          onFocusItem={(item) => setFocusedItem(item.index)}
          onExpandItem={(item) =>
            setExpandedItems([...expandedItems, item.index])
          }
          onCollapseItem={(item) =>
            setExpandedItems(
              expandedItems.filter(
                (expandedItemIndex) => expandedItemIndex !== item.index,
              ),
            )
          }
          onSelectItems={(items) => setSelectedItems(items)}
        >
          <Tree treeId='tree-2' rootItem='root' treeLabel='Tree Example' />
        </ControlledTreeEnvironment>
      </div>
    </div>
  );
}

export default FileSystem;
