import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './navbar.module.css?inline';
import { Link } from '@builder.io/qwik-city';
import LogoHeader from './logo-header';
import { kToggleKatalogModal } from '~/lib/constant';
import { ModalLogin } from '~/components/modal-login';
import { ThemeSwitch } from './theme-switch/theme-switch';
import MenuNavbar from '../icons/common/menu-navbar';

const headersItems = [
  // {
  //   title: "Jasa",
  //   altTitle: "Jasa",
  //   href: "/jasa",
  //   // disabled: true,
  // },
  {
    title: 'Katalog',
    labelFor: kToggleKatalogModal,
  },
  {
    title: 'Simulasi Rakit PC',
    href: '/simulasi',
  },
  {
    title: 'Blog',
    href: '/blog',
  },
];

export const Navbar = component$(() => {
  const style = useStylesScoped$(styles);
  return (
    <>
      <input
        hidden
        aria-hidden
        id="show-navbar-menu"
        type="checkbox"
        onChange$={() => {
          const navbarMenu = document.getElementById(
            'show-navbar-menu'
          ) as HTMLInputElement;
          if (!navbarMenu.checked) {
            document
              .getElementById('navbar')
              ?.classList.add('hidden', 'tablet:flex');
          } else {
            document
              .getElementById('navbar')
              ?.classList.remove('hidden', 'tablet:flex');
          }
        }}
      />
      <header
        class={`flex backdrop-blur-3xl pr-[20px] fixed w-full z-[100] bg-[#f5f5f573] justify-center border-b border-b-[#00000014]`}
      >
        <div class="w-full tablet:max-w-screen-desktop m-auto flex flex-col tablet:flex-row">
          {/* <div class={["container", ]}> */}
          <div
            class={
              'flex flex-row w-full tablet:w-fit items-center justify-between'
            }
          >
            <Link
              href="/"
              title="Bangun PC"
              class="flex gap-3 items-center h-navbar-min-h mx-4"
            >
              {/* <QwikLogo height={50} width={143} /> */}
              <LogoHeader class="m-auto aspect-square h-9 outline-none stroke-none" />
            </Link>
            <label for="show-navbar-menu" class="tablet:hidden">
              <MenuNavbar class="w-10 h-10 cursor-pointer" />
            </label>
          </div>
          <div
            id="navbar"
            class={`hidden tablet:flex flex flex-col tablet:flex-row mb-4 tablet:mb-0 text-center w-full items-center gap-4`}
          >
            <div
              class={`flex flex-col tablet:flex-row gap-4 tablet:gap-8 m-auto`}
            >
              {headersItems.map((item) => (
                <div key={item.title}>
                  {/* {item.disabled && (
                    <Link
                      preventdefault:click
                      title={item.title}
                      class={["transition duration-200"]}
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
                      class={[
                        'h-full cursor-pointer font-semibold hover:text-primary text-[#241c1c] transition-all duration-200',
                      ]}
                    >
                      {item.title}
                    </Link>
                  )}
                  {item.labelFor && (
                    <label
                      for={item.labelFor}
                      class={[
                        'h-full cursor-pointer font-semibold hover:text-primary text-[#1C1F24] transition-all duration-200',
                      ]}
                    >
                      {item.title}
                    </label>
                  )}
                </div>
              ))}
            </div>
            {/* <Link class={}>
          <Profile width="24" height="24" class="inline-block fill-white" />
          <span>Login</span>
        </Link> */}

            <ModalLogin />
            <ThemeSwitch />
          </div>
        </div>
        {/* </div> */}
      </header>
    </>
  );
});
