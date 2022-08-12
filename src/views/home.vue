<template>
  <div>

    <div class="edit_container"
         style="margin-bottom: 20px">
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
    <el-cascader :options="options"
                 :show-all-levels="false"
                 v-model="selected">
    </el-cascader>

    <el-form>
      <el-form-item v-for="(item) in testTableData"
                    :key="item.userId">
        <el-select v-model="selData[item.id]"
                   :value-key='item.id + ""'
                   style="width: 300px"
                   multiple
                   clearable
                   placeholder="请选择"
                   @change="handChange1(item.id, item)">
          <el-option v-for="it in item.pmList"
                     :key="it.userId"
                     :label="it.nickName"
                     :value="it.userId">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 图片拖拽 -->
    <el-table :data="dragTableData"
              style="width: 100%">
      <el-table-column prop="name"
                       label="位置">
      </el-table-column>
      <el-table-column prop="planList"
                       label="计划">
        <template slot-scope="scope">
          <draggable class="img-wrap"
                     :options="dragOptions"
                     v-model="scope.row.planList"
                     group="people">
            <div class="img-first"
                 v-for="(item, index) in scope.row.planList"
                 :key="index">
              <span>{{index+1}}</span>
              <el-popover placement="top-start"
                          title="标题"
                          width="200"
                          trigger="hover"
                          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                <div class="img-second"
                     slot="reference">
                  <div v-for="(i, index) in item.imgList"
                       :key="index">
                    <el-image style="width: 100%; height: 100%"
                              :src="i.url"
                              fit="contain"></el-image>
                  </div>
                </div>
              </el-popover>
            </div>
          </draggable>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary"
               @click="add">添加</el-button>
    <!-- 添加、删除select -->
    <el-row v-for="(item, ind) in queryParam"
            :key="ind"
            class="row-flex">
      <el-select v-model="item.name1"
                 :placeholder="item.placeholder"
                 @change="queryNameChange(item,ind)">
        <el-option label="程序打开就触发"
                   value="0" />
        <el-option label="页面打开"
                   value="1" />
        <el-option label="程序打开就触发"
                   value="2" />
      </el-select>
      <el-select v-model="item.name2"
                 :placeholder="item.placeholder">
        <el-option label="招标信息详情"
                   value="11"></el-option>
        <el-option label="中标结果详情"
                   value="22"></el-option>
        <el-option label="拟建信息详情"
                   value="33"></el-option>
        <el-option label="中标单位详情"
                   value="44"></el-option>
        <el-option label="实时中标详情"
                   value="55"></el-option>
      </el-select>
      次数大于
      <el-input style="width:100px"
                v-model="item.num" /> 次
      <el-button type="primary"
                 @click="addChild(ind)">添加筛选</el-button>
      <el-button type="primary"
                 @click="deleParent(ind)">删除筛选</el-button>
      <el-row v-for="(i, index) in item.children"
              :key="index">
        <div>
          <el-select v-model="i.childName"
                     :placeholder="item.placeholder"
                     @change="queryNameChange(item,ind)">
            <el-option label="程序打开就触发"
                       value="0" />
            <el-option label="页面打开"
                       value="1" />
            <el-option label="程序打开就触发"
                       value="2" />
          </el-select>
          <el-select v-model="i.childName2"
                     :placeholder="item.placeholder"
                     @change="queryNameChange(item,ind)">
            <el-option label="程序打开就触发"
                       value="0" />
            <el-option label="页面打开"
                       value="1" />
            <el-option label="程序打开就触发"
                       value="2" />
          </el-select>
          <el-button type="primary"
                     @click="deleteChild(ind, index)">--</el-button>
        </div>
      </el-row>
    </el-row>
    <!-- 动态预览效果 -->
    <div class="prefile">
      <div class="left-wrap"
           id="btn-wrap">
        <div v-if="!btnPressStatus"
             @click="clickBtn"
             :style="`width: 200px; height:40px; line-height:40px; text-align:center; cursor: pointer;color: ${btnParams.textColor}; border: 1px solid ${btnParams.borderColor}; border-radius:${btnParams.borderRadius}px; background-color: ${btnParams.backgroundColor}`">
          {{btnParams.inputText}}</div>
        <div id="btn-wrap"
             v-else
             @click="clickBtn"
             :style="`width: 200px; height:40px; line-height:40px; text-align:center;cursor: pointer;color: ${btnPressParams.textColor}; border: 1px solid ${btnPressParams.borderColor}; border-radius:${btnPressParams.borderRadius}px; background-color: ${btnPressParams.backgroundColor}`">
          {{btnParams.inputText}}</div>
      </div>
      <div class="right-wrap">
        <el-input v-model="btnParams.inputText" />
        <div class="default-status">
          <span>默认状态</span>
          <el-color-picker :disabled='!btnParams.inputText || btnPressStatus'
                           v-model="btnParams.textColor"></el-color-picker>
          <el-color-picker :disabled='btnPressStatus'
                           v-model="btnParams.borderColor"></el-color-picker>
          <el-slider :disabled='btnPressStatus'
                     v-model="btnParams.borderRadius"></el-slider>
          <el-color-picker :disabled='btnPressStatus'
                           v-model="btnParams.backgroundColor"></el-color-picker>
        </div>

        <div class="press-status">
          <span>按下状态</span>
          <el-color-picker :disabled='!btnPressStatus'
                           v-model="btnPressParams.textColor"></el-color-picker>
          <el-color-picker :disabled='!btnPressStatus'
                           v-model="btnPressParams.borderColor"></el-color-picker>
          <el-slider :disabled='!btnPressStatus'
                     v-model="btnPressParams.borderRadius"></el-slider>
          <el-color-picker :disabled='!btnPressStatus'
                           v-model="btnPressParams.backgroundColor"></el-color-picker>
        </div>
        <el-button type="primary"
                   @click="submitParams">提交</el-button>
      </div>
    </div>
    <!-- input添加select值 -->

    <div>
      <el-select v-model="selectVal"
                 placeholder="请选择关键字"
                 @change="changeSel">
        <el-option label="哈喽呀"
                   value="哈喽呀"></el-option>
        <el-option label="吗咿呀嘿"
                   value="吗咿呀嘿"></el-option>
      </el-select>
      <!-- <el-input v-model="inputVal" /> -->
      <quill-editor v-model="inputVal"
                    ref="text"
                    :options="editorOption"
                    style="height: 300px">
      </quill-editor>
      <div class="color-picker font-color-picker">
        <el-color-picker popper-class='aaa'
                         v-model="selectColor"></el-color-picker>
      </div>
    </div>
    <el-image style="width: 500px; height: 500px"
              :src="imgUrl"
              fit="fit"></el-image>

    <wang-editor />
    <editor-for-vue />
  </div>

</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import draggable from 'vuedraggable'
import domtoimage from 'dom-to-image'
export default {
  data() {
    return {
      selected: [''],
      content: '',
      uillUpdateImg: true,
      editorOption: {
        modules: {
          // imageDrop: true,
          // imageResize:{
          //   displaySize: true
          // },
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
              ['blockquote', 'code-block'], //引用，代码块
              [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
              [{ list: 'ordered' }, { list: 'bullet' }], //列表
              [{ script: 'sub' }, { script: 'super' }], // 上下标
              [{ indent: '-1' }, { indent: '+1' }], // 缩进
              [{ direction: 'rtl' }], // 文本方向
              [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
              [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
              [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
              [{ font: [] }], //字体
              [{ align: [] }], //对齐方式
              ['clean'], //清除字体样式
              ['image', 'link'] //上传图片
            ], // 工具栏
            handlers: {
              // 'image': function (value) {
              //   if (value) {
              //     // 触发input框选择图片文件
              //     document.querySelector('.avatar-uploader input').click()
              //   } else {
              //     this.quill.format('image', false);
              //   }
              // }
            }
          }
        },
        theme: 'snow'
      },
      num1: undefined,
      tableData: [
        {
          level: 'p0',
          title: '测试0',
          name: '张三'
        },
        {
          level: 'p1',
          title: '测试1',
          name: '李四'
        },
        {
          level: 'p2',
          title: '测试2',
          name: '王五'
        },
        {
          level: 'p3',
          title: '测试3',
          name: '李六'
        }
      ],
      dragOptions: {
        animation: 120,
        scroll: true,
        group: 'sortlist',
        ghostClass: 'ghost-style'
      },
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                },
                {
                  value: 'fankui',
                  label: '反馈'
                },
                {
                  value: 'xiaolv',
                  label: '效率'
                },
                {
                  value: 'kekong',
                  label: '可控'
                }
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                },
                {
                  value: 'dingbudaohang',
                  label: '顶部导航'
                }
              ]
            }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                {
                  value: 'layout',
                  label: 'Layout 布局'
                },
                {
                  value: 'color',
                  label: 'Color 色彩'
                },
                {
                  value: 'typography',
                  label: 'Typography 字体'
                },
                {
                  value: 'icon',
                  label: 'Icon 图标'
                },
                {
                  value: 'button',
                  label: 'Button 按钮'
                }
              ]
            },
            {
              value: 'form',
              label: 'Form',
              children: [
                {
                  value: 'radio',
                  label: 'Radio 单选框'
                },
                {
                  value: 'checkbox',
                  label: 'Checkbox 多选框'
                },
                {
                  value: 'input',
                  label: 'Input 输入框'
                },
                {
                  value: 'input-number',
                  label: 'InputNumber 计数器'
                },
                {
                  value: 'select',
                  label: 'Select 选择器'
                },
                {
                  value: 'cascader',
                  label: 'Cascader 级联选择器'
                },
                {
                  value: 'switch',
                  label: 'Switch 开关'
                },
                {
                  value: 'slider',
                  label: 'Slider 滑块'
                },
                {
                  value: 'time-picker',
                  label: 'TimePicker 时间选择器'
                },
                {
                  value: 'date-picker',
                  label: 'DatePicker 日期选择器'
                },
                {
                  value: 'datetime-picker',
                  label: 'DateTimePicker 日期时间选择器'
                },
                {
                  value: 'upload',
                  label: 'Upload 上传'
                },
                {
                  value: 'rate',
                  label: 'Rate 评分'
                },
                {
                  value: 'form',
                  label: 'Form 表单'
                }
              ]
            },
            {
              value: 'data',
              label: 'Data',
              children: [
                {
                  value: 'table',
                  label: 'Table 表格'
                },
                {
                  value: 'tag',
                  label: 'Tag 标签'
                },
                {
                  value: 'progress',
                  label: 'Progress 进度条'
                },
                {
                  value: 'tree',
                  label: 'Tree 树形控件'
                },
                {
                  value: 'pagination',
                  label: 'Pagination 分页'
                },
                {
                  value: 'badge',
                  label: 'Badge 标记'
                }
              ]
            },
            {
              value: 'notice',
              label: 'Notice',
              children: [
                {
                  value: 'alert',
                  label: 'Alert 警告'
                },
                {
                  value: 'loading',
                  label: 'Loading 加载'
                },
                {
                  value: 'message',
                  label: 'Message 消息提示'
                },
                {
                  value: 'message-box',
                  label: 'MessageBox 弹框'
                },
                {
                  value: 'notification',
                  label: 'Notification 通知'
                }
              ]
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'menu',
                  label: 'NavMenu 导航菜单'
                },
                {
                  value: 'tabs',
                  label: 'Tabs 标签页'
                },
                {
                  value: 'breadcrumb',
                  label: 'Breadcrumb 面包屑'
                },
                {
                  value: 'dropdown',
                  label: 'Dropdown 下拉菜单'
                },
                {
                  value: 'steps',
                  label: 'Steps 步骤条'
                }
              ]
            },
            {
              value: 'others',
              label: 'Others',
              children: [
                {
                  value: 'dialog',
                  label: 'Dialog 对话框'
                },
                {
                  value: 'tooltip',
                  label: 'Tooltip 文字提示'
                },
                {
                  value: 'popover',
                  label: 'Popover 弹出框'
                },
                {
                  value: 'card',
                  label: 'Card 卡片'
                },
                {
                  value: 'carousel',
                  label: 'Carousel 走马灯'
                },
                {
                  value: 'collapse',
                  label: 'Collapse 折叠面板'
                }
              ]
            }
          ]
        },
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'jiaohu',
              label: '组件交互文档'
            }
          ]
        }
      ],
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
      dragTableData: [
        {
          name: '需求名称',
          planList: [
            {
              imgList: [
                {
                  url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                },
                {
                  url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
                }
              ]
            },
            {
              imgList: [
                {
                  url: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
                }
              ]
            },
            {
              imgList: [
                {
                  url: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
                },
                {
                  url: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg'
                }
              ]
            }
          ]
        }
      ],
      queryParam: [
        {
          name1: '',
          name2: '',
          placeholder: '请选择',
          num: null,
          children: []
        }
      ],
      customColor: '#409eff',
      btnParams: {
        inputText: '',
        textColor: '',
        borderColor: 'red',
        borderRadius: 10,
        backgroundColor: ''
      },
      btnPressStatus: false, // 按钮是否按下
      btnPressParams: {
        textColor: '',
        borderColor: '#eee',
        borderRadius: 10,
        backgroundColor: ''
      },
      selectVal: '',
      inputVal: '',
      selectColor: '',
      imgUrl: ''
    }
  },
  mounted() {
    this.selected = ['zujian', 'basic', 'layout']
  },
  // watch: {
  //   inputVal(val){
  //     console.log(val, '---');
  //   }
  // },
  methods: {
    changeSel() {
      this.inputVal = this.inputVal + this.selectVal
      console.log('selectInput', this.inputVal, this.selectVal)
    },
    submitParams() {
      const dom = document.getElementById('btn-wrap')
      domtoimage.toJpeg(dom).then((url) => {
        // this.imgUrl = url
        // const img = 'data:image/png;base64,' + img
        const file = this.base64ImgtoFile(url) // 得到File对象
        console.log(file, '0-0-0-0')
        this.imgUrl =
          window.webkitURL.createObjectURL(file) ||
          window.URL.createObjectURL(file) // imgUrl图片网络路径
      })
    },
    clickBtn() {
      this.btnPressStatus = !this.btnPressStatus
    },
    addChild(ind) {
      this.queryParam[ind].children.push({
        childName: '',
        childName2: ''
      })
    },
    deleteChild(ind, index) {
      this.queryParam[ind].children.splice(index, 1)
    },
    add() {
      this.queryParam.push({
        name1: '',
        name2: '',
        placeholder: '请选择',
        num: null,
        children: []
      })
    },
    deleParent(ind) {
      if (this.queryParam.length == 1) return
      this.queryParam.splice(ind, 1)
    },
    queryNameChange(item, ind) {},
    // 上传图片前
    beforeUpload(file) {
      //element 上传图片的方法
      console.log(file)
      var _this = this
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        var obj = {
          imgData: e.target.result //给后台传的参数 base64格式的img参数
        }
        findList.uploadImage(qs.stringify(obj)).then((data) => {
          console.log(data, '上传的图片')
          console.log(data.ResultObj)
          if (data.ResultCode == 1) {
            // 获取光标所在位置
            let length = quill.getSelection(true).index
            // 插入图片  res.info为服务器返回的图片地址
            quill.insertEmbed(length, 'image', data.ResultObj)
            // 调整光标到最后
            quill.setSelection(length + 1)
          } else {
            this.$message({
              message: '图片上传失败!',
              type: 'error'
            })
          }
        })
      }
      return file
    },
    indexMethod(index) {
      return index
    },
    handChange1(id, item) {
      console.log(this.selData, '----selData---', this.selData[id])
    },

    base64ImgtoFile(dataurl, filename = 'file') {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const suffix = mime.split('/')[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
      })
    }
  },
  components: {
    quillEditor,
    draggable
  }
}
</script>
<style lang="scss" scoped>
// .el-color-picker{
//   height: 10px;
//   .el-color-picker__trigger{
//     height: 10px !important;
//   }
// }
// ::v-deep .el-color-picker--mini .el-color-picker__trigger {
//   height: 10px;
// }
// .color-picker {
//   .el-color-picker__icon {
//     display: none !important;
//   }
//   .el-icon-arrow-down {
//     display: none !important;
//   }
//   .el-color-picker__color-inner{
//     position: relative;
//     bottom: 0;
//     height: 20% !important;
//     display: block !important;
//   }
// }

::v-deep .el-color-picker {
  .el-color-picker__trigger {
    height: 10px !important;
  }
}
.myQuillEditor {
  width: 800px;
  height: 300px;
}
.drag-content {
  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item {
      cursor: crosshair;
    }
  }
}
.img-wrap {
  display: flex;
  .img-first {
    padding: 0 10px;
  }
  .img-second {
    display: flex;
    height: 100px;
  }
}
.prefile {
  display: flex;
  .left-wrap {
    width: 300px;
    height: 100px;
    background: #333;
    opacity: 0.6;
  }
}
.default-status,
.press-status {
  display: flex;
  align-items: center;
  .el-slider {
    width: 100px;
  }
}
</style>
<style lang="scss">
.el-color-picker__trigger {
  height: 15px !important;
}
.el-icon-close:before,
.el-icon-arrow-down:before {
  content: 'A' !important;
  color: #000;
  font-size: 18px;
  margin-bottom: 10px;
}
.el-color-picker__empty {
  top: -10px;
}
.el-color-picker__icon {
  top: -5px;
}
//   .el-color-picker__trigger {
//     height: 12px !important;
//     // width: 16px !important;
//     padding: 2px;
// }
</style>