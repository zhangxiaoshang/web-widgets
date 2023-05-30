export function Close({ onClick }: { onClick: () => void }) {
  return (
    <a
      onClick={onClick}
      type="button"
      className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#ff5f56] rotate-45 cursor-pointer"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.0605 10L24.0239 38"
          stroke="#333"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10 24L38 24"
          stroke="#333"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </a>
  );
}