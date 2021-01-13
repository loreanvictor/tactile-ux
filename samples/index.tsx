import { makeRenderer } from 'callbag-jsx';
import { theme } from 'themed-jss';
import { themePlug } from 'themed-jss/jsx';

import { GlobalStyles, Loading } from '../src';
import { Theme } from '../src/theme';

const myTheme = theme<Theme>({
  background: '#f5f5f5',
  card: '#fff',
  primary: 'red',
  text: '#000'
}, {
  background: '#212121',
  card: '#000',
  text: '#fff',
});

const renderer = makeRenderer().plug(themePlug(myTheme));

renderer.render(<>
  <GlobalStyles/>
  Hellow World! <Loading/>
</>).on(document.body);
