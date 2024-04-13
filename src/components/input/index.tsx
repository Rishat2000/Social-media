import React from 'react';
import { Control, useController } from 'react-hook-form';
import '../../pages/auth/auth.scss';

type Props = {
   name: string;
   label: string;
   placeholder?: string;
   type?: string;
   control: Control<any>;
   required?: string;
   endContent?: JSX.Element;
};

export default function Input({
   name,
   label,
   placeholder,
   type,
   control,
   required = '',
   endContent,
}: Props) {
   const {
      field,
      fieldState: { invalid },
      formState: { errors },
   } = useController({
      name,
      control,
      rules: {
         required,
      },
   });
   return (
      <>
         <label>
            {label}
            <input
               value={field.value}
               name={field.name}
               type={type}
               placeholder={placeholder}
               onChange={field.onChange}
               onBlur={field.onBlur}
               autoComplete="off"
               className={`${invalid ? 'invalid' : ''}`}
            />
            <span>{(errors[name]?.message as string) ?? ''}</span>
         </label>
      </>
   );
}
