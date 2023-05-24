import Image from "next/image";
import { PropsWithChildren } from "react";

export function WidgetHeader(
  props: PropsWithChildren<{
    name: string;
    icon?: string;
    link?: string;
  }>
) {
  const { icon, name, link } = props;

  return (
    <div className="flex items-center gap-x-1 h-9">
      <a
        href={link}
        target="_blank"
        className="flex items-center gap-x-1 font-bold"
      >
        {!!icon && (
          <span className="flex-none relative w-3.5 h-3.5">
            <Image src={icon} fill alt={name ?? ""}></Image>
          </span>
        )}

        {!!name && <h2>{name}</h2>}
      </a>
    </div>
  );
}

export function WidgetContent(props: PropsWithChildren) {
  return <div className="flex-1 overflow-y-auto">{props.children}</div>;
}

export function Widget(props: PropsWithChildren<{ size: Size }>) {
  const { size, children } = props;

  return (
    <div
      className={`flex flex-col bg-white p-2 rounded-xl ${
        size === "large"
          ? "widget-lg row-span-2 col-span-2"
          : size === "medium"
          ? "widget-md row-span-1 col-span-2"
          : "widget-sm row-span-1 col-span-1"
      }`}
    >
      {children}
    </div>
  );
}
