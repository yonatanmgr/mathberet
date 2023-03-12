import { useGeneralContext } from '@components/GeneralContext';
import { useEffect } from 'react';
import { triggerPopupAnimation } from '@components/common/Notification';
import {
  BlockElement,
  FileStructure,
  PageGridState,
  BlockState,
} from '@renderer/common/types';

export function useFileSaveLoad(
  state: PageGridState,
  setStateFunction: (...args: unknown[]) => unknown,
  allBlockValues: BlockState[],
  setAllBlockValues: (...args: unknown[]) => unknown,
  setPopupType: (args: string) => void,
) {
  const emptyArray: BlockElement[] = [];
  const { selectedFile, saveRequest, currentFileTags, setCurrentFileTags } =
    useGeneralContext();

  const setEmptyPage = () =>
    setStateFunction((prev: { items: BlockElement[] }) => ({
      ...prev,
      items: emptyArray,
    }));

  useEffect(
    function loadFile() {
      if (selectedFile) window.api.loadX(selectedFile);
      window.api.receive('gotLoadedDataX', (data: string) => {
        if (!data) {
          setEmptyPage();
          return;
        }

        const parsedData = JSON.parse(data);

        const blocksData: BlockElement[] = parsedData.blocks;
        parsedData.tags
          ? setCurrentFileTags(JSON.parse(data).tags)
          : setCurrentFileTags([]);

        if (!Array.isArray(blocksData)) {
          setEmptyPage();
          return;
        }

        blocksData.map((block: BlockElement) => {
          if (block.y == null) {
            block.y = Infinity;
          }
          if (block.x == null) {
            block.x = Infinity;
          }
        });

        setStateFunction((prev: { items: BlockElement[] }) => ({
          ...prev,
          items: blocksData,
        }));

        let newData: object[] = blocksData;
        newData = newData.map((block: BlockElement) => {
          return { id: block.i, metaData: block.metaData };
        });

        setAllBlockValues(newData);
      });
    },
    [selectedFile],
  );

  useEffect(
    function saveFile() {
      if (saveRequest?.cmd === 'save') {
        if (selectedFile) {
          try {
            saveGridDataToFile();
            triggerPopupAnimation('save', setPopupType);
          } catch (error) {
            triggerPopupAnimation('error', setPopupType);
            console.error(error);
          }
        } else triggerPopupAnimation('firstSelect', setPopupType);
      }
    },
    [saveRequest],
  );

  const saveMetaDataPerBlock = (block: BlockElement) => {
    const found = allBlockValues.find(
      blockState => blockState.id == block.i,
    ).metaData;

    block.metaData = {
      content: found.content,
      blockStateFunction: () => null,
    };
  };

  const saveGridDataToFile = () => {
    const currentItems = state.items;
    currentItems.map(saveMetaDataPerBlock);

    const fileData: FileStructure = {
      blocks: currentItems,
      tags: currentFileTags,
      mathMemory: {},
    };

    window.api.saveX(JSON.stringify(fileData), selectedFile);
  };
}
