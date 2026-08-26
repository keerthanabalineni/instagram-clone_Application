import React,{useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useApp} from '../context/AppContext';

export default function Logout(){
 const {logout}=useApp();
 useEffect(()=>logout(),[logout]);
 return <main className="auth-page"><section className="auth-card"><div className="auth-brand">insta<span>•</span></div><h1>You are logged out</h1><p className="auth-muted">Your local session has been ended.</p><Link className="primary full auth-link" to="/login">Log in again</Link></section></main>
}
