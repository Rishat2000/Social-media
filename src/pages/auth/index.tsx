import React from 'react';
import './auth.scss';
import Login from '../../features/user/login';
import Register from '../../features/user/register';

export default function Auth() {
   const [selected, setSelected] = React.useState(0);
   const tabs = ['Вход', 'Регистрация'];

   return (
      <main>
         <div className="auth-form">
            <div className="auth-form__top">
               {tabs.map((tab, i) => (
                  <button
                     type="button"
                     onClick={() => setSelected(i)}
                     key={i}
                     className={`auth-form__top-title ${selected === i ? '_active' : ''}`}
                  >
                     {tab}
                  </button>
               ))}
            </div>
            <div className="auth-form__body">
               {selected === 0 ? <Login /> : <Register />}
            </div>
         </div>
      </main>
   );
}
