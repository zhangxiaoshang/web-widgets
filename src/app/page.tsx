import { Metadata } from "next";
import News from "@/app/components/News";
import { NewsOptions } from "@/interface";

export const metadata: Metadata = {
  title: "好部件",
};

export default async function Home() {
  const reqAppConfig = await fetch("http://localhost:3000/config", {
    next: {
      revalidate: 60,
    },
  });
  const res = await reqAppConfig.json();
  const widgets: NewsOptions[] = res?.data?.widgets;

  if (!widgets || !widgets.length) return <div>Error</div>;

  return (
    <main className="min-h-screen p-3 grid gap-5 grid-rows-[repeat(auto-fill,11rem)] grid-cols-[repeat(auto-fill,10rem)]">
      {widgets.map(
        (item, index) =>
          /* @ts-expect-error Async Server Component */
          item.type === 1 && <News key={index} {...item}></News>
      )}
    </main>
  );
}
