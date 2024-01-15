import { component$ } from "@builder.io/qwik";
// import { QwikLogo } from "../icons/qwik";
import styles from "./header.module.css";
import { Link } from "@builder.io/qwik-city";
import ShoppingCart from "../icons/shopping-cart";
import Devices from "../icons/devices";
import User from "../icons/user";
import DocumentText from "../icons/document-text";
import Profile from "../icons/profile";
import { TbMenu2 } from "@qwikest/icons/tablericons";


const headersItems = [
  {
    icon: <Devices width="24" height="24" />,
    title: "Simulasi Rakit PC",
    disabled: true,
  },
  {
    icon: <User width="24" height="24" />,
    title: "Jasa Rakit PC",
    altTitle: "Jasa Servis PC",
    disabled: true,
  },
  {
    icon: <ShoppingCart width="24" height="24" />,
    title: "Katalog",
    labelFor: "toggleKatalogModal",
  },
  {
    icon: <DocumentText width="24" height="24" />,
    title: "Blog",
    // href: "https://static-bangunpc.pages.dev/artikel/",
    href: "/blog",
  },
];

export default component$(() => {
  return (
    <header class={[styles.header, 'backdrop-blur-3xl']}>
      {/* <div class={["container", styles.wrapper]}> */}
      <div class={styles.logoAndToggle}>
        <a href="/" title="qwik">
          {/* <QwikLogo height={50} width={143} /> */}
          <span class="text-2xl font-semibold text-black">BangunPC</span>
        </a>
        <div>
          <label for="toggle" class={styles.toggleButton}>
            <TbMenu2 class='w-6 h-6' />
          </label>
        </div>
      </div>
      <input type="checkbox" id="toggle" class={styles.toggle} />
      <div class={styles.buttons}>
        <div class={[styles.iconswrapper, 'm-auto']}>
          {headersItems.map((item) => (
            <div key={item.title} class={styles.link}>
              {item.disabled && (
                <Link
                  preventdefault:click
                  title={item.title}
                  class={[styles.link, "transition duration-200"]}
                  onClick$={() => {
                    // toast("Coming Soon!")
                    alert('Coming Soon!')
                  }}
                >
                  {item.icon}
                  {item.title}
                </Link>
              )}
              {item.href && (
                <Link
                  href={item.href}
                  title={item.title}
                  class={[styles.link, "transition duration-200"]}
                >
                  {item.icon}
                  {item.title}
                </Link>
              )}
              {item.labelFor && (

                <label for={item.labelFor}
                  class={[styles.link, "transition duration-200"]}
                >
                  {item.icon}
                  {item.title}
                </label>
              )}
            </div>
          ))}
        </div>
        <Link class={styles.login}>
          <Profile width="24" height="24" class="inline-block fill-white" />
          <span>Login</span>
        </Link>
      </div>
      {/* </div> */}
    </header>
  );
});
