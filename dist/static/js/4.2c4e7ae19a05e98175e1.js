webpackJsonp([4],{1061:function(e,t,a){var r=a(793);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(593)("abee41dc",r,!0)},1069:function(e,t,a){var r=a(801);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(593)("0ed042f2",r,!0)},1087:function(e,t,a){"use strict";function r(e){a(1069)}var s=a(709),n=a(1098),i=a(12),l=r,o=i(s.a,n.a,!1,l,null,null);t.a=o.exports},1089:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"fillcontain"},[a("bread"),e._v(" "),a("div",{staticClass:"pageTitle"},[a("div",{staticClass:"pageLeftRight"},[a("el-table",{attrs:{data:e.tableAppData,stripe:"",border:"","highlight-current-row":""},on:{"current-change":e.handleAppCurrentChange}},[a("el-table-column",{attrs:{type:"index",label:"序号",width:"50"}}),e._v(" "),a("el-table-column",{attrs:{property:"appCode",label:"应用编码",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{property:"appName",label:"应用名称",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{property:"appDesc",label:"应用描述"}}),e._v(" "),a("el-table-column",{attrs:{property:"enterUrl",label:"应用入口",width:"200"}})],1),e._v(" "),a("div",{staticClass:"dicTop",staticStyle:{padding:"20px 10px",width:"100%","border-bottom":"1px solid #e5e5e5"}},[a("el-form",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:4}},[a("el-input",{attrs:{"auto-complete":"off",placeholder:"账号"},model:{value:e.queryUserCode,callback:function(t){e.queryUserCode=t},expression:"queryUserCode"}})],1),e._v(" "),a("el-col",{attrs:{span:4}},[a("el-input",{attrs:{"auto-complete":"off",placeholder:"姓名"},model:{value:e.queryUserName,callback:function(t){e.queryUserName=t},expression:"queryUserName"}})],1),e._v(" "),a("el-col",{attrs:{span:8,push:1}},[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.queryData}},[e._v("查 询")]),e._v(" "),a("el-button",{staticStyle:{background:"#fff",color:"#000",border:"1px solid #ccc"},attrs:{type:"primary",icon:"el-icon-plus"},on:{click:function(t){e.handleAddClick()}}},[e._v("新增关联")])],1)],1)],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"98%"},attrs:{data:e.tableUserData,stripe:"",border:""}},[a("el-table-column",{attrs:{prop:"userCode",label:"账号",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"userName",label:"姓名",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"officeName",label:"所属机构"}}),e._v(" "),a("el-table-column",{attrs:{prop:"areaName",label:"行政区划"}}),e._v(" "),a("el-table-column",{attrs:{prop:"phoneNum",label:"联系电话",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"appState",label:"关联系统状态",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"small",icon:"el-icon-delete"},on:{click:function(a){e.handleDelete(t.row)}}},[e._v("删除关联")])]}}])})],1),e._v(" "),a("div",{staticClass:"Pagination",staticStyle:{"text-align":"right"}},[a("el-pagination",{attrs:{background:"","current-page":e.currentPage,"page-size":e.pageSize,total:e.dataCount,"page-sizes":[10,20,30,40,50],layout:"total, sizes, prev, pager, next"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)]),e._v(" "),a("select-user-list",{attrs:{dialogTitle:e.dialogTitle,dialogShow:e.selectUserShow,selUserVal:e.userSelVal,useFlag:e.appState},on:{"update:dialogShow":function(t){e.selectUserShow=t},"update:selUserVal":function(t){e.userSelVal=t},"update:useFlag":function(t){e.appState=t}}})],1)},s=[],n={render:r,staticRenderFns:s};t.a=n},1098:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-dialog",{staticClass:"userDialog",attrs:{width:"80%",modal:"",visible:e.dialogShow,title:e.dialogTitle,"before-close":e.dialogClose},on:{"update:visible":function(t){e.dialogShow=t}}},[a("div",{staticClass:"table_container areaList"},[a("el-container",[a("el-aside",{staticStyle:{width:"16%"}},[a("div",{staticStyle:{height:"40px","line-height":"40px","padding-left":"20px",background:"#fbfbfb"}},[e._v("组织机构")]),e._v(" "),a("el-tree",{attrs:{props:e.treeProps,load:e.loadNode,"node-key":"code",lazy:"","highlight-current":"","default-expand-all":"",accordion:""},on:{"node-click":e.handleNodeClick}})],1),e._v(" "),a("el-main",{staticClass:"adminSet"},[a("el-row",{staticClass:"header",attrs:{type:"flex"}},[a("el-col",{staticStyle:{width:"16px","border-bottom":"1px solid #ccc"}}),e._v(" "),a("el-col",{staticClass:"admin_title"},[e._v("用户选择列表")]),e._v(" "),a("el-col",{staticStyle:{flex:"1","border-bottom":"1px solid #ccc"}})],1),e._v(" "),a("div",{staticClass:"dicTop",staticStyle:{padding:"20px 10px",width:"100%","border-bottom":"1px solid #e5e5e5"}},[a("el-form",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:4}},[a("el-input",{attrs:{"auto-complete":"off",placeholder:"账号"},model:{value:e.queryUserCode,callback:function(t){e.queryUserCode=t},expression:"queryUserCode"}})],1),e._v(" "),a("el-col",{attrs:{span:4}},[a("el-input",{attrs:{"auto-complete":"off",placeholder:"姓名"},model:{value:e.queryUserName,callback:function(t){e.queryUserName=t},expression:"queryUserName"}})],1),e._v(" "),a("el-col",{attrs:{span:4}},[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.queryData}},[e._v("查 询")])],1),e._v(" "),a("el-col",{attrs:{span:4,push:5}},[a("el-checkbox",{model:{value:e.appState,callback:function(t){e.appState=t},expression:"appState"}},[e._v("应用对关联人员是否可用")])],1)],1)],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"98%"},attrs:{data:e.tableData,stripe:"",border:""},on:{"selection-change":e.selChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),a("el-table-column",{attrs:{prop:"userCode",label:"账号",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"userName",label:"姓名",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"officeName",label:"所属机构"}}),e._v(" "),a("el-table-column",{attrs:{prop:"areaName",label:"行政区划",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"phoneNum",label:"联系电话",width:"150"}})],1),e._v(" "),a("div",{staticClass:"Pagination",staticStyle:{"text-align":"right"}},[a("el-pagination",{attrs:{background:"","current-page":e.currentPage,"page-size":e.pageSize,total:e.dataCount,"page-sizes":[10,20,30,40,50],layout:"total, sizes, prev, pager, next"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{icon:"el-icon-close"},on:{click:function(t){e.dialogClose()}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-check"},on:{click:function(t){e.saveUserData()}}},[e._v("确 定")])],1)])],1)},s=[],n={render:r,staticRenderFns:s};t.a=n},595:function(e,t,a){"use strict";function r(e){a(1061)}Object.defineProperty(t,"__esModule",{value:!0});var s=a(701),n=a(1089),i=a(12),l=r,o=i(s.a,n.a,!1,l,null,null);t.default=o.exports},701:function(e,t,a){"use strict";var r=a(23),s=a.n(r),n=a(22),i=a.n(n),l=a(1087),o=a(14),c=function(e){return a.i(o.a)("/cc/app/list",e)},u=function(e){return a.i(o.a)("/cc/app/listUserBySysApp",e)},p=function(e){return a.i(o.a)("/cc/app/deleteUserApp",e)},d=function(e){return a.i(o.a)("/cc/app/insertUserApp",e)};t.a={components:{SelectUserList:l.a},data:function(){return{selectUserShow:!1,userSelVal:[],appState:!0,tableAppData:[],curAppCode:"",curAppName:"",tableUserData:[],currentPage:1,pageSize:10,dataCount:0,queryUserCode:"",queryUserName:""}},computed:{dialogTitle:function(){return"用户选择（"+this.curAppName+")"}},created:function(){this.getListAppData()},methods:{handleAppCurrentChange:function(e){this.curAppCode=e.appCode,this.curAppName=e.appName,this.getListUserData()},handleSizeChange:function(e){this.pageSize=e,this.getListUserData()},handleCurrentChange:function(e){this.currentPage=e,this.getListUserData()},queryData:function(){this.getListUserData()},handleAddClick:function(){if(""==this.curAppCode)return void this.$message({type:"error",message:"请选择应用"});this.selectUserShow=!0},handleInsert:function(){this.insertData()},handleDelete:function(e){var t=this;if(""==this.curAppCode)return void this.$message({type:"error",message:"请选择应用"});this.$confirm("确定删除该用户访问应用 "+this.curAppName+" 的权限?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){t.deleteData(e)}).catch(function(){})},insertData:function(){var e=this;this.userSelVal.forEach(function(t){e.insertSingleData(t.userCode)}),this.getListUserData(),this.appState=!0},insertSingleData:function(e){var t=this;return i()(s.a.mark(function a(){var r,n;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return r="0",t.appState&&(r="1"),a.next=4,d({userCode:e,appCode:t.curAppCode,appState:r});case 4:if(n=a.sent,1==n.status){a.next=8;break}return t.$message({type:"error",message:"保存数据失败"}),a.abrupt("return");case 8:t.$message({type:"success",message:"保存数据完成"});case 9:case"end":return a.stop()}},a,t)}))()},deleteData:function(e){var t=this;return i()(s.a.mark(function a(){var r;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,p({userCode:e.userCode,appCode:t.curAppCode});case 2:if(r=a.sent,1==r.status){a.next=6;break}return t.$message({type:"error",message:"删除数据失败"}),a.abrupt("return");case 6:t.$message({type:"success",message:"删除数据完成"}),t.getListUserData();case 8:case"end":return a.stop()}},a,t)}))()},getListAppData:function(){var e=this;return i()(s.a.mark(function t(){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c({});case 2:if(a=t.sent,1==a.status){t.next=6;break}return e.$message({type:"error",message:"获取数据失败"}),t.abrupt("return");case 6:e.tableAppData=[],a.data.forEach(function(t){return e.tableAppData.push(t)});case 8:case"end":return t.stop()}},t,e)}))()},getListUserData:function(){var e=this;return i()(s.a.mark(function t(){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u({appCode:e.curAppCode,userCode:e.queryUserCode,userName:e.queryUserName,page:e.currentPage,size:e.pageSize});case 2:if(a=t.sent,1==a.status){t.next=6;break}return e.$message({type:"error",message:"获取数据失败"}),t.abrupt("return");case 6:e.tableUserData=[],a.data.list.forEach(function(t){return e.tableUserData.push(t)}),e.dataCount=a.data.total;case 9:case"end":return t.stop()}},t,e)}))()}}}},709:function(e,t,a){"use strict";var r=a(23),s=a.n(r),n=a(22),i=a.n(n),l=a(14),o=function(e){return a.i(l.a)("/cc/office/list",e)},c=function(e){return a.i(l.a)("/cc/user/list",e)};t.a={props:["dialogTitle","dialogShow","selUserVal","useFlag"],data:function(){return{queryUserCode:"",queryUserName:"",clickData:{},tableData:[],currentPage:1,pageSize:10,dataCount:0,treeProps:{label:"name",children:"children"},selVal:[],appState:this.useFlag}},created:function(){this.getListUserData()},methods:{queryData:function(){this.getListUserData()},handleSizeChange:function(e){this.pageSize=e,null!=this.clickData.officeLevel&&void 0!=this.clickData.officeLevel?this.getListOfficeUserData():this.getListUserData()},handleCurrentChange:function(e){this.currentPage=e,null!=this.clickData.officeLevel&&void 0!=this.clickData.officeLevel?this.getListOfficeUserData():this.getListUserData()},getListUserData:function(){var e=this;return i()(s.a.mark(function t(){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c({userCode:e.queryUserCode,userName:e.queryUserName,page:e.currentPage,size:e.pageSize});case 2:if(a=t.sent,1==a.status){t.next=6;break}return e.$message({type:"error",message:"获取数据失败"}),t.abrupt("return");case 6:e.tableData=[],a.data.list.forEach(function(t){return e.tableData.push(t)}),e.dataCount=a.data.total;case 9:case"end":return t.stop()}},t,e)}))()},handleNodeClick:function(e,t){this.clickData=e,this.currentPage=1,this.getListOfficeUserData()},getListOfficeUserData:function(){var e=this;return i()(s.a.mark(function t(){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c({officeCode:e.clickData.code,officeLevel:parseInt(e.clickData.officeLevel),page:e.currentPage,size:e.pageSize});case 2:if(a=t.sent,1==a.status){t.next=6;break}return e.$message({type:"error",message:"获取数据失败"}),t.abrupt("return");case 6:e.tableData=[],a.data.list.forEach(function(t){return e.tableData.push(t)}),e.dataCount=a.data.total;case 9:case"end":return t.stop()}},t,e)}))()},loadNode:function(e,t){var a=this;return i()(s.a.mark(function r(){var n,i;return s.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return n="",null!=e.key&&void 0!=e.key&&(n=e.key),r.next=4,a.getListOfficeData(n,e.level+2,1,0);case 4:return i=r.sent,r.abrupt("return",t(i.list));case 6:case"end":return r.stop()}},r,a)}))()},getListOfficeData:function(e,t,a,r){var n=this;return i()(s.a.mark(function i(){var l;return s.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,o({parentCode:e,officeLevel:t,page:a,size:r});case 2:if(l=s.sent,1==l.status){s.next=6;break}return n.$message({type:"error",message:"获取数据失败"}),s.abrupt("return");case 6:return s.abrupt("return",l.data);case 7:case"end":return s.stop()}},i,n)}))()},selChange:function(e){this.selVal=e},dialogClose:function(){this.$emit("update:dialogShow",!1)},saveUserData:function(){this.$emit("update:dialogShow",!1),this.$emit("update:selUserVal",this.selVal),this.$emit("update:useFlag",this.appState),this.$parent.handleInsert()}}}},793:function(e,t,a){t=e.exports=a(592)(!1),t.push([e.i,".allcover{position:absolute;top:0;right:0}.ctt{left:50%;transform:translate(-50%,-50%)}.ctt,.tb{position:absolute;top:50%}.tb{transform:translateY(-50%)}.lr{position:absolute;left:50%;transform:translateX(-50%)}",""])},801:function(e,t,a){t=e.exports=a(592)(!1),t.push([e.i,".allcover{position:absolute;top:0;right:0}.ctt{left:50%;transform:translate(-50%,-50%)}.ctt,.tb{position:absolute;top:50%}.tb{transform:translateY(-50%)}.lr{position:absolute;left:50%;transform:translateX(-50%)}",""])}});