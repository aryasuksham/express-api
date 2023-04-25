const { Worker, MessageChannel } = require('worker_threads');
const mongoose = require('mongoose');
const Admin = mongoose.model("Admin");

// const worker1=new Worker(__dirname+'/worker1.js');
// const worker2=new Worker(__dirname+'/worker2.js');

// const {port1, port2}=new MessageChannel();

// worker1.on('message',message=>console.log('Message from worker1 is: ',message));


// worker1.postMessage({port:port1,id:worker1.threadId},[port1])
// worker2.postMessage({port:port2,id:worker2.threadId},[port2])

const getDetails = async (req, res) => {
    const worker1 = new Worker(__dirname + '/worker1.js');
    const worker2 = new Worker(__dirname + '/worker2.js');

    const { port1, port2 } = new MessageChannel();

    worker1.on('message', message => console.log('Message from worker1 is: ', message));

    worker1.postMessage({ port: port1, id: worker1.threadId }, [port1])
    worker2.postMessage({ port: port2, id: worker2.threadId }, [port2])

    await worker2.on('message', message => {
        console.log('Message from worker2 is: ', message)
        res.send(message)
    });
}

const getUpdates = async(req, res) => {

    Admin.find({ lastName: 'Arya' })
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(e => { console.log(e) })
}


module.exports = { getDetails, getUpdates }