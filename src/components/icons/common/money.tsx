import { component$ } from '@builder.io/qwik';
import type { IconProps } from '~/components/common/icons';

export default component$<IconProps>((props) => (
    <svg
        class={props.class}
        width={props.width}
        height={props.height}
        viewBox="0 0 27 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M19.125 23.4556H7.875C4.5 23.4556 2.25 21.7681 2.25 17.8306V9.95557C2.25 6.01807 4.5 4.33057 7.875 4.33057H19.125C22.5 4.33057 24.75 6.01807 24.75 9.95557V17.8306C24.75 21.7681 22.5 23.4556 19.125 23.4556Z" stroke="#1C1F24" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M13.5 17.2681C15.364 17.2681 16.875 15.757 16.875 13.8931C16.875 12.0291 15.364 10.5181 13.5 10.5181C11.636 10.5181 10.125 12.0291 10.125 13.8931C10.125 15.757 11.636 17.2681 13.5 17.2681Z" stroke="#1C1F24" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M6.1875 11.0806V16.7056" stroke="#1C1F24" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M20.8125 11.0806V16.7056" stroke="#1C1F24" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    </svg>


));