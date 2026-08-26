import {NavLink} from 'react-router-dom';export default function MobileNav(){return <nav className="mobile-nav">{[['⌂','/'],['⌕','/search'],['＋','/create'],['◉','/profile']].map(([i,to])=><NavLink key={to} to={to}>{i}</NavLink>)}</nav>}
import React from 'react';
