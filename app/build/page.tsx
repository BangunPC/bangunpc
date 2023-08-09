'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { URLSearchParams } from "url"

export default function Build() {

    const titleTextClass = "font-extrabold text-lg uppercase mb-2"

    const games = [
        'CALL OF DUTY\nMODERN\nWARFARE',
        'FORTNITE',
        'MINECRAFT',
        'GRAND\nTHEFT\nAUTO V'
    ]

    // const performances = [
    //     'Games',
    //     'Apps',
    //     '3d Render',
    //     'Compile'
    // ]

    const resolutions = [
        'HD',
        'FHD',
        '4K',
    ]

    const chipsets = [
        'AMD',
        'Intel'
    ]

    const budgets = [
        '1000',
        '1500',
        '2000',
        '2500',
        '3000',
    ]


    const pathname = usePathname()
    const params = useSearchParams()
    const router = useRouter();

    // const performanceOption = params.get('perfs') ?? ''
    const resolution = params.get('res') ?? 'HD'
    const chipset = params.get('chipset') ?? 'AMD'
    const budget = params.get('budgets') ?? '1000'
    const continueBuild = params.get('continue');

    function updateParamValue(key: string, value: string) {
        console.log('replacing...')
        const url = new URL(`http://localhost:3001${pathname}?${params}`)
        const { searchParams } = url
        searchParams.set(key, value)
        router.replace(url.href)
    }

    function previousBudget() {
        if (budgets.indexOf(budget) - 1 >= 0) {
            updateParamValue('budgets', budgets[budgets.indexOf(budget) - 1])
        }
    }

    function nextBudget() {
        if (budgets.indexOf(budget) + 1 < budgets.length) {
            updateParamValue('budgets', budgets[budgets.indexOf(budget) + 1])
        }
    }

    return (
        <>
            {!continueBuild ? <center className="absolute flex z-50 w-screen h-screen backdrop-blur-md">
                <section className="flex flex-col m-auto w-[39rem] h-[34rem] bg-slate-100 bg-opacity-80 rounded-lg p-6 shadow-xl">
                    <header className="flex flex-col mb-4">
                        <span className="font-semibold text-4xl">Build your PC</span>
                        <span className="font-semibold">Select your chipset and budget</span>
                    </header>
                    <main className="flex flex-row justify-between">
                        <section className="w-full mx-auto bg-slate-200 rounded-lg p-4 shadow-sm">
                            <header className={titleTextClass}>
                                performance
                            </header>
                            <main>
                                {/* TODO(damywise) Consider changing to dropdown */}
                                {/* <div className="content flex flex-row rounded-md p-1 bg-slate-900 text-white gap-1 w-80">
                                    <button className="flex-1 rounded-md hover:bg-slate-600 bg-slate-700">Games</button>
                                    <button className="flex-1 rounded-md hover:bg-slate-600 text-gray-500">Apps</button>
                                    <button className="flex-1 rounded-md hover:bg-slate-600 text-gray-500">3d Render</button>
                                    <button className="flex-1 rounded-md hover:bg-slate-600 text-gray-500">Compile</button>
                                </div> */}
                                <br />
                                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                                    {games.map((text) => {
                                        return (
                                            <>
                                                <div className="bg-white flex rounded-md aspect-square p-2">
                                                    <span className="m-auto font-bold text-sm">
                                                        {text}
                                                    </span>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>
                                <div>
                                    <span className="text-xs italic font-semibold">Resolution</span>
                                    <br />
                                    <div className="content flex flex-row rounded-md p-1 bg-slate-900 text-white gap-1 w-48">
                                        {
                                            resolutions.map((text, index) => {
                                                return (
                                                    <>
                                                        <button onClick={() => updateParamValue('res', text)} className={"flex-1 rounded-md hover:bg-slate-600 " + (text === resolution ? "bg-slate-700" : "text-gray-500")}>{text}</button>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </main>
                        </section>
                        <div className="flex flex-col items-center w-full mx-auto pt-3">
                            <section>
                                <header className={titleTextClass}>
                                    chipset
                                </header>
                                <main>
                                    <div className="content flex flex-row rounded-md p-1 bg-slate-900 text-white gap-1 w-36">
                                        {
                                            chipsets.map((text, index) => {
                                                return (
                                                    <>
                                                        <button onClick={() => updateParamValue('chipset', text)} className={"flex-1 rounded-md hover:bg-slate-600 " + (text === chipset ? "bg-slate-700" : "")} >{text}</button>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                </main>
                            </section>
                            <br />
                            <section>
                                <header className={titleTextClass}>
                                    budget
                                </header>
                                <main>
                                    <div className="flex flex-row text-white w-40 h-10 bg-slate-900 rounded-md">
                                        <button onClick={() => previousBudget()} className="w-full bg-slate-600 hover:bg-slate-500 rounded-l-md" aria-label="previous budget">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="m-auto" width={24} height={24} viewBox="0 0 24 24" stroke-width={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M15 6l-6 6l6 6"></path>
                                            </svg>
                                        </button>
                                        <span className="w-80 my-auto">${budget + (budget == "3000" ? "+" : "")}</span>
                                        <button onClick={() => nextBudget()} className="w-full bg-slate-600 hover:bg-slate-500 rounded-r-md" aria-label="next budget">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="m-auto" width={24} height={24} viewBox="0 0 24 24" stroke-width={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M9 6l6 6l-6 6"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </main>
                            </section>
                            <br />
                            <button onClick={() => updateParamValue('continue', 'true')} className="bg-orange-500 hover:bg-orange-700 active:bg-orange-800 active:scale-90 transition-all flex flex-row w-40 py-2 px-3 mx-2 rounded-md text-white font-semibold text-center">
                                Continue to Build
                            </button>
                        </div>
                    </main>
                </section>
            </center> : null}

        </>
    )
}