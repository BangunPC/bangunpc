import { component$ } from "@builder.io/qwik";
// import { QwikLogo } from "../icons/qwik";
import styles from "./header.module.css";
import { Link } from "@builder.io/qwik-city";
import ShoppingCart from "../icons/shopping-cart";
import Devices from "../icons/devices";
import User from "../icons/user";
import DocumentText from "../icons/document-text";
import Profile from "../icons/profile";

const headersItems = [
  {
    icon: <Devices width="24" height="24" class="inline-block fill-black" />,
    title: "Simulasi Rakit PC",
    href: "",
  },
  {
    icon: <User width="24" height="24" class="inline-block fill-black" />,
    title: "Jasa Rakit PC",
    altTitle: "Jasa Servis PC",
    href: "",
  },
  {
    icon: (
      <ShoppingCart width="24" height="24" class="inline-block fill-black" />
    ),
    title: "Katalog",
    href: "/catalogue",
  },
  {
    icon: (
      <DocumentText width="24" height="24" class="inline-block fill-black" />
    ),
    title: "Blog",
    href: "https://static-bangunpc.pages.dev/artikel/",
  },
];

export default component$(() => {
  return (
    <header class={styles.header}>
      {/* <div class={["container", styles.wrapper]}> */}
      <div>
        <a href="/" title="qwik">
          {/* <QwikLogo height={50} width={143} /> */}
          <span class='text-2xl font-semibold text-black'>BangunPC</span>
        </a>
      </div>
      <div class={styles.iconswrapper}>
        {headersItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            title={item.title}
            class={styles.link}
            // altTitle={item.altTitle}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
      <Link class={styles.login}>
        <Profile width="24" height="24" class="inline-block fill-white" />
        <span>Login</span>
      </Link>
      {/* </div> */}
    </header>
  );
});
