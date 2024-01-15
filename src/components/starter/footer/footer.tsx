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
          link: "/simulasi",
          disabled: true,
        },
        {
          title: "Katalog Komponen PC",
          link: "/katalog",
          disabled: true,
        },
        {
          title: "Jasa Rakit PC",
          link: "/rakit",
          disabled: true,
        },
        {
          title: "Jasa Servis PC",
          link: "/servis",
          disabled: true,
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
          link: "/",
          disabled: true,
        },
        {
          title: "Hubungi Kami",
          link: "/",
          disabled: true,
        },
        {
          title: "Syarat dan Ketentuan",
          link: "/",
          disabled: true,
        },
        {
          title: "Privasi",
          link: "/",
          disabled: true,
        },
        {
          title: "Dukung Kami",
          link: "/",
          disabled: true,
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

              {item.list.map((listItem) => {
                if (listItem.disabled) {
                  return (
                    <div key={listItem.title}>
                      <a preventdefault:click
                        onclick$={() => alert('Coming Soon!')}
                        href={listItem.link}
                      >
                        {listItem.title}
                      </a>
                    </div>
                  )
                }
                return (
                  <div key={listItem.title}>
                    <a href={listItem.link}>{listItem.title}</a>
                  </div>
                )
              })}
            </main>
          </div>
        ))}
      </main>
      <div class={styles.copyright}>
        BangunPC © {new Date().getFullYear()}
        <div class={styles.brand}>
          <FaInstagram />
          <FaXTwitter />
        </div>
      </div>
    </footer>
  );
});
