import { keyframes, style } from '@vanilla-extract/css';
import { flexCenter } from './container.css';
import { theme } from '../themes/theme.css';

export const setupPageContainer = style([
  flexCenter,
  {
    backgroundColor: theme.primary.normal,
  },
]);

export const logoContainer = style({
  width: '20rem',

  '@media': {
    'screen and (max-width: 600px)': {
      blockSize: '10rem',
    },
  },
});

export const circularLoadingContainer = flexCenter;

const spin = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

export const circularLoadingSpinner = style({
  width: '100px',
  height: '100px',
  border: '8px solid rgba(255, 255, 255, 0.3)',
  borderTop: '8px solid white',
  borderRadius: '50%',
  animation: `${spin} 1s linear infinite`,
});

const gradient = keyframes({
  '0%': {
    backgroundPosition: '0% 0%',
  },
  '50%': {
    backgroundPosition: '100% 100%',
  },
  '100%': {
    backgroundPosition: '0% 0%',
  },
});

export const boxLoading = style([
  flexCenter,
  {
    background:
      `linear-gradient(135deg, ${theme.primary.normal}, ${theme.highlight.h1}, ${theme.primary.normal})`,
    backgroundSize: '600% 600%',
    animation: `${gradient} 2s linear infinite`,
  },
]);

export const boxLoadingDots = style({
  fontSize: '2rem',
  color: 'rgba(0,0,0,0.1)',
});
