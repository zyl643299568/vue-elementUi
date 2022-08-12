<template>
	<div>
		<H2>测试文件</H2>
		<!-- flex布局 -->
		<div>
			<div class="a">
				<div class="b p">B</div>
				<div class="c p">C</div>
				<div class="d p">D</div>
			</div>
			<div class="searchBox">
				<div>
					<span class="rightSpan">指派人:</span>
					<el-select
										v-model="aa"
										filterable
										placeholder="请选择"
										size="small"
										class="elMarginClass">
					</el-select>
				</div>
				<div>
					<span class="rightSpan">创建人:</span>
					<el-select
										v-model="aa"
										filterable
										placeholder="请选择"
										size="small"
										class="elMarginClass">
										<option value="1"></option>
					</el-select>
				</div>
				<div>
					<span class="rightSpan">任务类型:</span>
					<el-select
										v-model="aa"
										size="small"
										placeholder="全部"
										class="elMarginClass">
										<option value="1"></option>
					</el-select>
				</div>
				<div>
					<span class="rightSpan">创建时间:</span>
					<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
													type="daterange"
													range-separator="至"
													start-placeholder="开始日期"
													end-placeholder="结束日期"
													size="small"
													class="mr10">
					</el-date-picker>
				</div>
				<div>
					<span class="rightSpan">要求完成时间:</span>
					<el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
													type="daterange"
													range-separator="至"
													start-placeholder="开始日期"
													end-placeholder="结束日期"
													size="small"
													class="mr10">
					</el-date-picker>
				</div>
				<div class="elMarginTop">
					<span class="rightSpan">优先级:</span>
					<el-select 
										v-model="aa"
										placeholder="全部"
										class="elMarginClass"
										size="small">
									<option value="1"></option>
					</el-select>
					
				</div>
				<div>
					<span class="rightSpan">延期状态:</span>
					<el-select 
										v-model="aa"
										placeholder="全部"
										class="elMarginClass"
										size="small">
									<option value="1"></option>
					</el-select>
				</div>
				<div>
					<el-button type="primary"
										size="small">查 询</el-button>
					<el-button plain
										size="small">重 置</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
data(){
	return {
		aa: ''
	}
}
}
</script>

<style lang='scss' scoped>
.a {
	/* width: 1000px; */
	display: flex;
	align-items: center;
	}
.b, .c, .d {
	width: 200px;
	height: 100px;
}
.b {
	flex: 1;
	background: orange;
}
.c {
	/* flex-grow: 1; */
	background: gold;
}
.d {
	flex: 4;
	background: greenyellow;
}
.searchBox {
	display: flex;
	
	div {
		display: flex;
		align-items: center;
		flex: 1 1 0%;
		span {
			display: inline-block;
			max-width: 120px;
			text-align: right;
		}
	}
}
</style>