import{d as e,r as o,o as r,c as t,w as n,a as s,u as a,N as l,b as i,e as c,f as d,g as m,h as f,i as u,j as p}from"./vendor.73d5b123.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver((e=>{for(const r of e)if("childList"===r.type)for(const e of r.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&o(e)})).observe(document,{childList:!0,subtree:!0})}function o(e){var o;e.ep||(e.ep=!0,o=function(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?o.credentials="include":"anonymous"===e.crossorigin?o.credentials="omit":o.credentials="same-origin",o}(e),fetch(e.href,o))}}();const h=e({setup(e){const m={common:{primaryColor:"#51A8DDFF",primaryColorHover:"#7DB9DEFF",primaryColorPressed:"#2B5F75FF",primaryColorSuppl:"#3A8FB7FF",baseColor:"#FFF",tableColorHover:"rgba(0, 0, 100, 0.02)",bodyColor:"#fff",modalColor:"#fff",cardColor:"#fff",tableColor:"#fff",popoverColor:"#fff",tagColor:"rgb(250, 250, 252)",avatarColor:"rgba(204, 204, 204, 1)"},Tabs:{tabColorSegment:"#CBDFE8FF"}};return(e,f)=>{const u=o("router-view");return r(),t(a(d),null,{default:n((()=>[s(a(c),{"theme-overrides":m},{default:n((()=>[s(a(l),null,{default:n((()=>[s(a(i),null,{default:n((()=>[s(u,{style:{"min-height":"max-content"}})])),_:1})])),_:1})])),_:1})])),_:1})}}}),g={},y=function(e,o){return o&&0!==o.length?Promise.all(o.map((e=>{if(!((e=`/${e}`)in g)){g[e]=!0;var o=e.endsWith(".css");if(!document.querySelector(`link[href="${e}"]${o?'[rel="stylesheet"]':""}`)){const r=document.createElement("link");return r.rel=o?"stylesheet":"modulepreload",o||(r.as="script",r.crossOrigin=""),r.href=e,document.head.appendChild(r),o?new Promise(((e,o)=>{r.addEventListener("load",e),r.addEventListener("error",o)})):void 0}}}))).then((()=>e())):e()},_=m({history:f(),routes:[{path:"/",name:"login",component:()=>y((()=>import("./login.54daf31f.js")),["assets/login.54daf31f.js","assets/login.498786be.css","assets/vendor.73d5b123.js"]),meta:{title:"登录"}},{path:"/chooseTruck",name:"chooseTruck",meta:{title:"货车选择"},component:()=>y((()=>import("./chooseTruck.c8a34966.js")),["assets/chooseTruck.c8a34966.js","assets/chooseTruck.45928c28.css","assets/vendor.73d5b123.js","assets/show.03c39cc2.js"])},{path:"/show",name:"show",meta:{title:"结果展示"},component:()=>y((()=>import("./show.03c39cc2.js")),["assets/show.03c39cc2.js","assets/vendor.73d5b123.js"])}]});_.beforeEach(((e,o,r)=>{e.meta.title&&(document.title=e.meta.title),r()}));const b=u(h);b.use(_).mount("#app"),b.config.globalProperties.$cookies=p;