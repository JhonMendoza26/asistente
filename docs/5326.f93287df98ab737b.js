"use strict";(self.webpackChunkasistente_virtual_angular=self.webpackChunkasistente_virtual_angular||[]).push([[5326],{5326:(Z,p,m)=>{m.r(p),m.d(p,{startInputShims:()=>E});var w=m(5861),L=m(8416),v=m(5730);const A=new WeakMap,D=(e,n,t,s=0,o=!1)=>{A.has(e)!==t&&(t?N(e,n,s,o):O(e,n))},P=e=>e===e.getRootNode().activeElement,N=(e,n,t,s=!1)=>{const o=n.parentNode,r=n.cloneNode(!1);r.classList.add("cloned-input"),r.tabIndex=-1,s&&(r.disabled=!0),o.appendChild(r),A.set(e,r);const i="rtl"===e.ownerDocument.dir?9999:-9999;e.style.pointerEvents="none",n.style.transform=`translate3d(${i}px,${t}px,0) scale(0)`},O=(e,n)=>{const t=A.get(e);t&&(A.delete(e),t.remove()),e.style.pointerEvents="",n.style.transform=""},I="input, textarea, [no-blur], [contenteditable]",W=function(){var e=(0,w.Z)(function*(n,t,s,o,r,c=!1){if(!s&&!o)return;const i=((e,n,t)=>{var s;return((e,n,t,s)=>{const o=e.top,r=e.bottom,c=n.top,u=c+15,S=.75*Math.min(n.bottom,s-t)-r,l=u-o,h=Math.round(S<0?-S:l>0?-l:0),_=Math.min(h,o-c),d=Math.abs(_)/.3;return{scrollAmount:_,scrollDuration:Math.min(400,Math.max(150,d)),scrollPadding:t,inputSafeY:4-(o-u)}})((null!==(s=e.closest("ion-item,[ion-item]"))&&void 0!==s?s:e).getBoundingClientRect(),n.getBoundingClientRect(),t,e.ownerDocument.defaultView.innerHeight)})(n,s||o,r);if(s&&Math.abs(i.scrollAmount)<4)t.focus();else if(D(n,t,!0,i.inputSafeY,c),t.focus(),(0,v.r)(()=>n.click()),typeof window<"u"){let u;const f=function(){var l=(0,w.Z)(function*(){void 0!==u&&clearTimeout(u),window.removeEventListener("ionKeyboardDidShow",S),window.removeEventListener("ionKeyboardDidShow",f),s&&(yield(0,L.c)(s,0,i.scrollAmount,i.scrollDuration)),D(n,t,!1,i.inputSafeY),t.focus()});return function(){return l.apply(this,arguments)}}(),S=()=>{window.removeEventListener("ionKeyboardDidShow",S),window.addEventListener("ionKeyboardDidShow",f)};if(s){const l=yield(0,L.g)(s);if(i.scrollAmount>l.scrollHeight-l.clientHeight-l.scrollTop)return"password"===t.type?(i.scrollAmount+=50,window.addEventListener("ionKeyboardDidShow",S)):window.addEventListener("ionKeyboardDidShow",f),void(u=setTimeout(f,1e3))}f()}});return function(t,s,o,r,c){return e.apply(this,arguments)}}(),C="$ionPaddingTimer",M=(e,n)=>{var t,s;if("INPUT"!==e.tagName||e.parentElement&&"ION-INPUT"===e.parentElement.tagName||"ION-SEARCHBAR"===(null===(s=null===(t=e.parentElement)||void 0===t?void 0:t.parentElement)||void 0===s?void 0:s.tagName))return;const o=(0,L.f)(e);if(null===o)return;const r=o[C];r&&clearTimeout(r),n>0?o.style.setProperty("--keyboard-offset",`${n}px`):o[C]=setTimeout(()=>{o.style.setProperty("--keyboard-offset","0px")},120)},E=(e,n)=>{const t=document,s="ios"===n,o="android"===n,r=e.getNumber("keyboardHeight",290),c=e.getBoolean("scrollAssist",!0),i=e.getBoolean("hideCaretOnScroll",s),u=e.getBoolean("inputBlurring",s),f=e.getBoolean("scrollPadding",!0),S=Array.from(t.querySelectorAll("ion-input, ion-textarea")),l=new WeakMap,h=new WeakMap,_=function(){var d=(0,w.Z)(function*(a){yield new Promise(y=>(0,v.c)(a,y));const T=a.shadowRoot||a,g=T.querySelector("input")||T.querySelector("textarea"),b=(0,L.f)(a),x=b?null:a.closest("ion-footer");if(g){if(b&&i&&!l.has(a)){const y=((e,n,t)=>{if(!t||!n)return()=>{};const s=i=>{P(n)&&D(e,n,i)},o=()=>D(e,n,!1),r=()=>s(!0),c=()=>s(!1);return(0,v.a)(t,"ionScrollStart",r),(0,v.a)(t,"ionScrollEnd",c),n.addEventListener("blur",o),()=>{(0,v.b)(t,"ionScrollStart",r),(0,v.b)(t,"ionScrollEnd",c),n.removeEventListener("blur",o)}})(a,g,b);l.set(a,y)}if("date"!==g.type&&"datetime-local"!==g.type&&(b||x)&&c&&!h.has(a)){const y=((e,n,t,s,o,r=!1)=>{let c;const i=f=>{c=(0,v.p)(f)},u=f=>{if(!c)return;const S=(0,v.p)(f);!((e,n,t)=>{if(n&&t){const s=n.x-t.x,o=n.y-t.y;return s*s+o*o>e*e}return!1})(6,c,S)&&!P(n)&&W(e,n,t,s,o,r)};return e.addEventListener("touchstart",i,{capture:!0,passive:!0}),e.addEventListener("touchend",u,!0),()=>{e.removeEventListener("touchstart",i,!0),e.removeEventListener("touchend",u,!0)}})(a,g,b,x,r,o);h.set(a,y)}}});return function(T){return d.apply(this,arguments)}}();u&&(()=>{let e=!0,n=!1;const t=document;(0,v.a)(t,"ionScrollStart",()=>{n=!0}),t.addEventListener("focusin",()=>{e=!0},!0),t.addEventListener("touchend",c=>{if(n)return void(n=!1);const i=t.activeElement;if(!i||i.matches(I))return;const u=c.target;u!==i&&(u.matches(I)||u.closest(I)||(e=!1,setTimeout(()=>{e||i.blur()},50)))},!1)})(),f&&(e=>{const n=document;n.addEventListener("focusin",o=>{M(o.target,e)}),n.addEventListener("focusout",o=>{M(o.target,0)})})(r);for(const d of S)_(d);t.addEventListener("ionInputDidLoad",d=>{_(d.detail)}),t.addEventListener("ionInputDidUnload",d=>{(d=>{if(i){const a=l.get(d);a&&a(),l.delete(d)}if(c){const a=h.get(d);a&&a(),h.delete(d)}})(d.detail)})}}}]);