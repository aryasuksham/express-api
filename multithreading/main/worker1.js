const mongoose = require('mongoose');
const Admin = mongoose.model("Admin");
const { parentPort, workerData } = require('worker_threads');

parentPort.postMessage("Hi Main Thread!");
const data=async ()=>{
   await Admin.find({lastName:'Arya'})
        .then(data => {
            return data;
        })
        .catch(err => { console.log("ERROR: ", err) })
}

parentPort.on("message", parentMsg => {
    // Admin.find({})
    // .then(data=>{
    parentMsg.port.postMessage(data)
    // })
    // .catch(err=>{console.log("ERROR: ",err)})


    // const arr=[1,3,44,87,098];
    // if(arr){
    //     parentMsg.port.postMessage(arr)
    // }

    //to get the message fron worker2:
    // parentMsg.port.on('message', workerMsg => {
    //     console.log(`Worker ${parentMsg.id} got msg from other worker: `, workerMsg);
    // })
})
parentPort.on('messageerror', er => {
    console.log(er);
})