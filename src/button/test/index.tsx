/* eslint-disable no-unused-expressions */
import { should, expect } from 'chai';
import { testRender } from 'test-callbag-jsx';
import { theme } from 'themed-jss';
import { themePlug } from 'themed-jss/jsx';

import { Button } from '..';
import { Primary, PrimaryText, Danger, DangerText, Icon } from '../style';
import { Theme } from '../../theme';

should();

describe('<Button/>', () => {
  it('should render a button with given content.', done => {
    testRender((r, document, $) => {
      const renderer = r.plug(themePlug(theme<Theme>({
        background: 'black',
        card: 'white',
        primary: 'blue',
        text: 'gray'
      })));

      renderer.render(<Button onclick={() => done()}>Hellow <p>World!</p></Button>).on(document.body);
      document.body.textContent!.should.equal('Hellow World!');
      $('button').click();
    });
  });

  it('should blur when mouse is upped from it.', () => {
    testRender((r, document, $) => {
      const renderer = r.plug(themePlug(theme<Theme>({
        background: 'black',
        card: 'white',
        primary: 'blue',
        text: 'gray'
      })));

      const btn = <Button onclick={() => {}}>Hi</Button>;
      renderer.render(btn).on(document.body);
      btn.focus();
      expect(document.activeElement).to.equal(btn);
      $(btn).trigger('mouseup');
      expect(document.activeElement).to.not.equal(btn);
    });
  });

  it('should render proper classes based on given style props.', () => {
    testRender((r, document, $) => {
      const myTheme = theme<Theme>({
        background: 'black',
        card: 'white',
        primary: 'blue',
        text: 'gray'
      });
      const renderer = r.plug(themePlug(myTheme));

      const noop = () => {};
      const primary = <Button onclick={noop} type='primary'>Hola</Button>;
      const primaryText = <Button onclick={noop} type='primary-text'>Hola</Button>;
      const danger = <Button onclick={noop} type='danger'>Hola</Button>;
      const dangerText = <Button onclick={noop} type='danger-text'>Hola</Button>;
      const icon = <Button onclick={noop} type='primary' icon>Hola</Button>;
      renderer.render(<>
        {primary}{primaryText}{danger}{dangerText}{icon}
      </>).on(document.body);

      $(primary).is(myTheme.class(Primary)).should.be.true;
      $(primaryText).is(myTheme.class(PrimaryText)).should.be.true;
      $(danger).is(myTheme.class(Danger)).should.be.true;
      $(dangerText).is(myTheme.class(DangerText)).should.be.true;
      $(icon).is(myTheme.class(Icon)).should.be.true;
    });
  });
});
