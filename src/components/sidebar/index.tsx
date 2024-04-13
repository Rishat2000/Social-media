import React from 'react';
import SidebarButton from '../sidebarButton';
import { BsPostcard } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';
import './sidebar.scss';

export default function Sidebar() {
  return (
    <>
      <ul className="sidebar__list">
        <li className="sidebar__item">
          <SidebarButton href="/" icon={<BsPostcard />}>
            Посты
          </SidebarButton>
        </li>
        <li className="sidebar__item">
          <SidebarButton href="following" icon={<FiUsers />}>
            Подписки
          </SidebarButton>
        </li>
        <li className="sidebar__item">
          <SidebarButton href="followers" icon={<FaUsers />}>
            Подписчики
          </SidebarButton>
        </li>
      </ul>
    </>
  );
}
