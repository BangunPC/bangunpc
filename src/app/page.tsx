import Image from "next/image";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex">
      <div className="flex h-full w-full items-center bg-slate-200 tablet:py-32 py-8">
        <div className="tablet:mx-auto flex mx-4 ">
          <div className="tablet:grid grid-cols-7 gap-8">
            <div className="col-span-4 grid ">
              <div className="flex flex-col justify-center gap-6">
                <div className="flex w-fit rounded-3xl bg-blue-700 p-2 px-6 ">
                  <p className="text-xl text-white">
                    Rakit PC sesuai dengan kebutuhan budget-mu.
                  </p>
                </div>
                <h1 className="text-5xl font-bold">
                  Bangun PC impianmu dengan <br />{" "}
                  <span className="font-bold text-primary">MUDAH</span> dan{" "}
                  <span className="font-bold text-primary">MURAH.</span>
                </h1>
                <p className="text-lg">
                  Rekomendasi komponen PC yang berkualitas tinggi <br /> dengan
                  harga terbaik.
                </p>
                <Button className="bg-black hover:bg-zinc-900 w-fit gap-2 p-5 tablet:mt-6 mt-0"> 
                  <Image src="/images/icon-computer.svg" alt="icon-computer" width={20} height={20}/>
                  Rakit Sekarang
                </Button>
              </div>
            </div>
            <div className="col-span-3 grid w-full">
              <div className="mx-auto flex mt-5 tablet:mt-0">
                <Image
                  src="/images/components.svg"
                  alt="components"
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
