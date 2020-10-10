
const car = r => require.ensure([], () => r(require('@/page/cost/car')), 'car');
const large = r => require.ensure([], () => r(require('@/page/cost/large')), 'large');
const xuebiCost = r => require.ensure([], () => r(require('@/page/cost/xuebiCost')), 'xuebiCost');
const timelineSelectList = r => require.ensure([], () => r(require('@/page/picManager/timelineSelectList')), 'timelineSelectList');
const lijin = r => require.ensure([], () => r(require('@/page/cost/lijin')), 'lijin');

const xuebiList = r => require.ensure([], () => r(require('@/page/picManager/xuebiList')), 'xuebiList');
const xuebiTimeline = r => require.ensure([], () => r(require('@/page/timeline/xuebiTimeline')), 'xuebiTimeline');
const importPic = r => require.ensure([], () => r(require('@/page/picManager/importPic')), 'importPic');
const importXuebi = r => require.ensure([], () => r(require('@/page/picManager/importXuebi')), 'importXuebi');
const TimelineLabelList = r => require.ensure([], () => r(require('@/page/picManager/TimelineLabelList')), 'TimelineLabelList');
const TimelineLabelQuickList = r => require.ensure([], () => r(require('@/page/picManager/TimelineLabelQuickList')), 'TimelineLabelQuickList');
const PicSimilar = r => require.ensure([], () => r(require('@/page/picManager/PicSimilar')), 'PicSimilar');

const signin = r => require.ensure([], () => r(require('@/page/test/signin')), 'signin');
const login = r => require.ensure([], () => r(require('@/page/sys/login')), 'login');
const musicSortList = r => require.ensure([], () => r(require('@/page/fileSort/musicSortList')), 'musicSortList');

const dictList = r => require.ensure([], () => r(require('@/page/cc/dictList')), 'dictList');
const userList = r => require.ensure([], () => r(require('@/page/cc/userList')), 'userList');
const roleList = r => require.ensure([], () => r(require('@/page/cc/roleList')), 'roleList');
const menuList = r => require.ensure([], () => r(require('@/page/cc/menuList')), 'menuList');

const test = r => require.ensure([], () => r(require('@/page/test/test')), 'test');
const testWebsocket = r => require.ensure([], () => r(require('@/page/test/testWebsocket')), 'testWebsocket');
const testCalendar = r => require.ensure([], () => r(require('@/page/test/testCalendar')), 'testCalendar');
const testVue = r => require.ensure([], () => r(require('@/page/test/testVue')), 'testVue');
const testEcharts = r => require.ensure([], () => r(require('@/page/test/testEcharts')), 'testEcharts');
const testProgress_bak = r => require.ensure([], () => r(require('@/page/test/testProgress_bak')), 'testProgress_bak');


export default [
	{
		path: '/testProgress_bak',
		name: 'testProgress_bak',
		component: testProgress_bak,
		meta: ['文件分类管理', '测试进度条'],
	}, 
	{
		path: '/musicSortList',
		name: 'musicSortList',
		component: musicSortList,
		meta: ['文件分类管理', '文件导入'],
	}, 
	{
		path: '/dictList',
		component: dictList,
		meta: ['系统管理', '字典管理'],
	}, 
	{
		path: '/userList',
		component: userList,
		meta: ['系统管理', '用户管理'],
	}, 
	{
		path: '/roleList',
		component: roleList,
		meta: ['系统管理', '角色管理'],
	}, 
	{
		path: '/menuList',
		component: menuList,
		meta: ['系统管理', '菜单管理'],
	}, 
	{
		path: '/test',
		component: test,
		meta: ['测试专区', '测试'],
	}, 
	{
		path: '/testWebsocket',
		component: testWebsocket,
		meta: ['测试专区', '测试websocket'],
	}, 
	{
		path: '/testCalendar',
		component: testCalendar,
		meta: ['系统管理', '测试日历'],
	}, 
	{
		path: '/car',
		component: car,
		meta: ['记账本', '汽车花费'],
	}, 
	{
		path: '/large',
		component: large,
		meta: ['记账本', '大额支出'],
	}, 
	{
		path: '/xuebiCost',
		component: xuebiCost,
		meta: ['雪碧', '记账本'],
	}, 
	{
		path: '/lijin',
		component: lijin,
		meta: ['记账本', '礼金管理'],
	}, 
	{
		path: '/xuebiTimeline',
		component: xuebiTimeline,
		meta: ['雪碧时光轴', '雪碧时光轴'],
	}, 
	{
		path: '/importPic',
		component: importPic,
		meta: ['图片管理', '时间线导入基表'],
	}, 
	{
		path: '/timelineSelectList',
		name: '/timelineSelectList',
		component: timelineSelectList,
		meta: ['图片管理', '相册筛选'],
	}, 
	{
		path: '/xuebiList',
		component: xuebiList,
		meta: ['图片管理', '雪碧列表'],
	}, 
	{
		path: '/importXuebi',
		component: importXuebi,
		meta: ['图片管理', '相册筛选-雪碧'],
	}, 
	{
		path: '/TimelineLabelList',
		component: TimelineLabelList,
		meta: ['图片管理', '标签管理'],
	}, 
	{
		path: '/TimelineLabelQuickList',
		component: TimelineLabelQuickList,
		meta: ['图片管理', '标签管理', '快速选择管理'],
	}, 
	{
		path: '/PicSimilar',
		name: 'PicSimilar',
		component: PicSimilar,
		meta: ['图片管理', '相册筛选', '相似的照片'],
	}, 
	{
		path: '/signin',
		component: signin,
		meta: ['小工具', '签到表'],
	},
	{
		path: '/testVue',
		name: 'testVue',
		component: testVue,
		meta: ['小工具', '测试Vue'],
	},
	{
		path: '/testEcharts',
		name: 'testEcharts',
		component: testEcharts,
		meta: ['小工具', '测试Echarts'],
	},
	{
		path: '/login',
		component: login,
		meta: ['系统管理', '登录'],
	},
]
