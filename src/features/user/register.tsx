import React from 'react';
import Input from '../../components/input';
import { useForm } from 'react-hook-form';
import { useRegisterMutation } from '../../app/services/userApi';
import { hasErrorField } from '../../utils/has-error-field';
import Login from './login';

type Register = {
   name: string;
   email: string;
   password: string;
};

export default function Register() {
   const {
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<Register>({
      mode: 'onChange',
      reValidateMode: 'onBlur',
      defaultValues: {
         email: '',
         password: '',
         name: '',
      },
   });

   const [register, { isLoading }] = useRegisterMutation();
   const [error, setError] = React.useState('');

   const onSubmit = async (data: Register) => {
      try {
         await register(data).unwrap();
      } catch (error) {
         if (hasErrorField(error)) {
            setError(error.data.error);
         }
      }
   };

   return (
      <>
         <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <div className="login-form__inputs">
               <Input
                  control={control}
                  name="name"
                  label="Имя"
                  type="text"
                  required="Обязательное поле"
               />
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
               Зарегистрироваться
            </button>
         </form>
      </>
   );
}
