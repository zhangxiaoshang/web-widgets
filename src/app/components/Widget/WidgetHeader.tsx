import Image from "next/image";

interface WidgetHeaderProps {
  icon?: string;
  name?: string;
  link?: string;
}

export function WidgetHeader(props: WidgetHeaderProps) {
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
