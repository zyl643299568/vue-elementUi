<template>
<el-container>
  <el-header>Header</el-header>
	<el-container>
		<el-aside width="200px">
		<el-menu
			class="el-menu-vertical-demo"
			background-color="#2c3e50"
			text-color="#fff"
			unique-opened
			>
			<!-- 一级菜单 -->
			<el-submenu :index="menu.id + ''" :key="menu.id" v-for="menu in menuList">
				<template slot="title">
					<i :class="menu.icon"></i>
					<span>{{menu.menuName}}</span>
				</template>
				<!-- 二级菜单 -->
				<el-menu-item :key="menuItem.id" v-for="menuItem in menu.children">
					<template slot="title">
						<i class="el-icon-menu"></i>
						<span>{{menuItem.menuName}}</span>
					</template>
				</el-menu-item>
			</el-submenu>
		</el-menu>
	</el-aside>
	<el-main>Main</el-main>
	</el-container>
</el-container>
</template>

<script>
  export default {
		data(){
			return{
				menuList: [
					{
						id: 1,
						menuName: '用户管理',
						icon: "el-icon-s-custom",
						children: [
							{
								id: 1-1,
								menuName: '用户列表',
							}
						]
					},
					{
						id: 2,
						menuName: '权限管理',
						icon: "el-icon-s-order",
						children: [
							{
								id: 2-1,
								menuName: '角色列表',
							},
							{
								id: 2-2,
								menuName: '权限列表',
							}
						]
					},
					{
						id: 3,
						menuName: '商品管理',
						icon: "el-icon-s-cooperation",
						children: [
							{
								id: 3-1,
								menuName: '商品列表',
							},
							{
								id: 3-2,
								menuName: '分类参数',
							},
							{
								id: 3-3,
								menuName: '商品分类',
							}
						]
					},
					{
						id: 4,
						menuName: '订单管理',
						icon: "el-icon-s-open",
						children: [
							{
								id: 4-1,
								menuName: '订单管理1-1',
							},
							{
								id: 4-2,
								menuName: '订单管理1-2',
							}
						]
					},
					{
						id: 5,
						menuName: '数据统计',
						icon: "el-icon-s-data",
						children: [
							{
								id: 5-1,
								menuName: '数据统计1-1',
							},
							{
								id: 5-2,
								menuName: '数据统计1-2',
							}
						]
					}
				]
			}
		},
    // data() {
			
    //   const item = {
    //     date: '2016-05-02',
    //     name: '王小虎',
    //     address: '上海市普陀区金沙江路 1518 弄'
    //   };
    //   return {
    //     tableData: Array(20).fill(item)
    //   }
    // },
		methods: {
			
    }
  };
</script>
<style>
.el-container {
	height: 100%;
}
.el-header {
	background-color: #2c3e50;
}
.el-aside {
	height: 100%;
	background-color: #2c3e50;
  color: #fff;
}
.el-menu{
	border: 0;
}
.el-main{
	background-color: #eee;
}
</style>