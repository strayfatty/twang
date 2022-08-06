import{S as h,T as d}from"./TwitchApi.08d3459c.js";import{m as e}from"./vendor.fe47eba3.js";class u{view(a){const t=a.attrs;return e("nav",[e("a.title",{href:"/"},"TWANG"),e("ul",[]),e("button",{onclick:async()=>{t.isAuthenticated()?(await t.logout(),location.href="/"):location.href=t.getLoginUrl()}},t.isAuthenticated()?"Logout":"Login")])}}class g{view(a){return[e(u,a.attrs),e("section",a.children)]}}class w{constructor(a){this.twitchApi=a}isAuthenticated(){return this.twitchApi.isAuthenticated()}getLoginUrl(){return this.twitchApi.getLoginUrl()}logout(){return this.twitchApi.logout()}}class _{view(a){const t=a.attrs;return e(".stream-card",[e("img.stream-card__preview",{alt:t.title,src:t.thumbnailUrl}),t.profileImageUrl?e("img.stream-card__profile-image",{src:t.profileImageUrl}):null,e("a.stream-card__user",{href:t.url,target:"_blank"},t.userName),e(".stream-card__viewers",`${t.viewers} viewers`),e(".stream-card__game",{title:t.gameName},t.gameName),e(".stream-card__title",{title:t.title},t.title)])}}class p{view(a){const t=a.attrs,i=t.streams||[];return e(".stream-list",{class:t.streams==null?"is-loading":i.length===0?"is-empty":null},[e("a.stream-list__title",{href:t.url,target:"_blank"},t.title),e(".stream-list__loading"),e(".stream-list__empty","no streams found"),e(".stream-list__streams",i.map(o=>e(_,o)))])}}class f{oninit(a){a.attrs.onChange=()=>e.redraw()}view(a){const t=a.attrs;return e(".dashboard",t.games.map(i=>{const o=t.streams[i.id];return e(p,{url:i.url,title:i.name,streams:o})}))}}class v{constructor(a,t){this.storage=a,this.twitch=t,this.isAuthenticated=t.isAuthenticated(),this.games=[],this.streams={},this.onChange=()=>{},this.isAuthenticated&&this.initialize()}async initialize(){this.loadGames(),this.games.forEach(a=>a.load())}loadGames(){this.games.push({id:"",name:"Following",url:"https://www.twitch.tv/directory/following",load:()=>this.loadFollowedStreams()})}async loadFollowedStreams(){const a={user_id:this.storage.getUserId()},{data:t}=await this.twitch.get_streams_followed(a),i=t.map(A);this.streams[""]=i,this.onChange(),await this.loadProfileImages(i),this.onChange()}async loadProfileImages(a){const t=a.map(r=>r.userId).filter((r,l,m)=>m.indexOf(r)===l),{data:i}=await this.twitch.get_users({id:t}),o=i.reduce((r,l)=>(r[l.id]=l.profile_image_url,r),{});a.forEach(r=>r.profileImageUrl=o[r.userId])}}function A(s){return{url:`https://twitch.tv/${s.user_login}`,title:s.title,userId:s.user_id,userName:s.user_name,gameName:s.game_name,thumbnailUrl:(s.thumbnail_url||"").replace(/{width}/,"320").replace(/{height}/,"180"),profileImageUrl:"",viewers:s.viewer_count}}const n=new h,c=new d(n),y=new w(c),b=new v(n,c);e.mount(document.body,{view:()=>e(g,y,e(f,b))});
