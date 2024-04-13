import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../components/input';
import '../../pages/auth/auth.scss';
import {
   useLazyCurrentQuery,
   useLoginMutation,
} from '../../app/services/userApi';
import { useNavigate } from 'react-router-dom';
import { hasErrorField } from '../../utils/has-error-field';

type Login = {
   email: string;
   password: string;
};

export default function Login() {
   const {
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<Login>({
      mode: 'onChange',
      reValidateMode: 'onBlur',
      defaultValues: {
         email: '',
         password: '',
      },
   });
   const [login, { isLoading }] = useLoginMutation();
   const navigate = useNavigate();
   const [triggerCurrentQuery] = useLazyCurrentQuery();
   const [error, setError] = React.useState('');

   const onSubmit = async (data: Login) => {
      try {
         await login(data).unwrap();
         await triggerCurrentQuery().unwrap();
         navigate('/');
      } catch (error) {
         if (hasErrorField(error)) {
            setError(error.data.error);
         }
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
         <div className="login-form__inputs">
            <Input
               control={control}
               name="email"
               label="Email"
               type="email"
               required="Обязательное поле"
            />
            <Input
               control={control}
               name="password"
               label="Пароль"
               type="password"
               required="Обязательное поле"
            />
         </div>
         <span style={{ color: 'red' }}>{error}</span>
         <button className="auth-button" type="submit">
            Войти
         </button>
      </form>
   );
}
