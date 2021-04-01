import React from 'react';
import { AiFillHome, AiFillDatabase, AiFillSmile } from "react-icons/ai";

export const SidebarData = [
    {
        title: 'Inicio',
        path: '/',
        icon: <AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Solicitudes',
        path: '/solicitudes',
        icon: <AiFillDatabase />,
        cName: 'nav-text'
    },
    {
        title: 'Mis datos',
        path: '/perfil',
        icon: <AiFillSmile />,
        cName: 'nav-text'
    }
] 