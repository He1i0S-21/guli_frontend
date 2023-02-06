<template>
  <!-- 表格 -->
  <div class="app-contaniner">

  <!--查询表单-->
<el-form :inline="true">
    <el-form-item>
      <el-autocomplete
      class="inline-input"
      v-model="searchObj.name"
      :fetch-suggestions="querySearch"
      placeholder="讲师"
      :trigger-on-focus="false"
      value-key="name"
      
    ></el-autocomplete>
    </el-form-item>

    <el-form-item>
        <el-select v-model="searchObj.level" clearable placeholder="头衔">
            <el-option value="1" label="高级讲师"/>
            <el-option value="2" label="首席讲师"/>
        </el-select>
    </el-form-item>

    <el-form-item label="入驻时间">
        <el-date-picker
                        v-model="searchObj.joinDateBegin"
                        placeholder="开始时间"
                        value-format="yyyy-MM-dd" />
    </el-form-item>
    <el-form-item label="-">
        <el-date-picker
                        v-model="searchObj.joinDateEnd"
                        placeholder="结束时间"
                        value-format="yyyy-MM-dd" />
    </el-form-item>
    <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
        <el-button type="danger"  @click="batchRemove()">批量删除</el-button>
    </el-form-item>
</el-form>

<el-table :data="list"
        @selection-change="handleSelectionChange">
        
  <el-table-column
      label="#"
      width="50">
    <template slot-scope="scope">
        {{ (page - 1) * limit + scope.$index + 1 }}
    </template>
  </el-table-column>
    <el-table-column prop="name" label="名称" width="80" />
    <el-table-column prop ="level" label="头衔" width="90">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.level === 1" type="success" size="mini">高级讲师</el-tag>
          <el-tag v-if="scope.row.level === 2" size ="mini">首席讲师</el-tag>
        </template>
    </el-table-column>
    <el-table-column prop="intro" label="简介" />
    <el-table-column prop="sort" label="排序" width="60" />
    <el-table-column prop="joinDate" label="入驻时间" width="160" />
    <el-table-column label="操作" width="200" textalign="center">
    <template slot-scope="scope">
      <router-link :to="'/teacher/edit/'+scope.row.id">
        <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
      </router-link>
        <el-button 
        type="danger" 
        size="mini" 
        icon="el-icon-delete"
        @click="removeById(scope.row.id)">删除</el-button>
    </template>
</el-table-column>
</el-table>
<!-- 分页组件 -->
<!-- 回调函数，不用加（）组件自己调用 -->
<el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20]"
      style="padding: 30px 0; text-align: center"
      layout="sizes, prev, pager, next, jumper, ->, total"
      @current-change="changeCurrentPage"
      @size-change="changePageSize"/>
</div>
</template>

<script>
import teacherApi from '@/api/teacher'
export default {
  // 定义数据模型
  data() {
    return {
        list: [], // 数据列表
        total: 0, // 总记录数
        page: 1, // 页码
        limit: 5, // 每页记录数
        searchObj: {},// 查询条件
        multipleSelection: []// 批量删除选中的记录列表
    }
  },

  // 页面渲染成功后获取数据
  created() {
    this.fetchData()
  },

  // 定义方法
  methods: {
    fetchData() {
     // 调用api
     teacherApi.pageList(this.page, this.limit, this.searchObj).then(response => {
        this.list = response.data.row
        this.total = response.data.total
    })
    
    },
    // 每页记录数改变，size：回调参数，表示当前选中的“每页条数”
      changePageSize(size) {
          this.limit = size
          this.fetchData()
      },
  // 改变页码，page：回调参数，表示当前选中的“页码”
      changeCurrentPage(page) {
          this.page = page
          this.fetchData()
      }, 
      batchRemove(idList){
        if(this.multipleSelection.length===0){
          this.$message.warning("请选择要删除的记录！")
          return
        }
        this.$confirm("此操作会永久删除,是否继续？","提示",{
          confirmButtonText:'确定',
          cancelButtonText:"取消",
          type:'warning'
        }).then(()=>{
          var idlist=[];
          this.multipleSelection.forEach(item => {
            idlist.push(item.id)
          })
          return teacherApi.batchRemove(idList);
        }).then((response)=>{
          this.fetchData()
          this.$message.success(response.success)
        }).catch(error=>{
          if(error==='cancel'){
            this.$message.error("取消删除")
          }
        })
      }
      , 
      
      handleSelectionChange(selection){
        this.multipleSelection = selection
      },
      removeById(id){
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          return teacherApi.removeById(id)
        }).then((response)=>{
          this.fetchData()
          this.$message.success(response.message)
        }).catch(error =>{
          console.log('error',error)
          if(error==='cancel'){
            this.$message.info('取消删除')
          }
        })
      },
      querySearch(queryString,callback){
        teacherApi.selectNameListByKey(queryString).then((response)=>callback(response.data.nameList))
      }
  }
}

</script>
<style>

</style>