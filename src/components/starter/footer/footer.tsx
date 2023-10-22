import { component$ } from "@builder.io/qwik";
// import { useServerTimeLoader } from "~/routes/layout";
import styles from "./footer.module.css";
import { FaInstagram, FaXTwitter } from "@qwikest/icons/font-awesome";

export default component$(() => {
  // const serverTime = useServerTimeLoader();

  const konten = [
    {
      title: "BangunPC",
      list: [
        {
          title: "bangunpc@gmail.com",
          link: "mailto:bangunpc@gmail.com"
        }
      ]
    },
    {
      title: "Layanan Kami",
      list: [
        {
          title: "Beranda",
          link: "/"
        },
        {
          title: "Simulasi Rakit PC",
          link: "/simulasi"
        },
        {
          title: "Katalog Rakit PC",
          link: "/katalog"
        },
        {
          title: "Jasa Rakit PC",
          link: "/rakit"
        },
        {
          title: "Jasa Servis PC",
          link: "/servis"
        },
        {
          title: "Blog",
          link: "/blog"
        },
      ],
    },
    {
      title: "Tentang Kami",
      list: [
        {
          title: "Tentang Kami",
          link: "/"
        },
        {
          title: "Hubungi Kami",
          link: "/"
        },
        {
          title: "Syarat dan Ketentuan",
          link: "/"
        },
        {
          title: "Privasi",
          link: "/"
        },
        {
          title: "Dukung Kami",
          link: "/"
        },
      ],
    },
  ]

  return (
    <footer class={styles.footer}>
      <main class={styles.konten}>
        {/* <a href="https://www.builder.io/" target="_blank" class={styles.anchor}> */}
        {/* <span>Made with ♡ by Builder.io</span> */}
        {/* <span class={styles.spacer}>|</span> */}
        {/* <span>{serverTime.value.date}</span> */}
        {/* </a> */}
        {konten.map((item) => (
          <div key={item.title} class={styles.kontenColumn}>
            <header>{item.title}</header>
            <main class={styles.kontenList}>

              {item.list.map((listItem) => (
                <div key={listItem.title}>
                  <a href={listItem.link}>{listItem.title}</a>
                </div>
              ))}
            </main>
          </div>
        ))}
      </main>
      <div class={styles.copyright}>
        BangunPC © 2023 
        <div class={styles.brand}>
          <FaInstagram />
          <FaXTwitter />
        </div>
      </div>
    </footer>
  );
});
