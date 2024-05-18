import React from 'react';
import { IconType } from 'react-icons';

type Props = {
  count: number;
  Icon: IconType;
};

export default function MetaInfo({ count, Icon }: Props) {
  return (
    <>
      {count > 0 && <p>{count}</p>}
      <Icon />
    </>
  );
}
