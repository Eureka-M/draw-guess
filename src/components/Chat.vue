<template>
    <div class="chat-wrapper">
        <div class="answer">
            <ul>
                <li v-for="(answer, index) in answerList" 
                    :key="index">
                    <span v-if="answer.rightAnswer">
                        {{answer.msg}}
                    </span>
                    <span v-else>{{answer.name}}: {{answer.msg}}</span>
                </li>
            </ul>
            <Input v-if="drawer && drawer.name == user.name || gameStatus == 'over'" disabled style="margin-top: 10px" placeholder="按下Enter发送回答..."/>
            <Input v-else style="margin-top: 10px" placeholder="按下Enter发送回答..." @on-enter="sendMessage(ANSWER_MESSAGE)" v-model="answerContent"/>
        </div>
        <div class="chat">
            <ul>
                <li v-for="(chat, index) in chatList" :key="index">
                    <span v-if="chat.systemMsg && chat.systemMsg == 'login'">
                        <span class="system-msg"></span>{{chat.msg}}
                    </span>
                    <span v-else-if="chat.systemMsg && chat.systemMsg == 'logout'">
                         <span class="system-msg"></span>{{chat.msg}}
                    </span>
                    <span v-else>{{chat.name}}: {{chat.msg}}</span>
                </li>
            </ul>
            <Input style="margin-top: 10px" placeholder="按下Enter发送聊天..." @on-enter="sendMessage(CHAT_MESSAGE)" v-model="chatContent"/>
        </div>
    </div>
</template>

<script>
const ANSWER_MESSAGE = 0
const CHAT_MESSAGE = 1
export default {
    data () {
        return {
            ANSWER_MESSAGE: ANSWER_MESSAGE,
            CHAT_MESSAGE: CHAT_MESSAGE,
            answerContent: '',
            chatContent: '',
            ws: this.$store.state.ws
        }
    },
    computed: {
        answerList () {
            return this.$store.getters.answerList
        },
        chatList () {
            return this.$store.getters.chatList
        },
        user () {
            return this.$store.state.user
        },
        drawer () {
            return this.$store.state.drawer
        },
        gameStatus () {
            return this.$store.state.gameStatus
        }
    },
    methods: {
        sendMessage (messageType) {
            if (messageType == ANSWER_MESSAGE) {
                if (this.answerContent == '') {
                    this.$Message.warning('发送文字不能为空')
                    return;
                }

                this.ws.send(JSON.stringify({type: 'chat', msgType: 'answer', msg: this.answerContent, name: this.user.name}))
                this.answerContent = ''
            } else {
                if (this.chatContent == '') {
                    this.$Message.warning('发送文字不能为空')
                    return;
                }

                this.ws.send(JSON.stringify({type: 'chat', msgType: 'chat', msg: this.chatContent, name: this.user.name}))
                this.chatContent = ''
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .chat-wrapper {
        width: 700px;
        height: 240px;
        margin-left: 10px;
        border-radius: 6px;
       
        margin-top: 10px;
        display: flex;

        .answer, .chat {
            width: 340px;
            height: 240px;
            background: #fff;
            border-radius: 6px;
            padding: 10px;

            ul {
                height: 180px;
                overflow-y: scroll;

                li {
                    list-style: none;
                    text-align: left;
                    
                    span {
                        .system-msg {
                            display: inline-block;
                            width: 20px;
                            height: 20px;
                            background: url('../assets/system.png');
                            vertical-align: sub;
                            background-size: 100% 100%;
                        }
                    }
                }
            }
        }

        .chat {
            margin-left: 20px;
        }
    }
</style>