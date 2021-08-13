<template>
<el-container>
  <el-header>
		<div>
			<el-avatar src=""></el-avatar>
			<span class="title">我的后台管理系统</span>
		</div>
		<el-button type="info" @click="logOut">退出</el-button>
	</el-header>
	<el-container>
		<el-aside :width='isCollapse ? "64px": "200px"'>
		<el-menu
			class="el-menu-vertical-demo"
			background-color="#2c3e50"
			text-color="#fff"
			unique-opened
			:collapse="isCollapse"
			:collapse-transition='false'
			:default-active='"/"+ localPath'
			router
			>
			<span class="icon el-icon-eleme" @click="showMenu"></span>
			<!-- 一级菜单 -->
			<el-submenu :index="menu.id +''" :key="menu.id" v-for="menu in menuList" >
				<template slot="title">
					<i :class="menu.icon"></i>
					<span>{{menu.menuName}}</span>
				</template>
				<!-- 二级菜单 -->
				<el-menu-item :index="'/'+ menuItem.path" :key="menuItem.id" v-for="menuItem in menu.children" @click="saveMenuItem(menuItem.path)">
					<template slot="title">
						<i class="el-icon-menu"></i>
						<span>{{menuItem.menuName}}</span>
					</template>
				</el-menu-item>
			</el-submenu>
		</el-menu>
	</el-aside>
	<el-main>
		<router-view />
	</el-main>
	</el-container>
</el-container>
</template>

<script>
  export default {
		data(){
			return{
				isCollapse: false,
				menuList: [
					{
						id: 1,
						menuName: '用户管理',
						icon: "el-icon-s-custom",
						path:'user',
						children: [
							{
								id: 1-1,
								menuName: '用户列表',
								path:'userList'
							}
						]
					},
					{
						id: 2,
						menuName: '权限管理',
						icon: "el-icon-s-order",
						path:'manage',
						children: [
							{
								id: 2-1,
								menuName: '角色列表',
								path: 'roleList'
							},
							{
								id: 2-2,
								menuName: '权限列表',
								path: 'permissList'
							}
						]
					},
					{
						id: 3,
						menuName: '商品管理',
						icon: "el-icon-s-cooperation",
						path:'goodsManage',
						children: [
							{
								id: 3-1,
								menuName: '商品列表',
								path: 'goodsList'
							},
							{
								id: 3-2,
								menuName: '分类参数',
								path: 'sortParams'
							},
							{
								id: 3-3,
								menuName: '商品分类',
								path: 'goodsSort'
							}
						]
					},
					{
						id: 4,
						menuName: '订单管理',
						icon: "el-icon-s-open",
						path: 'orderManage',
						children: [
							{
								id: 4-1,
								menuName: '订单管理1-1',
								path: 'orderManage1'
							},
							{
								id: 4-2,
								menuName: '订单管理1-2',
								path: 'orderManage2'
							}
						]
					},
					{
						id: 5,
						menuName: '数据统计',
						icon: "el-icon-s-data",
						path: 'dataManage',
						children: [
							{
								id: 5-1,
								menuName: '数据统计1-1',
								path: 'dataManage1',
							},
							{
								id: 5-2,
								menuName: '数据统计1-2',
								path: 'dataManage2',
							}
						]
					}
				],
				localPath: ''
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
		created(){
			this.localPath = window.sessionStorage.getItem('activePath')
			console.log(this.localPath, '==created this.localPath');
		},
		methods: {
			logOut(){
				window.sessionStorage.clear()
				this.$router.push('/login')
			},
			showMenu(){
				this.isCollapse = !this.isCollapse
			},
			saveMenuItem(path){
				console.log(path, '-=-');
				window.sessionStorage.setItem('activePath', path)
				// this.localPath = path
				// console.log(this.localPath, '--this.localPath');
			}
    },
		watch: {
			$route () {
				console.log(this.$route.matched[0].path, '9090909')
				this.localPath = this.$route.matched[0].path
			}
		}
  };
</script>
<style scoped>
.el-container {
	height: 100%;
}
.el-header {
	background-color: #2c3e50;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.el-avatar{
	vertical-align: middle;
}
.title {
	font-size: 18px;
	color: #fff
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
	position: relative;
}
.el-radio-group {
	position: absolute;
	left: 0;
	top: 0;
}
.icon {
	font-size: 24px;
	color: #fff;
}
</style>