import { component$, useSignal } from '@builder.io/qwik';
import OutlinedButton from './common/outlined-button';
import { Modal, ModalContent, ModalHeader } from '@qwik-ui/headless';
import FilledButton from './common/filled-button';
import { TbArrowBack, TbX } from '@qwikest/icons/tablericons';

export type ModalResetProps = {
  onConfirm$: () => void;
};

export const ModalReset = component$<ModalResetProps>(({ onConfirm$ }) => {
  const showModalReset = useSignal(false);

  return (
    <>
      <FilledButton
        class="bg-rose-500 flex items-center gap-1"
        onClick$={() => {
          showModalReset.value = true;
        }}
      >
        <TbArrowBack class="-scale-y-100 inline-block" />
        <span>Reset</span>
      </FilledButton>
      <Modal
        bind:show={showModalReset}
        class="rounded-3xl bg-zinc-100 backdrop:bg-black/50 backdrop-blur-md"
      >
        <ModalHeader></ModalHeader>
        <ModalContent class="flex flex-col max-w-md">
          <div class="flex justify-end">
            <FilledButton
              onClick$={() => {
                showModalReset.value = false;
              }}
              class="aspect-square fixed ml-auto rounded-xl mr-4 mt-4"
            >
              <TbX />
            </FilledButton>
          </div>
          <div class="flex flex-col p-8 gap-2">
            <span class="font-semibold text-xl">Reset Simulasi</span>
            <span class="my-4 leading-[150%]">
              Apakah anda yakin ingin mereset simulasi rakit PC? Komponen yang
              telah ditambahkan akan hilang dan tidak bisa dikembalikan
            </span>
            <span class="flex gap-1">
              <FilledButton
                class="flex-1"
                onClick$={() => {
                  showModalReset.value = false;
                  onConfirm$;
                }}
              >
                Reset
              </FilledButton>
              <OutlinedButton
                class="flex-1"
                onClick$={() => {
                  showModalReset.value = false;
                }}
              >
                Cancel
              </OutlinedButton>
            </span>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
});
