import { style, when, either, not } from 'themed-jss';
import { dangerColor, textColor } from '../colors';

import { Baseline, Disabled, Interactive, ReachingOut, ForceStandby } from '../interactivity/styles';
import { Theme } from '../theme';


export const Primary = style<Theme>(theme => ({
  color: `${textColor(theme.primary)} !darkmode`,
  background: `${theme.primary} !important !darkmode`,
}));

export const PrimaryText = style<Theme>(theme => ({
  color: `${theme.primary} !darkmode`,
}));

export const Danger = style(() => ({
  background: `${dangerColor().hex()} !important !darkmode`,
  color: 'white !darkmode',
}));

export const DangerText = style(() => ({
  color: `${dangerColor().hex()} !darkmode`,
}));

export const Icon = style(() => ({
  width: 32,
  minWidth: 0,
  padding: 0,
}));

export default style<Theme>((_, $) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  padding: '8px 24px',
  height: 32,
  minWidth: 96,
  margin: 4,

  ...$.extend(Baseline),
  ...$.extend(Interactive),
  [either(when(':hover'), when(':focus'))]: $.extend(ReachingOut),
  [when(':active')]: $.extend(ForceStandby),
  [when(not($(ForceStandby)), ':disabled')]: $.extend(Disabled),
}));
