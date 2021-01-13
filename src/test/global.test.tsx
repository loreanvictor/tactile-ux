/* eslint-disable no-unused-expressions */
import { should } from 'chai';
import { theme } from 'themed-jss';
import { themePlug } from 'themed-jss/jsx';
import { testRender } from 'test-callbag-jsx';

import { GlobalStyles } from '../global';
import { Theme } from '../theme';


should();

describe('GlobalStyles', () => {
  it('should add generic styles to body', () => {
    testRender((r, document) => {
      const myTheme = theme<Theme>({
        background: 'red',
        card: 'purple',
        primary: 'blue',
        text: 'green'
      });
      const renderer = r.plug(themePlug(myTheme));
      const sheets = myTheme.sheets;
      Object.keys(sheets).length.should.equal(0);

      renderer.render(<GlobalStyles/>).on(document.body);

      Object.keys(sheets).length.should.equal(1);
      const sheet = sheets[Object.keys(sheets)[0]];
      sheet.attached.should.be.true;
      sheet.toString().should.equal(
      // eslint-disable-next-line indent
`body, html {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
body {
  background: red;
}
* {
  color: green;
}
a, a:visited {
  color: blue;
}`
      );
    });
  });
});
