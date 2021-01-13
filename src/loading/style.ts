import { style, keyframes, ancestorIs } from 'themed-jss';

import { Theme } from '../theme';


const Duration = 1;
const Offset = 200;

const rotate = /*#__PURE__*/keyframes(() => ({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
}));

const dash = /*#__PURE__*/keyframes(() => ({
  '0%': { strokeDashoffset: Offset },
  '50%': {
    strokeDashoffset: Offset/4,
    transform: 'rotate(45deg)',
  },
  '100%': {
    strokeDashoffset: Offset,
    transform: 'rotate(360deg)',
  }
}));

export const containerStyle = /*#__PURE__*/style(() => ({
  position: 'relative',
  display: 'inline-flex',
  verticalAlign: 'middle',
  alignItems: 'center',
  justifyContent: 'center',
  width: '1.5em', height: '1.5em',
}));

export const spinnerStyle = /*#__PURE__*/style((_, $) => ({
  width: '100%',
  height: '100%',
  animation: `${$(rotate)} ${Duration * 1.17}s linear infinite`,
}));

export const pathStyle = /*#__PURE__*/style<Theme>((theme, $) => ({
  strokeDasharray: Offset,
  strokeDashoffset: 0,
  transformOrigin: '33px 33px !important',
  fill: 'none',
  strokeWidth: 3,
  strokeLinecap: 'round',
  cx: '33px', cy: '33px', r: '30px',
  animation: `${$(dash)} ${Duration}s ease-in-out infinite`,

  stroke: theme.primary,

  [ancestorIs($(containerStyle), '.--text')]: {
    stroke: theme.text,
  },

  [ancestorIs($(containerStyle), '.--inverted')]: {
    stroke: theme.card,
  },
}));
