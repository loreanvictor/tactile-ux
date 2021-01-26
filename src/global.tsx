import { RendererLike } from 'render-jsx';
import { global, parentIs } from 'themed-jss';
import { DarkMode } from 'themed-jss/dark-mode';
import { ThemedComponentThis } from 'themed-jss/jsx';

import { Theme } from './theme';
import ButtonStyle from './button/style';


const style = global<Theme>((theme, $) => ({
  'body, html': {
    padding: 0,
    margin: 0,
    minHeight: '100vh',
  },

  'body': {
    background: theme.background,
    [parentIs('.--dark-mode-animate')]: {
      transition: 'background .3s',
    }
  },

  '*': {
    color: theme.text,
  },

  'a, a:visited': {
    color: theme.primary,
  },

  'button': $.extend(ButtonStyle),

  'p': {
    margin: 4,
  },
}));


export function GlobalStyles(
  this: ThemedComponentThis<Theme>,
  _: {},
  renderer: RendererLike<Node>
) {
  this.theme.add(style);

  // istanbul ignore next
  try {
    DarkMode.initialize();
    setTimeout(() => document.body.parentElement!.classList.add('--dark-mode-animate'), 300);
  } catch { /* nothing to do, simply not browser environment */ }

  return <></>;
}
