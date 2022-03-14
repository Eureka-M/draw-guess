export function sleep(sleepSeconds) {
    return new Promise((resolve, reject) => {
        let countDownTimer = setTimeout(() => {
            console.log(sleepSeconds + '秒之后timer执行完毕')
            countDownTimer = null
            resolve()
        }, sleepSeconds * 1000)
    })
}