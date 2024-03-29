import React, { useState, Fragment } from 'react'
import { Link, useHistory} from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import Swal from 'sweetalert2';

export const Navbar = () => {
    const history = useHistory();
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

    const logout = () => {
        Swal.fire({
            title: "Desea cerrar sesión?",
            showDenyButton: true,
            denyButtonText: "No",
            confirmButtonText: "Sí"
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.removeItem("dtoken");
                history.push("/");
            }
        })
    }

    return (
        <Fragment> 
            <IconContext.Provider value={{color: '#fff'} }>
            <div className="navbar sticky-top">
                <Link to="#" className="menu-bars" aria-label="menu">
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>
                <h1 className="title pl-2 ml-auto">Banco de sangre</h1>
            </div>
            <nav className={sidebar ? 'nav-menu active position-fixed' : 'nav-menu position-fixed'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className='menu-bars' aria-label="menu">
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span className="ml-3">{item.title}</span>
                                </Link>
                            </li>

                        )
                    })}
                    <li className={'nav-text'}>
                        <Link to="#" onClick={() => logout()}>
                            <AiIcons.AiOutlineLogout />
                            <span className="ml-3">Cerrar sesión</span>
                        </Link>
                    </li>
                </ul>
            </nav>  
            </IconContext.Provider>
        </Fragment>
    )
}
