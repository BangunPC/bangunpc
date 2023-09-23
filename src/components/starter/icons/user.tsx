import { component$ } from "@builder.io/qwik";
import type { IconProps } from "./icons";

export default component$<IconProps>((props) => (
  // vuesax/bold/user
  <svg
    class={props.class}
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M 12 12 C 14.761 12 17 9.761 17 7 C 17 4.239 14.761 2 12 2 C 9.239 2 7 4.239 7 7 C 7 9.761 9.239 12 12 12 Z"></path>
    <path d="M 12 14.5 C 6.99 14.5 2.91 17.86 2.91 22 C 2.91 22.28 3.13 22.5 3.41 22.5 L 20.59 22.5 C 20.87 22.5 21.09 22.28 21.09 22 C 21.09 17.86 17.01 14.5 12 14.5 Z"></path>
  </svg>
));
