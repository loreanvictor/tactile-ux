import { child, descendant, either, style, when } from 'themed-jss';
import { dangerColor } from '../colors';

import { Baseline, Disabled, ForceInteractive, Standby } from '../interactivity/styles';
import { Theme } from '../theme';


export const Container = style<Theme>(() => ({
  margin: 4,
  position: 'relative',
}));

export const Label = style<Theme>(() => ({
  fontSize: '.85rem',
  fontWeight: 'bold',
  transition: 'color .3s',
  margin: 4,
}));

export const Hint = style<Theme>(() => ({
  fontSize: '.85rem',
  opacity: .8,
  transition: 'color .3s',
  margin: 4,
  marginTop: 8,
}));

export const Errors = style<Theme>(() => ({
  [descendant('*')]: {
    color: dangerColor().toString(),
  },
  padding: 0,
  paddingLeft: 16,
  margin: 0,
}));

export const Postfix = style<Theme>(() => ({
  position: 'absolute',
  textAlign: 'right',
  right: 0,
  padding: 8,
  zIndex: 1,
}));

export const Input = style<Theme>((_, $) => ({
  width: 'calc(100% - 18px)',
  padding: 8,
  ...$.extend(Baseline),
  ...$.extend(Standby),
  [when(':focus')]: $.extend(ForceInteractive),
  [when(':disabled')]: $.extend(Disabled),
}));

export const Error = style<Theme>((_, $) => ({
  [child($(Input))]: {
    borderColor: dangerColor().toString(),
  },
  [either(child($(Label)), child($(Hint)))]: {
    color: dangerColor().toString(),
  }
}));

export default Input;
