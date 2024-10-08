import { createVar, keyframes, style } from '@vanilla-extract/css';
import { flexCenter } from './container.css';
import { theme } from '../themes/theme.css';

export const gradStart = createVar();
export const gradEnd = createVar();

export const logo = style([
  flexCenter,
  {
    flexDirection: 'row',
    fontWeight: 'bold',
    // gradient text
    background: `linear-gradient(to bottom, ${gradStart}, ${gradEnd})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    // border to text
    WebkitTextStroke: '0.25px black',

    vars: {
      [gradStart]: theme.logo.gradStart,
      [gradEnd]: theme.logo.gradEnd,
    },
  },
]);

export const svgContainer = style({
  display: 'flex',
  width: '100%',
  height: '100%',
  aspectRatio: '1/1',
  marginRight: '0.5rem',
});

// rotate the stroke
const setupAnimation = keyframes({
  '0%': {
    fillOpacity: 0,
    strokeOpacity: 0,
    strokeDashoffset: '600%',
    strokeDasharray: '600%',
  },
  '40%': {
    strokeDashoffset: '0%',
    strokeDasharray: '600%',
    fillOpacity: 0,
    strokeOpacity: 1,
  },
  '50%': {
    fillOpacity: 1,
    strokeOpacity: 0,
  },
  '70%': {
    fillOpacity: 1,
    strokeOpacity: 0,
  },
  '80%': {
    fillOpacity: 0,
    strokeOpacity: 0,
  },
  '100%': {
    fillOpacity: 0,
    strokeOpacity: 0,
  },
});

// blue color
const loadingAnimation = keyframes({
  '0%': {
    fillOpacity: 1,
    strokeOpacity: 0,
  },
  '50%': {
    strokeOpacity: 1,
  },
  '100%': {
    fillOpacity: 1,
    strokeOpacity: 0,
  },
});

export const svgPath = style({
  display: 'flex',
  fill: 'url(#custom-grad)',
  width: '100%',
  height: '100%',
  stroke: theme.logo.stroke,
  strokeOpacity: 0,
  strokeWidth: '0.1rem',

  '@media': {
    // when the screen is smaller than 600px
    'screen and (max-width: 600px)': {
      strokeWidth: '0.1rem',
    },
  },
});

export const setupLogo = style({
  animation: `${setupAnimation} 3s linear`,
  fillOpacity: 0,
});

export const loadingLogo = style({
  animation: `${loadingAnimation} 3s linear infinite`,
});
