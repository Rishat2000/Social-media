import React from 'react';
import { useGetAllPostsQuery } from '../../app/services/postsApi';
import CreatePost from '../../components/createPost';
import Card from '../../components/card';

export default function Posts() {
  const { data } = useGetAllPostsQuery();

  return (
    <div className="posts" style={{ paddingBottom: '50px' }}>
      <CreatePost />
      {data && data.length > 0
        ? data.map(
            ({
              content,
              author,
              id,
              authorId,
              comments,
              likes,
              likedByUser,
              createdAt,
            }) => (
              <Card
                key={id}
                avatarUrl={author.avatarUrl ?? ''}
                content={content}
                name={author.name ?? ''}
                likesCount={likes.length}
                commentsCount={comments.length}
                authorId={authorId}
                id={id}
                likedByUser={likedByUser}
                createdAt={createdAt}
                cardFor="post"
              />
            ),
          )
        : null}
    </div>
  );
}
