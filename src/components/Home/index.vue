<template>
    <el-container id="home">
        <!--    側邊欄    -->
        <el-aside width="200px">
            <el-row type="flex" align="middle" class="project-name-area">
                <!--                可放置開關側邊欄按鈕-->
                <el-col :span="8" style="text-align: center;font-size: 1.5rem; color: #fff;">
                    <i class="el-icon-s-fold"></i>
                </el-col>
                <el-col :span="8" style="text-align: center">
                    <span style="color: #fff">專案名稱</span>
                </el-col>
            </el-row>
            <el-menu
                    default-active="2"
                    class="sidebar-menu"
                    @open="handleSidebarItemOpen"
                    @close="handleSidebarItemClose">
                <!-- 分類大項 1-->
                <el-submenu index="1">
                    <!-- 第一層-->
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>項目一</span>
                    </template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>

                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">項目二</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                    <i class="el-icon-document"></i>
                    <span slot="title">項目三</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header
                    style="padding: 0 50px;box-shadow: 0px 1px 2px 2px rgba(237, 237, 237, 0.8); display: flex; align-items: center;justify-content: space-between">
                <!--    導覽列    -->
                <el-row style="width: 100%;">
                    <el-col :span="18">
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <!--:to='{pathz: '...'}'為指定切換路徑-->
                            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item>頁面名稱</el-breadcrumb-item>
                            <!--                    <el-breadcrumb-item>頁面二</el-breadcrumb-item>-->
                            <!--                    <el-breadcrumb-item>頁面三</el-breadcrumb-item>-->
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="6">
                        <el-row style="color: gray;">
                            <el-col :span="13">
                                {{clock}}
                            </el-col>
                            <el-col :span="7">
                                {{user_id}}
                            </el-col>
                            <el-col :span="4">
                                登出
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
<!--                &lt;!&ndash;資訊列&ndash;&gt;-->
<!--                <el-row class="info-row" type="flex" justify="end">-->
<!--                    <el-col class="clock">-->
<!--                        <span>-->
<!--                            {{clock}}-->
<!--                        </span>-->
<!--                        <span>-->
<!--                            {{user_id}}-->
<!--                        </span>-->

<!--                    </el-col>-->
<!--                </el-row>-->
            </el-header>
            <router-view></router-view>
        </el-container>
    </el-container>
</template>
<script>
    export default {
        data() {
            return {
                activeIndex2: '1',
                clock: '',
                user_id: 'sample_id'
            };
        },
        created(){

        },
        mounted() {
            this.getTimeNow();
        },
        watch: {

        },
        methods: {
            handleSidebarItemOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSidebarItemClose(key, keyPath) {
                console.log(key, keyPath);
            },

            /**
             * 取得現在時間。
             */
            getTimeNow(){
                const now_date_time = new Date();
                const year = now_date_time.getFullYear(); //取年份
                let month = now_date_time.getMonth() + 1; //取月份
                let date  = now_date_time.getDate(); //取日期
                let hour = now_date_time.getHours(); //取小時
                let minute = now_date_time.getMinutes(); //取分鍾
                let second = now_date_time.getSeconds(); //取秒數

                //未滿10補零
                if(month < 10) {
                    month = '0' + (now_date_time.getMonth() + 1);
                }
                if(date < 10) {
                    date = '0' + now_date_time.getDate();
                }
                if(hour < 10) {
                    hour = '0' + now_date_time.getHours();
                }

                if(minute < 10) {
                    minute = '0' + now_date_time.getMinutes();
                }

                if(second < 10) {
                    second = '0' + now_date_time.getSeconds();
                }

                const combination_time = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;


                this.clock = combination_time;
                setTimeout(this.getTimeNow, 1000);
            }
        }
    };
</script>
<style lang="scss">
    @import "../../sass/reset";
    @import "../../sass/variable";
    @import "vue-select/src/scss/vue-select.scss";


    #home {
        //左上角專案名稱區塊。
        .project-name-area {
            background-color: $sidebar-linear-start;
            height: 60px;
            box-sizing: border-box;
            border-bottom: 1px #fff solid;
            border-right: 1px #fff solid;
        }

        //左邊側邊欄
        .sidebar-menu {
            &.el-menu {
                li[role='menuitem'] {
                    color: #fff;
                }

                .el-submenu__title {
                    color: #fff;
                }

                i {
                    color: #fff;
                }

                height: 100vh;
                color: #fff;
                background: linear-gradient($sidebar-linear-start, $sidebar-linear-end);
            }
        }
    }
</style>