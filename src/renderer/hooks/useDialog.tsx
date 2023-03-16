import { BlockElement } from '@renderer/common/types';
import { useEffect } from 'react';
import { useGeneralContext } from '@components/GeneralContext';

export function useDialog(
  setStateFunction: (...args: unknown[]) => unknown,
  setAllBlockValues: (...args: unknown[]) => unknown,
  setClearModalOpen: (args: boolean) => void,
) {
  const { clearPageRequest } = useGeneralContext();
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
