<template>
	<div class="login">
		<div class="loginWrapper">
			<div class="esTitle">辅料管理系统</div>
			<div class="loginArea">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px">
					<el-form-item prop="username">
						<el-input v-model="ruleForm.username" placeholder="username"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
					</el-form-item>
					<div class="btnWrapper">
						<el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
					</div>
					<p class="_tips" v-if='ok'>{{msg}}</p>
					<!--<p class="tips">Tips : 用户名和密码正确才能进入。</p>-->
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'login',
		data() {
			return {
				ruleForm: {
					username: '',
					password: ''
				},
				rules: {
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]
				},
				apiUrl: "http://localhost:8090/api/user/accesstoken",
				msg: '',
				ok: false
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {

                    // 已经实现了
					if(valid) {
						var authToken = null;
						this.$http.post(this.apiUrl, {ruleForm: this.ruleForm}).then((res) => {
							console.log(res);
							if(res.body.success == true){
								authToken = res.data.token;
							    localStorage.setItem('token', authToken);
							    this.$router.push('/search');
							}else{
								if(this.ruleForm.username && this.ruleForm.password !== ''){
									this.ok = true;
									this.msg = res.body.message;
								}							
							}
							
						}, (err) => {
							console.log(err);
						})
					} else {
						this.ok = false;
						return false;
					}
				});
			}
		}
	}
</script>

<style scoped>
	.login {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: #324157;
	}
	
	.loginWrapper {
		position: absolute;
		left: 50%;
		top: 40%;
		transform: translate(-50%, -50%);
	}
	
	.esTitle {
		text-align: center;
		font-size: 28px;
		color: #fff;
		margin-bottom: 30px;
	}
	
	.loginArea {
		width: 300px;
		height: 160px;
		padding: 40px;
		border-radius: 5px;
		background: #fff;
	}
	
	.btnWrapper button {
		width: 100%;
		height: 36px;
	}
	
	.tips {
		font-size: 12px;
		line-height: 30px;
		color: #999;
		margin: 0;
	}
	
	._tips {
		font-size: 12px;
		line-height: 30px;
		color: red;
		margin: 0;
	}
</style>