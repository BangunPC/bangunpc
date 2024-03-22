import { $, component$, useSignal, useTask$, useVisibleTask$ } from "@builder.io/qwik";
import FilledButton from "~/components/common/filled-button";
import OutlinedButton from "~/components/common/outlined-button";
import SimulasiCable from "~/components/icons/simulasi/simulasi-cable";
import SimulasiCasing from "~/components/icons/simulasi/simulasi-casing";
import SimulasiCpu from "~/components/icons/simulasi/simulasi-cpu";
import SimulasiCpuCooler from "~/components/icons/simulasi/simulasi-cpu-cooler";
import SimulasiGpu from "~/components/icons/simulasi/simulasi-gpu";
import SimulasiMemory from "~/components/icons/simulasi/simulasi-memory";
import SimulasiMonitor from "~/components/icons/simulasi/simulasi-monitor";
import SimulasiMotherboard from "~/components/icons/simulasi/simulasi-motherboard";
import SimulasiMouse from "~/components/icons/simulasi/simulasi-mouse";
import SimulasiPsu from "~/components/icons/simulasi/simulasi-psu";
import SimulasiRouter from "~/components/icons/simulasi/simulasi-router";
import SimulasiSpeaker from "~/components/icons/simulasi/simulasi-speaker";
import SimulasiStorage from "~/components/icons/simulasi/simulasi-storage";
import { ComponentCategory } from "~/lib/katalog_types";
import type { ComponentStorageType } from "~/lib/storage_helper";
import { ComponentStorage } from "~/lib/storage_helper";

export default component$(() => {

    const headers = ['Kategori Komponen', 'Komponen Dipilih', 'Harga Satuan', 'Kuantitas', 'Harga Total', 'E-Commerce',]

    // TODO: change to 'Tambah' instead of 'Pilih' for all/certain component

    const cpu = useSignal([] as ComponentStorageType[]);
    const cooler = useSignal([] as ComponentStorageType[]);
    const motherboard = useSignal([] as ComponentStorageType[]);
    const memory = useSignal([] as ComponentStorageType[]);
    const storage = useSignal([] as ComponentStorageType[]);
    const gpu = useSignal([] as ComponentStorageType[]);
    const psu = useSignal([] as ComponentStorageType[]);
    const casing = useSignal([] as ComponentStorageType[]);
    const caseFan = useSignal([] as ComponentStorageType[]);
    const monitor = useSignal([] as ComponentStorageType[]);
    const os = useSignal([] as ComponentStorageType[]);
    const soundCard = useSignal([] as ComponentStorageType[]);
    const wiredNetwork = useSignal([] as ComponentStorageType[]);
    const wirelessNetwork = useSignal([] as ComponentStorageType[]);
    const cable = useSignal([] as ComponentStorageType[]);
    const externalDrive = useSignal([] as ComponentStorageType[]);
    const headphone = useSignal([] as ComponentStorageType[]);
    const keyboard = useSignal([] as ComponentStorageType[]);
    const mouse = useSignal([] as ComponentStorageType[]);
    const speaker = useSignal([] as ComponentStorageType[]);
    const webcam = useSignal([] as ComponentStorageType[]);
    const printer = useSignal([] as ComponentStorageType[]);

    const refresh = $(
        function refresh() {
            cpu.value = ComponentStorage.getComponentsByCategory(ComponentCategory.CPU);
            cooler.value = ComponentStorage.getComponentsByCategory(ComponentCategory.Cooler);
            motherboard.value = ComponentStorage.getComponentsByCategory(ComponentCategory.Motherboard);
            memory.value = ComponentStorage.getComponentsByCategory(ComponentCategory.Memory);
            storage.value = ComponentStorage.getComponentsByCategory(ComponentCategory.Storage);
            gpu.value = ComponentStorage.getComponentsByCategory(ComponentCategory.GPU);
            psu.value = ComponentStorage.getComponentsByCategory(ComponentCategory.PSU);
            casing.value = ComponentStorage.getComponentsByCategory(ComponentCategory.Casing);
            caseFan.value = ComponentStorage.getComponentsByCategory(ComponentCategory.CaseFan);
            monitor.value = ComponentStorage.getComponentsByCategory(ComponentCategory.Monitor);
            os.value = ComponentStorage.getComponentsByCategory(ComponentCategory.OS);
            soundCard.value = ComponentStorage.getComponentsByCategory(ComponentCategory.SoundCard);
            wiredNetwork.value = ComponentStorage.getComponentsByCategory(ComponentCategory.WiredNetwork);
            wirelessNetwork.value = ComponentStorage.getComponentsByCategory(ComponentCategory.WirelessNetwork);
            cable.value = ComponentStorage.getComponentsByCategory(ComponentCategory.Cable);
            externalDrive.value = ComponentStorage.getComponentsByCategory(ComponentCategory.ExternalDrive);
            headphone.value = ComponentStorage.getComponentsByCategory(ComponentCategory.Headphone);
            keyboard.value = ComponentStorage.getComponentsByCategory(ComponentCategory.Keyboard);
            mouse.value = ComponentStorage.getComponentsByCategory(ComponentCategory.Mouse);
            speaker.value = ComponentStorage.getComponentsByCategory(ComponentCategory.Speaker);
            webcam.value = ComponentStorage.getComponentsByCategory(ComponentCategory.Webcam);
            printer.value = ComponentStorage.getComponentsByCategory(ComponentCategory.Printer);
        })

    useVisibleTask$(() => { refresh() })

    const components = [
        { icon: <SimulasiMotherboard width="27" height="27" />, title: 'Motherboard', components: motherboard, },
        { icon: <SimulasiCpu width="27" height="27" />, title: 'CPU', components: cpu, },
        { icon: <SimulasiGpu width="27" height="27" />, title: 'GPU', components: gpu, },
        { icon: <SimulasiMemory width="27" height="27" />, title: 'Memory', components: memory, },
        { icon: <SimulasiPsu width="27" height="27" />, title: 'Power Supply', components: psu, },
        { icon: <SimulasiStorage width="27" height="27" />, title: 'Storage', components: storage, },
        // { icon: <SimulasiCpuCooler width="27" height="27" />, title: 'CPU Cooler', components: cooler, },
        { icon: <SimulasiCasing width="27" height="27" />, title: 'PC Case', components: casing, },
        // { icon: <SimulasiMonitor width="27" height="27" />, title: 'Monitor', components: monitor, },
        // { icon: <SimulasiCable width="27" height="27" />, title: 'Cable', components: cable, },
        // { icon: <SimulasiMouse width="27" height="27" />, title: 'Mouse', components: mouse, },
        // { icon: <SimulasiSpeaker width="27" height="27" />, title: 'Speaker', components: speaker, },
        // { icon: <SimulasiRouter width="27" height="27" />, title: 'Router', components: wirelessNetwork, },
    ]

    return <div class='mt-1 p-4'>
        <header class='font-semibold text-3xl'>
            Simulasi Rakit PC
        </header>
        <main class='p-4 max-w-7xl w-full m-auto'>
            <div class='rounded-xl shadow-md shadow-black/5 bg-white p-4'>
                <table class="w-full ">
                    <thead class='border-b border-black text-left h-8'>
                        <tr>
                            {headers.map((item) => (
                                <th key={item}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {components.map((item) => (
                            <tr key={item.title} class='h-12 border-b border-zinc-500'>
                                <td class='text-primary font-bold'>
                                    <div class='flex flex-row items-center'>
                                        {item.icon}
                                        <span class='ml-1'>
                                            {item.title}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    {item.components.value.map((component) => (
                                        <div
                                            key={component.id}
                                            class='flex flex-row items-center'
                                        >
                                            <span class='ml-1'>
                                                {component.name}
                                            </span>

                                            <OutlinedButton
                                                class='ml-2'
                                                onClick$={() => {
                                                    if (item.components.value.length > 0) {
                                                        ComponentStorage.removeComponentById(item.components.value[0].id);
                                                        refresh();
                                                    }
                                                }}
                                            >
                                                Hapus
                                            </OutlinedButton>
                                        </div>
                                    ))}
                                    {item.components.value.length == 0 ? (
                                        <FilledButton>
                                            + Pilih {item.title}
                                        </FilledButton>
                                    ) : (
                                        <></>
                                        // <OutlinedButton>
                                        //     + {item.title}
                                        // </OutlinedButton>
                                    )}
                                </td>
                                <td>{item.components.value[0]?.price ? `Rp ${(item.components.value[0]?.price ?? 0).toLocaleString('id-ID')}` : '-'}</td>
                                <td>{item.components.value[0]?.quantity ?? '-'}</td>
                                <td>{(item.components.value[0]?.price && item.components.value[0]?.quantity) ? `Rp ${(item.components.value[0]?.price ?? 0).toLocaleString('id-ID')}` : '-'}</td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div class='ml-auto w-fit mt-4'>
                <div class='rounded-xl bg-white shadow-md shadow-black/5 p-4 '>
                    Total: Rp {components.reduce((a, b) => a + ((b.components.value[0]?.price ?? 0 * (b.components.value[0]?.quantity ?? 0))), 0).toLocaleString('id-ID')}
                </div>
            </div>
        </main>
    </div>;
})