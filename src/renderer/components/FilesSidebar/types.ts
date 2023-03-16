// eslint-disable-next-line import/named
import { TreeItem } from 'react-complex-tree';

export type MathTreeItem = {
  path: string;
} & TreeItem;

export type TreeItemsObj = {
  [key: string]: MathTreeItem;
};
