setImmediate(() => {
    console.info('[阶段3.immediate] immediate 回调1')
    console.info('---------10----------')
})
setImmediate(() => {
    console.info('[阶段3.immediate] immediate 回调2')
    console.info('---------11----------')
})
setImmediate(() => {
    console.info('[阶段3.immediate] immediate 回调3')
    console.info('---------12----------')
})

setTimeout(() => {
    console.info('[阶段1...定时器] 定时器 回调1')
    console.info('---------5----------')
}, 0)
setTimeout(() => {
    console.info('[阶段1...定时器] 定时器 回调5')
    console.info('---------6----------')
    process.nextTick(() => {
        console.info('[...待切入下一阶段] nextTick 回调2')
        console.info('---------7----------')
        setTimeout(() => {
            console.info('---------8888888----------')
        }, 0)
    }) 
}, 0)
setTimeout(() => {
    console.info('[阶段1...定时器] 定时器 回调3')
    console.info('---------8----------')
}, 0)
setTimeout(() => {
    console.info('[阶段1...定时器] 定时器 回调4')
    console.info('---------9----------')
}, 0)

process.nextTick(() => {
    console.info('[...待切入下一阶段] nextTick 回调1')
    console.info('---------1----------')
}) 
process.nextTick(() => {
    console.info('[...待切入下一阶段] nextTick 回调2')
    console.info('---------2----------')
    process.nextTick(() => {
        console.info('[...待切入下一阶段] nextTick 回调4')
        console.info('---------4----------')
        process.nextTick(() => {
            console.info('[...待切入下一阶段] nextTick 回调4')
            console.info('---------99999----------')
            setTimeout(() => {
                console.info('---------9----rrrrfggggggggggggggr------')
            }, 0)
            Promise.resolve().then(() => {
                console.info('promise----')
                process.nextTick(() => {
                    console.info('NIQUCAIYA')
                })
            })
            process.nextTick(() => {
                console.info('NIQUCAIYA----')
                process.nextTick(() => {
                    console.info('NIQUCAIYA-------------')
                })
                Promise.resolve().then(() => {
                    console.info('promise--------')
                })
            })
        })
        Promise.resolve().then(() => {
            console.info('promise')
        })
    }) 
    // setImmediate(() => {
    //     console.info('[阶段3.immediate] immediate 回调2')
    //     console.info('---------99999----------')
    // })
})
process.nextTick(() => {
    console.info('[...待切入下一阶段] nextTick 回调3')
    console.info('---------3----------')
    setTimeout(() => {
        console.info('---------9----rrrrr------')
        setTimeout(() => {
            console.info('---------9----rrrrrkkkkkkkkkkkkk------')
        }, 0)
    }, 0)
}) 
