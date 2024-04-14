import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrent } from '../../features/user/userSlice';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../consts';

export default function Following() {
  const currentUser = useSelector(selectCurrent);

  if (!currentUser) {
    return null;
  }

  return currentUser.following.length > 0 ? (
    <div className="followers">
      {currentUser.following.map(user => (
        <Link to={`/users/${user.following.id}`} key={user.following.id}>
          <div className="followers__image-ibg">
            <img src={`${BASE_URL}${user.following.avatarUrl}`} alt="image" />
          </div>
          <div className="followers__info">
            <p>{user.following.name}</p>
            <p>{user.following.email}</p>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <span style={{ fontSize: '20px' }}>У вас не подписок</span>
  );
}
