"use strict";(self.webpackChunkfilter_ticket=self.webpackChunkfilter_ticket||[]).push([[35],{38035:function(e,l,n){n.r(l),n.d(l,{default:function(){return Z}});var a=n(1413),s=n(42982),r=n(74165),t=n(15861),i=n(70885),c=n(35125),o=n(72791),d=n(95048),u=n(49128),p=n(16871),h=n(26290),x=n(52886),m=n(76899),f=n(26968),v=n(17710),j=n(41240),g=n(11803),b=n(19585),N=n(80184);var w=function(e){var l,n,a,s,r,t,i,c=Object.assign({},e);return(0,N.jsxs)("div",{id:"preview-report",className:"w-full max-w-screen-xl m-0 p-9",style:{width:"1440px !important",height:"4500px !important"},children:[(0,N.jsx)("h1",{className:"text-center font-bold text-2xl mt-0 pt-0",children:"Daily Complaint Report Helpdesk"}),(0,N.jsxs)("div",{className:"flex justify-between align-middle items-center mt-5",children:[(0,N.jsx)("div",{className:"flex-1",children:(0,N.jsxs)("div",{className:"flex gap-5",children:[(0,N.jsxs)("div",{children:[(0,N.jsx)("p",{children:"Tanggal"}),(0,N.jsx)("p",{children:"Sesi"}),(0,N.jsx)("p",{children:"POP"}),(0,N.jsx)("p",{children:"Helpdesk"}),(0,N.jsx)("p",{children:"NOC"})]}),(0,N.jsxs)("div",{children:[(0,N.jsx)("p",{children:(new Date).toLocaleDateString("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}),(0,N.jsx)("div",{className:"",children:null===(l=c.allShiftLocal)||void 0===l?void 0:l.map((function(e,l){if(e.id_shift===+c.bodyKeluhan.shift)return(0,N.jsx)("span",{children:"".concat(e.shift," (").concat(e.mulai,")-(").concat(e.selesai,")")},l)}))}),(0,N.jsx)("p",{children:c.allPOPLocal.find((function(e){return e.id_pop===+c.bodyKeluhan.pop_id})).pop}),(0,N.jsx)("p",{children:c.getAllHelpdesk()}),(0,N.jsx)("p",{children:c.getAllNOC()})]})]})}),(0,N.jsx)("div",{className:"flex-1",children:(0,N.jsx)("div",{className:"flex flex-col items-end",children:(0,N.jsx)("img",{fetchpriority:"high",src:"/report_logo.png",alt:"Repor",width:157,className:"image-full mt-4"})})})]}),(0,N.jsx)("div",{className:"text-center rounded-xl bg-gray-300 p-2 font-bold mt-5",children:(0,N.jsx)("h2",{children:"Keluhan Open"})}),(0,N.jsx)("div",{className:"flex mt-5 border-gray-300 rounded-lg flex-wrap",children:null===(n=c.keluhanLaporanLocal)||void 0===n?void 0:n.keluhan_open.map((function(e,l){var n;return(0,N.jsx)("div",{className:"flex p-2 border border-gray-300 w-1/2 ".concat(l%2===0?"rounded-l-lg":"rounded-r-lg"),children:(0,N.jsxs)("div",{className:"flex gap-5 w-full",children:[(0,N.jsxs)("div",{className:"flex-1",children:[(0,N.jsx)("p",{children:"Nomor"}),(0,N.jsx)("p",{children:"Nomor Keluhan"}),(0,N.jsx)("p",{children:"ID Pelanggan"}),(0,N.jsx)("p",{children:"Nama Pelanggan"}),(0,N.jsx)("p",{children:"Sumber Keluhan"}),(0,N.jsx)("p",{children:"Detail Sumber"})]}),(0,N.jsxs)("div",{className:"flex-1",children:[(0,N.jsx)("p",{children:l+1}),(0,N.jsxs)("p",{children:["#",null===e||void 0===e?void 0:e.nomor_keluhan]}),(0,N.jsx)("p",{children:null===e||void 0===e?void 0:e.id_pelanggan}),(0,N.jsx)("p",{children:null===e||void 0===e?void 0:e.nama_pelanggan}),(0,N.jsx)("p",{children:null===e||void 0===e||null===(n=e.sumber)||void 0===n?void 0:n.sumber}),(0,N.jsx)("p",{children:null===e||void 0===e?void 0:e.detail_sumber})]})]})},l)}))}),(0,N.jsx)("div",{className:"text-center rounded-xl bg-gray-300 p-2 font-bold mt-5",children:(0,N.jsx)("h2",{children:"Keluhan Closed"})}),(0,N.jsx)("div",{className:"flex mt-5 border-gray-300 rounded-lg flex-wrap",children:null===(a=c.keluhanLaporanLocal)||void 0===a?void 0:a.keluhan_close.map((function(e,l){var n;return(0,N.jsx)("div",{className:"flex p-2 border border-gray-300 w-1/2 ".concat(l%2===0?"rounded-l-lg":"rounded-r-lg"),children:(0,N.jsxs)("div",{className:"flex gap-5 w-full",children:[(0,N.jsxs)("div",{className:"flex-1",children:[(0,N.jsx)("p",{children:"Nomor"}),(0,N.jsx)("p",{children:"Nomor Keluhan"}),(0,N.jsx)("p",{children:"ID Pelanggan"}),(0,N.jsx)("p",{children:"Nama Pelanggan"}),(0,N.jsx)("p",{children:"Sumber Keluhan"}),(0,N.jsx)("p",{children:"Detail Sumber"})]}),(0,N.jsxs)("div",{className:"flex-1",children:[(0,N.jsx)("p",{children:l+1}),(0,N.jsxs)("p",{children:["#",null===e||void 0===e?void 0:e.nomor_keluhan]}),(0,N.jsx)("p",{children:null===e||void 0===e?void 0:e.id_pelanggan}),(0,N.jsx)("p",{children:null===e||void 0===e?void 0:e.nama_pelanggan}),(0,N.jsx)("p",{children:null===e||void 0===e||null===(n=e.sumber)||void 0===n?void 0:n.sumber}),(0,N.jsx)("p",{children:null===e||void 0===e?void 0:e.detail_sumber})]})]})},l)}))}),(0,N.jsx)("div",{className:"text-center rounded-xl bg-gray-300 p-2 font-bold mt-5",children:(0,N.jsx)("h2",{children:"RFO Gangguan"})}),(0,N.jsx)("div",{className:"flex mt-5 border-gray-300 rounded-lg flex-wrap",children:null===(s=c.keluhanLaporanLocal)||void 0===s?void 0:s.rfo_gangguan.map((function(e,l){return(0,N.jsx)("div",{className:"flex p-2 border border-gray-300 w-1/2 ".concat(l%2===0?"rounded-l-lg":"rounded-r-lg"),children:(0,N.jsxs)("div",{className:"flex gap-5 w-full",children:[(0,N.jsxs)("div",{className:"flex-1",children:[(0,N.jsx)("p",{children:"Nomor"}),(0,N.jsx)("p",{children:"Nomor RFO Gangguan"}),(0,N.jsx)("p",{children:"Mulai Gangguan"}),(0,N.jsx)("p",{children:"Selesai Gangguan"}),(0,N.jsx)("p",{children:"Problem"}),(0,N.jsx)("p",{children:"Action"}),(0,N.jsx)("p",{children:"Status"})]}),(0,N.jsxs)("div",{className:"flex-1",children:[(0,N.jsx)("p",{children:l+1}),(0,N.jsxs)("p",{children:["#",null===e||void 0===e?void 0:e.nomor_rfo_gangguan]}),(0,N.jsx)("p",{children:null===e||void 0===e?void 0:e.mulai_gangguan}),(0,N.jsx)("p",{children:null===e||void 0===e?void 0:e.selesai_gangguan}),(0,N.jsx)("p",{children:null===e||void 0===e?void 0:e.problem}),(0,N.jsx)("p",{children:null===e||void 0===e?void 0:e.action}),(0,N.jsx)("p",{children:null===e||void 0===e?void 0:e.status})]})]})},l)}))}),(0,N.jsx)("div",{className:"text-center rounded-xl bg-gray-300 p-2 font-bold mt-5",children:(0,N.jsx)("h2",{children:"Total"})}),(0,N.jsx)("div",{className:"flex mt-5 border border-gray-300 rounded-lg flex-wrap",children:(0,N.jsx)("div",{className:"flex p-2 border border-gray-300 rounded-l-lg rounded-r-lg w-full",children:(0,N.jsxs)("div",{className:"flex gap-5 w-full",children:[(0,N.jsxs)("div",{className:"flex-1",children:[(0,N.jsx)("p",{children:"Total Keluhan Open"}),(0,N.jsx)("p",{children:"Total Keluhan Closed"}),(0,N.jsx)("p",{children:"Total RFO Gangguan"})]}),(0,N.jsxs)("div",{className:"flex-1",children:[(0,N.jsx)("p",{children:null===(r=c.keluhanLaporanLocal)||void 0===r?void 0:r.total_keluhan_open}),(0,N.jsx)("p",{children:null===(t=c.keluhanLaporanLocal)||void 0===t?void 0:t.total_keluhan_closed}),(0,N.jsx)("p",{children:null===(i=c.keluhanLaporanLocal)||void 0===i?void 0:i.total_rfo_gangguan})]})]})})})]})},k=n(14450);var Z=function(){var e=(0,o.useState)([]),l=(0,i.Z)(e,2),n=l[0],Z=l[1],y=(0,o.useState)([]),_=(0,i.Z)(y,2),S=_[0],P=_[1],L=(0,o.useState)([]),C=(0,i.Z)(L,2),D=C[0],F=C[1],O=(0,o.useState)([]),K=(0,i.Z)(O,2),E=K[0],H=K[1],T=(0,o.useState)({}),G=(0,i.Z)(T,2),z=G[0],A=G[1],I=(0,o.useState)(null),R=(0,i.Z)(I,2),U=R[0],M=R[1],q=(0,p.s0)(),B=(0,x.rU)(),W=(0,i.Z)(B,1)[0],Y=(0,x.oK)(),J=(0,i.Z)(Y,1)[0],Q=(0,m.HY)(),V=(0,i.Z)(Q,1)[0],X=(0,x.q0)(),$=(0,i.Z)(X,1)[0],ee=(0,x.xG)(),le=(0,i.Z)(ee,1)[0],ne=(0,o.useState)(!1),ae=(0,i.Z)(ne,2),se=ae[0],re=ae[1],te=(0,d.I0)(),ie=function(e){re(!e)},ce=(0,d.v9)(f.HF).data,oe=function(){var e=(0,t.Z)((0,r.Z)().mark((function e(){var l,n,a;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,V().unwrap();case 3:"success"===(l=e.sent).status||"Success"===l.status?(2===(null===ce||void 0===ce?void 0:ce.role_id)?(a=l.data.filter((function(e){if(e.id_pop===ce.pop_id)return e})),n=a):n=l.data,te((0,j.pk)({data:n})),H(n)):(0,g.Z)(l,!0),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),(0,g.Z)(e.t0,!0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),de=function(){var e=(0,t.Z)((0,r.Z)().mark((function e(){var l,n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,W().unwrap();case 3:"success"===(l=e.sent).status||"Success"===l.status?(n=[],l.user.helpdesk.length>0&&(n=[].concat((0,s.Z)(n),(0,s.Z)(l.user.helpdesk))),l.user.noc.length>0&&(n=[].concat((0,s.Z)(n),(0,s.Z)(l.user.noc))),Z(n),P(new Array(n.length).fill(!1))):(0,g.Z)(l,!0),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),(0,g.Z)(e.t0,!0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),ue=function(){var e=(0,t.Z)((0,r.Z)().mark((function e(){var l;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,J().unwrap();case 3:"success"===(l=e.sent).status||"Success"===l.status?F(l.data):(0,g.Z)(l,!0),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),(0,g.Z)(e.t0,!0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),pe=function(e){var l=e.target,n=l.id,s=l.value;"tanggal"===n&&A((0,a.Z)((0,a.Z)({},z),{},{tanggal:s})),"pop"===n&&A((0,a.Z)((0,a.Z)({},z),{},{pop_id:s})),"shift"===n&&A((0,a.Z)((0,a.Z)({},z),{},{shift:s}))},he=(0,o.useState)([]),xe=(0,i.Z)(he,2),me=xe[0],fe=xe[1],ve=function(){var e=(0,t.Z)((0,r.Z)().mark((function e(){var l,n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,l=z,e.next=4,$({body:l}).unwrap();case 4:"succes"===(n=e.sent).status||"Success"===n.status?(M(n.data),re(!0)):(M(null),re(!1),(0,g.Z)(n,!0)),e.next=13;break;case 8:e.prev=8,e.t0=e.catch(0),M(null),re(!1),(0,g.Z)(e.t0,!0);case 13:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),je=function(){var e=(0,t.Z)((0,r.Z)().mark((function e(){var l,a,s,t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l=new FormData,a="",s="",S.forEach((function(e,l){e&&n.forEach((function(e,n){l===n&&("HELPDESK"===e.role.role&&(a+=e.name),"NOC"===e.role.role&&(s+=e.name))}))})),l.append("tanggal",z.tanggal),l.append("shift_id",z.shift),l.append("pop_id",z.pop_id),l.append("noc",s),l.append("helpdesk",a),l.append("data_laporan",""),l.append("user_id",ce.id_user),l.append("lampiran_laporan",me),e.prev=12,e.next=15,le({body:l}).unwrap();case 15:"success"===(t=e.sent).status||"Success"===t.status?((0,b.Z)(t),setTimeout((function(){q("/report",{replace:!0})}),2e3)):(0,g.Z)(t,!0),e.next=22;break;case 19:e.prev=19,e.t0=e.catch(12),(0,g.Z)(e.t0,!0);case 22:case"end":return e.stop()}}),e,null,[[12,19]])})));return function(){return e.apply(this,arguments)}}(),ge=(0,d.v9)(h.Ms);return(0,o.useEffect)((function(){var e=[].concat((0,s.Z)(ge.data),[{path:"/report/create",title:"Tambah"}]);te((0,h.oi)(e)),oe(),de(),ue()}),[]),(0,N.jsxs)("div",{children:[(0,N.jsxs)("div",{className:"flex gap-5 flex-col lg:flex-row mt-5",children:[(0,N.jsxs)("div",{className:"form-control w-full lg:w-1/4",children:[(0,N.jsx)("label",{htmlFor:"tanggal",className:"label font-semibold",children:(0,N.jsx)("span",{className:"label-text",children:" Tanggal"})}),(0,N.jsx)("input",{type:"date",name:"",id:"tanggal",onChange:pe,className:"input w-full max-w-full input-bordered"})]}),(0,N.jsxs)("div",{className:"form-control w-full lg:w-1/4",children:[(0,N.jsx)("label",{htmlFor:"location",className:"label font-semibold",children:(0,N.jsx)("span",{className:"label-text",children:" POP"})}),(0,N.jsxs)("select",{className:"select w-full max-w-full input-bordered",onChange:pe,id:"pop",children:[(0,N.jsx)("option",{value:"",label:"Pilih POP",children:"Pilih POP"}),null===E||void 0===E?void 0:E.map((function(e,l){return(0,N.jsx)("option",{value:e.id_pop,label:e.pop,children:e.pop},l)}))]})]}),(0,N.jsxs)("div",{className:"form-control w-full lg:w-1/4",children:[(0,N.jsx)("label",{htmlFor:"location",className:"label font-semibold",children:(0,N.jsx)("span",{className:"label-text",children:" Shift"})}),(0,N.jsxs)("select",{className:"select w-full max-w-full input-bordered",onChange:pe,id:"shift",children:[(0,N.jsx)("option",{value:"",label:"Pilih Shift",children:"Pilih Shift"}),null===D||void 0===D?void 0:D.map((function(e,l){return(0,N.jsx)("option",{value:e.id_shift,label:"".concat(e.shift," (").concat(e.mulai,") - (").concat(e.selesai,")"),children:"".concat(e.shift," (").concat(e.mulai,") - (").concat(e.selesai,")")},l)}))]})]}),(0,N.jsxs)("div",{className:"w-full lg:w-1/4 flex justify-between lg:flex-row gap-5",children:[(0,N.jsxs)("div",{className:"justify-end",children:[(0,N.jsx)("label",{htmlFor:"location",className:"label font-semibold",style:{visibility:"hidden"},children:(0,N.jsx)("span",{className:"label-text",children:"Generate"})}),(0,N.jsx)("button",{type:"button",onClick:function(){ve()},className:"btn btn-md btn-success  w-32 text-white",children:"Generate Data"})]}),(0,N.jsxs)("div",{className:"justify-end",children:[(0,N.jsx)("label",{htmlFor:"location",className:"label font-semibold",style:{visibility:"hidden"},children:(0,N.jsx)("span",{className:"label-text",children:"Unduh"})}),(0,N.jsx)("button",{type:"button",onClick:function(){var e=new c.kH("p","px","a4");e.setFontSize(12);var l=document.getElementById("preview-report");if(l){var n="Laporan-"+(new Date).toLocaleDateString("id-ID")+".pdf";e.html(l,{callback:function(e){return(0,t.Z)((0,r.Z)().mark((function l(){return(0,r.Z)().wrap((function(l){for(;;)switch(l.prev=l.next){case 0:e.setProperties({title:n}),window.open(e.output("bloburl"),"_blank");case 2:case"end":return l.stop()}}),l)})))()},windowWidth:1500,width:500,margin:10,filename:n,autoPaging:!0,image:{type:"png",quality:1}})}else{(0,g.Z)({data:{message:"Konten tidak terlihat. Silahkan klik tombol mata",status:404},status:404},!0)}},className:"btn btn-md  w-32 btn-primary",disabled:null===U,children:"Unduh Laporan"})]})]})]}),(0,N.jsxs)("div",{className:"mt-5",children:[(0,N.jsx)("label",{htmlFor:"location",className:"label font-semibold",children:(0,N.jsx)("span",{className:"label-text",children:" User Pengguna"})}),(0,N.jsx)("div",{className:"flex gap-5",children:n.map((function(e,l){var n=e.name,a=e.role;return(0,N.jsx)("div",{children:(0,N.jsxs)("div",{className:"label",children:[(0,N.jsx)("input",{type:"checkbox",id:"custom-checkbox-".concat(l),name:n,value:n,checked:S[l],onChange:function(){return function(e){var l=S.map((function(l,n){return n===e?!l:l}));P(l)}(l)}}),(0,N.jsxs)("label",{htmlFor:"custom-checkbox-".concat(l),className:"pl-2",children:[n,"(",a.role,")"]})]})},l)}))})]}),(0,N.jsx)("hr",{}),(0,N.jsxs)("div",{className:"mt-5",children:[(0,N.jsxs)("label",{htmlFor:"location",className:"label font-semibold",children:[(0,N.jsx)("span",{className:"label-text",children:" Tampilan Laporan"}),se&&(0,N.jsx)(u.MBb,{size:20,color:"#0D68F1",className:"cursor-pointer",onClick:function(){return ie(se)}}),!se&&(0,N.jsx)(u.Rbo,{size:20,color:"#0D68F1",className:"cursor-pointer",onClick:function(){return ie(se)}})]}),null!==U&&se&&(0,N.jsx)(w,{allShiftLocal:D,keluhanLaporanLocal:U,allPOPLocal:E,bodyKeluhan:z,getAllHelpdesk:function(){var e="";return S.forEach((function(l,a){l&&n.forEach((function(l,n){a===n&&"HELPDESK"===l.role.role&&(e+=l.name)}))})),e},getAllNOC:function(){var e="";return S.forEach((function(l,a){l&&n.forEach((function(l,n){a===n&&"NOC"===l.role.role&&(e+=l.name)}))})),e}})]}),(0,N.jsx)("hr",{}),(0,N.jsxs)("div",{className:"mt-5 font-semibold",children:["File Upload: ",me.name," - ",(0,v.td)(me.size)]}),(0,N.jsx)("div",{className:"mt-5",children:(0,N.jsxs)("div",{className:"flex flex-col-reverse md:flex-row justify-center gap-5",children:[(0,N.jsx)(k.zx,{type:"button",onClick:function(){q("/report")},className:"border-none",children:"Kembali"}),(0,N.jsx)(k.Zy,{onChange:function(e){return function(e){var l=e.target.files;l.length>0?fe(l[0]):fe([])}(e)}}),(0,N.jsx)(k.zx,{type:"button",onClick:function(){return je()},className:"bg-blue-600 border-none",children:"Simpan"})]})})]})}}}]);
//# sourceMappingURL=35.c1a786d1.chunk.js.map