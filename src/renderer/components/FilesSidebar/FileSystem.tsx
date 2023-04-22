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
  getFileNameFromPath,
  deleteItemFromItsPreviousParent,
  getParent,
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
  const { t } = useTranslation();
  const { setSelectedFile } = useGeneralContext();

  const [items, setItems] = useState<TreeItemsObj>({
    root: {
      index: 'root',
      data: '',
      path: '',
    },
  });

  const [errorModalContent, setErrorModalContent] = useState('');
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedDirectory, setSelectedDirectory] =
    useState<TreeItemIndex>('root');
  const [focusedItem, setFocusedItem] = useState<TreeItemIndex>(-1);

  useEffect(() => {
    window.api.getNotebooks();
  }, [items]);

  useEffect(() => {
    window.api.receive('gotNotebooks', (data: receivedProps) => {
      setItems(data.root);
    });
  }, []);

  const handleOnDrop = (
    draggedItems: TreeItem[],
    target: DraggingPositionItem | DraggingPositionBetweenItems,
  ) => {
    setItems((prev) => {
      // Handle D&D intentionally only for one item
      const draggedItem = draggedItems[0];
      if (draggedToTheSameParent(prev, draggedItem, target)) return prev;
      let dest: TreeItemIndex = '';
      if (
        'targetItem' in target &&
        ((target as DraggingPositionItem | DraggingPositionBetweenItems)
          .targetType !== 'item' ||
          prev[target.targetItem].isFolder)
      ) {
        dest = target.targetItem;
      } else {
        dest = target.parentItem;
      }
      if (dest) {
        for (const item of items[dest].children) {
          if (
            getFileNameFromPath(item as string) === draggedItem.data &&
            items[item].isFolder === draggedItem.isFolder
          ) {
            setErrorModalContent(t('Modal 5'));
            setErrorModalOpen(true);
            return prev;
          }
        }
      }
      return updateItemsPosition(prev, draggedItem, target);
    });
  };

  const addFolder = () => {
    if (itemExistsInParent(newFolderName, selectedDirectory, items, true)) {
      setErrorModalContent(t('Modal 3'));
      setErrorModalOpen(true);
      return;
    }
    setItems((prev) => generateStateWithNewFolder(prev, selectedDirectory));
  };

  const addFile = () => {
    if (itemExistsInParent(newFileName, selectedDirectory, items, false)) {
      setErrorModalContent(t('Modal 2'));
      setErrorModalOpen(true);
      return;
    }
    setItems((prev) => generateStateWithNewFile(prev, selectedDirectory));
  };

  const handleRenameItem = (item: MathTreeItem, name: string): void => {
    if (
      itemExistsInParent(
        name,
        getParent(items, item.index).index,
        items,
        item.isFolder,
      )
    ) {
      setErrorModalContent(t('Modal 4'));
      setErrorModalOpen(true);
    } else {
      setItems((prev) => {
        let newPath: string;
        const oldPath = item.index;

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

        let newItems = { ...prev };

        newItems = changeItemPath(newItems, item, newPath);

        for (const [, value] of Object.entries(newItems)) {
          const mathTreeItem = value as MathTreeItem;
          if (mathTreeItem.children.includes(oldPath)) {
            mathTreeItem.children = mathTreeItem.children.filter(
              (child) => child !== oldPath,
            );
            mathTreeItem.children.push(newPath);
          }
        }

        return newItems;
      });
    }
  };

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

  const handleDeleteItem = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Delete' && focusedItem != -1) {
      window.api.delete(focusedItem, items[focusedItem].isFolder);
      setItems((prev) => {
        const newItems = { ...prev };
        const item = newItems[focusedItem];
        deleteItemFromItsPreviousParent(newItems, item);
        if (item.isFolder) {
          for (const [key] of Object.entries(newItems)) {
            if (key.startsWith(focusedItem as string)) {
              delete newItems[key];
            }
          }
        }
        return newItems;
      });
      setFocusedItem(-1);
      setSelectedDirectory('root');
    }
  };

  return (
    <div className='file-system' onKeyUp={handleDeleteItem}>
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
          canSearch={false}
          keyboardBindings={{ renameItem: ['shift+R'] }}
          viewState={{
            ['fileSystem']: {
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
          <Tree treeId='fileSystem' rootItem='root' treeLabel='File System' />
        </ControlledTreeEnvironment>
        <div>
          <p className='instruction-p'>
            {t('Press')} <span className='button-text'>Delete</span>{' '}
            {t('Delete Item')}
          </p>
          <p className='instruction-p'>
            {t('Press')} <span className='button-text'>Shift+R</span>{' '}
            {t('Rename Item')}
          </p>
        </div>
      </div>
      <ErrorModal
        open={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
      >
        {errorModalContent}
      </ErrorModal>
    </div>
  );
}

export default FileSystem;
