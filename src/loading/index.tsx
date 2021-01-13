import { RendererLike } from 'render-jsx';
import { ThemedComponentThis } from 'themed-jss/jsx';

import { Theme } from '../theme';
import { containerStyle, pathStyle, spinnerStyle } from './style';


export interface LoadingProps {
  color?: 'primary' | 'text' | 'inverted',
}

export function Loading(
  this: ThemedComponentThis<Theme>,
  props: LoadingProps,
  renderer: RendererLike<Node>
) {
  return <div class={[
    this.theme.class(containerStyle),
    {
      '--text': props.color === 'text',
      '--inverted': props.color === 'inverted',
    }
  ]} _content={`
    <svg class="${this.theme.class(spinnerStyle)}" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <circle class="${this.theme.class(pathStyle)}" xmlns="http://www.w3.org/2000/svg"/>
    </svg>
  `}/>;
}
