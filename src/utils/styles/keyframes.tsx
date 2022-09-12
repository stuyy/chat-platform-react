import { keyframes } from 'styled-components';

export const fadeInUpwards = keyframes`
  from {
    opacity: 0;
    transform: translateY(20%);
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
`;

export const slideUp = keyframes`
  0% {
    transform: translate(-50%, 100%)
  }
  100% {
    transform: translate(-50%, -20%)
  }
`;

export const slideDown = keyframes`
  0% {
    transform: translate(-50%, -20%)
  }
  100% {
    transform: translate(-50%, 100%)
  }
`;
