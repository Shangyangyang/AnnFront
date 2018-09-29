
const dictList = r => require.ensure([], () => r(require('@/page/cc/dictList')), 'dictList');

const userList = r => require.ensure([], () => r(require('@/page/cc/userList')), 'userList');

const roleList = r => require.ensure([], () => r(require('@/page/cc/roleList')), 'roleList');

const menuList = r => require.ensure([], () => r(require('@/page/cc/menuList')), 'menuList');

const test = r => require.ensure([], () => r(require('@/page/sys/test')), 'test');

const car = r => require.ensure([], () => r(require('@/page/cost/car')), 'car');

const large = r => require.ensure([], () => r(require('@/page/cost/large')), 'large');

const xuebi = r => require.ensure([], () => r(require('@/page/cost/xuebi')), 'xuebi');

const lijin = r => require.ensure([], () => r(require('@/page/cost/lijin')), 'lijin');

const xuebiTimeline = r => require.ensure([], () => r(require('@/page/timeline/xuebiTimeline')), 'xuebiTimeline');

const importPic = r => require.ensure([], () => r(require('@/page/picManager/importPic')), 'importPic');
const importXuebi = r => require.ensure([], () => r(require('@/page/picManager/importXuebi')), 'importXuebi');

 const signin = r => require.ensure([], () => r(require('@/page/tool/signin')), 'signin');


export default [
	{
		path: '/dictList',
		component: dictList,
		meta: ['系统管理', '字典管理'],
	},{
		path: '/userList',
		component: userList,
		meta: ['系统管理', '用户管理'],
	},{
		path: '/roleList',
		component: roleList,
		meta: ['系统管理', '角色管理'],
	},{
		path: '/menuList',
		component: menuList,
		meta: ['系统管理', '菜单管理'],
	},{
		path: '/test',
		component: test,
		meta: ['系统管理', '测试'],
	},{
		path: '/car',
		component: car,
		meta: ['记账本', '汽车花费'],
	},{
		path: '/large',
		component: large,
		meta: ['记账本', '大额支出'],
	},{
		path: '/xuebi',
		component: xuebi,
		meta: ['记账本', '雪碧'],
	},{
		path: '/lijin',
		component: lijin,
		meta: ['记账本', '礼金管理'],
	},{
		path: '/xuebiTimeline',
		component: xuebiTimeline,
		meta: ['时间线', '雪碧'],
	},{
		path: '/importPic',
		component: importPic,
		meta: ['图片管理', '时间线导入基表'],
	},{
		path: '/importXuebi',
		component: importXuebi,
		meta: ['图片管理', '相册筛选-雪碧'],
	},{
		path: '/signin',
		component: signin,
		meta: ['小工具', '签到表'],
	}
]