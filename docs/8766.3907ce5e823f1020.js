"use strict";(self.webpackChunkasistente_virtual_angular=self.webpackChunkasistente_virtual_angular||[]).push([[8766],{8766:(W,h,E)=>{E.r(h),E.d(h,{startTapClick:()=>I});var d=E(5730);const I=s=>{let e,p,i,o=10*-v,r=0;const U=s.getBoolean("animated",!0)&&s.getBoolean("rippleEffect",!0),f=new WeakMap,L=t=>{o=(0,d.u)(t),R(t)},A=()=>{i&&clearTimeout(i),i=void 0,e&&(b(!1),e=void 0)},D=t=>{e||w(k(t),t)},R=t=>{w(void 0,t)},w=(t,n)=>{if(t&&t===e)return;i&&clearTimeout(i),i=void 0;const{x:u,y:c}=(0,d.p)(n);if(e){if(f.has(e))throw new Error("internal error");e.classList.contains(l)||g(e,u,c),b(!0)}if(t){const S=f.get(t);S&&(clearTimeout(S),f.delete(t)),t.classList.remove(l);const _=()=>{g(t,u,c),i=void 0};m(t)?_():i=setTimeout(_,P)}e=t},g=(t,n,u)=>{if(r=Date.now(),t.classList.add(l),!U)return;const c=M(t);null!==c&&(C(),p=c.addRipple(n,u))},C=()=>{void 0!==p&&(p.then(t=>t()),p=void 0)},b=t=>{C();const n=e;if(!n)return;const u=T-Date.now()+r;if(t&&u>0&&!m(n)){const c=setTimeout(()=>{n.classList.remove(l),f.delete(n)},T);f.set(n,c)}else n.classList.remove(l)},a=document;a.addEventListener("ionGestureCaptured",A),a.addEventListener("touchstart",t=>{o=(0,d.u)(t),D(t)},!0),a.addEventListener("touchcancel",L,!0),a.addEventListener("touchend",L,!0),a.addEventListener("pointercancel",A,!0),a.addEventListener("mousedown",t=>{if(2===t.button)return;const n=(0,d.u)(t)-v;o<n&&D(t)},!0),a.addEventListener("mouseup",t=>{const n=(0,d.u)(t)-v;o<n&&R(t)},!0)},k=s=>{if(void 0===s.composedPath)return s.target.closest(".ion-activatable");{const o=s.composedPath();for(let r=0;r<o.length-2;r++){const e=o[r];if(!(e instanceof ShadowRoot)&&e.classList.contains("ion-activatable"))return e}}},m=s=>s.classList.contains("ion-activatable-instant"),M=s=>{if(s.shadowRoot){const o=s.shadowRoot.querySelector("ion-ripple-effect");if(o)return o}return s.querySelector("ion-ripple-effect")},l="ion-activated",P=200,T=200,v=2500}}]);