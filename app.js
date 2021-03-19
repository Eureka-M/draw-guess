const ws = require('ws');
let userList = [];
let guessWord = '';


((ws) => {
    const server = new ws.Server({
        port: 3000
    });

    const init = () => {
        bindEvent()
    }

    function bindEvent () {
        server.on('open', handleOpen)
        server.on('close', handleClose)
        server.on('error', handleError)
        server.on('connection', handleConnection)
    }

    function handleOpen () {
        console.log('服务端: open')
    }

    function handleClose (ws) {
        console.log('服务端: close')
    }

    function handleError () {
        console.log('服务端: error')
    }

    function handleConnection (ws) {
        console.log('服务端: connection')

        ws.on('message', handleMessage)
    }

    function handleMessage (msg) {
        console.log(msg)
        let msgCopy = JSON.parse(msg)

        //记录所有登录的用户并告知所有用户
        if (msgCopy.type == 'login') {
            userList.push({name: msgCopy.name, avatar: msgCopy.avatar})
            server.clients.forEach((c) => {
                c.send(JSON.stringify({type: 'loginRes', userList}))
            })

            // 聊天列表里显示消息：XXX进入了房间
            let answer = JSON.stringify({type: 'chat', msgType: 'chat', msg: msgCopy.name + '进入了房间', name: msgCopy.name, systemMsg: 'login'})
            server.clients.forEach((c) => {
                c.send(answer)
            })
        }

        //  用户断开连接
        if (msgCopy.type == 'disConnect') {
            console.log(msgCopy)
            console.log(userList)

            // 聊天列表里显示消息：XXX离开了房间
            let answer = JSON.stringify({type: 'chat', msgType: 'chat', msg: msgCopy.user.name + '离开了房间', name: msgCopy.name, systemMsg: 'logout'})
            server.clients.forEach((c) => {
                c.send(answer)
            })

            if (!userList.length) {
                return
            } else {
                let userIndex = userList.findIndex((item) => item.name == msgCopy.user.name)
                console.log(userIndex)
                if (userIndex != -1) {
                    userList.splice(userIndex, 1)
                }
            }
            console.log(userList)
            server.clients.forEach((c) => {
                c.send(JSON.stringify({type: 'loginRes', userList}))
            })
        }

        // 记录答案
        if (msgCopy.type == 'gameBegin') {
            if (msgCopy.guessWord) {
                guessWord = msgCopy.guessWord
            }
        }

        // 一轮结束后清除答案
        if (msgCopy.type == 'gameOver') {
            guessWord = ''
        }

        // 筛选聊天中的答案
        if (msgCopy.type == 'chat') {
            if (msgCopy.msgType == 'answer' && msgCopy.msg == guessWord) {
                let answer = JSON.stringify({type: 'chat', msgType: 'answer', msg: msgCopy.name + '猜对了答案', name: msgCopy.name, rightAnswer: true})
                server.clients.forEach((c) => {
                    c.send(answer)
                })
                return;
            }
        }

        server.clients.forEach((c) => {
            c.send(msg)
        })
    }

    init()

})(ws)