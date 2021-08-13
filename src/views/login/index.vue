<template>
	<div class="login-box">
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="账号" prop="username">
				<el-input type="username" v-model="ruleForm.username" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>

</template>

<script>
export default {
	data(){
		return {
			ruleForm: {
				username: "",
				password: ""
			},
			rules: {
				username: [
					{ required: true, trigger: 'blur', message: "用户名不能为空"}
				],
				password: [
					{ required: true, trigger: 'blur', message: "密码不能为空"}
				]
			}
		}
	},
	methods: {
		submitForm(){
			this.$router.push('/index')
		},
		resetForm(){
			const data = this.$options.data()
			Object.assign(this.ruleForm, data.ruleForm)
		}
	}
}
</script>

<style>
.login-box {
	width: 30%;
	height: 180px;
	padding: 70px 60px 30px 0px;
	background-color: antiquewhite;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
}
</style>