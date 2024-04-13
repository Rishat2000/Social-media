import React from 'react';
import { ThemeContext } from '../themeProvider';
import { RiMoonLine, RiSunLine } from 'react-icons/ri';
import './header.scss';
import { VscAccount } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAutheticated } from '../../features/user/userSlice';
import { CiLogout } from 'react-icons/ci';

export default function Header() {
   const { theme, toggleTheme } = React.useContext(ThemeContext);
   const isAutheticated = useSelector(selectIsAutheticated);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const hadleLogout = () => {
      dispatch(logout());
      localStorage.removeItem('token');
      navigate('/auth');
   };

   return (
      <header className="header">
         <div className="header__container">
            <h1 className="header__title">Rishat's social media</h1>
            <div className="header__buttons">
               <button
                  type="button"
                  className="header__theme"
                  onClick={toggleTheme}
               >
                  {theme === 'light' ? <RiMoonLine /> : <RiSunLine />}
               </button>
               {!isAutheticated ? (
                  <button
                     onClick={() => navigate('/auth')}
                     type="button"
                     className="header__auth"
                  >
                     <VscAccount />
                     Войти
                  </button>
               ) : (
                  <button
                     onClick={hadleLogout}
                     type="button"
                     className="header__auth"
                  >
                     <CiLogout />
                     Выйти
                  </button>
               )}
            </div>
         </div>
      </header>
   );
}
