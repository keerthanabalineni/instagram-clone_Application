import React from 'react';
export default function Avatar({src,name='',size='md',story=false,onClick}){const Wrapper=onClick?'button':'span';return <Wrapper className={`avatar avatar-${size} ${story?'avatar-story':''}`} onClick={onClick} aria-label={name||'profile'}><img src={src} alt={name}/></Wrapper>}
