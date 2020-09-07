<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
	<title>基层调查分布图</title>
	<meta name="decorator" content="default"/>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
  	<style type="text/css">
	  body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;font-family:"微软雅黑";}
	</style>
	<script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
	<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=qDiw3jCbRIlv57I1UPMQwG9rCvtvp6oz"></script>
</head>
<body style="height: 100%; margin: 0">
	<ul class="nav nav-tabs">
		<li class="active"><a href="#">基层调查分布图</a></li>
    </ul>
    <form:form modelAttribute="eformityRegister" action="heatmapList" method="post" class="breadcrumb form-search">
        <input type="hidden" id="rootCode" value=" ${fns:getUser().company.code}"/>
        <input type="hidden" id="rootName" value=" ${fns:getUser().company.name}"/>
        <label>区域：</label>
        <sys:treeselect id="g200" name="g200.code" value="${eformityRegister.g200.code}" labelName="g200.name" labelValue="${eformityRegister.g200.name}"
        title="区域" url="/sys/office/treeCodeAsyncData?type=1" cssClass="input-mini" async="true"/>
        <label><input type="submit" class="btn btn-primary" value="查询"/></label><span style="font-size: 10px;color=#999;">&nbsp;&nbsp;&nbsp;&nbsp;全市数据量大，加载地图耗时长，建议分区县查看</span>
    </form:form>
    <sys:message content="${message}"/>
    <div id="container" style="height: 90%"></div>
    <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/echarts.min.js"></script>
    <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts-gl/echarts-gl.min.js"></script>
    <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts-stat/ecStat.min.js"></script>
    <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/extension/dataTool.min.js"></script>
    <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/map/js/china.js"></script>
    <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/map/js/world.js"></script>
    <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/extension/bmap.min.js"></script>
    <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/simplex.js"></script>
    <script type="text/javascript">
		// $.get('/a/dynamicupdate/register/eformityRegister/getCoordinate', function (data) {
		
		var dom = document.getElementById("container");
        var myChart = echarts.init(dom);
        var app = {};
        option = null;
        app.title = '基层调查分布图';
		code = '${code}';
		console.log(code);
		
        $.get('${ctx}/dynamicupdate/register/eformityRegister/getCoordinate?code=' + code, function (data) {

            var points = [].concat.apply([], data.map(function (track) {
                return track.map(function (seg) {
                    return seg.coord.concat([1]);
                });
            }));
            myChart.setOption(option = {
                animation: false,
                bmap: {
                    center: [${defaultX}, ${defaultY}],
                    zoom: ${zoom},
                    roam: true
                },
                visualMap: {
                    show: false,
                    top: 'top',
                    min: 0,
                    max: 5,
                    seriesIndex: 0,
                    calculable: true,
                    inRange: {
                        color: ['blue', 'blue', 'green', 'yellow', 'red']
                    }
                },
                series: [{
                    type: 'heatmap',
                    coordinateSystem: 'bmap',
                    data: points,
                    pointSize: 5,
                    blurSize: 5
                }]
            });
            if (!app.inNode) {
                // 添加百度地图插件
                var bmap = myChart.getModel().getComponent('bmap').getBMap();
                bmap.addControl(new BMap.MapTypeControl());
            }
        });
        
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }

	</script>
</body>
</html>