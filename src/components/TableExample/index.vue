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
                                    <el-input v-model="item2Value"
                                              @input="secondDecimalAndIntegerRegexForItem2Value"></el-input>
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
                                    <el-radio v-for="item in radioItems" v-model="item3Value" :key="item.value"
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
                            :data="tableData"
                            stripe
                            border
                            class="edit-table"
                            style="width: 100%"
                            @cell-click="tableCellClick">
                        <el-table-column
                                label="日期"
                                width="180">
                            <template slot-scope="scope">
                                <span>{{scope.row.date}}</span>
                                <el-select
                                        v-model="selectValue"
                                        placeholder="請選擇" @blur="leaveEditCell">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="姓名"
                                width="180">
                            <template slot-scope="scope">
                                <span>{{scope.row.name}}</span>
                                <el-input
                                        v-model="nameValue" @blur="leaveEditCell">

                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="地址">
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
                //當前編輯列id
                editRowId: '',

                //搜尋項目一 -- 值
                item1Value: '',
                item2Value: '',
                item3Value: '',
                item4Value: '',

                //select下拉選單
                select1Options: [
                    {
                        label: '1',
                        value: 'select-1',
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
                    id: 1,
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    id: 2,
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    id: 3,
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    id: 4,
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],

                //select選項
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                selectValue: '',
                nameValue: '',
            }
        },
        created() {

        },
        mounted() {

        },
        watch: {},
        methods: {
            secondDecimalAndIntegerRegexForItem2Value(value) {
                let reg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
                console.log(reg.test(value));
                // this.item2Value = value.replace(//, '');
            },
            tableCellClick(row, column, cell){
                switch (column.label) {
                    case this.$t('date'): {
                        this.dateCellEdit(row, cell);
                        break;
                    }
                    case this.$t('name'): {
                        this.nameCellEidt(row, cell);
                        break;
                    }
                    default: {
                        break;
                    }
                }
            },
            /**
             *
             * @param row
             * @param cell
             */
            dateCellEdit(row, cell){
                this.editRowId = row.id;
                let cell_string = cell.children[0].children[0];
                let cell_input = cell.children[0].children[1];
                cell_string.style.display = 'none';
                cell_input.style.display = 'block';
            },
            /**
             *
             * @param row
             * @param cell
             */
            nameCellEidt(row, cell){
                let cell_string = cell.children[0].children[0];
                let cell_input = cell.children[0].children[1];
                console.log(cell_string);
                cell_string.style.display = 'none';
                cell_input.style.display = 'block';
            },
            leaveEditCell(){
                // alert(this.selectValue);
            },
            leaveSelectEditCell() {
                alert(this.selectValue);
            }

        }
    }
</script>
<style lang="scss">
    .edit-table {
        .el-select {
            display: none;
        }
        .el-input {
            display: none;
        }
    }
</style>