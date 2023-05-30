import numeral from "numeral";
import { dayjs } from "@/utils";
import { ZhiShuGuZhiOption } from "@/interface";
import { Widget } from "@/app/components/Widget/Widget";
import { WidgetHeader } from "@/app/components/Widget/WidgetHeader";
import { WidgetContent } from "@/app/components/Widget/WidgetContent";

const evaMap = {
  low: "偏低",
  mid: "适中",
  high: "偏高",
};

export async function ZhiShuGuZhi(props: ZhiShuGuZhiOption) {
  const { size, api, codes } = props;

  const res = await fetch(api, {
    next: { revalidate: 60 * 60 },
  });
  const data = await res.json();
  const items = data.data.items;

  const date = items[0].ts;

  const myList = items.filter((item: any) => codes.includes(item.index_code));

  const tableHeader = (
    <li className="flex items-center justify-between h-8 text-[#999] text-xs">
      <span className="grow shrink-0 w-[90px]">指数名称</span>

      {size !== "small" && (
        <>
          <span className="grow shrink-0 w-[48px] text-right">PE</span>
          <span className="grow shrink-0 w-[56px] text-right">PE百分位</span>

          <span className="grow shrink-0 w-[32px] text-right ml-4">PB</span>
          <span className="grow shrink-0 w-[56px] text-right">PB百分位</span>
        </>
      )}
    </li>
  );

  return (
    <Widget size={size}>
      <WidgetHeader
        name={`指数估值(${dayjs(date).format("MM-DD")})`}
        icon="https://danjuanfunds.com/images/logo_128@1.png"
        link="https://danjuanfunds.com/djmodule/value-center"
      ></WidgetHeader>

      <WidgetContent>
        <ul className="text-xs">
          {tableHeader}

          {myList.map((item: any) => (
            <li
              key={item.id}
              className={`flex items-center justify-between h-8`}
            >
              {/* 名称 && 评估 */}
              <span className="grow shrink-0 w-[90px]">
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
                  <span className="grow shrink-0 w-[48px] text-right font-mono">
                    {numeral(item.pe).format("0.00")}
                  </span>
                  <span className="grow shrink-0 w-[56px] text-right font-mono">
                    {numeral(item.pe_percentile).format("0.00%")}
                  </span>

                  <span className="grow shrink-0 w-[32px] text-right  ml-4 font-mono">
                    {numeral(item.pb).format("0.00")}
                  </span>
                  <span className="grow shrink-0 w-[56px] text-right font-mono">
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
