import React from 'react';
import {
   useCreatePostMutation,
   useLazyGetAllPostsQuery,
} from '../../app/services/postsApi';
import { Controller, useForm } from 'react-hook-form';
import './createPost.scss';
import { IoMdCreate } from 'react-icons/io';

export default function CreatePost() {
   const [createPost] = useCreatePostMutation();
   const [triggerAllPosts] = useLazyGetAllPostsQuery();

   const {
      handleSubmit,
      control,
      formState: { errors },
      setValue,
   } = useForm();

   const error = errors?.post?.message as string;

   const onSubmit = handleSubmit(async data => {
      try {
         await createPost({ content: data.post }).unwrap();
         setValue('post', '');
         await triggerAllPosts().unwrap();
      } catch (error) {
         console.log(error);
      }
   });

   return (
      <form onSubmit={onSubmit} className="create-post">
         <Controller
            name="post"
            control={control}
            defaultValue=""
            rules={{ required: 'Обязательное поле' }}
            render={({ field }) => (
               <textarea
                  {...field}
                  placeholder="Какова мысля?"
                  className={errors.post ? 'input-error' : ''}
               />
            )}
         />
         <span>{errors && error}</span>
         <button className="create-post__button auth-button" type="submit">
            Запостить <IoMdCreate />
         </button>
      </form>
   );
}
