import React from 'react';
import * as AiIcons from "react-icons/ai";

export const SidebarData = [
    {
        title: 'Inicio',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Solicitudes',
        path: '/solicitudes',
        icon: <AiIcons.AiFillDatabase />,
        cName: 'nav-text'
    },
    {
        title: 'Mis datos',
        path: '/perfil',
        icon: <AiIcons.AiFillSmile />,
        cName: 'nav-text'
    },
    {
        title: 'Cerrar Sesión',
        path: '/logout',
        icon: <AiIcons.AiOutlineLogout />,
        cName: 'nav-text'
    }
] 