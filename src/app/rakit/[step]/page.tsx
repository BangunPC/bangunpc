import { redirect } from "next/navigation";
import BudgetSection from "./budget";
import RencanaSection from "./rencana";
import HasilSection from "./hasil";
import StepBudget from "~/components/ui/icon/step-budget";
import StepKebutuhan from "~/components/ui/icon/step-kebutuhan";
import StepHasil from "~/components/ui/icon/step-hasil";
import { createClient } from "~/lib/supabase/server";

async function getRencanaList() {
  const supabase = createClient();
  const { data, error } = await supabase
    .schema("pc_build")
    .from("categories")
    .select("*");
  return { data, error };
}

async function getRecommendation() {
  const supabase = createClient();
  const { data, error } = await supabase
    .schema("pc_build")
    .from("v_recommendation")
    .select(
      "recommendation_id, build_id, title, image_filenames, categories_name, total_price",
    )
    .limit(3);
  return { data, error };
}

export type RencanaListType = Awaited<ReturnType<typeof getRencanaList>>;

export type RecommendationHasilType = Awaited<
  ReturnType<typeof getRecommendation>
>;

export default async function RakitPage({
  params,
}: {
  params: { step: string };
}) {
  let component: RecommendationHasilType = { data: null, error: null };
  let rencanaList: RencanaListType = { data: null, error: null };

  switch (params.step) {
    case "budget":
      break;
    case "rencana":
      rencanaList = await getRencanaList();
      break;
    case "hasil":
      component = await getRecommendation();
      break;
    default:
      redirect("/rakit/budget");
  }

  return (
    <>
      <RakitStep step={params.step} />
      <div className="h-8" />
      <div className="m-auto mb-8 w-full max-w-screen-desktop p-4">
        {params.step === "budget" ? (
          <BudgetSection />
        ) : params.step === "rencana" ? (
          <RencanaSection rencanaList={rencanaList} />
        ) : (
          <HasilSection component={component} />
        )}
      </div>
    </>
  );
}

function RakitStep({ step }: { step: string }) {
  const stepList = [
    {
      name: "Budget",
      key: "budget",
    },
    {
      name: "Kebutuhan",
      key: "rencana",
    },
    {
      name: "Hasil",
      key: "hasil",
    },
  ];

  const stepIndex = stepList.findIndex((data) => data.key === step);

  return (
    <div className="mx-auto flex w-full max-w-screen-tablet flex-row items-center justify-center gap-0 pt-4">
      {stepList.map((data, index) => {
        const isSelected = data.key === step;
        return (
          <div
            key={data.name}
            className={`flex w-full flex-col items-center justify-center gap-4`}
          >
            <div className={`m-auto flex w-full items-center `}>
              <div
                className={`h-[4px] w-full ${index > 0 ? (stepIndex >= index ? "bg-primary" : "bg-foreground/20") : ""}`}
              />
              <div
                className={`rounded-full border-[3px] p-3 ${stepIndex >= index ? "border-primary" : "border-foreground/20"} `}
              >
                {index == 0 && (
                  <StepBudget
                    className={
                      stepIndex >= index ? "text-primary" : "text-foreground/20"
                    }
                  />
                )}
                {index == 1 && (
                  <StepKebutuhan
                    className={
                      stepIndex >= index ? "text-primary" : "text-foreground/20"
                    }
                  />
                )}
                {index == 2 && (
                  <StepHasil
                    className={
                      stepIndex >= index ? "text-primary" : "text-foreground/20"
                    }
                  />
                )}
              </div>

              <div
                className={`h-[4px] w-full ${index < stepList.length - 1 ? (stepIndex > index ? "bg-primary" : "bg-foreground/20") : ""}`}
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
