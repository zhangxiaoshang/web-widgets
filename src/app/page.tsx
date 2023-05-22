import News from "@/app/components/News";

export default function Home() {
  return (
    <main className="min-h-screen p-3 grid gap-5 grid-rows-[repeat(auto-fill,11rem)] grid-cols-[repeat(auto-fill,10rem)]">
      {/* @ts-expect-error Async Server Component */}
      <News
        size="large"
        name="金色财经·7*24快讯"
        icon="https://www.jinse.com/favicon.ico"
        method="GET"
        api="https://api.jinse.cn/noah/v2/lives?limit=20&reading=false&source=web&flag=down&id=0&category=0"
        mapList="list.0.lives"
        mapTitle="content_prefix"
        mapTime="created_at"
        linkTemplate="https://www.jinse.com/lives/{id}.html"
      ></News>

      {/* @ts-expect-error Async Server Component */}
      <News
        size="medium"
        name="金色财经·大事件"
        icon="https://www.jinse.com/favicon.ico"
        method="GET"
        api="https://api.jinse.com/noah/v1/modules?page=1&limit=20&module_type=2"
        mapList="data.list"
        mapTitle="title"
        mapTime="published_at"
        linkTemplate="https://www.jinse.cn/lives/{object_id}.html"
      ></News>

      {/* @ts-expect-error Async Server Component */}
      <News
        size="medium"
        name="金色财经·大事件"
        icon="https://www.jinse.com/favicon.ico"
        method="GET"
        api="https://api.jinse.com/noah/v1/modules?page=1&limit=20&module_type=2"
        mapList="data.list"
        mapTitle="title"
        mapTime="published_at"
        linkTemplate="https://www.jinse.cn/lives/{object_id}.html"
      ></News>

      {/* @ts-expect-error Async Server Component */}
      <News
        size="medium"
        name="金色财经·大事件"
        icon="https://www.jinse.com/favicon.ico"
        method="GET"
        api="https://api.jinse.com/noah/v1/modules?page=1&limit=20&module_type=2"
        mapList="data.list"
        mapTitle="title"
        mapTime="published_at"
        linkTemplate="https://www.jinse.cn/lives/{object_id}.html"
      ></News>

      {/* @ts-expect-error Async Server Component */}
      <News
        size="small"
        name="金色财经·大事件"
        icon="https://www.jinse.com/favicon.ico"
        method="GET"
        api="https://api.jinse.com/noah/v1/modules?page=1&limit=20&module_type=2"
        mapList="data.list"
        mapTitle="title"
        mapTime="published_at"
        linkTemplate="https://www.jinse.cn/lives/{object_id}.html"
      ></News>
      {/* @ts-expect-error Async Server Component */}
      <News
        size="small"
        name="金色财经·大事件"
        icon="https://www.jinse.com/favicon.ico"
        method="GET"
        api="https://api.jinse.com/noah/v1/modules?page=1&limit=20&module_type=2"
        mapList="data.list"
        mapTitle="title"
        mapTime="published_at"
        linkTemplate="https://www.jinse.cn/lives/{object_id}.html"
      ></News>
    </main>
  );
}
