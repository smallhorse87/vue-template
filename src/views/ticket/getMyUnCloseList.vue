<!--suppress ALL -->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" class="demo-form-inline search-list">
        <el-form-item label="工单编号：">
          <el-input class="filter-item" clearable />
        </el-form-item>
        <el-form-item label="工单标题：">
          <el-input class="filter-item" clearable />
        </el-form-item>
        <el-form-item label="工单类型：">
          <el-select v-model="listQuery.ticketType" clearable class="filter-item">
            <el-option  v-for=" item in ticketTypeOptions " :key="item.name" :label="item.name" :value="item.name"/>
          </el-select>
        </el-form-item>
        <el-form-item label="工单来源：">
          <el-select v-model="listQuery.ticketSource" clearable class="filter-item">
            <el-option v-for=" (item,index) in ticketSourceOptions " :key="item" :label="item" :value="index"/>
          </el-select>
        </el-form-item>
        <el-form-item label="当前状态：">
          <el-select v-model="listQuery.status" clearable class="filter-item">
            <el-option v-for=" item in statusOptions " :key="item.name" :label="item.name" :value="item.name"/>
          </el-select>
        </el-form-item>
        <el-form-item label="当前节点：">
          <treeselect
            v-model="listQuery.departmentId"
            :multiple="false"
            :options="departmentOptions"
            :clearable="clearable"
            :flat="true"
            :default-expand-level="defaultExpandLevel"
            :max-height="800"
            placeholder="请选择"
            style="width:200"
            class="filter-item"/>
        </el-form-item>
        <el-form-item label="投诉等级：">
          <el-select v-model="listQuery.severity" clearable class="filter-item">
            <el-option v-for=" item in severityOptions " :key="item.name" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="服务质量：">
          <el-select v-model="listQuery.serviceQuality" clearable class="filter-item">
            <el-option v-for=" (item,index) in serviceQualityOptions " :key="item" :label="item" :value="index"/>
          </el-select>
        </el-form-item>
        <el-form-item label="提交人类型：">
          <el-select v-model="listQuery.submitType" clearable class="filter-item">
            <el-option v-for=" item in submitTypeOptions " :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="提交人姓名：">
          <el-input  v-model="listQuery.submitName" class="filter-item" clearable/>
        </el-form-item>
        <el-form-item label="提交人电话：">
          <el-input v-model="listQuery.submitMob" class="filter-item" clearable/>
        </el-form-item>
        <el-form-item label="提交时间">
          <el-date-picker
            v-model="listQuery.startTime"
            class="filter-item"
            style="width:  200px"
            type="datetime"
            value-format="timestamp"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="开始时间"/>
          至至
          <el-date-picker
            v-model="listQuery.endTime"
            class="filter-item"
            style="width:  200px"
            type="datetime"
            value-format="timestamp"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="结束时间"/>
        </el-form-item>
        <el-form-item label="关注：">
          <el-select v-model="listQuery.starred" clearable class="filter-item">
            <el-option v-for=" (item,index) in starredOptions " :key="item" :label="item" :value="!index"/>
          </el-select>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      </el-form>
    </div>


    <el-table
      v-loading="listLoading"
      v-bind:key="tableKey"
      v-bind:data="list"
      border
      fit
      hightligh-current-row
      style="width: 100%;margin-top: 20px;">
      <el-table-column align="center" label="序号" min-width="30px">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('ticket.ticketSn')" min-width="90px" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.ticketSn }}}</span>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import { getMyUnCloseList } from '@/api/ticket'
  import { ticketTypeSend, ticketSeveritySend, toggleTicketStar, ticketSend } from '@/api/ticket'
  import { getVisibleDepartmentTreeStruct, getCanHandleDepartmentTreeStruct } from '@/api/department'
  import { getTicketTypeOptions, getSubmitTypeOptions, getSeverityOptions, getStatusOptions, getChangeStatusOptions } from '@/utils/ticket'
  import { getTicketSourceOptions, getStarredOptions, getServiceQualityOptions } from '@/utils/ticket'
  import waves from '@/directive/waves' // Waves directive
  import { parseTime, loopTree } from '@/utils'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import LoadDepartment from '@/components/Department'

  export default {
    name: 'getMyUnCloseList',
    components: { Pagination, LoadDepartment, Treeselect },
    directives: { waves },
    data () {
      return {
        page: 1,

        clearable: true,
        defaultExpandLevel: 6,

        ticketTypeOptions: getTicketTypeOptions(),
        ticketSourceOptions: getTicketSourceOptions(),
        statusOptions: getStatusOptions(),
        departmentOptions: undefined,
        severityOptions: getSeverityOptions(),
        serviceQualityOptions: getServiceQualityOptions(),
        submitTypeOptions: getSubmitTypeOptions(),
        starredOptions: getStarredOptions(),

        listLoading: true,
        tableKey: 0,
        list: null,

        listQuery: {
          ticketType: undefined,
          ticketSource: undefined,
          status: undefined,
          departmentId: undefined,
          severity: undefined,
          submitType: undefined,
          submitName: undefined,
          submitMob: undefined,
          starred: undefined,
          startTime: undefined,
          endTime: undefined,
        }
      }
    },
    created() {
      this.getDepartment()
      this.getList()
    },
    methods: {
      getDepartment() {
        getVisibleDepartmentTreeStruct().then(response => {
          this.departmentOptions = response.data
        })
      },
      getList() {
        this.listLoading = true
        this.getListQuery()
        getMyUnCloseList(Object.assign({}, this.listQuery, { p : this.page - 1})).then(response => {
          const items = response.data.retArr
        })

      },
      getListQuery() {
        if(localStorage.getItem(this.listQueryName)){
          this.listQuery = JSON.parse(localStorage.getItem(this.listQuery))
        }
      },
      handleFilter() {
        this.getList()
      }
    }
  }
</script>
<style scoped>
  .link-type{
    color: #337ab7;
    cursor: pointer;
  }
  .edit-field{
    color: #ff7f50;
    cursor: pointer;
  }
  .filter-item{
    width: 150px;
  }
  .el-form-item{
    margin-bottom: 2px;
  }
  .el-dialog__wrapper{
    bottom: unset;
  }

</style>
