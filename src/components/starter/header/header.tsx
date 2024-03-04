import { component$ } from "@builder.io/qwik";
// import { QwikLogo } from "../icons/qwik";
import styles from "./header.module.css";
import { Link } from "@builder.io/qwik-city";
import ShoppingCart from "../icons/shopping-cart";
import Devices from "../icons/devices";
// import User from "../icons/user";
import DocumentText from "../icons/document-text";
// import Profile from "../icons/profile";
import { TbMenu2 } from "@qwikest/icons/tablericons";
import LogoHeader from "./logo-header";
import User2 from "../icons/user-2";


const headersItems = [
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
  {
    icon: <Devices width="24" height="24" />,
    title: "Simulasi Rakit PC",
    href: "/simulasi",
  },
  // {
  //   icon: <User width="24" height="24" />,
  //   title: "Jasa Rakit PC",
  //   altTitle: "Jasa Servis PC",
  //   disabled: true,
  // },
];

export default component$(() => {
  return (
    <>
      <header class={['flex backdrop-blur-3xl pr-[20px] fixed w-full z-[100] bg-[#f5f5f573] justify-center border-b border-b-[#00000014]']}>
        <input type="checkbox" id="toggle" class={styles.toggle} />
        <div class={[styles.header]}>

          {/* <div class={["container", styles.wrapper]}> */}
          <div class={[styles.logoAndToggle, ' min-h-[56px]']}>
            <Link href="/" title="Bangun PC" class='bg-primary aspect-square w-16'>
              {/* <QwikLogo height={50} width={143} /> */}
              <LogoHeader width="44" height="64" class="m-auto aspect-[44/64] w-7 outline-none stroke-none" />
            </Link>
            <div>
              <label for="toggle" class={styles.toggleButton}>
                <TbMenu2 class='w-6 h-6' />
              </label>
            </div>
          </div>
          <div class={[styles.buttons, 'w-full']}>
            <div class={[styles.iconswrapper, 'mr-auto']}>
              {headersItems.map((item) => (
                <div key={item.title} class={styles.link}>
                  {/* {item.disabled && (
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
                  )} */}
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
            {/* <Link class={styles.login}>
          <Profile width="24" height="24" class="inline-block fill-white" />
          <span>Login</span>
        </Link> */}
            <div
              class='m-auto tablet:m-0 mt-4 w-32 tablet:w-28 bg-button hover:bg-button-hover transition-colors hover:cursor-pointer rounded-full flex flex-row text-white items-center py-2 px-4 justify-evenly tablet:justify-between font-semibold'
            >
              <User2 width="24" height="24" class="fill-none" />
              <span class='ml-1 -translate-x-1'>
                Login
              </span>
            </div>
          </div>
        </div>
        {/* </div> */}
      </header>
    </>
  );
});
