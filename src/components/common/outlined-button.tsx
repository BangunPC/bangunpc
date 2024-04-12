import { Slot, component$ } from '@builder.io/qwik';
import type { ButtonProps } from './filled-button';

export const outlinedButtonClass =
  'rounded-md bg-transparent border border-solid border-primary text-primary font-semibold text-lg px-2 py-1 transition-colors duration-200 hover:bg-button-hover hover:border-transparent hover:text-white ';

export default component$<ButtonProps>((props) => {
  const componentClass = outlinedButtonClass + props.class;

  if (props.labelFor) {
    return (
      <label class={componentClass} for={props.labelFor}>
        <Slot />
      </label>
    );
  } else {
    return (
      <button class={componentClass} onClick$={props.onClick$}>
        <Slot />
      </button>
    );
  }
});
