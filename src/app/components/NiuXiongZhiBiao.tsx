// import dayjs from "dayjs";
import { dayjs } from "@/utils";
import { Widget, WidgetHeader, WidgetContent } from "./Widget";
import { NiuXiongZhiBiaoOption } from "@/interface";

const API =
  "https://datacenter.eastmoney.com/securities/api/data/get?type=RPTAAA_DMSK_TS_CHANGESTATISTICS";

function UpDownPercent({
  size,
  upCount,
  downCount,
}: {
  size: Size;
  upCount: number;
  downCount: number;
}) {
  return (
    <div className="flex rounded overflow-hidden text-center text-xs mt-4">
      <span
        style={{
          width: `${(upCount / (upCount + downCount)) * 100}%`,
          backgroundColor: "rgb(233 71 72)",
          color: "#333",
        }}
      >
        {size === "small" ? upCount : `上涨${upCount}家`}
      </span>
      <span
        style={{
          width: `${(downCount / (upCount + downCount)) * 100}%`,
          backgroundColor: "rgb(76 191 64)",
          color: "#333",
        }}
      >
        {size === "small" ? downCount : `下跌${downCount}家`}
      </span>
    </div>
  );
}

function DetailData({ size, data }: { size: Size; data: number[] }) {
  const upColor = "text-[#f22323]";
  const downColor = "text-[#00a000]";

  return (
    <div className="text-xs">
      <div className="flex items-center my-2">
        <span className="w-2 h-2 bg-[#f22323] mr-1"></span>
        <span>
          涨停<b className={upColor}>{data[0]}</b>家
        </span>
        <span className="ml-auto">
          自然涨停<b className={upColor}>{data[1]}</b>家
        </span>
      </div>

      <div className="flex items-center">
        <span className="w-2 h-2 bg-[#00a000] mr-1"></span>
        <span>
          跌停<b className={downColor}>{data[2]}</b>家
        </span>
        <span className="ml-auto">
          自然跌停<b className={downColor}>{data[3]}</b>家
        </span>
      </div>
    </div>
  );
}

export default async function NiuXiongZhiBiao(props: NiuXiongZhiBiaoOption) {
  const { size } = props;

  let upCount = 0;
  let downCount = 0;
  let IND3 = 0; // 涨停
  let IND4 = 0; // 自然涨停
  let IND5 = 0; // 跌停
  let IND6 = 0; // 自然跌停

  try {
    const res = await fetch(API, {
      next: {
        revalidate: 60,
      },
    });
    const data = await res.json();
    console.log(data);

    upCount = data.result.data[0].IND1;
    downCount = data.result.data[0].IND2;
    IND3 = data.result.data[0].IND3;
    IND4 = data.result.data[0].IND4;
    IND5 = data.result.data[0].IND5;
    IND6 = data.result.data[0].IND6;
  } catch (error) {
    console.error(error);
  }

  return (
    <Widget size={size}>
      <WidgetHeader
        name={
          size === "small"
            ? `${dayjs().format("MM-DD HH:mm")}`
            : `牛熊风向标(${dayjs().format("MM-DD HH:mm")})`
        }
        icon="https://g1.dfcfw.com/g1/special/favicon_shortcut.ico"
        link="https://emdata.eastmoney.com/nxfxb/index.html"
      ></WidgetHeader>

      <WidgetContent>
        <UpDownPercent
          size={size}
          upCount={upCount}
          downCount={downCount}
        ></UpDownPercent>

        <DetailData size={size} data={[IND3, IND4, IND5, IND6]}></DetailData>
      </WidgetContent>
    </Widget>
  );
}
