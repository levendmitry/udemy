'use strict';

// console.log("request data");

// const request = new Promise(function(resolve, reject){
//     setTimeout(() => {
//         console.log("....");
    
//         const product = {
//             name: "TV",
//             price: 2000,
//         };

//         resolve(product);
//     }, 2000);
// });

// request.then((product) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             product.status = "ordered";
//             resolve(product);
//         }, 2000);
//     });
// }).then(data => {
//     data.modify = true;
//     return data;
// }).then((data) => {
//     console.log(data);
// }).catch(() => {
//     console.error("error");
// }).finally(() => {
//     console.log("thats all folks");
// });


const test = function(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
};

// test(1000).then(() => console.log("1000ms"));
// test(2000).then(() => console.log("2000ms"));

Promise.all([test(1000), test(2000)]).then(() => {
    console.log("all is fine");
});

Promise.race([test(1000), test(2000)]).then(() => {
    console.log("all is fine");
});
