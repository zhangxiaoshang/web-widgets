import { PropsWithChildren } from "react";

export function WidgetContent(props: PropsWithChildren) {
  return <div className="flex-1 overflow-y-auto">{props.children}</div>;
}
