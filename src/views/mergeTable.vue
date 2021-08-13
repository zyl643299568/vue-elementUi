<template>
	<el-table
    :data="tableData"
    border
    style="width: 100%"
		class="table">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
	 data() {
		return {
			tableData: [{
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-04',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1517 弄'
			}, {
				date: '2016-05-01',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1519 弄'
			}, {
				date: '2016-05-03',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1516 弄'
			}]
		}
  },
	created(){
		dealFun()
	},
	methods: {
		dealFun (table, startRow, endRow, col) {
      var tb = this.$refs[table]
      if (!tb || !tb.rows || tb.rows.length <= 0) {
        return
      }
      if (col >= tb.rows[0].cells.length || (startRow >= endRow && endRow !== 0)) {
        return
      }
      if (endRow === 0) {
        endRow = tb.rows.length - 1
      }
      for (var i = startRow; i < endRow; i++) {
        if (tb.rows[startRow].cells[col].innerHTML === tb.rows[i + 1].cells[col].innerHTML) { // 如果相等就合并单元格,合并之后跳过下一行
          tb.rows[i + 1].removeChild(tb.rows[i + 1].cells[col])
          tb.rows[startRow].cells[col].rowSpan = (tb.rows[startRow].cells[col].rowSpan) + 1
        } else {
          this.dealFun(table, i + 1, endRow, col)
          break
        }
      }
    }
	}
}
</script>

<style>

</style>