import { component$, useSignal } from '@builder.io/qwik';
import OutlinedButton from './common/outlined-button';
import { Modal, ModalContent, ModalHeader } from '@qwik-ui/headless';
import FilledButton from './common/filled-button';
import { TbX } from '@qwikest/icons/tablericons';

export const ModalLogin = component$(() => {
  const showModalLogin = useSignal(false);
  const isSignupMode = useSignal(false);

  return (
    <>
      <div
        class="h-10 w-20 justify-center m-auto tablet:m-0 bg-button hover:bg-button-hover transition-colors hover:cursor-pointer rounded-lg flex flex-row text-white items-center font-semibold"
        onClick$={() => {
          showModalLogin.value = true;
        }}
      >
        <span class="inline">Masuk</span>
      </div>
      <Modal
        bind:show={showModalLogin}
        class="rounded-3xl bg-transparent backdrop:bg-black/50 backdrop-blur-md"
      >
        <ModalHeader></ModalHeader>
        <ModalContent>
          <div class="flex justify-end">
            <FilledButton
              onClick$={() => {
                showModalLogin.value = false;
              }}
              class="aspect-square fixed ml-auto rounded-xl mr-4 mt-4"
            >
              <TbX />
            </FilledButton>
          </div>
          <div class="flex flex-col px-12 py-8 text-sm font-semibold text-gray-500 rounded-3xl bg-zinc-100 max-md:px-5">
            <div class="mt-5 text-xl text-black">
              {isSignupMode.value ? 'Daftar Akun' : 'Masuk Akun'}
            </div>
            {isSignupMode.value && (
              <input
                placeholder="Nama Lengkap"
                class="justify-center p-2.5 mt-5 bg-white rounded-md leading-[150%] max-md:pr-5"
              />
            )}
            <input
              placeholder="yourname@example.com"
              class="justify-center p-2.5 mt-7 bg-white rounded-md leading-[150%] max-md:pr-5"
            />
            <input
              placeholder="Secure-P@ssw0rd"
              class="justify-center p-2.5 mt-5 whitespace-nowrap bg-white rounded-md leading-[150%] max-md:pr-5"
            />
            {isSignupMode.value && (
              <input
                placeholder="Konfirmasi Password"
                class="justify-center p-2.5 mt-5 bg-white rounded-md leading-[150%] max-md:pr-5"
              />
            )}
            <div
              class={[
                'cursor-pointer transition-colors duration-200 hover:bg-button-hover justify-center items-center px-12 py-2 mt-5 text-base font-bold leading-5 text-white whitespace-nowrap bg-blue-700 rounded-lg max-md:px-5 text-center shadow-bm',
              ]}
            >
              {isSignupMode.value ? 'Buat Akun' : 'Masuk'}
            </div>
            <div class="self-center mt-4 text-center text-black">
              {isSignupMode.value ? 'Sudah punya akun?' : 'Belum punya akun?'}{' '}
              <span
                class="font-bold text-black hover:bg-gray-300 cursor-pointer rounded-md px-1 py-2"
                onClick$={() => (isSignupMode.value = !isSignupMode.value)}
              >
                {isSignupMode.value ? 'Masuk' : 'Daftar Akun'}
              </span>
            </div>
            <div class="mt-4 text-center flex items-center">
              <span class="border-t-2 border-dashed border-gray-500 w-full"></span>
              <span class="mx-2">atau</span>
              <span class="border-t-2 border-dashed border-gray-500 w-full"></span>
            </div>
            <OutlinedButton class="flex gap-3 justify-center px-5 py-2 mt-4 text-base leading-5 rounded-lg border-2 border-solid border-neutral-900 text-neutral-900 max-md:px-5 max-md:ml-0.5">
              <img
                loading="lazy"
                width={21}
                height={21}
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d2602db335050199db2389f2f5b6cf82f54a4a6101c40d6871eccb967e89d14?"
                class="shrink-0 aspect-[1.05] w-[21px]"
              />
              <span class="my-auto">Masuk dengan Gmail</span>
            </OutlinedButton>
            <OutlinedButton class="flex justify-center items-center px-5 py-2 mt-1.5 text-base leading-5 rounded-lg border-2 border-solid border-neutral-900 text-neutral-900 max-md:px-5 max-md:ml-0.5">
              <div class="flex gap-3 justify-center">
                <img
                  loading="lazy"
                  width={25}
                  height={25}
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/85f94145c16ca89cd127b0fb48ce11d705dfdd6b77f91b7dfe5d9c9225ccaa57?"
                  class="shrink-0 aspect-[1.04] w-[25px]"
                />
                <span class="my-auto">Masuk dengan Facebook</span>
              </div>
            </OutlinedButton>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
});
