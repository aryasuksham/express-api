const winston = require('winston');

// const logConfiguration = {
//     'transports': [
//         new winston.transports.Console()
//     ]
// }

// const logConfiguration = {
//     'transports': [
//         new winston.transports.File({
//             filename: 'logs/example.log'
//         })
//     ]
// };

const logConfiguration = {
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            level: 'error',
            filename: 'logs/example.log'
        })
    ]
};

const logger = winston.createLogger(logConfiguration);

logger.error("the first error!");
logger.warn("first warning!");
logger.warn("second warning!");
logger.error("the second error!");
logger.info("some info!");
logger.debug("a debug!");

// const logger = winston.createLogger(logConfiguration);

// logger.log({
//     message: 'Hello, Winston!',
//     level: 'info'
// });

// logger.info('Hello, Winston!');

