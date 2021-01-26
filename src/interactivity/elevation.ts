import { shadowColor } from '../colors';

import { Interaction } from './interaction';
import { Theme } from '../theme';


export function interactionElevation(mode: Interaction) {
  switch (mode) {
  case Interaction.Disabled:
  case Interaction.Standby:
    return -1;
  case Interaction.ReachingOut:
    return 1;
  case Interaction.Interactive:
  default:
    return 0;
  }
}

export function elevation(mode: Interaction, theme: Theme, exception = '') {
  const n = interactionElevation(mode);
  const s = 2 * (n + 1) + 1;
  const shadow = shadowColor(theme.background);

  return {
    transform: `translateY(${-n * 2}px) ${exception}`,
    boxShadow: `0 ${s}px ${s + 3}px ${shadow.hex()},`
            + ` -2px ${-3 + s}px 8px ${shadow.lighten(1).hex()}`
            + ` ${exception}`
  };
}
