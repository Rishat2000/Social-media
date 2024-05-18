import { Controller, useForm } from 'react-hook-form';
import { IoMdCreate } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import { useCreateCommentMutation } from '../../app/services/commentsApi';
import { useLazyGetPostByIdQuery } from '../../app/services/postsApi';
import '../createPost/createPost.scss';

export default function CreateComment() {
  const { id } = useParams<{ id: string }>();
  const [createComment] = useCreateCommentMutation();
  const [getPostById] = useLazyGetPostByIdQuery();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const error = errors?.post?.message as string;

  const onSubmit = handleSubmit(async data => {
    try {
      if (id) {
        await createComment({ content: data.comment, postId: id }).unwrap();
        setValue('comment', '');
        await getPostById(id).unwrap();
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form onSubmit={onSubmit} className="create-post">
      <Controller
        name="comment"
        control={control}
        defaultValue=""
        rules={{ required: 'Обязательное поле' }}
        render={({ field }) => (
          <textarea
            {...field}
            placeholder="Какова мысля апосля?"
            className={errors.post ? 'input-error' : ''}
          />
        )}
      />
      <span>{errors && error}</span>
      <button className="create-post__button auth-button" type="submit">
        Ответить <IoMdCreate />
      </button>
    </form>
  );
}
