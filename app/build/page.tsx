export default function Build() {

    const titleTextClass = "font-extrabold text-lg uppercase mb-2"

    const games = [
        'CALL OF DUTY\nMODERN\nWARFARE',
        'FORTNITE',
        'MINECRAFT',
        'GRAND\nTHEFT\nAUTO V'
    ]

    return (
        <>
            <center className="absolute flex z-50 w-screen h-screen backdrop-blur-md">
                <section className="flex flex-col m-auto w-[38rem] h-[32rem] bg-slate-100 bg-opacity-80 rounded-lg p-6 shadow-xl">
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
                                [games|apps|render|compile]
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
                                    [HD|FHD|4K]
                                </div>
                            </main>
                        </section>
                        <div className="flex flex-col items-center w-full mx-auto pt-3">
                            <section>
                                <header className={titleTextClass}>
                                    chipset
                                </header>
                                <main>
                                    [AMD|Intel]
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