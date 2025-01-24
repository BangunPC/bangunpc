export const runtime = "edge";

import { redirect } from "next/navigation";
import BudgetSection from "./budget";
import RencanaSection from "./rencana";
import HasilSection from "./hasil";
import StepBudget from "@/components/icon/step-budget";
import StepKebutuhan from "@/components/icon/step-kebutuhan";
import StepHasil from "@/components/icon/step-hasil";
import { createSupaServerClient } from "@/lib/supabase/server";
import { Suspense } from "react";

async function getRencanaList() {
  const supabase = createSupaServerClient();
  const { data, error } = await supabase
    .schema("pc_build")
    .from("categories")
    .select("*")
    .order("id");
  return { data, error };
}

async function getRecommendation(budget: number, categoryIndexes: number[]) {
  const supabase = createSupaServerClient();
  const categories_name = await supabase
    .schema("pc_build")
    .from("categories")
    .select("category_name")
    .order("id");
  const categories = categories_name
    .data!.filter((item, index) => categoryIndexes.includes(index))
    .map((item) => item.category_name!);
  const { data, error, count } = await supabase
    .schema("pc_build")
    .from("v_recommendation")
    .select(
      "recommendation_id, build_id, title, image_filenames, categories_name, total_price",
      { count: "exact" },
    )
    .lte("total_price", budget)
    .containedBy("categories_name", categories)
    .limit(3);
  return { data, error, count };
}

export type RencanaListType = Awaited<ReturnType<typeof getRencanaList>>;

export type RecommendationHasilType = Awaited<
  ReturnType<typeof getRecommendation>
>;

export default async function RakitPage(
  props: {
    params: Promise<{ step: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
  }
) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  let component: RecommendationHasilType = {
    data: null,
    error: null,
    count: 0,
  };
  let rencanaList: RencanaListType = { data: null, error: null };

  switch (params.step) {
    case "budget":
      break;
    case "rencana":
      rencanaList = await getRencanaList();
      break;
    case "hasil":
      const budget = searchParams.b;
      if (!budget) {
        redirect(`/rakit/budget`);
      }
      const categories = searchParams.r;
      if (budget && !categories) {
        redirect(`/rakit/rencana?b=${budget as string}`);
      }
      component = await getRecommendation(
        parseInt(searchParams.b as string),
        typeof searchParams.r === "string"
          ? [parseInt(searchParams.r)]
          : ((searchParams.r as string[] | null) ?? []).map((item) =>
              parseInt(item),
            ),
      );
      break;
    default:
      redirect("/rakit/budget");
  }

  return (
    <div className="min-h-screen h-min">
      <RakitStep step={params.step} />
      <div className="h-4" />
      <div className="m-auto mb-8 w-full max-w-screen-desktop p-4 h-max">
        {params.step === "budget" ? (
          <Suspense>
            <BudgetSection />
          </Suspense>
        ) : params.step === "rencana" ? (
          <Suspense>
            <RencanaSection rencanaList={rencanaList} />
          </Suspense>
        ) : (
          <Suspense>
            <HasilSection component={component} />
          </Suspense>
        )}
      </div>
    </div>
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
