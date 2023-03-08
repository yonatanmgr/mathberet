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

  const deleteItemFromItsPreviousParent = (prev, item: TreeItem) => {
    for (const [key, value] of Object.entries(prev)) {
      if (value.children.includes(item.index)) {
        value.children = value.children.filter((child) => child !== item.index);
      }
    }
  };

  const dragedToTheSameParent = (
    prev,
    item: TreeItem,
    target: DraggingPositionItem | DraggingPositionBetweenItems,
  ): boolean => {
    let dragedToSameParent;

    if (prev[target.parentItem].data != 'root') {
      dragedToSameParent = prev[target.parentItem].children.includes(
        item.index,
      );
    } else if (target.targetItem == 'root') {
      dragedToSameParent = prev[target.targetItem].children.includes(
        item.index,
      );
    }
    return dragedToSameParent;
  };

  const addItemToNewParent = (
    target: DraggingPositionItem | DraggingPositionBetweenItems,
    prev: any,
    item: TreeItem,
  ) => {
    if (target.targetType != 'item') {
      prev[target.parentItem].children.push(item.index);
    } else {
      if (prev[target.targetItem].isFolder) {
        prev[target.targetItem].children.push(item.index);
      } else {
        for (const [key, value] of Object.entries(prev)) {
          if (value.children.includes(target.targetItem)) {
            value.children.push(item.index);
          }
        }
      }
    }
  };

  const updateItemsPosition = (
    prev: any,
    items: Array<TreeItem>,
    target: DraggingPositionItem | DraggingPositionBetweenItems,
  ) => {
    // Handle D&D intentionally only for one item
    const item = items[0];

    if (dragedToTheSameParent(prev, item, target)) return prev;

    deleteItemFromItsPreviousParent(prev, item);

    if (target.targetItem == 'root') return prev;

    addItemToNewParent(target, prev, item);

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
