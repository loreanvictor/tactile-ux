import { expr, map, MaybeSource, of, pipe, Source, source } from 'callbag-common';
import state, { State, StateLike } from 'callbag-state';
import { RendererLike } from 'render-jsx';
import { ThemedComponentThis } from 'themed-jss/jsx';
import { Form, ValidationRules } from 'callbag-form';

import { Interaction } from '../interactivity/interaction';
import { ReachingOut, ForceStandby } from '../interactivity/styles';
import { Theme } from '../theme';

import style, { Container, Error, Errors, Hint, Label, Postfix } from './style';


export interface TextInputPropsBase {
  placeholder: MaybeSource<string>;
  label?: MaybeSource<string>;
  mode?: MaybeSource<Interaction>;
  readonly?: MaybeSource<boolean>;
  hint?: any;
  postfix?: any;
}

export interface TextInputPropsWithoutForm extends TextInputPropsBase {
  state: State<string> | StateLike<string>;
  hasError?: Source<boolean>;
  error?: any;
}

export interface TextInputPropsWithForm<T, V extends ValidationRules<T>, K extends keyof T> extends TextInputPropsBase {
  form: Form<T, any, V>;
  field: K;
  errors?: {
    [E in keyof V[K]]: any
  }
}

export type TextInputProps<T, V extends ValidationRules<T>, K extends keyof T> =
  TextInputPropsWithForm<T, V, K> | TextInputPropsWithoutForm;

function isWithForm<T, V extends ValidationRules<T>, K extends keyof T>(t: TextInputProps<T, V, K>)
  : t is TextInputPropsWithForm<T, V, K> {
  return t && !!(t as any).form;
}

export function TextInput<T, V extends ValidationRules<T>, K extends keyof T>(
  this: ThemedComponentThis<Theme>,
  props: TextInputProps<T, V, K>,
  renderer: RendererLike<Node>
) {
  if (isWithForm(props)) {
    return <TextInput
      placeholder={props.placeholder}
      label={props.label}
      mode={props.mode}
      readonly={props.readonly}
      hint={props.hint}
      postfix={props.postfix}
      state={props.form.data.sub(props.field) as any}
      hasError={pipe(props.form.errors, map(e => e[props.field]?.hasErrors || false))}
      error={props.errors ?
        <ul class={this.theme.class(Errors)}>{
          Object.entries(props.errors).map(([k, v]: any) =>
            <li hidden={pipe(props.form.errors, map(e => !(e[props.field] as any)?.[k]))}>{v}</li>
          )
        }</ul>
        : undefined
      }
    />;
  } else {
    const touched = state(false);
    const mode = source(props.mode || Interaction.Standby);
    const readonly = source(props.readonly || false);

    const showError = props.hasError ? expr($ => $(props.hasError!) && $(touched)) : of(false);

    return <div class={[this.theme.class(Container), { [this.theme.class(Error)]: showError }]}>
      {
        props.label
          ? <label class={this.theme.class(Label)}>{props.label}</label>
          : ''
      }
      { props.postfix ? <div class={this.theme.class(Postfix)}>{props.postfix}</div> : '' }
      <input
        type='text'
        class={[
          this.theme.class(style),
          {
            [this.theme.class(ReachingOut)]: expr($ => $(mode) === Interaction.ReachingOut),
            [this.theme.class(ForceStandby)]: expr($ => $(mode) === Interaction.Standby),
          }
        ]}
        onblur={() => touched.set(true)}
        disabled={expr($ => $(mode) === Interaction.Disabled || $(readonly))}
        placeholder={props.placeholder}
        _state={props.state}
      />
      { props.hint ? <div hidden={expr($ => $(showError) && !!props.error)}
        class={this.theme.class(Hint)}>{props.hint}</div> : '' }
      { props.error ? <div hidden={expr($ => !$(showError))} class={this.theme.class(Hint)}>{props.error}</div> : ''}
    </div>;
  }
}
