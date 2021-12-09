<template>
  <div class="wrap">
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
      :before-close='closeDrawer'>
      <div class="title-t">配置产品内问卷</div>
		  <el-divider></el-divider>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="问卷名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入少于20个字的问卷名称"></el-input>
        </el-form-item>
        <el-form-item label="问卷链接" prop="url">
          <el-input placeholder="请输入" v-model="ruleForm.url">
            <template slot="prepend">Http://</template>
          </el-input>
        </el-form-item>
        <el-form-item label="投放平台" prop="platForm" required>
          <el-checkbox-group v-model="ruleForm.platForm" >
            <el-checkbox label="乙方宝APP" name="type"></el-checkbox>
            <el-checkbox label="乙方宝公告号" name="type"></el-checkbox>
            <el-checkbox label="全网商机公众号" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="text-left" label="投放位置" prop="region" required>
          <el-checkbox label="弹窗" v-model="ruleForm.popup"></el-checkbox>
          <el-radio-group v-model="ruleForm.type">
            <el-radio label="拟建页" value='1'></el-radio>
            <el-radio label="中标页" value='2'></el-radio>
          </el-radio-group>
          <!-- <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="popupPicture" :src="popupPicture" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="aa.fileList"
            list-type="picture">
            <div v-if="aa.fileList.length>0">
              <img  v-for="file in aa.fileList" :key="file.name" :src="file.url" class="avatar">
            </div>
            <div v-else>
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">大小需小于300KB</div>
            </div>
          </el-upload>
          <br>
          <el-checkbox label="续费弹窗-吐槽按钮" v-model="ruleForm.continue"></el-checkbox>
        </el-form-item>
        <el-form-item label="投放时间" required>
          <el-date-picker
            v-model="ruleForm.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <!-- 目标用户 -->
        <el-form-item class="text-left" label="目标用户" prop="targetUser" required>
          <el-radio-group v-model="ruleForm.targetUser">
            <el-radio label="全量" value='11'></el-radio>
            <el-radio label="随机流量" value='22'></el-radio>
          </el-radio-group>
          <br>
          <!-- 目标用户-活跃状态-->
          <el-checkbox label="活跃状态" v-model="ruleForm.activeStatus"></el-checkbox>
          <br>
            <span>在</span>
            <el-date-picker
              class="date-style"
              v-model="ruleForm.user_date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <span>时间段内</span>
            <el-select class="date-select" v-model="ruleForm.poinType" placeholder="请选择">
              <el-option label="指定埋点" value="zd"></el-option>
              <el-option label="活跃" value="hy"></el-option>
            </el-select>
            <br>
            <div style="margin-top: 10px" v-if="ruleForm.poinType == 'hy'">
              <el-select class="date-select" v-model="ruleForm.activeCalculation" placeholder="请选择">
                <el-option label="大于等于" value="dayu"></el-option>
                <el-option label="小于等于" value="xiaoyu"></el-option>
              </el-select>
              <el-input-number v-model="ruleForm.num" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>天
            </div>
            <div style="margin-top: 10px">
              <span>触发</span>
              <el-input
                class="text-content"
                type="textarea"
                :rows="1"
                placeholder="请输入埋点"
                v-model="ruleForm.textarea">
              </el-input>
              <el-select class="date-select" v-model="ruleForm.appointCalculation" placeholder="请选择">
                <el-option label="大于等于" value="dayu"></el-option>
                <el-option label="小于等于" value="xiaoyu"></el-option>
              </el-select>
              <el-input-number v-model="ruleForm.num" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>次
            </div>
            <!-- 目标用户-付费状态 -->
            <div>
              <el-checkbox label="付费状态" v-model="ruleForm.payStatus" style="margin-top: 10px"></el-checkbox>
              <el-select class="date-select" v-model="ruleForm.selectStatus" placeholder="请选择">
                <el-option label="付过费" value="fgf"></el-option>
                <el-option label="从未付费" value="cwff"></el-option>
              </el-select>
              <!-- 付过费 -->
              <el-radio-group v-model="ruleForm.memberStatus">
                <span class="member-text">会员状态</span>
                <el-radio label="不区分" value='111'></el-radio>
                <el-radio label="在期会员" value='222'></el-radio>
                <el-radio label="过期会员" value='333'></el-radio>
              </el-radio-group>
              <div>
                <span class="member-text">付费时间</span>
                <el-switch
                  v-model="ruleForm.paySwitch"
                  active-color="#13ce66">
                </el-switch>
                <el-date-picker
                  class="pay-picker"
                  v-model="ruleForm.date"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
              <div>
                <span class="member-text">到期时间</span>
                <el-switch
                  v-model="ruleForm.expireSwitch"
                  active-color="#13ce66">
                </el-switch>
                <el-date-picker
                  class="pay-picker"
                  v-model="ruleForm.date"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </div>
        </el-form-item>
        <el-form-item label="样本量预估" prop="estimate" required>
          <el-select class="estimate-select" v-model="ruleForm.estimate" placeholder="请选择">
            <el-option label="全量计算" value="1"></el-option>
            <el-option label="1/4抽样计算" value="2"></el-option>
            <el-option label="1/8抽样计算" value="3"></el-option>
            <el-option label="1/16抽样计算" value="4"></el-option>
          </el-select>
          <el-button type="primary" @click="estimate('ruleForm')" style="margin: 0 10px">开始预估</el-button>
          <span>10000人</span>
        </el-form-item>
        <el-form-item class="btns">
          <el-button @click="cancelForm('ruleForm')">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>

export default {
  data() {
    return {
      drawer: false,
      ruleForm: {
        name: '',
        url: '',
        platForm: '',
        region: '',
        popup: '',
        continue: '',
        date: '',
        targetUser: '11',
        user_date: '',
        poinType: 'zd',
        payStatus: '',
        activeCalculation: 'dayu',
        appointCalculation: 'xiaoyu',
        selectStatus: 'fgf',
        num: 1,
        textarea: '',
        memberStatus: '',
        paySwitch: true,
        expireSwitch: true,

        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入问卷名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在20个字符以内', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入问卷链接', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在1000个字符以内', trigger: 'blur' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      aa : {
        id: 0,
        questionnaireName: "", // 问卷名称
        questionnaireLink: "", // 问卷链接
        platformYfbApp: 0, // 0 不生效 1 生效
        platformYfb: 0, // 0 不生效 1 生效
        platformQwsj: 0, // 0 不生效 1 生效
        popupWindow: 0, // 弹窗类型：0 不生效 1=拟建页；2=中标页
        popupPicture: "", // 弹窗图片
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        renewPopupWindow: 0,// 续费弹窗类型：0 不生效;1=生效
        startTime: null, // 投放开始时间
        stopTime: null, // 投放结束时间
        memberType: 0, // 10 全量  20 随机流量
        queryParam: {
          paramActivityStatus: {
            targetName: "test", // 指标类型： 指定埋点  活跃
            startTime: "",
            endTime: "",
            targetValue: "",  // 埋点值
            targetCondition: "", // 条件
            targetCtValue: "", // 条件值
          },
          paramPayStatus: {
            payStatus: 1,   // 付费状态：付费 1  未付费  2
            memberStatus: 0, // 会员状态：0 不区分  20 在期会员   30 过期会员
            payTimeFrom: "", 
            payTimeTo: "",
            expirTimeTo: "",
            expirTimeFrom: ""
          }
        },
        intime: null,  // 创建时间
        feedbackCount: 0, // 反馈人数
        createUser: "", // 创建者
        estimateRate: 0,  //样本量预估 1:全量 ， 1/4 :0.25 1/8:0.125
        estimateCount: 0, // 样本量预估人数
        status: 0, // 预估状态 -1  保存状态  2   计算异常  3
      }
    }
  },
  created(){
    // this.popupPicture = require('../assets/logo.png')
  },
  methods: {
    closeDrawer(){
      this.$emit('close')
    },
    cancelForm(){

    },
    estimate(){

    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    // handleAvatarSuccess(res, file) {
    //   this.popupPicture = '../assets/logo.png';
    //   // this.popupPicture = URL.createObjectURL(file.raw);
    // },
    beforeAvatarUpload(file) {
      const isLt300KB = file.size / 1024 < 300;

      if (!isLt300KB) {
        this.$message.error('上传头像图片大小不能超过 300KB!');
      }
      return isLt300KB;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleChange(){

    }
  },
  watch: {
    showDrawer(val){
      this.drawer = val;
    }
  },
  props: {
    showDrawer: Boolean,
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  .title-t {
    padding-left: 30px;
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    text-align: left;
  }
  .el-divider {
    margin: 0;
  }
  .demo-ruleForm {
    padding: 20px 30px 20px 10px;
  }
  .el-checkbox-group{
    text-align: left;
  }
  .text-left {
    text-align: left !important;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .date-style {
    width: 200px;
  }
  .date-select {
    width: 110px;
  }
  .el-input-number {
    width: 106px;
  }
  .el-textarea {
    width: 30%;
    height: 40px;
  }
  .member-text {
    font-size: 14px;
    color: #606266;
    font-weight: 500;
    margin-right: 10px;
  }
  .pay-picker{
    width: 240px;
  }
  .estimate-select {
    width: 160px;
    margin-left: -70px;
  }
  .btns {
    float: right;
  }
}


</style>