var geoCoordMap = {
 	'p1': [116.23322222222222, 37.35402222222223],
 	'p2': [116.23300833333333, 37.35380555555556],
 	'p3': [116.23116944444445, 37.35308888888889],
 	'p4': [116.23091111111111, 37.35078333333333],
 	'p5': [116.2309638888889, 37.35036388888889],
 }
 var value = [{
 		name: 'p1',
 		value: 100
 	},
 	{
 		name: 'p2',
 		value: 120
 	},
 	{
 		name: 'p3',
 		value: 130
 	},
 	{
 		name: 'p4',
 		value: 122
 	},
 	{
 		name: 'p5',
 		value: 144
 	},
 ]

 var convertData = function(data, n) {
 	var res = []
 	for (var i = 0; i < data.length; i++) {
 		var geoCoord = geoCoordMap[data[i].name]
 		if (geoCoord) {
 			res.push(geoCoord.concat(data[i].value + (Math.random() - 0.5) * n))
 		}
 	}
 	return res
 }
 var title = 'xx洲-xx城市司机人数分布图'
 var bmap = {
 	center: [116.23, 37.35]
 }
 var timeline = {
 	autoPlay: true,
 	data: ['7:00']
 }
 var options = [{
 		series: [{
 			data: convertData(value, 100)
 		}]
 	},
 ]

 export default {
 	baseOption: {
 		title: {
 			text: title,
 			left: 'center',
 			top: 10,
 			textStyle: {
 				color: '#66b1ff',
 				fontSize: 20,
 				fontWeight: 'bolder'
 			}
 		},
 		timeline: {
 			bottom: 10,
 			autoPlay: timeline.autoPlay,
 			data: timeline.data,
 			axisType: 'category',
 			padding: [5, 5, 5, 5],
 			playInterval: 1500,
 			lineStyle: {
 				color: 'white'
 			},
 			controlPosition: 'right',
 			controlStyle: {
 				color: '#ffffff',
 				borderColor: '#ffffff'
 			},
 			label: {
 				normal: {
 					textStyle: {
 						color: 'white',
 						fontSize: 13,
 						fontWeight: 'bolder'
 					}
 				}
 			}
 		},
 		bmap: {
 			center: bmap.center,
 			zoom: 16,
 			roam: true,
 			mapStyle: {
 				styleJson: [{
 						'featureType': 'land', // 调整土地颜色
 						'elementType': 'geometry',
 						'stylers': {
 							'color': '#081734'
 						}
 					},
 					{
 						'featureType': 'building', // 调整建筑物颜色
 						'elementType': 'geometry',
 						'stylers': {
 							'color': '#04406F'
 						}
 					},
 					{
 						'featureType': 'building', // 调整建筑物标签是否可视
 						'elementType': 'labels',
 						'stylers': {
 							'visibility': 'off'
 						}
 					},
 					{
 						'featureType': 'highway', // 调整高速道路颜色
 						'elementType': 'geometry',
 						'stylers': {
 							'color': '#015B99'
 						}
 					},
 					{
 						'featureType': 'highway', // 调整高速名字是否可视
 						'elementType': 'labels',
 						'stylers': {
 							'visibility': 'off'
 						}
 					},
 					{
 						'featureType': 'arterial', // 调整一些干道颜色
 						'elementType': 'geometry',
 						'stylers': {
 							'color': '#003051'
 						}
 					},
 					{
 						'featureType': 'arterial',
 						'elementType': 'labels',
 						'stylers': {
 							'visibility': 'off'
 						}
 					},
 					{
 						'featureType': 'green',
 						'elementType': 'geometry',
 						'stylers': {
 							'visibility': 'off'
 						}
 					},
 					{
 						'featureType': 'water',
 						'elementType': 'geometry',
 						'stylers': {
 							'color': '#044161'
 						}
 					},
 					{
 						'featureType': 'subway', // 调整地铁颜色
 						'elementType': 'geometry.stroke',
 						'stylers': {
 							'color': '#003051'
 						}
 					},
 					{
 						'featureType': 'subway',
 						'elementType': 'labels',
 						'stylers': {
 							'visibility': 'off'
 						}
 					},
 					{
 						'featureType': 'railway',
 						'elementType': 'geometry',
 						'stylers': {
 							'visibility': 'off'
 						}
 					},
 					{
 						'featureType': 'railway',
 						'elementType': 'labels',
 						'stylers': {
 							'visibility': 'off'
 						}
 					},
 					{
 						'featureType': 'all', // 调整所有的标签的边缘颜色
 						'elementType': 'labels.text.stroke',
 						'stylers': {
 							'color': '#313131'
 						}
 					},
 					{
 						'featureType': 'all', // 调整所有标签的填充颜色
 						'elementType': 'labels.text.fill',
 						'stylers': {
 							'color': '#FFFFFF'
 						}
 					},
 					{
 						'featureType': 'manmade',
 						'elementType': 'geometry',
 						'stylers': {
 							'visibility': 'off'
 						}
 					},
 					{
 						'featureType': 'manmade',
 						'elementType': 'labels',
 						'stylers': {
 							'visibility': 'off'
 						}
 					},
 					{
 						'featureType': 'local',
 						'elementType': 'geometry',
 						'stylers': {
 							'visibility': 'off'
 						}
 					},
 					{
 						'featureType': 'local',
 						'elementType': 'labels',
 						'stylers': {
 							'visibility': 'off'
 						}
 					},
 					{
 						'featureType': 'subway',
 						'elementType': 'geometry',
 						'stylers': {
 							'lightness': -65
 						}
 					},
 					{
 						'featureType': 'railway',
 						'elementType': 'all',
 						'stylers': {
 							'lightness': -40
 						}
 					},
 					{
 						'featureType': 'boundary',
 						'elementType': 'geometry',
 						'stylers': {
 							'color': '#8b8787',
 							'weight': '1',
 							'lightness': -29
 						}
 					}
 				]
 			}
 		},
 		visualMap: {
 			min: 0,
 			max: 500,
 			splitNumber: 5,
 			inRange: {
 				color: ['blue', 'green', 'yellow', 'red']
 			},
 			textStyle: {
 				color: '#fff',
 				fontWeight: 'bolder'
 			},
 			bottom: 10,
 			left: 'right',
 			right: 20
 		},
 		series: [{
 			type: 'heatmap',
 			mapType: 'world',
 			coordinateSystem: 'bmap',
 			blurSize: 50
 		}]
 	},
 	options: options
 }
