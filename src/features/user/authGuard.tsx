import React from 'react';
import { useCurrentQuery } from '../../app/services/userApi';
import { CgSpinner } from 'react-icons/cg';

export default function AuthGuard({ children }: { children: JSX.Element }) {
  const { isLoading } = useCurrentQuery();
  if (isLoading) {
    return (
      <div className="spinner">
        <CgSpinner />
      </div>
    );
  }
  return children;
}
