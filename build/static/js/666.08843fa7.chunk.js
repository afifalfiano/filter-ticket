"use strict";(self.webpackChunkfilter_ticket=self.webpackChunkfilter_ticket||[]).push([[666],{36666:function(t,e,n){n.r(e);var a=n(74165),r=n(15861),i=n(1413),o=n(70885),l=n(72791),s=n(16871),u=n(95048),d=n(98935),c=n(33171),f=n(76899),h=n(41240),p=n(26968),v=n(89504),x=n(26290),m=n(11803),g=n(14450),_=n(24455),j=n(80184),b=(0,_.ZP)((function(){return n.e(170).then(n.bind(n,21216))}));e.default=function(){var t,e=(0,l.useState)(["No","POP","Pelanggan","Kontak","Keluhan","Progress","Waktu","Status","Aksi"]),n=(0,o.Z)(e,2),_=n[0],y=n[1],k=(0,l.useState)(1),Z=(0,o.Z)(k,2),w=Z[0],S=Z[1],C=(0,l.useState)([5]),P=(0,o.Z)(C,2),N=P[0],H=P[1],M=(0,l.useState)([1]),R=(0,o.Z)(M,2),A=R[0],E=R[1],I=(0,l.useState)("all"),T=(0,o.Z)(I,2),K=(T[0],T[1]),L=(0,l.useState)([]),O=(0,o.Z)(L,2),q=O[0],B=O[1],F=(0,l.useState)(""),W=(0,o.Z)(F,2),Y=W[0],D=W[1],G=(0,s.s0)(),U=(0,l.useState)([]),z=(0,o.Z)(U,2),Q=z[0],X=z[1],J=(0,u.I0)(),V=(0,d.Sf)(),$=(0,o.Z)(V,2),tt=$[0],et=$[1].isLoading,nt=(0,l.useState)(null),at=(0,o.Z)(nt,2),rt=at[0],it=at[1],ot=(0,u.v9)(v.HH),lt=(0,u.v9)(p.HF).data,st=function(){var t=(0,r.Z)((0,a.Z)().mark((function t(){var e,n,r,o,l,s,u,d=arguments;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=d.length>0&&void 0!==d[0]?d[0]:1,n="?page=".concat(e),t.prev=2,t.next=5,tt(n).unwrap();case 5:if("success"===(r=t.sent).status||"Success"===r.status)if(2===(null===lt||void 0===lt?void 0:lt.role_id))l=r.data.data.filter((function(t){if(t.pop_id===lt.pop_id)return t})),o=l,J((0,c.bn)({data:o})),X(o);else{for(J((0,c.bn)((0,i.Z)({},r.data))),X(r.data.data),S(r.data.current_page),H([r.data.per_page]),s=[],u=0;u<r.data.last_page;u++)s.push(u+1);E(s)}else X([]),(0,m.Z)(r,!0);t.next=13;break;case 9:t.prev=9,t.t0=t.catch(2),X([]),(0,m.Z)(t.t0,!0);case 13:case"end":return t.stop()}}),t,null,[[2,9]])})));return function(){return t.apply(this,arguments)}}(),ut=(0,u.v9)(c.EY),dt=(0,f.HY)(),ct=(0,o.Z)(dt,1)[0],ft=function(){var t=(0,r.Z)((0,a.Z)().mark((function t(){var e,n,r;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,ct().unwrap();case 3:"success"===(e=t.sent).status||"Success"===e.status?(2===(null===lt||void 0===lt?void 0:lt.role_id)?(r=e.data.filter((function(t){if(t.id_pop===lt.pop_id)return t})),n=r):n=e.data,J((0,h.pk)({data:n})),B(n)):(0,m.Z)(e,!0),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),(0,m.Z)(t.t0,!0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(){return t.apply(this,arguments)}}();(0,l.useEffect)((function(){J((0,x.oi)([{path:"/history_dashboard",title:"Riwayat Dasbor"}])),ft(),st(),0===(null===lt||void 0===lt?void 0:lt.role_id)&&y(["No","POP","Pelanggan","Kontak","Keluhan","Progress","Waktu","Status","Sentimen","Aksi"])}),[]);var ht=function(t){it(t),function(){var t=(0,i.Z)((0,i.Z)({},ot),{},{history_dashboard:(0,i.Z)((0,i.Z)({},ot.history_dashboard),{},{showRevertModalHistoryComplain:!0})});J((0,v.cf)(t)),window.scrollTo(0,0)}()};return(0,j.jsxs)("div",{children:[(0,j.jsx)(g.u_,{children:(null===ot||void 0===ot||null===(t=ot.history_dashboard)||void 0===t?void 0:t.showRevertModalHistoryComplain)&&(0,j.jsx)(b,{stateModal:ot,getInfo:function(t){"success"===t.status&&st()},detail:rt})}),!et&&(0,j.jsxs)("div",{className:"gap-5 mt-5 flex flex-col md:flex md:flex-row",children:[(0,j.jsx)("div",{className:"form-control w-full md:w-52",children:(0,j.jsx)(g.Co,{dataPOP:q,handlePOP:function(){return function(t){K(t.target.value);var e=ut.data.filter((function(e){if(+e.pop_id===+t.target.value)return e}));"all"===t.target.value?X(ut.data):X(e)}()}})}),(0,j.jsx)(g.ol,{search:Y,onHandleSearch:function(t){if(t.preventDefault(),D(t.target.value),t.target.value.length>0){var e=new RegExp(Y,"ig"),n=Q.filter((function(t){return t.id_pelanggan.match(e)||t.nama_pelanggan.match(e)||t.nama_pelapor.match(e)||t.nomor_pelapor.match(e)}));X(n)}else X(ut.data)},placeholder:"Cari data riwayat keluhan..."})]}),et&&(0,j.jsx)(g.cY,{countRows:8,countColumns:10,totalFilter:2}),!et&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)("div",{className:"overflow-x-auto mt-8",children:(0,j.jsxs)("table",{className:"table table-zebra w-full",children:[(0,j.jsx)("thead",{children:(0,j.jsx)("tr",{children:_.map((function(t,e){return(0,j.jsx)("th",{className:"text-center",children:t},e)}))})}),(0,j.jsx)("tbody",{children:Q.map((function(t,e){var n;return(0,j.jsxs)("tr",{className:"text-center",children:[(0,j.jsx)("th",{children:e+1}),(0,j.jsx)("td",{className:"text-left",children:(0,j.jsx)(g.Xv,{status:null===t||void 0===t||null===(n=t.pop)||void 0===n?void 0:n.pop})}),(0,j.jsxs)("td",{className:"text-left",children:[null===t||void 0===t?void 0:t.id_pelanggan," - ",null===t||void 0===t?void 0:t.nama_pelanggan]}),(0,j.jsxs)("td",{className:"text-left",children:[null===t||void 0===t?void 0:t.nama_pelapor," - ",null===t||void 0===t?void 0:t.nomor_pelapor]}),(0,j.jsx)("td",{className:"text-left",children:(0,j.jsx)("div",{dangerouslySetInnerHTML:{__html:null===t||void 0===t?void 0:t.keluhan}})}),(0,j.jsx)("td",{children:(0,j.jsx)("div",{dangerouslySetInnerHTML:{__html:(null===t||void 0===t?void 0:t.balasan.length)>0?null===t||void 0===t?void 0:t.balasan[t.balasan.length-1].balasan.slice(0,100):"Belum ada tindakan"},className:"".concat(0===(null===t||void 0===t?void 0:t.balasan.length)?"text-center font-semibold badge bg-red-500 border-0 text-white":"")})}),(0,j.jsx)("td",{className:"text-left",children:(0,j.jsx)(g.AW,{item:t})}),(0,j.jsx)("td",{children:(0,j.jsx)("span",{className:"badge badge-info text-white",children:t.status})}),0===(null===lt||void 0===lt?void 0:lt.role_id)&&(0,j.jsx)("td",{children:(null===t||void 0===t?void 0:t.sentimen_analisis)||"-"}),(0,j.jsx)("td",{children:(0,j.jsxs)("div",{className:"flex flex-row gap-3 justify-center",children:[(0,j.jsx)(g.tA,{onClick:function(){return ht(t)}}),(0,j.jsx)(g.CQ,{onClick:function(){return function(t){G("/history_dashboard/detail/".concat(t.id_keluhan))}(t)}}),null!==t.rfo_keluhan_id&&(0,j.jsx)(g.uS,{onClick:function(){return function(t){G("/history_dashboard/rfo_single/".concat(t.id_keluhan,"?id_rfo=").concat(t.rfo_keluhan_id))}(t)}}),null!==t.rfo_gangguan_id&&(0,j.jsx)(g.Lr,{onClick:function(){return function(t){it(t),G("/history_dashboard/rfo_masal/".concat(t.rfo_gangguan_id))}(t)}})]})})]},e)}))})]})}),!et&&(0,j.jsx)(g.tl,{perPage:N,currentPage:w,countPage:A,onClick:function(t){return st(t.target.id)},serverMode:!0})]})]})}},98935:function(t,e,n){n.d(e,{Sf:function(){return r},UA:function(){return i}});var a=n(12733).g.injectEndpoints({endpoints:function(t){return{allComplainHistory:t.mutation({query:function(t){return{url:"/history".concat(t),method:"GET"}}}),complainHistoryById:t.mutation({query:function(t){return{url:"/history/".concat(t),method:"GET"}}}),complainHistoryReopen:t.mutation({query:function(t){return{url:"/open/".concat(t),method:"PUT"}}})}}}),r=a.useAllComplainHistoryMutation,i=(a.useComplainHistoryByIdMutation,a.useComplainHistoryReopenMutation)}}]);
//# sourceMappingURL=666.08843fa7.chunk.js.map