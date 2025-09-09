import type { SVGProps } from 'react';

export function KalaConnectIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
      <path d="M12 12a4.5 4.5 0 0 0-4.5 4.5c0 1.657 2.015 3 4.5 3s4.5-1.343 4.5-3A4.5 4.5 0 0 0 12 12z" />
      <path d="M15.536 9.464a4.5 4.5 0 0 0-7.072 0" />
      <path d="M12 4.5a2.25 2.25 0 0 1 2.25 2.25" />
      <path d="M12 4.5a2.25 2.25 0 0 0-2.25 2.25" />
    </svg>
  );
}
