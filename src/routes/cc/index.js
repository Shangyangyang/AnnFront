
const dictList = r => require.ensure([], () => r(require('@/page/cc/dictList')), 'dictList');

const areaList = r => require.ensure([], () => r(require('@/page/cc/areaList')), 'areaList');

const officeList = r => require.ensure([], () => r(require('@/page/cc/officeList')), 'officeList');

const userList = r => require.ensure([], () => r(require('@/page/cc/userList')), 'userList');

const roleList = r => require.ensure([], () => r(require('@/page/cc/roleList')), 'roleList');

const menuList = r => require.ensure([], () => r(require('@/page/cc/menuList')), 'menuList');

const appList = r => require.ensure([], () => r(require('@/page/cc/appList')), 'appList');

const adminSet = r => require.ensure([], () => r(require('@/page/cc/adminSet')), 'adminSet');

export default [
	{
		path: '/dictList',
		component: dictList,
		meta: ['系统管理', '字典管理'],
	},{
		path: '/areaList',
		component: areaList,
		meta: ['系统管理', '行政区划'],
	},{
		path: '/officeList',
		component: officeList,
		meta: ['系统管理', '组织机构'],
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
        path: '/appList',
        component: appList,
        meta: ['系统管理', '应用管理'],
    },{
		path: '/adminSet',
		component: adminSet,
		meta: ['系统管理', '个人设置'],
	}
]