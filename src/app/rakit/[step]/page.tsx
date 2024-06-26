import { CheckIcon, Dot } from "lucide-react";
import { redirect } from "next/navigation";
import BudgetSection from "./budget";
import RencanaSection from "./rencana";
import HasilSection from "./hasil";

export default function RakitPage({ params }: { params: { step: string } }) {
  switch (params.step) {
    case "budget":
      break;
    case "rencana":
      // if (condition) {
      //   redirect("/rakit/budget");
      // }
      break;
    case "hasil":
      // if (condition) {
      //   redirect("/rakit/budget");
      // }
      break;
    default:
      redirect("/rakit/budget");
  }

  return (
    <>
      <RakitStep step={params.step} />
      <div className="h-8" />
      <div className="m-auto mb-8 w-full max-w-screen-tablet p-4">
        {params.step === "budget" ? (
          <BudgetSection />
        ) : params.step === "rencana" ? (
          <RencanaSection />
        ) : (
          <HasilSection />
        )}
      </div>
    </>
  );
}

function RakitStep({ step }: { step: string }) {
  const stepList = [
    {
      name: "1. Budget",
      key: "budget",
    },
    {
      name: "2. Rencana",
      key: "rencana",
    },
    {
      name: "3. Hasil",
      key: "hasil",
    },
  ];
  return (
    <div className="mx-auto flex w-full max-w-screen-tablet flex-row items-center justify-center gap-0 pt-4">
      {stepList.map((data, index) => {
        const isSelected = data.key === step;
        const isDone = false; //TODO
        return (
          <div
            key={data.name}
            className={`flex w-full flex-col items-center justify-center gap-4`}
          >
            <div className={`m-auto flex w-full items-center `}>
              <div
                className={`h-[2px] w-full ${index > 0 ? "bg-foreground/20" : ""}`}
              />
              <div
                className={`rounded-full border-8 ${isSelected ? "bg-primary" : "bg-foreground/20"} "border-white/40"`}
              >
                {isDone ? (
                  <CheckIcon className="m-auto h-12 w-12 text-white" />
                ) : (
                  <Dot className="m-auto h-12 w-12 text-white" />
                )}
              </div>

              <div
                className={`h-[2px] w-full ${index < stepList.length - 1 ? "bg-foreground/20" : ""}`}
              />
            </div>
            <div className="text-center" key={data.name}>
              <p
                className={`text-nowrap text-lg font-bold ${isSelected ? "text-primary" : "text-foreground"}`}
              >
                {data.name}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
