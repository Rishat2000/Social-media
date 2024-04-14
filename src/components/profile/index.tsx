import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrent, selectUser } from '../../features/user/userSlice';
import { BASE_URL } from '../../consts';
import { Link } from 'react-router-dom';
import './profileSidebar.scss';
import { MdAlternateEmail } from 'react-icons/md';

export default function Profile() {
  const current = useSelector(selectCurrent);

  if (!current) {
    return null;
  }

  const { name, email, avatarUrl, id } = current;

  return (
    <>
      <div className="profile-sidebar__image-ibg">
        <img src={`${BASE_URL}${avatarUrl}`} alt="image" />
      </div>
      <h1 className="profile-sidebar__name">
        <Link to={`/users/${id}`}>{name}</Link>
      </h1>
      <h2 className="profile-sidebar__email">
        <MdAlternateEmail />
        {email}
      </h2>
    </>
  );
}
