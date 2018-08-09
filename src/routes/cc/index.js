
const dictList = r => require.ensure([], () => r(require('@/page/cc/dictList')), 'dictList');

const userList = r => require.ensure([], () => r(require('@/page/cc/userList')), 'userList');

const roleList = r => require.ensure([], () => r(require('@/page/cc/roleList')), 'roleList');

const menuList = r => require.ensure([], () => r(require('@/page/cc/menuList')), 'menuList');

const test = r => require.ensure([], () => r(require('@/page/sys/test')), 'test');

const car = r => require.ensure([], () => r(require('@/page/cost/car')), 'car');

const large = r => require.ensure([], () => r(require('@/page/cost/large')), 'large');



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
	}
]