"use client";

import numberal from "numeral";
import { useIsFullsize } from "@/context/FullsizeContext";

export function TickerPriceInfo({
  size,
  symbol,
  data,
}: {
  size: Size;
  symbol: string;
  data: any;
}) {
  const isFullsize = useIsFullsize();
  const { priceChangePercent, lastPrice, volume, quoteVolume } = data;

  const [base, quote] = symbol.split("_");
  return (
    <div className="flex flex-row justify-between text-xs mb-3 gap-x-1">
      <span className="flex flex-col text-left flex-1">
        <span className="text-stone-400">
          {symbol.replace("_", "/").toUpperCase()}
        </span>

        <span
          className={`flex gap-x-2 text-left text-sm ${
            size === "small" ? "justify-between" : ""
          }`}
        >
          <span className="grow-1 shrink-0 w-[65px]">{lastPrice}</span>
          <b
            className={
              Number(priceChangePercent) > 0
                ? "text-[#f22323]"
                : "text-[#00a000]"
            }
          >
            {(Number(priceChangePercent) * 100).toFixed(1)}%
          </b>
        </span>
      </span>

      {(isFullsize || size !== "small") && (
        <>
          <span className="flex flex-col text-right flex-1">
            <span className="text-stone-400" title="24h成交量">
              成交量({base.toUpperCase()})
            </span>
            <span className="text-sm">{numberal(volume).format("0.0a")}</span>
          </span>

          <span className="flex flex-col text-right flex-1">
            <span className="text-stone-400" title="24h成交额">
              成交额({quote.toUpperCase()})
            </span>
            <span className="text-sm">
              {numberal(quoteVolume).format("0.0a")}
            </span>
          </span>
        </>
      )}
    </div>
  );
}
