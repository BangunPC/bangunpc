import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './style.css?inline';

export const ThemeSwitch = component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="flex items-center gap-3 mx-2">
      <input
        type="checkbox"
        id="hide-checkbox"
        class="hidden"
        onClick$={() => {
          const theme = document.documentElement.className;
          if (theme === 'light') {
            document.documentElement.className = 'dark';
            localStorage.setItem('theme', 'dark');
          } else {
            document.documentElement.className = 'light';
            localStorage.setItem('theme', 'light');
          }
        }}
      />
      {/* ---------------------------------------------- */}
      <label for="hide-checkbox" class="switch">
        <span class="slider round"></span>
      </label>
    </div>
  );
});
