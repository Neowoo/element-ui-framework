<template>
    <el-container style="height: 100vh">
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
                    >
                        <el-table-column
                                label="日期"
                                width="180">
                            <template slot-scope="scope">
<!--                                <input type="date" v-model="scope.row.date">-->
                                <el-date-picker
                                        @keydown.tab.native="tabCooling($event, 170)"
                                        v-model="scope.row.date"
                                        type="date"
                                        placeholder="选择日期时间" @focus="focusDate" @blur="leaveDate">
                                </el-date-picker>
                            </template>

                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="姓名"
                                width="180">
                            <template slot-scope="scope">
                                <!--                                <span>{{scope.row.name}}</span>-->
                                <el-input
                                        v-model="tableData[scope.$index].name" @focus="focusInput" @blur="leaveEditCell" @keydown.tab.native="tabCooling($event)">

                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="食物"
                                width="180">
                            <template slot-scope="scope">
                                <!--                                <span>{{scope.row.date}}</span>-->
                                <el-select
                                        class="deposit-way-column"
                                        v-model="tableData[scope.$index].food"
                                        placeholder="請選擇" @focus="focusSelect" @blur="leaveEditSelect" @keydown.tab.native="tabCooling($event)">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
<!--                                <select-->
<!--                                        class="deposit-way-select"-->
<!--                                        v-model="tableData[scope.$index].food"-->
<!--                                        placeholder="請選擇" @focus="focusSelect" @blur="leaveEditSelect">-->
<!--                                    <option-->
<!--                                            v-for="item in options"-->
<!--                                            :key="item.value"-->
<!--                                            :label="item.label"-->
<!--                                            :value="item.value">-->
<!--                                    </option>-->
<!--                                </select>-->
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="地址">
                            <template slot-scope="scope">
                                <el-input
                                        v-model="tableData[scope.$index].address" @focus="focusInput" @blur="leaveEditCell" @input="verify($event,'test')" @keydown.tab.native="tabCooling($event)">

                                </el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
                <el-row>
                    <el-col style="text-align: center;margin-top: 20px">
                        <el-popover
                                placement="top"
                                width="160"
                                v-model="visible">
                            <p>这是一段内容这是一段内容确定删除吗？</p>
                            <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                                <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
                            </div>
                            <el-button type="primary" slot="reference">新增</el-button>
                        </el-popover>
                        <el-button type="primary" @click="changeTableData">
                            測試
                        </el-button>
                    </el-col>
                </el-row>


            </el-card>
        </el-main>
    </el-container>
</template>
<script>
    export default {
        data() {
            return {
                coolingTime: 0,
                lastFocusSelect: false,

                visible: false,
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
                tableData: [
                    {
                        id: 1,
                        date: '2020-03-23',
                        food: '选项1',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id: 2,
                        date: '2020-03-23',
                        food: '选项2',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                        id: 3,
                        date: '2020-03-23',
                        food: '选项3',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                        id: 4,
                        date: '2020-03-23',
                        food: '选项4',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    },
                ],

                //select選項
                options: [
                    {
                        value: '选项1',
                        label: '黄金糕'
                    },
                    {
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
        watch: {
            coolingTime(value){
                console.log(value);
            }
        },
        methods: {
            secondDecimalAndIntegerRegexForItem2Value(value) {
                let reg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
                // this.item2Value = value.replace(//, '');
            },
            leaveEditSelect(){
                console.log('leave select');
                this.lastFocusSelect = false;
            },
            leaveEditCell() {
                console.log('leave input');
            },
            focusInput(){
                if(this.lastFocusSelect){
                    let system = this;
                    setTimeout(function(){
                        if(system.lastFocusSelect){
                            system.focusInput();
                        } else {
                            console.log('focus input')
                        }
                    }, 5);

                }else{
                    console.log('focus input');
                }
            },
            focusSelect(){
                if(this.lastFocusSelect){
                    let system = this;
                    setTimeout(function(){
                        if(system.lastFocusSelect){
                            system.focusSelect();
                        } else {
                            console.log('focus select');
                            system.lastFocusSelect = true;
                        }
                    }, 1);
                } else {
                    console.log('focus select');
                    this.lastFocusSelect = true;
                }

            },
            /**
             *
             */
            changeTableData() {

            },
            focusDate(){
                if(this.lastFocusSelect){
                    let system = this;
                    setTimeout(function(){
                        if(system.lastFocusSelect){
                            system.focusDate();
                        } else {
                            console.log('focus date');
                            system.lastFocusSelect = true;
                        }
                    }, 1);
                } else {
                    console.log('focus date');
                    this.lastFocusSelect = true;
                }

            },
            leaveDate(){
                console.log('leave date');
                this.lastFocusSelect = false;
            },
            verify(value, column){
                console.log(value, column);
            },
            tabCooling(event){
                let limit_second = 80;
                if(this.coolingTime < limit_second && this.coolingTime !== 0){
                    event.preventDefault();
                } else if(this.coolingTime === 0) {
                    this.coolingTimeStart(limit_second);
                }
            },
            coolingTimeStart(limit){
                let limit_second = limit;
                let system = this;
                if (this.coolingTime >= limit) {
                    if (this.coolingTime === limit_second) {
                        this.coolingTime = 0
                    }
                } else {
                    this.coolingTime++;
                    setTimeout(function () {
                        system.coolingTimeStart(limit_second)
                    }, 1);
                }
            }
        }
    }
</script>
<style lang="scss">
    .edit-table {
        .el-input__inner {
            border-color: rgba(0, 0, 0, 0);
            background-color: rgba(0, 0, 0, 0);
        }

        .el-select {
            /*display: none;*/
        }

        .el-input {
            /*display: none;*/
        }
        .deposit-way-select{
            height: 40px;
            width: 100%;
            padding:0 30px 0 15px;
            font-size: inherit;
            text-align: center;
            border-color: rgba(0,0,0,0);
            background-color: rgba(0,0,0,0);
        }
        select{
            &:focus{
                /*appearance: auto;*/
            }
            appearance: none;
        }

    }
</style>