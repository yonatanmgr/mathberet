/* eslint-disable import/named */
import {
  TreeItem,
  DraggingPositionItem,
  DraggingPositionBetweenItems,
  TreeItemIndex,
} from 'react-complex-tree';
import { TreeItemsObj, MathTreeItem } from './types';

export const draggedToTheSameParent = (
  prev: TreeItemsObj,
  item: TreeItem,
  target: DraggingPositionItem | DraggingPositionBetweenItems,
): boolean => {
  let draggedToSameParent;

  if (prev[target.parentItem].data != 'root') {
    draggedToSameParent = prev[target.parentItem].children.includes(item.index);
  } else if ((target as DraggingPositionItem).targetItem == 'root') {
    draggedToSameParent = prev[
      (target as DraggingPositionItem).targetItem
    ].children.includes(item.index);
  }
  return draggedToSameParent;
};

export const changeItemPath = (item: MathTreeItem, newPath: string) => {
  window.api.move(item.path, newPath);
  item.path = newPath;
};

export const addItemToNewParent = (
  target: DraggingPositionItem | DraggingPositionBetweenItems,
  prev: TreeItemsObj,
  item: MathTreeItem,
) => {
  if (target.targetType != 'item') {
    prev[target.parentItem].children.push(item.index);
    changeItemPath(
      item,
      prev[target.parentItem].path +
        '\\' +
        item.data +
        (item.isFolder ? '' : '.json'),
    );
  } else {
    if (prev[target.targetItem].isFolder) {
      prev[target.targetItem].children.push(item.index);
      changeItemPath(
        item,
        prev[target.targetItem].path +
          '\\' +
          item.data +
          (item.isFolder ? '' : '.json'),
      );
    } else {
      for (const [, value] of Object.entries(prev)) {
        const mathTreeItem = value as MathTreeItem;

        if (mathTreeItem.children.includes(target.targetItem)) {
          mathTreeItem.children.push(item.index);
          changeItemPath(
            item,
            mathTreeItem.path +
              '\\' +
              item.data +
              (item.isFolder ? '' : '.json'),
          );
        }
      }
    }
  }
};

export const updateItemsPosition = (
  prev: TreeItemsObj,
  item: TreeItem,
  target: DraggingPositionItem | DraggingPositionBetweenItems,
) => {
  deleteItemFromItsPreviousParent(prev, item);
  if ((target as DraggingPositionItem).targetItem == 'root') return prev;
  addItemToNewParent(target, prev, item as MathTreeItem);
  return prev;
};

export const deleteItemFromItsPreviousParent = (
  prev: TreeItemsObj,
  item: TreeItem,
) => {
  for (const [, value] of Object.entries(prev)) {
    const mathItemTree = value as MathTreeItem;
    if (mathItemTree.children.includes(item.index)) {
      mathItemTree.children = mathItemTree.children.filter(
        (child) => child !== item.index,
      );
    }
  }
};

export const newFolderName = 'New Folder';

export const generateStateWithNewFolder = (
  prev: TreeItemsObj,
  parentIndex: TreeItemIndex,
) => {
  let parentValue;
  let parentKey;

  if (parentIndex != 'root') {
    parentValue = prev[parentIndex];
    parentKey = parentIndex;
  } else {
    parentValue = prev['root'];
    parentKey = 'root';
  }

  const newFolderPath = parentValue.path + '\\' + newFolderName;
  parentValue.children.push(newFolderPath);

  const newState = {
    ...prev,
    [parentKey]: parentValue,
    [newFolderPath]: {
      index: newFolderPath,
      data: newFolderName,
      children: [] as TreeItemIndex[],
      path: newFolderPath,
      isFolder: true,
    },
  };

  window.api.newFolder(newFolderPath);

  return newState;
};

export const newFileName = 'New File';

export const generateStateWithNewFile = (
  prev: TreeItemsObj,
  parentIndex: TreeItemIndex,
) => {
  let parentValue;
  let parentKey;

  if (parentIndex != 'root') {
    parentValue = prev[parentIndex];
    parentKey = parentIndex;
  } else {
    parentValue = prev['root'];
    parentKey = 'root';
  }

  // TODO: format \\ and / correctly
  const newFilePath = parentValue.path + '\\' + newFileName + '.json';
  parentValue.children.push(newFilePath);

  const newState = {
    ...prev,
    [parentKey]: parentValue,
    [newFilePath]: {
      index: newFilePath,
      data: newFileName,
      children: [] as Array<any>,
      path: newFilePath,
      isFolder: false,
    },
  };

  window.api.newFile(newFilePath);

  return newState;
};

export function itemExistsInParent(
  name: string,
  parent: TreeItemIndex,
  items: TreeItemsObj,
  folder: boolean,
): boolean {
  const parentItem = items[parent];
  if (!parentItem || !parentItem.children) {
    return false; // the parent directory does not exist or is not a folder
  }

  for (const childIndex of parentItem.children) {
    const childItem = items[childIndex];
    // TODO: format \\ and / correctly
    if (childItem.path.split('\\').pop().split('.')[0] === name) {
      // if the name matches, check if the item is a folder or a file
      return folder ? childItem.isFolder === true : !childItem.isFolder;
    }
  }

  return false; // did not find a matching item
}
