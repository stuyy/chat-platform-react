import { useEffect } from 'react';

export function useKeydown(
  callback: (e: KeyboardEvent) => void,
  deps?: React.DependencyList | undefined
) {
  useEffect(() => {
    window.addEventListener('keydown', callback);
    return () => {
      window.removeEventListener('keydown', callback);
    };
  }, deps);
}

export function useHandleClick(
  callback: (e: MouseEvent) => any,
  deps?: React.DependencyList | undefined
) {
  useEffect(() => {
    window.addEventListener('click', callback);
    return () => {
      window.removeEventListener('click', callback);
    };
  }, deps);
}

export function useBeforeUnload(
  callback: (e: BeforeUnloadEvent) => any,
  deps?: React.DependencyList | undefined
) {
  useEffect(() => {
    window.addEventListener('beforeunload', callback);
    return () => {
      window.removeEventListener('beforeunload', callback);
    };
  }, deps);
}
