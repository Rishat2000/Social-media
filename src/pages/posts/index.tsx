import React from 'react';
import { useGetAllPostsQuery } from '../../app/services/postsApi';
import CreatePost from '../../components/createPost';

export default function Posts() {
   const { data } = useGetAllPostsQuery();

   return (
      <main className="posts">
         <CreatePost />
      </main>
   );
}
