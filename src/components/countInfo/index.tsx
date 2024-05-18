import React from 'react';

type Props = {
  count: number;
  title: string;
};

export default function CountInfo({ count, title }: Props) {
  return (
    <>
      <span style={{ fontSize: '35px' }}>{count}</span>
      <span>{title}</span>
    </>
  );
}
