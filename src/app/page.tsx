import { Metadata } from "next";
import { WidgetProps } from "@/interface";
import News from "@/app/components/News";
import XueQiuGuZhi from "./components/XueQiuGuZhi";

type RenderStrategy = {
  [key: number]: (props: WidgetProps) => React.ReactElement;
};

const renderStrategy: RenderStrategy = {
  /* @ts-expect-error Async Server Component */
  1: (props) => <News key={JSON.stringify(props)} {...props}></News>,

  2: (props) => (
    /* @ts-expect-error Async Server Component */
    <XueQiuGuZhi key={JSON.stringify(props)} {...props}></XueQiuGuZhi>
  ),
};

function renderComp(props: WidgetProps) {
  return renderStrategy[props.type]?.(props) ?? null;
}

export const metadata: Metadata = {
  title: "好部件",
};

export default async function Home() {
  const reqAppConfig = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/config`,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  const res = await reqAppConfig.json();
  const widgetsProps: WidgetProps[] = res?.data?.widgets;

  if (!widgetsProps || !widgetsProps.length) return <div>Error</div>;

  return (
    <main className="min-h-screen p-3 grid gap-5 grid-rows-[repeat(auto-fill,11rem)] grid-cols-[repeat(auto-fill,10rem)]">
      {widgetsProps.map((option) => renderComp(option))}
    </main>
  );
}
