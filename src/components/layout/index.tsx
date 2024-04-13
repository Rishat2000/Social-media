import React from 'react';
import Header from '../header';
import Container from '../container';
import Sidebar from '../sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
   selectIsAutheticated,
   selectUser,
} from '../../features/user/userSlice';
import Profile from '../profile';
import './layout.scss';

export default function Layout() {
   const isAutheticated = useSelector(selectIsAutheticated);
   const user = useSelector(selectUser);
   const navigate = useNavigate();

   React.useEffect(() => {
      if (!isAutheticated) {
         navigate('/auth');
      }
   }, []);

   return (
      <>
         <Header />
         <Container>
            <div className="some__container">
               <aside className="sidebar">
                  <Sidebar />
               </aside>
               <main className="main">
                  <Outlet />
               </main>
               <aside className="profile-sidebar">{!user && <Profile />}</aside>
            </div>
         </Container>
      </>
   );
}
