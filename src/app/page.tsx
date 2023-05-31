import { Metadata } from "next";
import { WidgetProps, WidgetType } from "@/interface";
import { Widget } from "./components/Widget/Widget";
import { JinSeCaiJinNews } from "./components/JinSeCaiJing/News";
import { JinSeCaiJinActive } from "./components/JinSeCaiJing/Activity";
// 雪球
import { ZhiShuGuZhi } from "./components/XueQiu/ZhiShuGuZhi";

// 东方财富
import { NiuXiongZhiBiao } from "./components/DongFangCaiFu/NiuXiongZhiBiao";

// Zendesk
import { Articles } from "./components/Zendesk/Articles";

type RenderStrategy = {
  [key: number | string]: (props: WidgetProps) => React.ReactElement;
};

const renderStrategy: RenderStrategy = {
  [WidgetType.JINSECAIJING_NEWS]: (props) => (
    /* @ts-expect-error Async Server Component */
    <JinSeCaiJinNews key={JSON.stringify(props)} {...props}></JinSeCaiJinNews>
  ),

  [WidgetType.JINSECAIJING_ACTIVE]: (props) => (
    /* @ts-expect-error Async Server Component */
    <JinSeCaiJinActive
      key={JSON.stringify(props)}
      {...props}
    ></JinSeCaiJinActive>
  ),

  [WidgetType.XUEQIU_ZHISHUGUZHI]: (props) => (
    /* @ts-expect-error Async Server Component */
    <ZhiShuGuZhi key={JSON.stringify(props)} {...props}></ZhiShuGuZhi>
  ),

  [WidgetType.DONGFANGCAIFU_NIUXIONGZHIBIAO]: (props) => (
    /* @ts-expect-error Async Server Component */
    <NiuXiongZhiBiao key={JSON.stringify(props)} {...props}></NiuXiongZhiBiao>
  ),

  [WidgetType.ZENDESK_ARTICLES]: (props) => (
    /* @ts-expect-error Async Server Component */
    <Articles key={JSON.stringify(props)} {...props}></Articles>
  ),
};

function renderComp(props: WidgetProps) {
  const rendFunc = renderStrategy[props.type];

  if (!rendFunc) {
    return (
      <Widget size="medium">
        <h2>为实现的组件: {props.type}</h2>
      </Widget>
    );
  }

  return rendFunc(props);
}

export const metadata: Metadata = { title: "好组件" };

export default async function WidgetPage() {
  try {
    const reqAppConfig = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/config`,
      {
        next: { revalidate: 10 },
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
  } catch (error: any) {
    return <p>{error.message}</p>;
  }
}
