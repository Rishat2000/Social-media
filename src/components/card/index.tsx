import React from 'react';
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from '../../app/services/likesApi';
import {
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from '../../app/services/postsApi';
import { useDeleteCommentMutation } from '../../app/services/commentsApi';
import { useSelector } from 'react-redux';
import { selectCurrent } from '../../features/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../consts';
import { formatToClientDate } from '../../utils/format-to-client-date';
import { CgSpinner } from 'react-icons/cg';
import { RiDeleteBinLine } from 'react-icons/ri';
import MetaInfo from '../metaInfo';
import { FcDislike } from 'react-icons/fc';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { FaRegComment } from 'react-icons/fa';
import './card.scss';
import { hasErrorField } from '../../utils/has-error-field';

type Props = {
  avatarUrl: string;
  name: string;
  authorId: string;
  content: string;
  commentId?: string;
  likesCount?: number;
  commentsCount?: number;
  createdAt?: Date;
  id?: string;
  cardFor: 'comment' | 'post' | 'current-post';
  likedByUser?: boolean;
};

export default function Card({
  avatarUrl = '',
  name = '',
  authorId = '',
  content = '',
  commentId = '',
  likesCount = 0,
  commentsCount = 0,
  createdAt,
  id = '',
  cardFor = 'post',
  likedByUser = false,
}: Props) {
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
  const [triggerGetPostById] = useLazyGetPostByIdQuery();
  const [deletePost, deletePostStatus] = useDeletePostMutation();
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();
  const [error, setError] = React.useState('');
  const currentUser = useSelector(selectCurrent);
  const navigate = useNavigate();

  const refetchPosts = async () => {
    switch (cardFor) {
      case 'post':
        await triggerGetAllPosts().unwrap();
        break;
      case 'current-post':
        await triggerGetAllPosts().unwrap();
        break;
      case 'comment':
        await triggerGetPostById(id).unwrap();
        break;
      default:
        throw new Error('Неверный аргумент cardFor');
    }
  };

  const handleDelete = async () => {
    try {
      switch (cardFor) {
        case 'post':
          await deletePost(id).unwrap();
          await refetchPosts();
        case 'current-post':
          await deletePost(id).unwrap();
          navigate('/');
          break;
        case 'comment':
          await deleteComment(commentId).unwrap();
          await refetchPosts();
          break;
        default:
          throw new Error('Неверный аргумент cardFor');
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error);
      } else {
        setError(error as string);
      }
    }
  };

  const handleClick = async () => {
    try {
      likedByUser
        ? await unlikePost(id).unwrap()
        : await likePost({ postId: id }).unwrap();

      await triggerGetPostById(id).unwrap();
      await refetchPosts();
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error);
      } else {
        setError(error as string);
      }
    }
  };

  return (
    <article className="user-post">
      <div className="user-post__top">
        <div className="user-post__user-info">
          <div className="user-post__image-ibg">
            <img src={`${BASE_URL}${avatarUrl}`} />
          </div>
          <div className="user-post__info">
            <Link to={`/users/${authorId}`}>{name}</Link>
            <p>{createdAt && formatToClientDate(createdAt)}</p>
          </div>
        </div>
        {authorId === currentUser?.id && (
          <button
            onClick={handleDelete}
            type="button"
            className="user-post__delete-button"
          >
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
              <CgSpinner />
            ) : (
              <RiDeleteBinLine />
            )}
          </button>
        )}
      </div>
      <div className="user-post__body">{content}</div>
      {cardFor !== 'comment' && (
        <div className="user-post__actions">
          <div onClick={handleClick} className="user-post__likes">
            <MetaInfo
              count={likesCount}
              Icon={likedByUser ? FcDislike : MdOutlineFavoriteBorder}
            />
          </div>
          <Link to={`/posts/${id}`} className="user-post__comments">
            <MetaInfo count={commentsCount} Icon={FaRegComment} />
          </Link>
          <span style={{ fontSize: '16px', color: 'red' }}>{error}</span>
        </div>
      )}
    </article>
  );
}
