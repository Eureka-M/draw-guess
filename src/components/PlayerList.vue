<template>
    <div class="player-list-wrapper">
        <div class="player-list">
            <div class="player-item" v-for="(player, index) in userList" :key="index">
                <div class="avatar" :class="{'avatar-drawer': drawer && (drawer.name == player.name)}">
                    <!-- require("../assets/avatar1.jpg") -->
                    <img :src="require(`../assets/avatar${player.avatar + 1}.jpg`)">
                </div>
                <div class="name">
                    <p>{{player.name}}</p>
                    <span v-if="drawer && (drawer.name == player.name)" class="drawer"></span>
                    <!-- <p>{{player.score}}</p> -->
                    <span v-if="houseOwner && (houseOwner.name == player.name)" class="houseowner">房主</span>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    computed: {
        userList () {
            return this.$store.state.userList
        },
        drawer () {
            return this.$store.state.drawer
        },
        user () {
            return this.$store.state.user
        },
        houseOwner () {
            return this.$store.getters.houseOwner
        },
        houseOwnerIsMe () {
            return this.houseOwner.name == this.$store.state.user.name
        },
    }
}
</script>

<style lang="less" scoped>
    .player-list-wrapper {
        width: 200px;
        height: 650px;
        background: #fff;
        border-radius: 6px;
        padding: 10px;

        .player-list {
            width: calc(100% );
            height: 100%;
            overflow-y: scroll;

            .player-item {
                width: 100%;
                height: 80px;
                margin-bottom: 4px;
                border-bottom: 1px solid #ccc;
                display: flex;
                align-items: center;
                justify-content: space-around;

                &:last-child {
                    border-bottom: none;
                }

                .avatar {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: #FFD700;
                    border: 4px solid #ccc;

                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }

                .avatar-drawer {
                    border: 4px solid #1296db;
                }

                .name {
                    text-align: left;
                    width: 80px;

                    p {
                        margin: 0;
                    }

                    .drawer {
                        width: 24px;
                        height: 24px;
                        background: url(../assets/drawer.png);
                        display: inline-block;
                        background-size: 100% 100%;
                    }

                    .houseowner {
                        font-size: 12px;
                        background: cornflowerblue;
                        color: #fff;
                        padding: 0 5px;
                        display: inline-block;
                        vertical-align: super;
                    }
                }
            }
        }

        
    }
</style>