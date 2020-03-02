<template>
    <el-container>
        <el-main>
            <el-card>
                <div slot="header" class="clearfix">
                    <span>頁面名称</span>
                </div>
                <el-row>

                    <el-form :inline="true">
                        <!--  第一列表單  -->
                        <el-row type="flex">
                            <el-col :span="16">
                                <el-form-item label="搜尋項目一">
                                    <el-select v-model="item1Value" placeholder="请选择">
                                        <el-option
                                                v-for="item in select1Options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item label="搜尋項目二">
                                    <el-input v-model="item2Value"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- 第二列表單  -->
                        <el-row>
                            <el-col :span="16">
                                <el-form-item label="搜尋項目三">
                                    <!--項目少時選擇-->
                                    <!--<el-radio v-model="item3Value" label="radio-1"></el-radio>-->
                                    <!--<el-radio v-model="item3Value" label="radio-2"></el-radio>-->

                                    <!--項目多時使用v-for-->
                                    <el-radio v-for="item in radioItems" v-model="item3Value" :key="item.key"
                                              :label="item.value"></el-radio>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="16">
                                <el-form-item label="搜尋項目四">
                                    <el-checkbox-group v-model="item4Value">
                                        <el-checkbox label="checkbox-1"></el-checkbox>
                                        <el-checkbox label="checkbox-4" disabled></el-checkbox>
                                        <el-checkbox label="checkbox-5" disabled></el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-button type="primary">搜尋</el-button>
                                <el-button type="primary">進階搜尋</el-button>
                                <el-button type="primary">匯出</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-row>
                <el-row>
                    <!--    table各屬性解析：border(外框)、stripe(斑馬紋)    -->
                    <el-table
                            class="tb-edit"
                            :data="tableData"
                            stripe
                            border
                            highlight-current-row
                            style="width: 100%"
                            @row-click="handleCurrentChange">
                        <el-table-column label="日期" width="180">
                            <template scope="scope">
                                <el-input size="small" v-model="scope.row.date" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.date}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="姓名" width="180">
                            <template scope="scope">
                                <el-input size="small" v-model="scope.row.name" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="address" label="地址">
                            <template scope="scope">
                                <el-input size="small" v-model="scope.row.address" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.address}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-card>
        </el-main>
    </el-container>
</template>
<script>
    export default {
        data() {
            return {
                //搜尋項目一 -- 值
                item1Value: '',
                item2Value: '',
                item3Value: '',
                item4Value: '',

                //select下拉選單
                select1Options: [
                    {
                        label: '1',
                        value: 1
                    }
                ],

                //radio選項
                radioItems: [
                    {
                        key: 1,
                        value: 'radio-1'
                    },
                    {
                        key: 2,
                        value: 'radio-2'
                    },
                    {
                        key: 1,
                        value: 'radio-3'
                    },
                ],
                //table資料
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
                }],
            }
        },
        created() {

        },
        mounted() {

        },
        watch: {},
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            // handleCurrentChange(row, event, column) {
            //     console.log(row, event, column, event.currentTarget)
            // },
            handleCurrentChange(row, event) {
                console.log(row, event)
            },
        }
    }
</script>
<style>
    .tb-edit .el-input {
        display: none
    }
    .tb-edit .current-row .el-input {
        display: block
    }
    .tb-edit .current-row .el-input+span {
        display: none
    }
</style>