import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { TbTrash, TbX } from "@qwikest/icons/tablericons";
import FilledButton from "~/components/common/filled-button";
import SimulasiCasing from "~/components/icons/simulasi/simulasi-casing";
import SimulasiCpu from "~/components/icons/simulasi/simulasi-cpu";
import SimulasiGpu from "~/components/icons/simulasi/simulasi-gpu";
import SimulasiMemory from "~/components/icons/simulasi/simulasi-memory";
import SimulasiMotherboard from "~/components/icons/simulasi/simulasi-motherboard";
import SimulasiPsu from "~/components/icons/simulasi/simulasi-psu";
import SimulasiStorage from "~/components/icons/simulasi/simulasi-storage";
import { categoriesFromEnum, ComponentCategory } from "~/lib/katalog_types";
import type { ComponentStorageType } from "~/lib/storage_helper";
import { ComponentStorage } from "~/lib/storage_helper";

export default component$(() => {

    const headers = ['Kategori Komponen', 'Komponen Dipilih', 'Harga Satuan', 'Kuantitas', 'Harga Total', 'Aksi',]

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

    useVisibleTask$(() => {
        refresh();
        setInterval(refresh, 100);
    })

    // type motherboardUrlQuery = {};
    type cpuUrlQuery = { motherboardId: number | undefined, memories: { id: number, amount: number }[] | undefined };
    // type gpuUrlQuery = {};
    // type memoryUrlQuery = {};
    // type psuUrlQuery = {};
    // type storageUrlQuery = {};
    // type casingUrlQuery = {};

    const urlQuery = useSignal('');

    const components = [
        { icon: <SimulasiMotherboard width="27" height="27" />, title: 'Motherboard', components: motherboard, iframe: `/katalog/motherboard` },
        { icon: <SimulasiCpu width="27" height="27" />, title: 'CPU', components: cpu, iframe: `/katalog/cpu` },
        { icon: <SimulasiGpu width="27" height="27" />, title: 'GPU', components: gpu, iframe: `/katalog/gpu` },
        { icon: <SimulasiMemory width="27" height="27" />, title: 'Memory', components: memory, iframe: `/katalog/memory` },
        { icon: <SimulasiPsu width="27" height="27" />, title: 'Power Supply', components: psu, iframe: `/katalog/psu` },
        { icon: <SimulasiStorage width="27" height="27" />, title: 'Storage', components: storage, iframe: `/katalog/storage` },
        { icon: <SimulasiCasing width="27" height="27" />, title: 'PC Case', components: casing, iframe: `/katalog/casing` },
    ]

    const iframePath = useSignal('');

    const convertToUrlQuery = $(function convertToUrlQuery(object: any) {
        const isObject = (val: any) => val && typeof val === 'object';

        const transformObject = (obj: any) => Object.entries(obj).map(([key, value]) => {
            const transformedKey = isObject(key) ? JSON.stringify(key) : key;
            const transformedValue = isObject(value) ? JSON.stringify(value) : value;
            return `${transformedKey}=${transformedValue as string}`;
        }).join('&');

        return transformObject(object);
    })

    const handleAddComponent = $(function handleAddComponent(item: typeof components[number]) {
        iframePath.value = item.iframe;
        let query = {} as any;
        switch (item.title) {
            case 'CPU':
                query = {} as cpuUrlQuery;
                if (motherboard.value.length > 0) {
                    query.motherboardId = parseInt(motherboard.value[0].id);
                }
                if (memory.value.length > 0) {
                    query.memories = memory.value.map((item) => ({ id: parseInt(item.id), amount: item.quantity }));
                }
                break;
        }
        convertToUrlQuery(query).then(result => { urlQuery.value = result; iframePath.value = item.iframe });
    })
    return <div class='mt-1 p-4'>
        <header class='font-semibold text-3xl'>
            Simulasi Rakit PC
        </header>
        <main class='p-4 max-w-7xl w-full m-auto'>
            <div class='rounded-xl shadow-bm shadow-black/5 bg-white p-4'>
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
                                <td class='text-primary font-bold flex'>
                                    <div class='flex flex-row items-center mb-auto mt-2'>
                                        {item.icon}
                                        <span class='ml-1'>
                                            {item.title}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div class='flex flex-col gap-1'>
                                        {item.components.value.map((component) =>
                                        (
                                            <Link
                                                key={component.id}
                                                class='text-black flex flex-row items-center cursor-pointer hover:bg-zinc-200 rounded-md p-1'
                                                href={`/detail/${categoriesFromEnum[component.category]}/${component.slug}`}
                                            >
                                                <img src={component.image} alt={component.name} width={32} height={32} />
                                                <span class='ml-1'>
                                                    {component.name}
                                                </span>
                                            </Link>
                                        )
                                        )}
                                        {item.components.value.length == 0 ? (
                                            <FilledButton class='w-fit' onClick$={() => handleAddComponent(item)}>
                                                + Pilih {item.title}
                                            </FilledButton>
                                        ) : (
                                            <></>
                                            // <OutlinedButton>
                                            //     + {item.title}
                                            // </OutlinedButton>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <div class='flex flex-col gap-1'>
                                        {item.components.value.map(component =>
                                            <div key={component.id} class='flex h-[38px]'>
                                                <span class='my-auto text-start'>
                                                    {component.price ? `Rp ${component.price.toLocaleString('id-ID')}` : '-'}
                                                </span>
                                            </div>
                                        )

                                        }
                                    </div>
                                </td>
                                <td>
                                    <div class='flex flex-col gap-1 h-full'>
                                        {item.components.value.map(component =>
                                            <div key={component.id} class='flex h-[38px]'>
                                                <span class='my-auto text-start'>
                                                    {component.quantity}
                                                </span>
                                            </div>
                                        )
                                        }
                                    </div>
                                </td>
                                <td>
                                    <div class='flex flex-col gap-1 h-full'>
                                        {item.components.value.map(component =>
                                            <div key={component.id} class='flex h-[38px]'>
                                                <span class='my-auto text-start'>
                                                    {(component.price && component.quantity) ? `Rp ${((component.price) * (component.quantity)).toLocaleString('id-ID')}` : '-'}
                                                </span>
                                            </div>
                                        )

                                        }
                                    </div>
                                </td>
                                <td>
                                    {
                                        item.components.value.map(component =>
                                            <div key={component.id} class='flex flex-row gap-1 items-center py-1'>
                                                <FilledButton
                                                    class='bg-red-600 flex items-center'
                                                    onClick$={() => {
                                                        if (item.components.value.length > 0) {
                                                            ComponentStorage.removeComponentById(item.components.value[0].id);
                                                            refresh();
                                                        }
                                                    }}
                                                >
                                                    <TbTrash class='inline-block' />
                                                    Hapus
                                                </FilledButton>
                                            </div>)
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div class='ml-auto w-fit mt-4'>
                <div class='rounded-xl bg-white shadow-bm shadow-black/5 p-4 '>
                    Total: Rp {components.reduce((a, b) => a + ((b.components.value.reduce((a, b) => a + (b.price * b.quantity), 0))), 0).toLocaleString('id-ID')}
                </div>
            </div>
            <div role="dialog" aria-modal="true"
                class={`fixed z-10 inset-0 overflow-y-hidden ${iframePath.value === '' ? 'hidden' : 'block'}`}
            >
                <div class="p-4 mt-navbar-min-h pb-20 h-full text-center">
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                    <div class="flex flex-col align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all h-full">
                        <div class="flex justify-end bg-white">
                            <FilledButton onClick$={() => { iframePath.value = '' }} class='aspect-square fixed ml-auto mt-4 mr-4'>
                                <TbX />
                            </FilledButton>
                        </div>
                        <iframe class="w-full h-full" src={iframePath.value + `?${urlQuery.value}&iframe=true`}></iframe>
                    </div>
                </div>
            </div>
        </main>
    </div>;
})
