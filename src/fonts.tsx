import { RendererLike } from 'render-jsx';
import { global } from 'themed-jss';
import { ThemedComponentThis } from 'themed-jss/jsx';


const style = global(() => ({
  '*': {
    fontFamily: "'Hind', sans-serif",
  },

  'pre, code': {
    fontFamily: "'Source Code Pro', monospace",
  }
}));

export function Fonts(this: ThemedComponentThis, _: {}, renderer: RendererLike<Node>) {
  this.theme.add(style);

  return <>
    <link rel="preconnect" href="https://fonts.gstatic.com"/>
    <link href="https://fonts.googleapis.com/css2?family=Hind:wght@100;700;800;&family=Source+Code+Pro:ital,wght@0,700;1,300&display=swap" rel="stylesheet"/>
  </>;
}
