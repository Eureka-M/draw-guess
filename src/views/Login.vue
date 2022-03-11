<template>
    <div class="login-wrapper">
        <div class="card-wrapper">
            <Card style="width:420px">
                <h3>进入游戏</h3>
                <div class="name">
                    <span>昵称：</span>
                    <Input style="width: calc(100% - 100px)" v-model="name" @on-enter="login"/>
                </div>
                <span>选择头像：</span>
                <div class="img-list">
                    <div class="img-item" v-for="(item, index) in imgList" 
                        :key="index" 
                        @click="curIndex=index"
                        >
                        <img :src="item.url" :class="{active: (curIndex === index)}"> 
                        <!-- <img src="../assets/avatar1.jpg"> -->
                        <!-- 坑：img的src属性绑定不能动态绑定 链接：https://blog.csdn.net/qq_33744228/article/details/81319485 -->
                    </div>
                </div>
                <Button type="primary" style="margin-top: 20px; margin-left: 130px; width: 100px;" @click="login">登录</Button>
            </Card>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            imgList: [
                {"url": require("../assets/avatar1.jpg")},
                {"url": require("../assets/avatar2.jpg")},
                {"url": require("../assets/avatar3.jpg")},
                {"url": require("../assets/avatar4.jpg")},
                {"url": require("../assets/avatar5.jpg")},
                {"url": require("../assets/avatar6.jpg")},
                {"url": require("../assets/avatar7.jpg")},
                {"url": require("../assets/avatar8.jpg")},
                {"url": require("../assets/avatar9.jpg")},
                {"url": require("../assets/avatar10.jpg")},
            ],
            curIndex: 0,
            name: '',
            ws: this.$store.state.ws
        }
    },
    methods: {
        login () {
            if (!this.name) {
                this.$Message.warning('昵称不能为空')
                return 
            }
            let user = {"name": this.name, "avatar": this.curIndex}
            this.$store.commit('user', user)
            this.ws.send(JSON.stringify({type: 'login', name: this.name, avatar: this.curIndex}))
            this.$router.push('/home')
        }
    }
}
</script>

<style lang="less" scoped>
    .login-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;

        .card-wrapper {
            text-align: left;

            h3 {
                text-align: center;
                margin-bottom: 10px;
            }

            .name {
                margin-bottom: 10px;
            }

            .img-list {
                margin-top: 10px;
                width: 320px;
                margin-left: 33px;

                .img-item {
                    width: 60px;
                    height: 60px;
                    display: inline-block;
                    &:hover {
                        cursor: pointer;
                    }

                    .active {
                        border: 2px solid #1795ff;
                    }

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>