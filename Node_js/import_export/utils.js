function generateRandomNum(){
    return Math.floor(Math.random()*100) + 1;
}

function double(num){
    return 2*num;
}

// common js export 
// module.exports = {
//     generateRandomNum, double
// }

//module export

export {generateRandomNum, double};

