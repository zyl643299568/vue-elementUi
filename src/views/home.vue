<template>
<div>
	

	<div class="edit_container" style="margin-bottom: 20px">
      <!-- 图片上传组件辅助-->
      <!-- <el-upload
        class="avatar-uploader"
        :action="acd"
        name="img"
        :before-upload="beforeUpload">
      </el-upload> -->
      <!--富文本编辑器组件-->
        <!-- <quill-editor
          v-model="content"
          ref="text"
          :options="editorOption"
        >
        </quill-editor> -->
				<el-button type="primary" @click="submit">提交</el-button>
				<el-input-number v-model="num1"></el-input-number>
				<!-- 拖拽代码 -->
        <!-- <div class="drag-content">
          <draggable :options="dragOptions" v-model="tableData" group="people">
            <div class="right" v-for="(item, index) in tableData" :key="index">
              <p>{{index}}</p>
              <p>{{item.title}}</p>
              <p>{{item.name}}</p>
              <el-tooltip class="item" effect="dark" content="拖拽" placement="top-start">
                <i class="el-icon-more"></i>
              </el-tooltip>
            </div>
          </draggable>
        </div> -->
    </div>
		
		<!-- 级联选择器 设置默认值 -->
		<el-cascader 
		:options="options" 
		:show-all-levels="false" 
		v-model="selected" >
		</el-cascader>

    
    <el-form>
      <el-form-item v-for="(item) in testTableData" :key="item.userId">
        <el-select 
        v-model="selData[item.id]"
			  :value-key='item.id + ""'
				style="width: 300px" 
				multiple 
				clearable 
				placeholder="请选择"
				@change="handChange1(item.id, item)">
				<el-option
					v-for="it in item.pmList"
					:key="it.userId"
					:label="it.nickName"
					:value="it.userId">
				</el-option>
			</el-select>
      </el-form-item>
    </el-form>
</div>
	
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import draggable from 'vuedraggable'
export default {
	data(){
		return {
			selected: [''],
			content: '',
			uillUpdateImg: true,
			editorOption: {
        modules:{
          imageDrop: true,
          imageResize:{
            displaySize: true
          },
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
              ["image"], //上传图片
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
			num1: undefined,
			tableData: [{
				level: 'p0',
				title:'测试0',
				name: '张三'
			}, {
				level: 'p1',
				title:'测试1',
				name: '李四'
			}, {
				level: 'p2',
				title:'测试2',
				name: '王五'
			}, {
				level: 'p3',
				title:'测试3',
				name: '李六'
			}],
			dragOptions:{
        animation: 120,
        scroll: true,
        group: 'sortlist',
        ghostClass: 'ghost-style'
      },
			options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
			}],
      testTableData: [
				{
					id: 123,
					name: '个人版',
					pmList: [
						{
							nickName: '张三',
							userId: 1
						},
						{
							nickName: '铁蛋',
							userId: 2
						}
					],
					leader: [
						{
							nickName: '石头',
							userId: 3
						},
						{
							nickName: '二麻子',
							userId: 4
						}
					],
					reviewer: [
						{
							nickName: '李四',
							userId: 5
						},
						{
							nickName: '汪汪',
							userId: 6
						}
					]
				},
				{
					id: 234,
					name: '工作台',
					pmList: [
						{
							nickName: '张三',
							userId: 7
						},
						{
							nickName: '铁蛋',
							userId: 8
						}
					],
					leader: [
						{
							nickName: '石头2',
							userId: 9
						},
						{
							nickName: '二麻子2',
							userId: 10
						}
					],
					reviewer: [
						{
							nickName: '李四',
							userId: 11
						},
						{
							nickName: '汪汪',
							userId: 12
						}
					]
				}
			],
      selData: [],
      selectData: [],
      productTreeList: [
        {
          id: 1,
          name: '乙方宝',
          children: [
            {
              id: 2,
              name: '工作台',
              children: [
                {
                  id: 3,
                  name: '公众号'
                }
              ]
            }
          ]
        },
        {
          id: 4,
          name: '千里马',
          children: [
            {
              id: 5,
              name: '产品',
              children: [
                {
                  id: 6,
                  name: '测试'
                }
              ]
            }
          ]
        }
      ],
		}
	},
	mounted(){
		this.selected = ['zujian','basic','layout']
	},
	methods: {
		submit () {
			console.log(this.editorOption)
			console.log(this.$refs.text.value)
		},
		change(val) {
      console.log(val, '0-0-0-0');
      // this.$emit("update:proDetail", this.message);
    },
		// 上传图片前
    beforeUpload(file) {      //element 上传图片的方法
			console.log(file);
			var _this = this;
			// 获取富文本组件实例
			let quill = this.$refs.myQuillEditor.quill;
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function(e) {
				var obj = {
							imgData:e.target.result,  //给后台传的参数 base64格式的img参数
					};
				findList.uploadImage(qs.stringify(obj)).then(data => {
							console.log(data,'上传的图片')
							console.log(data.ResultObj);
					if(data.ResultCode==1){
									// 获取光标所在位置
									let length = quill.getSelection(true).index;
									// 插入图片  res.info为服务器返回的图片地址
									quill.insertEmbed(length, 'image', data.ResultObj);
									// 调整光标到最后
									quill.setSelection(length + 1)
							}else{
									this.$message({
											message: '图片上传失败!',
											type: 'error'
									});
							}
					});

			};
			return file;
		},
		indexMethod(index) {
			return index;
		},
    handChange1(id,item){
      console.log(this.selData, '----selData---',this.selData[id]);
    },
	},
	components: {
		quillEditor,
		draggable
	}
}
</script>

<style lang="scss" scoped>
.myQuillEditor {
	width: 800px;
	height: 300px;
}
.drag-content{
	.right {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.item {
			cursor: crosshair;
		}
	}
}
</style>