import{d as e,o as l,c as n,a as t,j as o,A as a,l as r,u,w as i,x as s,y as d,B as c,q as h,D as p,C as v,v as k,z as m}from"./vendor.1119f6b2.js";const f={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},w=t("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M224 184h128"},null,-1),_=t("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M224 256h128"},null,-1),b=t("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M224 327h128"},null,-1),g=t("path",{d:"M448 258c0-106-86-192-192-192S64 152 64 258s86 192 192 192s192-86 192-192z",fill:"none",stroke:"currentColor","stroke-miterlimit":"10","stroke-width":"32"},null,-1),x=t("circle",{cx:"168",cy:"184",r:"8",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),y=t("circle",{cx:"168",cy:"257",r:"8",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),j=t("circle",{cx:"168",cy:"328",r:"8",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1);var C=e({name:"ListCircleOutline",render:function(e,t){return l(),n("svg",f,[w,_,b,g,x,y,j])}});const q=d("br",null,null,-1),z=d("br",null,null,-1),L={class:"checkButton"},M=m("确认"),S=e({props:{initValue:{required:!0,type:Object}},emits:["formSubmit"],setup(e,{emit:n}){const m=o(null);e=a(e).initValue;const f=o(e),w=()=>{n("formSubmit",f.value)};return(e,n)=>(l(),r("div",null,[t(u(s),{justify:"center"},{default:i((()=>[t(u(c),{size:"60"},{default:i((()=>[t(u(C))])),_:1})])),_:1}),q,z,t(u(s),{justify:"center"},{default:i((()=>[t(u(h),{"label-width":"80%",model:f.value,size:"large",ref:(e,l)=>{l.formRef=e,m.value=e},"label-placement":"left","show-require-mark":""},{default:i((()=>[t(u(v),{label:"长度","rule-path":"dimension.length"},{default:i((()=>[t(u(p),{value:f.value.dimension.length,"onUpdate:value":n[0]||(n[0]=e=>f.value.dimension.length=e),placeholder:"输入货车车厢长度"},null,8,["value"])])),_:1}),t(u(v),{label:"宽度",path:"dimension.width"},{default:i((()=>[t(u(p),{placeholder:"输入货车车厢宽度",value:f.value.dimension.width,"onUpdate:value":n[1]||(n[1]=e=>f.value.dimension.width=e)},null,8,["value"])])),_:1}),t(u(v),{label:"高度",path:"dimension.hight"},{default:i((()=>[t(u(p),{placeholder:"输入货车车厢高度",value:f.value.dimension.hight,"onUpdate:value":n[2]||(n[2]=e=>f.value.dimension.hight=e)},null,8,["value"])])),_:1}),t(u(v),{label:"负载",path:"maxLoad"},{default:i((()=>[t(u(p),{placeholder:"输入货车最大负载",value:f.value.maxLoad,"onUpdate:value":n[3]||(n[3]=e=>f.value.maxLoad=e)},null,8,["value"])])),_:1}),t(u(v),{label:"数量",path:"quantity"},{default:i((()=>[t(u(p),{placeholder:"输入该种货车数量",value:f.value.quantity,"onUpdate:value":n[4]||(n[4]=e=>f.value.quantity=e)},null,8,["value"])])),_:1}),t(u(v),null,{default:i((()=>[d("div",L,[t(u(k),{onClick:w,type:"primary"},{default:i((()=>[M])),_:1})])])),_:1})])),_:1},8,["model"])])),_:1})]))}});var U=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:S});export{C as L,S as _,U as t};
