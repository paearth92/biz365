import type { SVGProps } from "react";

export function QrCode(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M3 21h18" />
      <path d="M14 8h.01" />
      <path d="M8 8h.01" />
      <path d="M8 14h.01" />
      <path d="M11 11h.01" />
      <path d="M14 14h.01" />
      <path d="M14 21v-3a2 2 0 0 0-2-2h-3" />
    </svg>
  );
}
