import { state } from 'callbag-state';
import { expr } from 'callbag-common';
import { RendererLike } from 'render-jsx';
import { DarkMode } from 'themed-jss/dark-mode';
import { ThemedComponentThis } from 'themed-jss/jsx';
import { Button } from '../button';

import { Theme } from '../theme';
import { Interaction } from '../interactivity/interaction';
import style, { Arc, DArc, Ray } from './style';


export function DarkModeToggle(this: ThemedComponentThis<Theme>, _: {}, renderer: RendererLike<Node>) {
  const changing = state(false);

  return <Button icon onclick={() => {
    changing.set(true);
    DarkMode.toggle();
    // istanbul ignore next
    setTimeout(() => changing.set(false), 450);
  }}
  mode={expr($ => $(changing) ? Interaction.Standby : Interaction.Interactive)}>
    <div class={this.theme.class(style)}>
      <div class={this.theme.class(Arc)}/>
      <div class={this.theme.class(DArc)}/>
      <div class={this.theme.class(Ray)}/>
      <div class={this.theme.class(Ray)}/>
      <div class={this.theme.class(Ray)}/>
      <div class={this.theme.class(Ray)}/>
      <div class={this.theme.class(Ray)}/>
      <div class={this.theme.class(Ray)}/>
      <div class={this.theme.class(Ray)}/>
      <div class={this.theme.class(Ray)}/>
    </div>
  </Button>;
}
