/* eslint-disable no-unused-expressions */
import { should } from 'chai';
import { theme } from 'themed-jss';
import { themePlug } from 'themed-jss/jsx';
import { testRender } from 'test-callbag-jsx';

import { Loading } from '../';
import { Theme } from '../../theme';

should();


describe('<Loading/>', () => {
  it('should render a loading indicator with given color.', () => {
    testRender((r) => {
      const renderer = r.plug(themePlug(theme<Theme>({
        background: 'white',
        card: 'white',
        primary: 'black',
        text: 'black'
      })));

      const l1 = <Loading/> as HTMLElement;
      const l2 = <Loading color='inverted'/> as HTMLElement;
      const l3 = <Loading color='text'/> as HTMLElement;

      l1.classList.length.should.equal(1);
      l2.classList.length.should.equal(2);
      l2.classList.contains('--inverted').should.be.true;
      l3.classList.length.should.equal(2);
      l3.classList.contains('--text').should.be.true;
    });
  });
});
