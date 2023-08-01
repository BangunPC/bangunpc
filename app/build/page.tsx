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
                <section className="flex flex-col m-auto w-[38rem] h-[40rem] bg-slate-100 bg-opacity-80 rounded-lg p-6 shadow-xl">
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
                                <div className="content flex flex-row rounded-md p-1 bg-slate-900 text-white gap-1 w-80">
                                    <button className="flex-1 rounded-md hover:bg-slate-600 transition-colors bg-slate-700">Games</button>
                                    <button className="flex-1 rounded-md hover:bg-slate-600 transition-colors text-gray-500">Apps</button>
                                    <button className="flex-1 rounded-md hover:bg-slate-600 transition-colors text-gray-500">Render</button>
                                    <button className="flex-1 rounded-md hover:bg-slate-600 transition-colors text-gray-500">Compile</button>
                                </div>
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
                                        <button className="flex-1 rounded-md hover:bg-slate-600 transition-colors bg-slate-700">HD</button>
                                        <button className="flex-1 rounded-md hover:bg-slate-600 transition-colors text-gray-500">FHD</button>
                                        <button className="flex-1 rounded-md hover:bg-slate-600 transition-colors text-gray-500">4K</button>
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
                                        <button className="flex-1 rounded-md hover:bg-slate-600 transition-colors bg-slate-700">AMD</button>
                                        <button className="flex-1 rounded-md hover:bg-slate-600 transition-colors text-gray-500">Intel</button>
                                    </div>
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