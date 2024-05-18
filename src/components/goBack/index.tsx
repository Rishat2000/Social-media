import React from 'react';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function GoBack() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(-1)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '20px',
        cursor: 'pointer',
      }}
    >
      <FaRegArrowAltCircleLeft />
      Назад
    </div>
  );
}
