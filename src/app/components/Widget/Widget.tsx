"use client";
import { PropsWithChildren, useState } from "react";
import { Fullsize } from "../Icon/Fullsize";
import { Close } from "../Icon/Close";

export type Size = "small" | "medium" | "large";

interface WidgetProps {
  size?: Size;
}

export function Widget(props: PropsWithChildren<WidgetProps>) {
  const { children, size = "small" } = props;
  const [isFullsize, setIsFullsize] = useState(false);

  let className = `flex flex-col bg-white px-2 group/widget rounded-xl`;

  if (isFullsize) {
    className += ` fixed top-2 bottom-2 left-2 right-2 z-50`;
  } else {
    className += ` relative widget-${size}`;
    switch (size) {
      case "small":
        className += ` row-span-1 col-span-1`;
        break;
      case "medium":
        className += ` row-span-1 col-span-2`;
        break;
      case "large":
        className += ` row-span-2 col-span-2`;
        break;
    }
  }

  return (
    <div className={className}>
      <div
        className={`group/icon invisible group-hover/widget:visible flex gap-x-1 absolute right-2 top-3`}
      >
        {isFullsize ? (
          <Close onClick={() => setIsFullsize(false)}></Close>
        ) : (
          <Fullsize onClick={() => setIsFullsize(true)}></Fullsize>
        )}
      </div>
      {children}
    </div>
  );
}
