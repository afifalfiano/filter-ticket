"use strict";(self.webpackChunkfilter_ticket=self.webpackChunkfilter_ticket||[]).push([[502],{19502:function(e,a,l){l.r(a),l.d(a,{default:function(){return j}});var n=l(74165),r=l(15861),s=l(1413),t=l(70885),i=l(72791),o=l(95048),u=l(55705),d=l(26968),c="ComplainModalForm_modal-box-custom__XYJEH",p=l(64671),m=l(41240),h=l(37034),x=l(86017),b=l(89504),g=l(87416),v=l(11803),_=l(19585),f=l(14450),N=l(80184);var j=function(e){var a=e.stateModal,l=e.getInfo,j=e.detail,k=(0,p.fE)(),w=(0,t.Z)(k,1)[0],Z=(0,p.tx)(),y=(0,t.Z)(Z,1)[0],E=(0,o.v9)(d.HF).data,S=(0,o.v9)(m.Yq),P=(0,i.useState)([]),C=(0,t.Z)(P,2),F=C[0],K=C[1],R=(0,i.useState)([{label:"REGISTERED",value:"REGISTERED"},{label:"UNREGISTERED",value:"UNREGISTERED"}]),T=(0,t.Z)(R,1)[0],I=(0,o.I0)(),B=(0,o.v9)(h.Ed),D=(0,p.zo)(),G=(0,t.Z)(D,1)[0],O=(0,g.b0)(),U=(0,t.Z)(O,1)[0],z=(0,g.Wb)(),M=(0,t.Z)(z,1)[0],V={kategori_pelanggan:(null===j||void 0===j?void 0:j.kategori_pelanggan)||"",id_pelanggan:(null===j||void 0===j?void 0:j.id_pelanggan)||"",nama_pelanggan:(null===j||void 0===j?void 0:j.nama_pelanggan)||"",nama_pelapor:(null===j||void 0===j?void 0:j.nama_pelapor)||"",nomor_pelapor:(null===j||void 0===j?void 0:j.nomor_pelapor)||"",nomor_keluhan:(null===j||void 0===j?void 0:j.nomor_keluhan)||"",sumber:(null===j||void 0===j?void 0:j.sumber_id)||"",detail_sumber:(null===j||void 0===j?void 0:j.detail_sumber)||"",keluhan:(null===j||void 0===j?void 0:j.keluhan)||"",status:(null===j||void 0===j?void 0:j.status)||"",pop_id:(null===j||void 0===j?void 0:j.pop_id)||""},A=function(){var e=(0,s.Z)((0,s.Z)({},a),{},{dashboard:(0,s.Z)((0,s.Z)({},a.dashboard),{},{showAddModalComplain:!1,showUpdateModalComplain:!1})});I((0,b.cf)(e))},H=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(a){var l,r;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,l={notifikasi_id:a},e.next=4,M({body:l}).unwrap();case 4:return r=e.sent,e.abrupt("return",r);case 8:e.prev=8,e.t0=e.catch(0),(0,v.Z)(e.t0,!0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(a){return e.apply(this,arguments)}}(),J=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(a){var l,r;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,l={keluhan_id:a,pop_id:E.pop_id,id_response:0},e.next=4,U({body:l}).unwrap();case 4:return r=e.sent,e.abrupt("return",r);case 8:e.prev=8,e.t0=e.catch(0),(0,v.Z)(e.t0,!0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(a){return e.apply(this,arguments)}}(),Y=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(a){var l,r,s;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l={string:a.keluhan},e.next=3,fetch("https://tediyanwibowo.pythonanywhere.com/model",{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});case 3:return r=e.sent,e.next=6,r.json();case 6:return s=e.sent,e.abrupt("return",s);case 8:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),q=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(a,l){var r,s;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,null!==j){e.next=8;break}return e.next=4,Y(a);case 4:(r=e.sent).hasOwnProperty("sentiment")&&(s={kategori_pelanggan:a.kategori_pelanggan,id_pelanggan:a.id_pelanggan,nama_pelanggan:a.nama_pelanggan,nama_pelapor:a.nama_pelapor,nomor_pelapor:a.nomor_pelapor,sumber_id:a.sumber,detail_sumber:a.detail_sumber,keluhan:a.keluhan,status:"open",pop_id:a.pop_id,user_id:E.id_user,sentimen_analisis:r.sentiment,lampiran:""},W(s,l)),e.next=9;break;case 8:X(a);case 9:e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),(0,v.Z)(e.t0,!0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(a,l){return e.apply(this,arguments)}}(),W=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(a,r){var t,i,o,u,d,c,p,m,h;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w((0,s.Z)({},a));case 2:if("success"!==(t=e.sent).data.status&&"Success"!==t.data.status){e.next=24;break}if((0,_.Z)(t),!(F.length>0)){e.next=11;break}for((d=new FormData).append("keluhan_id",null===t||void 0===t||null===(o=t.data)||void 0===o||null===(u=o.id_keluhan)||void 0===u?void 0:u.id_keluhan),c=0;c<F.length;c++)d.append("path[".concat(c,"]"),F[c]);return e.next=11,G({body:d}).unwrap();case 11:return e.next=13,J(null===t||void 0===t||null===(i=t.data)||void 0===i?void 0:i.id_keluhan);case 13:if("Success"!==(null===(p=e.sent)||void 0===p?void 0:p.status)&&"success"!==(null===p||void 0===p?void 0:p.status)){e.next=21;break}return e.next=17,H(null===p||void 0===p||null===(m=p.notifikasi)||void 0===m?void 0:m.id_notifikasi);case 17:"Success"===(null===(h=e.sent)||void 0===h?void 0:h.status)||"success"===(null===h||void 0===h?void 0:h.status)?setTimeout((function(){r(),A(),l({status:"success"})}),2e3):(0,v.Z)(h,!0),e.next=22;break;case 21:(0,v.Z)(p,!0);case 22:e.next=25;break;case 24:(0,v.Z)(t,!0);case 25:case"end":return e.stop()}}),e)})));return function(a,l){return e.apply(this,arguments)}}(),X=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(a){var r,t;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={nama_pelapor:a.nama_pelapor,nomor_pelapor:a.nomor_pelapor,sumber_id:a.sumber,detail_sumber:a.detail_sumber,keluhan:a.keluhan,pop_id:a.pop_id},e.next=3,y({id:j.id_keluhan,body:(0,s.Z)({},r)});case 3:"success"===(t=e.sent).data.status||"Success"===t.data.status?((0,_.Z)(t),setTimeout((function(){l({status:"success"}),A()}),2e3)):(0,v.Z)(t,!0);case 5:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),L=function(e){K(e)};return(0,N.jsx)("div",{className:"fixed w-screen h-screen bg-opacity-80 bg-gray-700 top-0 left-0 bottom-0 right-0 z-50 flex justify-center",children:(0,N.jsxs)("div",{className:"modal-box h-fit max-h-fit ".concat(c),children:[(0,N.jsx)(f.b_,{onClick:A}),(0,N.jsx)("h3",{className:"text-lg font-bold",children:null===j?"Tambah Keluhan":"Ubah Keluhan"}),(0,N.jsx)("hr",{className:"my-2"}),(0,N.jsx)(u.J9,{enableReinitialize:!0,validationSchema:x.oY,initialValues:V,onSubmit:function(e,a){var l=a.resetForm;q(e,l)},children:function(e){var a=e.values,l=e.errors,n=e.isValid,r=e.touched,s=e.handleChange,t=e.handleBlur,i=e.setFieldValue;return(0,N.jsxs)(u.l0,{children:[(0,N.jsxs)("div",{className:"flex flex-col md:flex-row gap-3",children:[(0,N.jsxs)("div",{className:"form-control flex-1",children:[(0,N.jsx)("label",{htmlFor:"pop_id",className:"label",children:(0,N.jsx)("span",{className:"label-text",children:" POP (Area Operasional)"})}),(0,N.jsxs)(u.gN,{component:"select",id:"pop_id",name:"pop_id",value:a.pop_id,onBlur:t,onChange:s,className:"select w-full max-w-full input-bordered",children:[(0,N.jsx)("option",{value:"",label:"Pilih POP",children:"Pilih POP"}),S.data.map((function(e,a){return(0,N.jsx)("option",{value:e.id_pop,label:e.pop,children:e.pop},a)}))]}),l.pop_id&&r.pop_id?(0,N.jsx)("div",{className:"label label-text text-red-500",children:l.pop_id}):null]}),(0,N.jsxs)("div",{className:"form-control flex-1",children:[(0,N.jsx)("label",{htmlFor:"id_pelanggan",className:"label",children:(0,N.jsx)("span",{className:"label-text",children:" Kategori Pelanggan"})}),(0,N.jsxs)(u.gN,{component:"select",id:"kategori_pelanggan",name:"kategori_pelanggan",value:a.kategori_pelanggan,onBlur:t,disabled:null!==j||null,onChange:function(e){return(l=i)("kategori_pelanggan",(a=e).target.value),void("UNREGISTERED"===a.target.value?l("id_pelanggan","UNREGISTERED"):l("id_pelanggan",""));var a,l},className:"select w-full max-w-full input-bordered",children:[(0,N.jsx)("option",{value:"",label:"Pilih Kategori Pelanggan",children:"Pilih Kategori Pelanggan"}),T.map((function(e,a){return(0,N.jsx)("option",{value:e.value,label:e.label,children:e.label},a)}))]}),l.kategori_pelanggan&&r.kategori_pelanggan?(0,N.jsx)("div",{className:"label label-text text-red-500",children:l.kategori_pelanggan}):null]})]}),(0,N.jsxs)("div",{className:"flex flex-col md:flex-row  gap-3",children:[(0,N.jsxs)("div",{className:"form-control flex-1",children:[(0,N.jsx)("label",{htmlFor:"id_pelanggan",className:"label",children:(0,N.jsx)("span",{className:"label-text",children:" ID Pelanggan"})}),(0,N.jsx)(u.gN,{id:"id_pelanggan",name:"id_pelanggan",placeholder:"ID Pelanggan",value:a.id_pelanggan,onBlur:t,onChange:s,className:"input input-md input-bordered  max-w-full",disabled:null!==j||null||"UNREGISTERED"===a.id_pelanggan}),l.id_pelanggan&&r.id_pelanggan?(0,N.jsx)("div",{className:"label label-text text-red-500",children:l.id_pelanggan}):null]}),(0,N.jsxs)("div",{className:"form-control flex-1",children:[(0,N.jsx)("label",{htmlFor:"nama_pelanggan",className:"label",children:(0,N.jsx)("span",{className:"label-text",children:" Nama Pelanggan"})}),(0,N.jsx)(u.gN,{id:"nama_pelanggan",name:"nama_pelanggan",placeholder:"Nama Pelanggan",value:a.nama_pelanggan,onBlur:t,onChange:s,className:"input input-md input-bordered  max-w-full",disabled:null!==j||null}),l.nama_pelanggan&&r.nama_pelanggan?(0,N.jsx)("div",{className:"label label-text text-red-500",children:l.nama_pelanggan}):null]})]}),(0,N.jsxs)("div",{className:"flex flex-col md:flex-row  gap-3",children:[(0,N.jsxs)("div",{className:"form-control flex-1",children:[(0,N.jsx)("label",{htmlFor:"sumber",className:"label",children:(0,N.jsx)("span",{className:"label-text",children:" Sumber Keluhan"})}),(0,N.jsxs)(u.gN,{component:"select",id:"sumber",name:"sumber",value:a.sumber,onBlur:t,onChange:s,className:"select w-full max-w-full input-bordered",children:[(0,N.jsx)("option",{value:"",label:"Pilih Sumber",children:"Pilih Sumber"}),B.data.map((function(e,a){return(0,N.jsx)("option",{value:e.id_sumber,label:e.sumber,children:e.sumber},a)}))]}),l.sumber&&r.sumber?(0,N.jsx)("div",{className:"label label-text text-red-500",children:l.sumber}):null]}),(0,N.jsxs)("div",{className:"form-control flex-1",children:[(0,N.jsx)("label",{htmlFor:"detail_sumber",className:"label",children:(0,N.jsx)("span",{className:"label-text",children:" Kontak Sumber Keluhan"})}),(0,N.jsx)(u.gN,{id:"detail_sumber",name:"detail_sumber",placeholder:"Kontak Sumber Keluhan",value:a.detail_sumber,onBlur:t,onChange:s,className:"input input-md input-bordered  max-w-full"}),l.detail_sumber&&r.detail_sumber?(0,N.jsx)("div",{className:"label label-text text-red-500",children:l.detail_sumber}):null]})]}),(0,N.jsxs)("div",{className:"flex flex-col md:flex-row  gap-3",children:[(0,N.jsxs)("div",{className:"form-control flex-1",children:[(0,N.jsx)("label",{htmlFor:"nama_pelapor",className:"label",children:(0,N.jsx)("span",{className:"label-text",children:" Nama Kontak"})}),(0,N.jsx)(u.gN,{id:"nama_pelapor",name:"nama_pelapor",placeholder:"Nama Kontak",value:a.nama_pelapor,onBlur:t,onChange:s,className:"input input-md input-bordered  max-w-full"}),l.nama_pelapor&&r.nama_pelapor?(0,N.jsx)("div",{className:"label label-text text-red-500",children:l.nama_pelapor}):null]}),(0,N.jsxs)("div",{className:"form-control flex-1",children:[(0,N.jsx)("label",{htmlFor:"nomor_pelapor",className:"label",children:(0,N.jsx)("span",{className:"label-text",children:" Nomor Kontak"})}),(0,N.jsx)(u.gN,{id:"nomor_pelapor",name:"nomor_pelapor",placeholder:"Nomor Kontak",value:a.nomor_pelapor,onBlur:t,onChange:s,className:"input input-md input-bordered  max-w-full"}),l.nomor_pelapor&&r.nomor_pelapor?(0,N.jsx)("div",{className:"label label-text text-red-500",children:l.nomor_pelapor}):null]})]}),(0,N.jsxs)("div",{className:"form-control mt-2",children:[(0,N.jsx)("label",{htmlFor:"keluhan",className:"label",children:(0,N.jsx)("span",{className:"label-text",children:" Keluhan Awal:"})}),(0,N.jsx)(f.H4,{setFieldValue:function(e){return i("keluhan",e)},value:a.keluhan,disabled:null!==j}),l.keluhan&&r.keluhan?(0,N.jsx)("div",{className:"label label-text text-red-500",children:l.keluhan}):null]}),!j&&(0,N.jsx)("div",{className:"",children:(0,N.jsx)(f.G1,{getFile:L})}),(0,N.jsx)("hr",{className:"my-2 mt-5"}),(0,N.jsxs)("div",{className:"modal-action justify-center",children:[(0,N.jsx)(f.zx,{type:"button",onClick:function(){return A()},children:"Batal"}),(0,N.jsx)(f.zx,{type:"submit",disabled:!n,className:"btn-success",children:"Simpan"})]})]})}})]})})}}}]);
//# sourceMappingURL=502.d2c7d125.chunk.js.map