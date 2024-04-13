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

   return <article></article>;
}
