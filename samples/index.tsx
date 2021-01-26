import { makeRenderer } from 'callbag-jsx';
import { theme } from 'themed-jss';
import { themePlug } from 'themed-jss/jsx';
import { DarkMode } from 'themed-jss/dark-mode';
import form, { required, isEmail } from 'callbag-form';

import { DarkModeToggle, GlobalStyles, Loading } from '../src';
import { Button } from '../src/button';
import { Theme } from '../src/theme';
import { Interaction } from '../src/interactivity/interaction';
import { TextInput } from '../src/text-input';
import { Fonts } from '../src/fonts';


const myTheme = theme<Theme>({
  background: '#f5f5f5',
  card: '#fff',
  primary: '#8105d8',
  text: '#000',
},
{
  background: '#313131',
  card: '#424242',
  text: '#fff',
}
);

const renderer = makeRenderer().plug(themePlug(myTheme));
const f = form({
  email: ['', { required, isEmail }]
});

renderer.render(<>
  <GlobalStyles/>
  <Fonts/>
  <div style={{margin: '256px auto', maxWidth: '768px', }}>
    <div>
      <TextInput placeholder='type something ...'
        form={f}
        field='email'
        label={<>Email</>}
        hint={<>Enter your email</>}
        postfix={<Loading/>}
        errors={{
          required: <>Email address is required</>,
          isEmail: <>Must enter a valid email address</>,
        }}
      />
      <br/>
      <DarkModeToggle/>
      <Button onclick={() => {}} mode={Interaction.Disabled}>Disabled</Button>
      <button onclick={() => DarkMode.toggle()}>Click Me!</button>
      <Button onclick={() => DarkMode.toggle()} type='danger'>Careful</Button>
      <Button onclick={() => DarkMode.toggle()} type='primary'>Let's Go!</Button>
    </div>
  </div>
</>).on(document.body);
