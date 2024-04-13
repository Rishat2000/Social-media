import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  icon: JSX.Element;
  href: string;
};

export default function SidebarButton({ children, icon, href }: Props) {
  return (
    <Link to={href}>
      {icon}
      {children}
    </Link>
  );
}
