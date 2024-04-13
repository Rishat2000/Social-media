import React from 'react';

type Props = {
  children: React.ReactElement[] | React.ReactElement;
};

export default function Container({ children }: Props) {
  return <main>{children}</main>;
}
