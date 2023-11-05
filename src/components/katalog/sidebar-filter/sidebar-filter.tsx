import { TbChevronUp } from '@qwikest/icons/tablericons';
import style from './sidebar-filter.module.css';
import { component$ } from "@builder.io/qwik";

type SidebarFilterType = {
    title: string
    items: Array<string>
}

export default component$<SidebarFilterType>((props) => {
    const id = props.title.replace(/\s/g, '_');

    return (
        <div class={style.filter}>
            <input type="checkbox" id={id + "filtertoggle"} hidden />
            <style>
                {`
                    .${id}main {
                        animation: overflow 0.3s;
                        transition: all;
                        transition-duration: 0.3s;
                        overflow: hidden;
                        height: ${props.items.length * 20}px;
                    }

                    .${id}chevron {
                        transition: all;
                        transition-duration: 0.3s;
                    }

                    #${id}filtertoggle:checked ~ .${id}main {
                        height: 0;
                    }

                    #${id}filtertoggle:checked ~ label .${id}chevron {
                        rotate: 180deg;
                    }
                `}
            </style>
            <label for={id + "filtertoggle"} class={id+'filterLabel'}>
                <header class={style.header}>
                    {props.title}
                    <TbChevronUp class={id + 'chevron'} />
                </header>
            </label>
            <main class={[style.main, id + 'main']}>
                {props.items.map((item) => (
                    <div key={item} class={style.item}>
                        <input type="checkbox" id={item} class={style.toggle} />
                        <label for={item} class={style.toggleLabel}>{item}</label>
                    </div>
                ))}
            </main>
        </div>
    )
})