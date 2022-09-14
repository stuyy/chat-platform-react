import { useEffect } from 'react';

export function useKeydown(
  callback: (e: KeyboardEvent) => void,
  deps?: React.DependencyList | undefined
) {
  useEffect(() => {
    window.addEventListener('keydown', callback);
    return () => {
      console.log('Removing keydown event listener');
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
      console.log('Removing click event listener');
      window.removeEventListener('click', callback);
    };
  }, deps);
}
