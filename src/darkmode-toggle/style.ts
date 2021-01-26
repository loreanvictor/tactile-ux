import { style, child, when } from 'themed-jss';
import { inDarkMode } from 'themed-jss/dark-mode';
import { Theme } from '../theme';


export const Arc = style<Theme>(() => ({
  width: 12, height: 12, borderRadius: 12,
  transition: 'transform .3s, background .15s',
  ...inDarkMode({
    transform: 'scale(1.2)'
  })
}));

export const DArc = style<Theme>(theme => ({
  background: `${theme.card} !important`,
  width: 12, height: 12, borderRadius: 12,
  transform: 'translateX(12px)',
  transition: 'transform .3s, background .3s',
  ...inDarkMode({
    transform: 'translateX(5px)',
  })
}));

export const Ray = style<Theme>(() => ({
  width: 4, height: 2, borderRadius: 2,
  opacity: 1,
  transition: 'transform .15s, opacity .15s',
  transitionDelay: '.45s',
  ...Object.fromEntries([1, 2, 3, 4, 5, 6, 7, 8].map(n => [
    when(`:nth-child(${n + 2})`),
    {
      transform: `rotate(${n * 45}deg) translateX(11px)`,
      ...inDarkMode({
        transform: `rotate(${n * 45}deg) translateX(0px) scale(.5)`,
        transitionDelay: 0,
        opacity: 0,
      })
    }
  ])),
}));

export default style<Theme>(theme => ({
  overflow: 'hidden',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  width: 32, height: 32, borderRadius: 32,
  transition: 'transform .45s',

  [child('div')]: {
    position: 'absolute',
    background: theme.text,
  },

  ...inDarkMode({
    transform: 'rotate(-45deg)'
  })
}));
