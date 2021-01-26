/* eslint-disable no-unused-expressions */
import { should } from 'chai';
import { testGlobalRender, testRender } from 'test-callbag-jsx';
import { theme } from 'themed-jss';
import { themePlug } from 'themed-jss/jsx';

import { Theme } from '../../theme';
import { DarkModeToggle } from '..';
import { DarkMode } from 'themed-jss/dark-mode';

should();

describe('<DarkModeToggle/>', () => {
  it('should render a button with given content.', () => {
    testRender((r, document) => {
      const renderer = r.plug(themePlug(theme<Theme>({
        background: 'black',
        card: 'white',
        primary: 'blue',
        text: 'gray'
      })));

      renderer.render(<DarkModeToggle/>).on(document.body);
    });
  });

  it('should toggle dark mode when clicked.', () => {
    testGlobalRender((r, $) => {
      const renderer = r.plug(themePlug(theme<Theme>({
        background: 'black',
        card: 'white',
        primary: 'blue',
        text: 'gray'
      })));

      DarkMode.initialize();
      const toggle = <DarkModeToggle/>;
      renderer.render(toggle).on(document.body);
      document.body.parentElement?.classList.contains('--dark').should.be.false;
      $(toggle).click();
      document.body.parentElement?.classList.contains('--dark').should.be.true;
    });
  });
});
