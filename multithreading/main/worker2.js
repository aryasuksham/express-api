const { parentPort, workerData } = require('worker_threads');

parentPort.on("message", parentMsg => {
    parentMsg.port.postMessage(`Hey! I am ${parentMsg.id}`)

    parentMsg.port.on('message', data => {
        // const result=[];
        // for(let k=0;k<data.length;k++ ){
        //    if(data[i].lastName==="Arya"){
        //     result.push(data[i])
        //    }
        // }
        const re=data.length;
        const result=`Length of the array is ${re}`
        // const result = data.every(lastName => data.find(item => item.lastName === 'Arya'))
        parentPort.postMessage(result);
        // data.lastName=='Arya'
    })
})

// parentPort.postMessage("Hi Main Thread!");