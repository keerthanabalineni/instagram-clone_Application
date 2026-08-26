import {Outlet} from 'react-router-dom';import Sidebar from './Sidebar';import MobileNav from './MobileNav';import {useApp} from '../context/AppContext';import {useEffect} from 'react';
import React from 'react';
export default function Layout(){const {theme}=useApp();useEffect(()=>{document.documentElement.dataset.theme=theme},[theme]);return <div className="app-shell"><Sidebar/><main className="main"><Outlet/></main><MobileNav/></div>}
