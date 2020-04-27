import { useCallback } from 'react';

interface UseFileSelectOptions {
  multiple?: boolean;
  accept?: string;
}

function useFileSelect({ multiple, accept }: UseFileSelectOptions = {}) {
  const openSelect: () => Promise<FileList> = useCallback(
    () =>
      new Promise((resolve, reject) => {
        const fileSelector = document.createElement('input');
        fileSelector.setAttribute('type', 'file');
        if (multiple) {
          fileSelector.setAttribute('multiple', 'multiple');
        }
        if (accept) {
          fileSelector.setAttribute('accept', accept);
        }
        fileSelector.onchange = ({ target }) => {
          if (target) {
            const files = (target as HTMLInputElement).files;
            if (!files || files.length === 0) {
              reject(new Error('no files selected'));
            }
            resolve(files as FileList);
          }
        };
        fileSelector.click();
      }),
    [multiple, accept]
  );

  return [openSelect];
}

export default useFileSelect;
