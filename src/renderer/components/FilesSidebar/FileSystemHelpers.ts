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

  if (target.targetType === "item" && prev[target.targetItem].isFolder) {
    draggedToSameParent = prev[target.targetItem].children.includes(item.index);
  } else {
    draggedToSameParent = prev[target.parentItem].children.includes(item.index);
  }

  return draggedToSameParent;
};

export const changeItemPath = (prev: TreeItemsObj, item: MathTreeItem, newPath: string) => { 
  const oldPath = item.path;

  window.api.move(oldPath, newPath)

  const { [oldPath]: _, ...rest } = prev;
  
  const newState = {
    ...rest,
    [newPath]: {
      ...item,
      index: newPath,
      path: newPath,
    },
  }

  return newState;
};

export const addItemToNewParent = (
  target: DraggingPositionItem | DraggingPositionBetweenItems,
  prev: TreeItemsObj,
  item: MathTreeItem,
) => {
  if (target.targetType != 'item') {
    const newPath = prev[target.parentItem].path +
    '\\' +
    item.data +
    (item.isFolder ? '' : '.json');
    prev = changeItemPath(prev, item, newPath);
    prev[target.parentItem].children.push(newPath);
  } else {
    if (prev[target.targetItem].isFolder) {
      const newPath = prev[target.targetItem].path +
      '\\' +
      item.data +
      (item.isFolder ? '' : '.json');
      prev = changeItemPath(prev, item, newPath);
      prev[target.targetItem].children.push(newPath);
    } else {
      for (const [, value] of Object.entries(prev)) {
        const mathTreeItem = value as MathTreeItem;

        if (mathTreeItem.children.includes(target.targetItem)) {
          const newPath = mathTreeItem.path +
          '\\' +
          item.data +
          (item.isFolder ? '' : '.json');
          prev = changeItemPath(prev, item, newPath);
          mathTreeItem.children.push(newPath);
        }
      }
    }
  }
  return prev;
};

export const updateItemsPosition = (
  prev: TreeItemsObj,
  item: TreeItem,
  target: DraggingPositionItem | DraggingPositionBetweenItems,
) => {
  deleteItemFromItsPreviousParent(prev, item);
  if ((target as DraggingPositionItem).targetItem == 'root') return prev;
  return addItemToNewParent(target, prev, item as MathTreeItem);
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

  // TODO: format \\ and / correctly
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
    if (getFileNameFromPath(childItem.path) === name) {
      // if the name matches, check if the item is a folder or a file
      return folder ? childItem.isFolder === true : !childItem.isFolder;
    }
  }

  return false; // did not find a matching item
}

export const getFileNameFromPath = (path: string) => {
  // TODO: format \\ and / correctly
  return path.split('\\').pop().split('.')[0];
}

export const getParent = (items: TreeItemsObj, childIndex: TreeItemIndex) => {
  for (const [, value] of Object.entries(items)) {
    const mathItemTree = value as MathTreeItem;
    if (mathItemTree.children.includes(childIndex)) {
      return mathItemTree;
    }
  }
}
