import { should } from 'chai';
import { testRender } from 'test-callbag-jsx';
import { theme } from 'themed-jss';
import { themePlug } from 'themed-jss/jsx';
import { Fonts } from '../fonts';
import { Theme } from '../theme';


should();

describe('<Fonts/>', () => {
  it('should render fonts on the page.', () => {
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

      renderer.render(<Fonts/>).on(document.body);

      Object.keys(sheets).length.should.not.equal(0);
    });
  });
});
