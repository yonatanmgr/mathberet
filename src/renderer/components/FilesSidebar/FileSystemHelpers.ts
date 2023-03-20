/* eslint-disable import/named */
import i18next from '@common/i18n';
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
    draggedToSameParent = prev[(target as DraggingPositionItem).targetItem].children.includes(item.index);
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
        item.index +
        (item.isFolder ? '' : '.json'),
    );
  } else {
    if (prev[target.targetItem].isFolder) {
      prev[target.targetItem].children.push(item.index);
      changeItemPath(
        item,
        prev[target.targetItem].path +
          '\\' +
          item.index +
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
              item.index +
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

export const newFolderKey = i18next.t("New Folder");

export const generateStateWithNewFolder = (
  prev: TreeItemsObj,
  focusedItem: TreeItemIndex,
) => {
  let parentValue;
  let parentKey;

  if (focusedItem) {
    for (const [key, value] of Object.entries(prev)) {
      const mathTreeItem = value as MathTreeItem;
      if (mathTreeItem.children.includes(focusedItem)) {
        parentValue = mathTreeItem;
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
      children: [] as TreeItemIndex[],
      path: newFolderPath,
      isFolder: true,
    },
  };

  window.api.newFolder(newFolderPath);

  return newState;
};

export const newFileKey = i18next.t("New File");

export const generateStateWithNewFile = (
  prev: TreeItemsObj,
  focusedItem: TreeItemIndex,
) => {
  let parentValue;
  let parentKey;

  if (focusedItem) {
    for (const [key, value] of Object.entries(prev)) {
      const mathTreeItem = value as MathTreeItem;
      if (mathTreeItem.children.includes(focusedItem)) {
        parentValue = mathTreeItem;
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
      children: ([] as Array<any>),
      path: newFilePath,
      isFolder: false,
    },
  };

  window.api.newFile(newFilePath);

  return newState;
};
