import { BlockElement } from '@renderer/common/types';
import { useEffect } from 'react';

export function useDialog(
  clearPageRequest: { cmd: string | object },
  setStateFunction: (...args: unknown[]) => unknown,
  setAllBlockValues: (...args: unknown[]) => unknown,
  setClearModalOpen: (args: boolean) => void,
) {

  const emptyArray: BlockElement[] = [];

  useEffect(() => {
    if (clearPageRequest.cmd === 'clear') setClearModalOpen(true);
  }, [clearPageRequest]);

  const handleDialogConfirm = () => {
    setClearModalOpen(false);
    setStateFunction((prev: { items: BlockElement[] }) => ({
      ...prev,
      items: emptyArray,
    }));
    setAllBlockValues([]);
  };

  const handleDialogCancel = () => setClearModalOpen(false);

  return { handleDialogCancel, handleDialogConfirm };
}
