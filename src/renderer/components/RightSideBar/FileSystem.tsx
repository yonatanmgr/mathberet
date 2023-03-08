import React, { useEffect, useState } from 'react';
import {
  Tree,
  ControlledTreeEnvironment,
  DraggingPositionItem,
  TreeItem,
  DraggingPositionBetweenItems,
} from 'react-complex-tree';
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

  const updateItemsPosition = (
    prev: [],
    items: Array<TreeItem>,
    target: DraggingPositionItem | DraggingPositionBetweenItems,
  ) => {
    const item = items[0];

    if (prev[target.parentItem].data != 'root') {
      const dragToSameTarget = prev[target.parentItem].children.includes(
        item.index,
      );
      if (dragToSameTarget) return prev;
    } else if (target.targetItem == 'root') {
      const dragToSameTarget = prev[target.targetItem].children.includes(
        item.index,
      );
      if (dragToSameTarget) return prev;
    }

    for (const [key, value] of Object.entries(prev)) {
      if (value.children.includes(item.index)) {
        value.children = value.children.filter((child) => child !== item.index);
      }
    }

    if (target.targetItem != 'root') {
      if (target.targetType != 'item') {
        prev[target.parentItem].children.push(item.index);
      } else if (
        prev[target.targetItem].isFolder &&
        target.targetType == 'item'
      ) {
        if (target.targetType == 'item') {
          prev[target.targetItem].children.push(item.index);
        }
      } else {
        for (const [key, value] of Object.entries(prev)) {
          if (value.children.includes(target.targetItem)) {
            value.children.push(item.index);
          }
        }
      }
    }
    
    return prev;
  };

  return (
    <div className='file-system'>
      <span className='header'>המחברות שלי</span>
      <div className='files-tree-container'>
        <ControlledTreeEnvironment
          items={items}
          canDragAndDrop={true}
          canReorderItems={true}
          canDropOnFolder={true}
          canDropOnNonFolder={true}
          getItemTitle={(item) => item.data}
          viewState={{
            ['tree-2']: {
              focusedItem,
              expandedItems,
              selectedItems,
            },
          }}
          onDrop={(items, target) => {
            setItems((prev) => updateItemsPosition(prev, items, target));
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
