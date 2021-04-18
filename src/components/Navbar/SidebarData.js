import React from 'react';
import { AiFillDatabase, AiFillSmile } from "react-icons/ai";

export const SidebarData = [
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