"use strict";(self.webpackChunkfilter_ticket=self.webpackChunkfilter_ticket||[]).push([[755],{91755:function(e,t,a){a.r(t),a.d(t,{default:function(){return w}});var s=a(74165),i=a(15861),n=a(1413),r=a(70885),l=a(95048),c=a(72791),u=a(26290),o=a(49137),d=a(88201),h=a(55705),f=a(26968),m=a(86017),x=a(89504),p=a(11803),v=a(19585),g=a(14450),j=a(80184);var Z=function(e){var t=e.stateModal,a=e.getInfo,c=e.detail,u=e.titleAction,d=(0,o.qu)(),Z=(0,r.Z)(d,1)[0],b=(0,o.ed)(),w=(0,r.Z)(b,1)[0],N=(0,l.v9)(f.HF).data,S={shift:(null===c||void 0===c?void 0:c.shift)||"",mulai:(null===c||void 0===c?void 0:c.mulai)||"",selesai:(null===c||void 0===c?void 0:c.selesai)||""},P=(0,l.I0)(),y=function(){var e=(0,n.Z)((0,n.Z)({},t),{},{shift:(0,n.Z)((0,n.Z)({},t.shift),{},{showAddModalShift:!1,showUpdateModalShift:!1})});P((0,x.cf)(e))},k=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(t,a){var i;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i={shift:+t.shift,mulai:t.mulai,selesai:t.selesai,user_id:N.id_user};try{null===c?C(i,a):F(i)}catch(s){(0,p.Z)(s,!0)}case 2:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),F=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(t){var i;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w({id:c.id_shift,body:(0,n.Z)((0,n.Z)({},t),{},{id_shift:c.id_shift})}).unwrap();case 2:"success"===(i=e.sent).status||"Success"===i.status?((0,v.Z)(i),setTimeout((function(){a({status:"success"}),y()}),2e3)):(0,p.Z)(i,!0);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),C=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(t,i){var n;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Z({body:t}).unwrap();case 2:"success"===(n=e.sent).status||"Success"===n.status?((0,v.Z)(n),setTimeout((function(){i(),y(),a({status:"success"})}),2e3)):(0,p.Z)(n,!0);case 4:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),M=function(e){e(),y()};return(0,j.jsx)("div",{className:"fixed w-screen h-screen bg-opacity-80 bg-gray-700 top-0 left-0 bottom-0 right-0 z-50 flex justify-center",children:(0,j.jsxs)("div",{className:"modal-box h-fit max-h-fit  max-w-lg",children:[(0,j.jsx)(g.b_,{onClick:y}),(0,j.jsxs)("h3",{className:"text-lg font-bold",children:[null===c&&"create"===u?"Tambah Shift":"update"===u&&"Ubah Shift","read"===u&&"Detail Shift"]}),(0,j.jsx)("hr",{className:"my-2"}),(0,j.jsx)(h.J9,{enableReinitialize:!0,initialValues:S,validationSchema:m.rD,onSubmit:function(e,t){var a=t.resetForm;k(e,a)},children:function(e){var t=e.values,a=e.errors,s=e.touched,i=e.isValid,n=e.handleBlur,r=e.handleChange,l=e.resetForm;return(0,j.jsxs)(h.l0,{children:[(0,j.jsxs)("div",{className:"form-control",children:[(0,j.jsx)("label",{htmlFor:"shift",className:"label",children:(0,j.jsx)("span",{className:"label-text",children:" Shift:"})}),(0,j.jsx)(h.gN,{id:"shift",name:"shift",placeholder:"Nomor Shift",value:t.shift,disabled:"read"===u,onBlur:n,onChange:r,className:"input input-md input-bordered  max-w-full"}),a.shift&&s.shift&&(0,j.jsx)(g.aH,{errors:a.shift})]}),(0,j.jsxs)("div",{className:"form-control",children:[(0,j.jsx)("label",{htmlFor:"mulai",className:"label",children:(0,j.jsx)("span",{className:"label-text",children:" Mulai:"})}),(0,j.jsx)("input",{type:"time",name:"mulai",id:"mulai",disabled:"read"===u,value:t.mulai,onChange:r,onBlur:n,className:"input input-md input-bordered  max-w-full"}),a.mulai&&s.mulai&&(0,j.jsx)(g.aH,{errors:a.mulai})]}),(0,j.jsxs)("div",{className:"form-control",children:[(0,j.jsx)("label",{htmlFor:"selesai",className:"label",children:(0,j.jsx)("span",{className:"label-text",children:" Selesai:"})}),(0,j.jsx)("input",{type:"time",name:"selesai",id:"selesai",disabled:"read"===u,value:t.selesai,onChange:r,onBlur:n,className:"input input-md input-bordered  max-w-full"}),a.selesai&&s.selesai&&(0,j.jsx)(g.aH,{errors:a.selesai})]}),(0,j.jsx)("hr",{className:"my-2 mt-10"}),"read"!==u&&(0,j.jsxs)("div",{className:"modal-action justify-center",children:[(0,j.jsx)(g.zx,{type:"button",onClick:function(){return M(l)},children:"Batal"}),(0,j.jsx)(g.zx,{type:"submit",className:"btn-success",disabled:!i,children:"Simpan"})]}),"read"===u&&(0,j.jsx)("div",{className:"modal-action justify-center",children:(0,j.jsx)(g.zx,{type:"button",onClick:function(){return M(l)},children:"Batal"})})]})}})]})})},b=["No","Shift","Mulai","Selesai","Aksi"];var w=function(){var e,t,a,h=(0,l.I0)(),f=(0,c.useState)([]),m=(0,r.Z)(f,2),v=m[0],w=m[1],N=(0,o.wC)(),S=(0,r.Z)(N,2),P=S[0],y=S[1].isLoading,k=(0,c.useState)(null),F=(0,r.Z)(k,2),C=F[0],M=F[1],_=(0,c.useState)(""),z=(0,r.Z)(_,2),A=z[0],H=z[1],B=(0,c.useState)("update"),I=(0,r.Z)(B,2),T=I[0],D=I[1],U=(0,l.v9)(d.CE),E=(0,l.v9)(x.HH),R=function(e){var t;"add shift"===e?t=(0,n.Z)((0,n.Z)({},E),{},{shift:(0,n.Z)((0,n.Z)({},E.shift),{},{showAddModalShift:!0})}):"update shift"===e?t=(0,n.Z)((0,n.Z)({},E),{},{shift:(0,n.Z)((0,n.Z)({},E.shift),{},{showUpdateModalShift:!0})}):"delete shift"===e&&(t=(0,n.Z)((0,n.Z)({},E),{},{shift:(0,n.Z)((0,n.Z)({},E.shift),{},{showDeleteModalShift:!0})})),h((0,x.cf)(t)),window.scrollTo(0,0)},V=(0,c.useState)({currentPage:1,currentFilterPage:10,pageNumbers:[1],filterPage:[5,10,25,50,100]}),W=(0,r.Z)(V,2),q=W[0],J=W[1],L=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1?arguments[1]:void 0;J((0,n.Z)((0,n.Z)({},q),{},{currentPage:e,currentFilterPage:q.currentFilterPage}));var a,s=e*q.currentFilterPage,i=s-q.currentFilterPage;a=void 0===t?null===U||void 0===U?void 0:U.data.slice(i,s):t.slice(i,s),w(a)},Y=function(e){for(var t=[],a=1;a<=Math.ceil(e.length/q.currentFilterPage);a++)t.push(a);J((0,n.Z)((0,n.Z)({},q),{},{pageNumbers:t}))},G=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(){var t;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,P().unwrap();case 3:"success"===(t=e.sent).status||"Success"===t.status?(h((0,d.Wp)((0,n.Z)({},t))),w(t.data),L(1,t.data),Y(t.data)):(w([]),(0,p.Z)(t,!0)),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),w([]),(0,p.Z)(e.t0,!0);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),K=function(e){"success"===e.status&&G()};return(0,c.useEffect)((function(){h((0,u.oi)([{path:"/shift",title:"Pengaturan Shift"}])),G()}),[]),(0,j.jsxs)("div",{children:[(0,j.jsx)("div",{children:(0,j.jsx)(g.zx,{type:"button",onClick:function(){return M(null),D("create"),void R("add shift")},children:"Tambah"})}),!y&&(0,j.jsx)("div",{className:"gap-5 mt-5 flex flex-col md:flex md:flex-row",children:(0,j.jsx)(g.ol,{search:A,onHandleSearch:function(e){if(H(e.target.value),e.target.value.length>0){var t=new RegExp(A,"ig"),a=U.data.filter((function(e){return e.mulai.match(t)||e.selesai.match(t)}));w(a),J({currentPage:1,currentFilterPage:100,pageNumbers:[1],filterPage:[5,10,25,50,100]})}else w(U.data),J({currentPage:1,currentFilterPage:100,pageNumbers:[1],filterPage:[5,10,25,50,100]})},placeholder:"Cari data shift..."})}),(0,j.jsxs)(g.u_,{children:[(null===E||void 0===E||null===(e=E.shift)||void 0===e?void 0:e.showAddModalShift)&&(0,j.jsx)(Z,{stateModal:E,getInfo:K,detail:C,titleAction:T}),(null===E||void 0===E||null===(t=E.shift)||void 0===t?void 0:t.showUpdateModalShift)&&(0,j.jsx)(Z,{stateModal:E,getInfo:K,detail:C,titleAction:T}),(null===E||void 0===E||null===(a=E.shift)||void 0===a?void 0:a.showDeleteModalShift)&&(0,j.jsx)(g.pf,{stateModal:E,getInfo:K,detail:C,title:"Shift"})]}),y&&(0,j.jsx)(g.cY,{countRows:8,countColumns:10,totalFilter:1}),!y&&(0,j.jsx)("div",{className:"overflow-x-auto mt-8",children:(0,j.jsxs)("table",{className:"table table-zebra w-full",children:[(0,j.jsx)("thead",{children:(0,j.jsx)("tr",{children:b.map((function(e,t){return(0,j.jsx)("th",{className:"text-center",children:e},t)}))})}),(0,j.jsx)("tbody",{children:v.map((function(e,t){return(0,j.jsxs)("tr",{className:"text-center",children:[(0,j.jsx)("td",{children:t+1}),(0,j.jsx)("td",{children:e.shift}),(0,j.jsx)("td",{children:e.mulai}),(0,j.jsx)("td",{children:e.selesai}),(0,j.jsx)("td",{children:(0,j.jsxs)("div",{className:"flex flex-row gap-3 justify-center",children:[(0,j.jsx)(g.W,{onClick:function(){return function(e){M(e),D("update"),R("update shift")}(e)}}),(0,j.jsx)(g.Zt,{onClick:function(){return function(e){M(e),R("delete shift")}(e)}})]})})]},t)}))})]})}),!y&&(0,j.jsx)(g.tl,{serverMode:!1,currentFilterPage:q.currentFilterPage,perPage:q.filterPage,currentPage:q.currentPage,countPage:q.pageNumbers,onClick:function(e){return L(e.target.id,void 0)},handlePerPage:function(e){return function(e){var t=q.currentPage*e,a=t-e,s=null===U||void 0===U?void 0:U.data.slice(a,t);w(s);for(var i=[],r=1;r<=Math.ceil(U.data.length/e);r++)i.push(r);J((0,n.Z)((0,n.Z)({},q),{},{pageNumbers:i,currentFilterPage:e}))}(e.target.value)}})]})}}}]);
//# sourceMappingURL=755.d605b696.chunk.js.map