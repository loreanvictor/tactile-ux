import { RendererLike } from 'render-jsx';
import { global } from 'themed-jss';
import { ThemedComponentThis } from 'themed-jss/jsx';

import { Theme } from './theme';


const style = global<Theme>(theme => ({
  'body, html': {
    padding: 0,
    margin: 0,
    minHeight: '100vh',
  },

  'body': {
    background: theme.background,
  },

  '*': {
    color: theme.text,
  },

  'a, a:visited': {
    color: theme.primary,
  }
}));


export function GlobalStyles(
  this: ThemedComponentThis<Theme>,
  _: {},
  renderer: RendererLike<Node>
) {
  this.theme.add(style);

  return <></>;
}
