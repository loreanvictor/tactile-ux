import { RendererLike } from 'render-jsx';
import { ref } from 'render-jsx/common';
import { source, MaybeSource, expr } from 'callbag-common';
import { ThemedComponentThis } from 'themed-jss/jsx';

import style, { Danger, DangerText, Primary, PrimaryText, Icon } from './style';
import { ReachingOut, ForceStandby } from '../interactivity/styles';
import { Interaction } from '../interactivity/interaction';
import { Theme } from '../theme';


export interface ButtonProps {
  onclick: () => void;
  type?: MaybeSource<'primary' | 'primary-text' | 'danger' | 'danger-text' | 'normal'>;
  mode?: MaybeSource<Interaction>;
  icon?: boolean;
}


export function Button(
  this: ThemedComponentThis<Theme>,
  props: ButtonProps,
  renderer: RendererLike<Node>,
  children?: Node[]
) {
  const mode = source(props.mode || Interaction.Interactive);
  const type = source(props.type || '');
  const btn = ref<HTMLElement>();

  return <button _ref={btn}
    class={[
      this.theme.class(style),
      {
        [this.theme.class(ReachingOut)]: expr($ => $(mode) === Interaction.ReachingOut),
        [this.theme.class(ForceStandby)]: expr($ => $(mode) === Interaction.Standby),
        [this.theme.class(Primary)]: expr($ => $(type) === 'primary'),
        [this.theme.class(PrimaryText)]: expr($ => $(type) === 'primary-text'),
        [this.theme.class(Danger)]: expr($ => $(type) === 'danger'),
        [this.theme.class(DangerText)]: expr($ => $(type) === 'danger-text'),
        [this.theme.class(Icon)]: props.icon,
      }
    ]}
    disabled={expr($ => $(mode) === Interaction.Disabled || $(mode) === Interaction.Standby)}
    onmouseup={() => btn.$.blur()}
    onclick={props.onclick}>
    {children}
  </button>;
}
