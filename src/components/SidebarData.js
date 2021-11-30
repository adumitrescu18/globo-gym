import React from 'react';
import * as GiIcons from 'react-icons/gi';
import * as AiIcons from 'react-icons/ai';
import * as GrIcons from 'react-icons/gr';
import * as BsIcons from 'react-icons/bs';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Route',
    path: '/route',
    icon: <GrIcons.GrMapLocation />,
    cName: 'nav-text'
  },
  {
    title: 'Hazards',
    path: '/hazards',
    icon: <GiIcons.GiHazardSign />,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <BsIcons.BsFillPersonFill />,
    cName: 'nav-text'
  },

];