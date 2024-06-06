"use client";

import { INavigate } from "@/interfaces/navigate.interface";
import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({ props, ...rest }: { props: INavigate } & LinkProps) {
  const { to } = props;
  const pathName = usePathname();
  const isActive = pathName === to;
  return (
    <Link
      {...rest}
      className={clsx(
        "text-base font-medium leading-[2.5]",
        isActive
          ? "text-primary underline-offset-4"
          : "text-secondary no-underline"
      )}
    >
      {props.label}
    </Link>
  );
}

export function SideBarNavLink({
  props,
  ...rest
}: { props: INavigate } & LinkProps) {
  const { to } = props;
  const pathName = usePathname();
  const isActive = pathName === to;
  return (
    <Link
      {...rest}
      className={clsx(
        "text-base font-medium",
        isActive
          ? "text-white bg-primary underline-offset-4 hover:brightness-110"
          : "text-secondary no-underline hover:bg-gray-100",
        props.icon && "flex items-center gap-2 p-4 rounded-xl no-underline"
      )}
    >
      {props.icon}
      {props.label}
    </Link>
  );
}
