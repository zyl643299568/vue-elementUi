<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
			<el-breadcrumb-item>活动列表</el-breadcrumb-item>
			<el-breadcrumb-item>活动详情</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card class="box-card" style="margin-top:20px">
			<el-table
				:data="tableData"
				border
				stripe
				style="width: 100%"
				>
				<el-table-column
					fixed
					width="100"
					type="selection">
				</el-table-column>
				<el-table-column
					fixed
					prop="date"
					label="日期"
					width="150">
				</el-table-column>
				<el-table-column
					prop="name"
					label="姓名"
					width="120">
				</el-table-column>
				<el-table-column
					prop="province"
					label="省份"
					width="120">
				</el-table-column>
				<el-table-column
					prop="city"
					label="市区"
					width="120">
				</el-table-column>
				<el-table-column
					prop="address"
					label="地址"
					width="200"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					prop="address"
					label="地址"
					width="200"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					prop="address"
					label="地址"
					width="200"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					prop="zip"
					label="邮编"
					width="120">
				</el-table-column>
				<el-table-column
					prop="zip"
					label="按钮测试"
					width="260">
					<template>
						<el-tooltip class="item" effect="dark" content="编辑" placement="top-start" :enterable='false'>
							<el-button type="primary" icon="el-icon-edit" circle size="mini"></el-button>
						</el-tooltip>
						<el-button type="warning" icon="el-icon-star-off" circle size="mini"></el-button>
  					<el-button type="danger" icon="el-icon-delete" range size="mini"></el-button>
					</template>
				</el-table-column>
				<el-table-column
					fixed="right"
					label="操作"
					width="140">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
						<el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<edit-drawer :showDrawer.sync='drawer' @close='drawer = false'/>
	</div>
</template>

<script>
import EditDrawer from './EditDrawer.vue'
export default {
	data(){
		return {
			tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
      }],
			drawer: false
		}
	},
	methods: {
		handleClick(row) {
			console.log(row);
		},
		handleEdit(row) {
			this.drawer = true
		}
	},
	components: {
		EditDrawer
	}
}
</script>

<style>

</style>