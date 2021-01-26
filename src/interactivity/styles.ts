import { style } from 'themed-jss';

import { Theme } from '../theme';
import { elevation } from './elevation';
import { Interaction } from './interaction';

export const Baseline = style<Theme>(theme => ({
  background: theme.background,
  border: '1px solid transparent',
  outline: 'none',
  borderRadius: 3,
  cursor: 'pointer',
  backfaceVisibility: 'hidden',
  transition: 'color .3s, background .3s, box-shadow .3s, transform .15s, border .3s',
}));

export const Disabled = style<Theme>(theme => ({
  background: theme.background,
  cursor: 'initial !important',
  ...elevation(Interaction.Disabled, theme, '!important'),
}));

export const Standby = style<Theme>(theme => ({
  cursor: 'initial !important',
  background: theme.card,
  ...elevation(Interaction.Standby, theme),
}));

export const ForceStandby = style<Theme>(theme => ({
  cursor: 'initial !important',
  background: theme.card,
  ...elevation(Interaction.Standby, theme, '!important'),
}));

export const Interactive = style<Theme>(theme => ({
  background: theme.card,
  ...elevation(Interaction.Interactive, theme),
}));

export const ForceInteractive = style<Theme>(theme => ({
  background: theme.card,
  ...elevation(Interaction.Interactive, theme, '!important'),
}));

export const ReachingOut = style<Theme>(theme => elevation(Interaction.ReachingOut, theme));
