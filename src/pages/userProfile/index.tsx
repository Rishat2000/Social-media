import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { resetUser, selectCurrent } from '../../features/user/userSlice';
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from '../../app/services/userApi';
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from '../../app/services/followApi';
import GoBack from '../../components/goBack';
import { BASE_URL } from '../../consts';
import {
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import ProfileInfo from '../../components/profileInfo';
import { formatToClientDate } from '../../utils/format-to-client-date';
import CountInfo from '../../components/countInfo';
import './userProfile.scss';

export default function UserProfile() {
  const { id } = useParams<{ id: string }>();
  const currentUser = useSelector(selectCurrent);
  const { data } = useGetUserByIdQuery(id ?? '');
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery();
  const [triggerCurrentQuery] = useLazyCurrentQuery();
  const dispatch = useDispatch();

  React.useEffect(
    () => () => {
      dispatch(resetUser());
    },
    [],
  );

  if (!data) {
    return null;
  }

  const handleFollow = async () => {
    try {
      if (id) {
        data.isFollowing
          ? await unfollowUser(id).unwrap()
          : await followUser({ followingId: id }).unwrap();
        await triggerGetUserByIdQuery(id);
        await triggerCurrentQuery();
      }
    } catch (error) {}
  };

  return (
    <div>
      <GoBack />
      <div className="profile">
        <div className="profile__main">
          <div className="profile__image-ibg">
            <img src={`${BASE_URL}${data.avatarUrl}`} alt={data.name} />
          </div>
          {currentUser?.id !== id ? (
            <button
              onClick={handleFollow}
              className="profile__reduct-button auth-button"
            >
              {data.isFollowing ? 'Отписаться' : 'Подписаться'}
              {data.isFollowing ? (
                <MdOutlinePersonAddDisabled />
              ) : (
                <MdOutlinePersonAddAlt1 />
              )}
            </button>
          ) : null}
        </div>
        <div className="profile__info">
          <ProfileInfo title="Почта" info={data.email} />
          <ProfileInfo title="Имя" info={data.name} />
          <div className="profile__follow-info">
            <div className="profile__follow">
              <CountInfo count={data.followers.length} title="Подписчики" />
            </div>
            <div className="profile__follow">
              <CountInfo count={data.following.length} title="Подписки" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
