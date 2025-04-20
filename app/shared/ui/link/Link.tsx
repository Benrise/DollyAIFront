import NextLink from "next/link";
import { ReactNode } from "react";


export function Link({
    href,
    target,
    children,
  }: {
    href: string;
    target?: string;
    children: ReactNode;
  }) {
    return (
      <NextLink
        href={href}
        className="opacity-50 hover:opacity-100 transition-opacity font-medium text-sm"
        target={target}
      >
        {children}
      </NextLink>
    );
  }
  