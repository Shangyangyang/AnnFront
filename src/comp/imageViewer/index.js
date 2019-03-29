import ImageViewerComponent from'./ImageViewer'
const ImageViewer={}
ImageViewer.install=Vue=>{const ImageViewerConstructor=Vue.extend(ImageViewerComponent);const instance=new ImageViewerConstructor();instance.$mount(document.createElement('div'))
document.body.appendChild(instance.$el)
Vue.directive('drag',function(el,binding){instance.isShowImageDialog=true;let oDiv=el;oDiv.onmousedown=function(e){if(e.button===2)return;e.preventDefault();let bw=document.body.clientWidth;let bh=document.body.clientHeight;let disX=e.clientX-oDiv.offsetLeft;let disY=e.clientY-oDiv.offsetTop;document.onmousemove=function(e){let l=0,t=0;if(e.clientX>=bw){l=bw-disX;}else if(e.clientX<=0){{l=0-disX;}}else{l=e.clientX-disX;}
if(e.clientY>=bh){t=bh-disY;}else if(e.clientY<=0){t=0-disY;}else{t=e.clientY-disY;}
oDiv.style.left=l+'px';oDiv.style.top=t+'px';binding.value({x:e.pageX,y:e.pageY})};document.onmouseup=function(e){document.onmousemove=null;document.onmouseup=null;};};});Vue.prototype.$imageViewer=(e)=>{instance.currentImg=e.currentTarget.currentSrc;instance.visible=true;}}
export default ImageViewer;