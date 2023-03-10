import { useGeneralContext } from '@components/GeneralContext';
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
  const { setSelectedFile } = useGeneralContext();

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

  const draggedToTheSameParent = (
    prev,
    item: TreeItem,
    target: DraggingPositionItem | DraggingPositionBetweenItems,
  ): boolean => {
    let draggedToSameParent;

    if (prev[target.parentItem].data != 'root') {
      draggedToSameParent = prev[target.parentItem].children.includes(
        item.index,
      );
    } else if (target.targetItem == 'root') {
      draggedToSameParent = prev[target.targetItem].children.includes(
        item.index,
      );
    }
    return draggedToSameParent;
  };

  const changeItemPath = (item, newPath) => {
    window.api.move(item.path, newPath);
    item.path = newPath;
  };

  const addItemToNewParent = (
    target: DraggingPositionItem | DraggingPositionBetweenItems,
    prev: any,
    item: TreeItem,
  ) => {
    if (target.targetType != 'item') {
      prev[target.parentItem].children.push(item.index);
      changeItemPath(
        item,
        prev[target.parentItem].path +
          '\\' +
          item.index +
          (item.isFolder ? '' : '.json'),
      );
    } else {
      if (prev[target.targetItem].isFolder) {
        prev[target.targetItem].children.push(item.index);
        changeItemPath(item, prev[target.targetItem].path + '\\' + item.index);
      } else {
        for (const [key, value] of Object.entries(prev)) {
          if (value.children.includes(target.targetItem)) {
            value.children.push(item.index);
            changeItemPath(
              item,
              value.path + '\\' + item.index + (item.isFolder ? '' : '.json'),
            );
          }
        }
      }
    }
  };

  const updateItemsPosition = (
    prev: any,
    item: TreeItem,
    target: DraggingPositionItem | DraggingPositionBetweenItems,
  ) => {
    deleteItemFromItsPreviousParent(prev, item);
    if (target.targetItem == 'root') return prev;
    addItemToNewParent(target, prev, item);
    return prev;
  };

  const handleOnDrop = (items, target) => {
    setItems((prev) => {
      // Handle D&D intentionally only for one item
      const item = items[0];
      if (draggedToTheSameParent(prev, item, target)) return prev;
      return updateItemsPosition(prev, item, target);
    });
  };

  const newFolderKey = 'תיקיה חדשה';

  const addFolder = () => {
    if (items[newFolderKey]?.isFolder) {
      alert('תיקיה חדשה כבר קיימת');
      return;
    }
    setItems((prev) => generateStateWithNewFolder(prev));
  };

  const generateStateWithNewFolder = (prev) => {
    let parentValue;
    let parentKey;

    if (focusedItem) {
      for (const [key, value] of Object.entries(prev)) {
        if (value.children.includes(focusedItem)) {
          parentValue = value;
          parentKey = key;
        }
      }
    } else {
      parentValue = prev['root'];
      parentKey = 'root';
    }

    parentValue.children.push(newFolderKey);

    const newFolderPath = parentValue.path + '\\' + newFolderKey;
    const newState = {
      ...prev,
      [parentKey]: parentValue,
      [newFolderKey]: {
        index: newFolderKey,
        data: newFolderKey,
        children: [],
        path: newFolderPath,
        isFolder: true,
      },
    };

    window.api.newFolder(newFolderPath);

    return newState;
  };

  const newFileKey = 'קובץ חדש';

  const generateStateWithNewFile = (prev) => {
    let parentValue;
    let parentKey;

    if (focusedItem) {
      for (const [key, value] of Object.entries(prev)) {
        if (value.children.includes(focusedItem)) {
          parentValue = value;
          parentKey = key;
        }
      }
    } else {
      parentValue = prev['root'];
      parentKey = 'root';
    }

    parentValue.children.push(newFileKey);

    const newFilePath = parentValue.path + '\\' + newFileKey + '.json';
    const newState = {
      ...prev,
      [parentKey]: parentValue,
      [newFileKey]: {
        index: newFileKey,
        data: newFileKey,
        children: [],
        path: newFilePath,
      },
    };

    window.api.newFile(newFilePath);

    return newState;
  };

  const addFile = () => {
    if (items[newFileKey]?.isFolder === false) {
      alert('קובץ חדש כבר קיים');
      return;
    }
    setItems((prev) => generateStateWithNewFile(prev));
  };

  const handleRenameItem = (item: TreeItem, name: string): void => {
    if (items[name]) {
      alert('כבר קיים שם כזה');
    } else {
      let newPath;

      if (item.isFolder) {
        const split = item.path.split('\\');
        split.pop();
        split.push(name);
        newPath = split.join('\\');
      } else {
        const index = item.path.length - (item.data + '.json').length;
        const dirName = item.path.slice(0, index);
        newPath = dirName + name + '.json';
      }
      changeItemPath(item, newPath);

      setItems((prev) => {
        const oldIndex = item.index;

        const newState = {
          ...prev,
          [name]: {
            ...prev[item.index],
            index: name,
            data: name,
            path: newPath,
          },
        };

        delete newState[oldIndex];

        for (const [key, value] of Object.entries(newState)) {
          if (value.children.includes(oldIndex)) {
            value.children = value.children.filter(
              (child) => child !== oldIndex,
            );
            value.children.push(name);
          }
        }

        return newState;
      });
    }
  };

  return (
    <div className='file-system'>
      <div className='file-system-header'>
        <span className='file-system-header-title'>המחברות שלי</span>
        <div className='file-system-header-buttons'>
          <button onClick={addFolder} data-tooltip='תיקיה חדשה'>
            <i className='fi fi-rr-add-folder' />
          </button>
          <button onClick={addFile} data-tooltip='קובץ חדש'>
            <i className='fi-rr-add-document' />
          </button>
        </div>
      </div>
      <div className='files-tree-container'>
        <button onClick={() => console.table(items)}>X</button>
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
          onDrop={handleOnDrop}
          onFocusItem={(item) => {
            setFocusedItem(item.index);
            if (!item.isFolder) setSelectedFile(item.path);
          }}
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
          onSelectItems={setSelectedItems}
          onRenameItem={handleRenameItem}
        >
          <Tree treeId='tree-2' rootItem='root' treeLabel='Tree Example' />
        </ControlledTreeEnvironment>
      </div>
    </div>
  );
}

export default FileSystem;
