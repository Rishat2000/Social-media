import React from 'react';

type Props = {
  title: string;
  info?: string;
};

export default function ProfileInfo({ title, info }: Props) {
  if (!info) {
    return null;
  }

  return (
    <p>
      <span style={{ color: 'grey', fontWeight: '600' }}>{title}:</span>
      <span style={{ marginLeft: '10px', fontWeight: '600' }}>{info}</span>
    </p>
  );
}
