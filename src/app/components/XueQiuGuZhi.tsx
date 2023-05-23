import numeral from "numeral";
import dayjs from "dayjs";
import { XueQiuGuZhiOption } from "@/interface";
import { Widget, WidgetHeader, WidgetContent } from "./Widget";

const evaMap = {
  low: "偏低",
  mid: "适中",
  high: "偏高",
};

export default async function XueQiuGuZhi(props: XueQiuGuZhiOption) {
  const { size, api, indexCodeList } = props;

  const res = await fetch(api, {
    next: {
      revalidate: 60 * 60,
    },
  });
  const data = await res.json();
  const items = data.data.items;

  const date = items[0].ts;

  const myList = items.filter((item: any) =>
    indexCodeList.includes(item.index_code)
  );

  return (
    <Widget size={size}>
      <WidgetHeader
        name={`指数估值(${dayjs(date).format("MM-DD")})`}
        icon="https://danjuanfunds.com/images/logo_128@1.png"
        link="https://danjuanfunds.com/djmodule/value-center"
      ></WidgetHeader>
      <WidgetContent>
        <ul>
          <li className="flex items-center justify-between h-8 text-[#999]">
            <span className="flex-none w-[100px]">指数名称</span>

            {size !== "small" && (
              <>
                <span className="flex-none w-[48px] text-right">PE</span>
                <span className="flex-1 text-right">PE百分位</span>

                <span className="flex-none w-[32px] text-right ml-4">PB</span>
                <span className="flex-1 text-right">PB百分位</span>
              </>
            )}
          </li>
          {myList.map((item: any) => (
            <li
              key={item.id}
              className={`flex items-center justify-between h-8`}
            >
              <span className="flex-none w-[100px]">
                {item.name}
                <span
                  className={`text-xs ${
                    item.eva_type === "low"
                      ? "bg-[#ecfff4]"
                      : item.eva_type === "mid"
                      ? "bg-[#fff2da]"
                      : "bg-[#ffe7e5]"
                  }`}
                >
                  {/* @ts-expect-error Element implicitly has an 'any'  */}(
                  {evaMap[item.eva_type]})
                </span>
              </span>

              {size !== "small" && (
                <>
                  <span className="flex-none w-[48px] text-right font-mono">
                    {numeral(item.pe).format("0.00")}
                  </span>
                  <span className="flex-1 text-right font-mono">
                    {numeral(item.pe_percentile).format("0.00%")}
                  </span>

                  <span className="flex-none w-[32px] text-right  ml-4 font-mono">
                    {numeral(item.pb).format("0.00")}
                  </span>
                  <span className="flex-1 text-right font-mono">
                    {numeral(item.pb_percentile).format("0.00%")}
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
      </WidgetContent>
    </Widget>
  );
}
