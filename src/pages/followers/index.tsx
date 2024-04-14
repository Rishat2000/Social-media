import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrent } from '../../features/user/userSlice';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../consts';

export default function Followers() {
  const currentUser = useSelector(selectCurrent);

  if (!currentUser) {
    return null;
  }

  return currentUser.followers.length > 0 ? (
    <div className="followers">
      {currentUser.followers.map(user => (
        <Link to={`/users/${user.follower.id}`} key={user.follower.id}>
          <div className="followers__image-ibg">
            <img src={`${BASE_URL}${user.follower.avatarUrl}`} alt="image" />
          </div>
          <div className="followers__info">
            <p>{user.follower.name}</p>
            <p>{user.follower.email}</p>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <span>У вас не подписчиков</span>
  );
}
