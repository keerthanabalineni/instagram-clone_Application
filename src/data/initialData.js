const img=(id,w=1080,q=86)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;
export const photos={hero:img('photo-1494790108377-be9c29b29330'),jane:img('photo-1517841905240-472988babdf9'),emma:img('photo-1534528741775-53994a69daeb'),liam:img('photo-1500648767791-00dcc994a43e'),olivia:img('photo-1544005313-94ddf0286df2'),lake:img('photo-1500534623283-312aade485b7'),mountains:img('photo-1464822759023-fed622ff2c3b'),coffee:img('photo-1495474472287-4d71bcdd2085'),city:img('photo-1477959858617-67f85cf4f1df'),food:img('photo-1540189549336-e6e99c3679fe'),flowers:img('photo-1490750967868-88aa4486c946'),beach:img('photo-1507525428034-b723cf961d3e'),waterfall:img('photo-1433086966358-54859d0ed716'),travel:img('photo-1500530855697-b586d89ba3ee')};
export const currentUser={id:'me',username:'keerthana',name:'Keerthana Balineni',bio:'Full Stack Developer | CSE (AI & ML)\nBuilding useful things for the web ✨',website:'github.com/keerthanabalineni',location:'Tirupati, India',avatar:photos.hero};
export const users=[{id:'u1',username:'jane_cooper',name:'Jane Cooper',avatar:photos.jane,following:true},{id:'u2',username:'emma_watson',name:'Emma Watson',avatar:photos.emma,following:true},{id:'u3',username:'liam_lee',name:'Liam Lee',avatar:photos.liam,following:false},{id:'u4',username:'olivia_rodrigo',name:'Olivia Rodrigo',avatar:photos.olivia,following:false},{id:'u5',username:'noah_smith',name:'Noah Smith',avatar:photos.hero,following:false}];
export const posts=[];
export const stories=[
 {id:'s-jane',username:'jane_cooper',avatar:photos.jane,image:photos.beach,time:'2h'},
 {id:'s-emma',username:'emma_watson',avatar:photos.emma,image:photos.flowers,time:'4h'},
 {id:'s-liam',username:'liam_lee',avatar:photos.liam,image:photos.city,time:'6h'},
 {id:'s-olivia',username:'olivia_rodrigo',avatar:photos.olivia,image:photos.food,time:'8h'}
];
