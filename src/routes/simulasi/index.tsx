import { component$ } from "@builder.io/qwik";
import FilledButton from "~/components/common/filled-button";
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

export default component$(() => {

    const headers = ['Kategori Komponen', 'Komponen Dipilih,', 'Harga Satuan', 'Kuantitas', 'Harga Total', 'E-Commerce',]
    const components = [
        { icon: <SimulasiCpu width="27" height="27" />, title: 'CPU' },
        { icon: <SimulasiCpuCooler width="27" height="27" />, title: 'CPU Cooler' },
        { icon: <SimulasiMotherboard width="27" height="27" />, title: 'Motherboard' },
        { icon: <SimulasiMemory width="27" height="27" />, title: 'Memory' },
        { icon: <SimulasiStorage width="27" height="27" />, title: 'Storage' },
        { icon: <SimulasiGpu width="27" height="27" />, title: 'GPU' },
        { icon: <SimulasiPsu width="27" height="27" />, title: 'Power Supply' },
        { icon: <SimulasiCasing width="27" height="27" />, title: 'PC Case' },
        { icon: <SimulasiMonitor width="27" height="27" />, title: 'Monitor' },
        { icon: <SimulasiCable width="27" height="27" />, title: 'Cable' },
        { icon: <SimulasiMouse width="27" height="27" />, title: 'Mouse' },
        { icon: <SimulasiSpeaker width="27" height="27" />, title: 'Speaker' },
        { icon: <SimulasiRouter width="27" height="27" />, title: 'Router' },
    ]

    return <div class='mt-1'>
        <header class='font-semibold text-4xl'>
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
                                    <FilledButton>
                                        + Pilih {item.title}
                                    </FilledButton>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div class='ml-auto w-fit mt-4'>
                <div class='rounded-xl bg-white shadow-md shadow-black/5 p-4 '>
                    Total: Rp 0
                </div>
            </div>
        </main>
    </div>;
})