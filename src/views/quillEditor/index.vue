<template>
	<div style="padding: 20px">
		 <!-- 图片上传组件辅助-->
		<el-upload
			class="avatar-uploader"
			:action="uploadFileUrl"
			:on-preview="handlePreview"
			:file-list="fileList"
			:before-upload="handleBeforeUpload"
			:on-success="handleSuccess"
			:before-remove="beforeRemove">
			<el-button size="small" plain><i class="el-icon-upload2"></i>上传文件</el-button>
			<span slot="tip" class="up-tip">(不超过10M)</span>
		</el-upload>
    <!-- 富文本 -->
		<quill-editor 
		ref="text" 
		v-model="content" 
		class="myQuillEditor" 
		:options="editorOption">
		</quill-editor>
		<el-button type="primary" @click="submit">提交</el-button>
		<!-- 预览图片 -->
		<el-dialog class="v-diolag" append-to-body :visible.sync="dialogVisible">
			<img :src="dialogImageUrl" alt="" style="width: 100%;background: #fff">
		</el-dialog>
	</div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
	data(){
		return {
			uploadFileUrl: process.env.VUE_APP_BASE_API + "/common/uploadFileOss", // 上传的图片服务器地址
			dialogVisible: false,
			dialogImageUrl: '',
			fileList: [],
			content: '',
			editorOption: {
				placeholder: '请输入',
        modules:{
          // imageDrop: true,
          // imageResize:{
          //   displaySize: true
          // },
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
              ["blockquote", "code-block"], //引用，代码块
              [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
              [{ list: "ordered" }, { list: "bullet" }], //列表
              [{ script: "sub" }, { script: "super" }], // 上下标
              [{ indent: "-1" }, { indent: "+1" }], // 缩进
              [{ direction: "rtl" }], // 文本方向
              [{ size: ["small", false, "large", "huge"] }], // 字体大小
              [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
              [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
              [{ font: [] }], //字体
              [{ align: [] }], //对齐方式
              ["clean"], //清除字体样式
              ["image", "link", "video"], //上传图片  链接  视频
            ],  // 工具栏
            handlers: {
              'image': function (value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector('.avatar-uploader input').click()
                } else {
                  this.quill.format('image', false);
                }
              }
            }
          },
        },
        theme:'snow'
      },
		}
	},
	methods: {
		submit () {
			console.log(this.content)
			console.log(this.$refs.text.value)
		},
		// 判断是否是图片
    isAssetTypeAnImage(ext) {
    	return ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].indexOf(ext.toLowerCase()) !== -1;
    },
		// 预览之前做一些相关校验  在这个函数里处理
		handleBeforeUpload(file){
			const fileSize = file.size / 1024 /1024 < 10;
			if (!fileSize) {
				this.$message.error('上传文件大小不能超过10MB!');
				// 这里会有一个问题，即使校验未通过还是能上传上去，并且之前上传的文件也会丢失  return false不生效  还是会触发beforeRemove函数
				// 解决方案：在beforeRemove函数里面判断file的status 自己手动删除的status是success  未通过校验上传上去的status是‘ready’好像，反正不一样，可根据这个做判断
				return false   
			}
		},
		// 预览图片或者下载到本地 
		handlePreview(){
			var index= file.name.lastIndexOf(".");
      //获取后缀
      var ext = file.name.substr(index+1);
      if (this.isAssetTypeAnImage(ext)) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      } else {
        window.open(file.url,'_blank')
      }
		},
		// 上传成功
		handleSuccess(res, file){
      let fileImage = {}
      fileImage.url = (res && res.url) || URL.createObjectURL(file.raw);
      fileImage.name = file.name
      fileImage.fileName = fileImage.name // 上传图片文件名好像只能叫fileName，其他字段有问题
      this.fileList.push(fileImage)
		},
		// 删除
		beforeRemove(file){
			// 解决handleBeforeUpload return false无效bug
			if(file.status == 'success'){
				this.fileList.splice(this.fileList.findIndex(item => item.uid === file.uid), 1)
			}
		}
	},
	components: {
		quillEditor
	}
}
</script>

<style>

</style>