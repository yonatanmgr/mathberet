/* eslint-disable import/named */
import ErrorModal from '@components/common/Modals/ErrorModal';
import { useGeneralContext } from '@components/GeneralContext';
import React, { SetStateAction, useEffect, useState } from 'react';
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
  newFolderName,
  generateStateWithNewFile,
  newFileName,
  itemExistsInParent,
} from './FileSystemHelpers';
import { MathTreeItem, TreeItemsObj } from './types';
import { useTranslation } from 'react-i18next';

type receivedProps = { filesPath: string; root: SetStateAction<TreeItemsObj> };
declare global {
  interface Window {
    api: any;
  }
}
function FileSystem() {
  const { t, i18n } = useTranslation();
  const { currentOS, setSelectedFile } = useGeneralContext();
  const [errorModalContent, setErrorModalContent] = useState('');
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedDirectory, setSelectedDirectory] =
    useState<TreeItemIndex>('root');
  const [focusedItem, setFocusedItem] = useState<TreeItemIndex>(-1);

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
    window.api.receive('gotNotebooks', (data: receivedProps) => {
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
      return updateItemsPosition(prev, item, target, currentOS);
    });
  };

  const addFolder = () => {
    if (
      itemExistsInParent(
        newFolderName,
        selectedDirectory,
        items,
        true,
        currentOS,
      )
    ) {
      setErrorModalContent(t('Modal 3'));
      setErrorModalOpen(true);
      return;
    }
    setItems((prev) =>
      generateStateWithNewFolder(prev, selectedDirectory, currentOS),
    );
  };

  const addFile = () => {
    if (
      itemExistsInParent(
        newFileName,
        selectedDirectory,
        items,
        false,
        currentOS,
      )
    ) {
      setErrorModalContent(t('Modal 2'));
      setErrorModalOpen(true);
      return;
    }
    setItems((prev) =>
      generateStateWithNewFile(prev, selectedDirectory, currentOS),
    );
  };

  const handleRenameItem = (item: MathTreeItem, name: string): void => {
    if (items[name]) {
      setErrorModalContent(t('Modal 4'));
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

  const handleClickedOutsideItem = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('rct-tree-items-container')) {
      setSelectedDirectory('root');
      setFocusedItem(-1);
      setSelectedItems([]);
      setExpandedItems([]);
    }
  };

  return (
    <div className='file-system'>
      <div className='file-system-header'>
        <span
          data-tooltip={t('Notebooks Tooltip')}
          className='file-system-header-title'
          onDoubleClick={() => window.api.openFiles()}
        >
          {t('My Notebooks')}
        </span>
        <div className='file-system-header-buttons'>
          <button onClick={addFolder} data-tooltip={t('New Folder')}>
            <i className='fi fi-rr-add-folder' />
          </button>
          <button onClick={addFile} data-tooltip={t('New File')}>
            <i className='fi-rr-add-document' />
          </button>
        </div>
      </div>
      <div className='files-tree-container' onClick={handleClickedOutsideItem}>
        {/* <button onClick={() => console.table(items)}>X</button> */}
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
            item.isFolder
              ? setSelectedDirectory(mathTreeItem.index)
              : setSelectedFile(mathTreeItem.path);
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
