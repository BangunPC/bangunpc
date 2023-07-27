import { iconButtonClassname } from "../layout"

export default function Build() {

    const titleTextClass = "font-extrabold text-lg uppercase"

    return (
        <>
            <center className="absolute flex z-50 w-screen h-screen backdrop-blur-md">
                <section className="flex flex-col m-auto w-[32rem] h-[32rem] bg-slate-100 bg-opacity-80 rounded-lg p-6 shadow-xl">
                    <header className="flex flex-col mb-4">
                        <span className="font-semibold text-2xl">Build your PC</span>
                        <span className="font-semibold">Select your chipset and budget</span>
                    </header>
                    <main className="flex flex-row justify-between">
                        <section className="w-full mx-auto">
                            <header className={titleTextClass}>
                                performance
                            </header>
                            <main>
                                [toggle button: game, office apps, render apps, IDEs, etc.]
                            </main>
                        </section>
                        <div className="flex flex-col items-center w-full mx-auto pt-3">
                            <section>
                                <header className={titleTextClass}>
                                    chipset
                                </header>
                                <main>
                                    [AMD or Intel]
                                </main>
                            </section>
                            <section>
                                <header className={titleTextClass}>
                                    budget
                                </header>
                                <main>
                                    [$500 - $3000+]
                                </main>
                            </section>
                            <button className="bg-orange-500 hover:bg-orange-700 active:bg-orange-800 active:scale-90 transition-all flex flex-row py-2 px-3 mx-2 rounded-md text-white font-semibold">
                                Continue to Build
                            </button>
                        </div>
                    </main>
                </section>
            </center>
        </>
    )
}