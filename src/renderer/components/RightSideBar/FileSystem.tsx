import ErrorModal from '@components/common/Modals/ErrorModal';
import { useGeneralContext } from '@components/GeneralContext';
import React, { useEffect, useState } from 'react';
import {
  Tree,
  ControlledTreeEnvironment,
  DraggingPositionItem,
  TreeItem,
  DraggingPositionBetweenItems,
  TreeItemIndex,
} from 'react-complex-tree';
import './FileSystem.scss';
import {
  draggedToTheSameParent,
  updateItemsPosition,
  changeItemPath,
  generateStateWithNewFolder,
  newFolderKey,
  generateStateWithNewFile,
  newFileKey,
} from './FileSystemHelpers';
import { MathTreeItem, TreeItemsObj } from './types';

function FileSystem() {
  const { setSelectedFile } = useGeneralContext();

  const [errorModalContent, setErrorModalContent] = useState('');
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [focusedItem, setFocusedItem] = useState<TreeItemIndex>(-1);
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [items, setItems] = useState<TreeItemsObj>({
    root: {
      index: 'root',
      data: '',
      path: '',
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

  const handleOnDrop = (
    items: TreeItem[],
    target: DraggingPositionItem | DraggingPositionBetweenItems,
  ) => {
    setItems((prev) => {
      // Handle D&D intentionally only for one item
      const item = items[0];
      if (draggedToTheSameParent(prev, item, target)) return prev;
      return updateItemsPosition(prev, item, target);
    });
  };

  const addFolder = () => {
    //Todo: check also that they are in the same folder - compare paths
    if (items[newFolderKey]?.isFolder) {
      setErrorModalContent('תיקיה חדשה כבר קיימת');
      setErrorModalOpen(true);
      return;
    }
    setItems((prev) => generateStateWithNewFolder(prev, focusedItem));
  };

  const addFile = () => {
    //Todo: check also that they are in the same folder - compare paths
    if (items[newFileKey]?.isFolder == false) {
      setErrorModalContent(`קובץ חדש כבר קיים`);
      setErrorModalOpen(true);
      return;
    }
    setItems((prev) => generateStateWithNewFile(prev, focusedItem));
  };

  const handleRenameItem = (item: MathTreeItem, name: string): void => {
    if (items[name]) {
      setErrorModalContent('כבר קיים שם כזה');
      setErrorModalOpen(true);
    } else {
      let newPath: string;

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

        for (const [, value] of Object.entries(newState)) {
          const mathTreeItem = value as MathTreeItem;
          if (mathTreeItem.children.includes(oldIndex)) {
            mathTreeItem.children = mathTreeItem.children.filter(
              (child) => child !== oldIndex,
            );
            mathTreeItem.children.push(name);
          }
        }

        return newState;
      });
    }
  };

  const handleErrorModalClose = () => setErrorModalOpen(false);

  return (
    <div className='file-system'>
      <div className='file-system-header'>
        <span
          data-tooltip='לחצו פעמיים כדי לפתוח את התיקייה'
          className='file-system-header-title'
          onDoubleClick={() => window.api.openFiles()}
        >
          המחברות שלי
        </span>
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
            const mathTreeItem = item as MathTreeItem;
            setFocusedItem(mathTreeItem.index);
            if (!item.isFolder) setSelectedFile(mathTreeItem.path);
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
      <ErrorModal open={errorModalOpen} onClose={handleErrorModalClose}>
        {errorModalContent}
      </ErrorModal>
    </div>
  );
}

export default FileSystem;
