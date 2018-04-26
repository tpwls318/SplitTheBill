
exports.testGet = function(req, res) {
    console.log('@@@@@@@@@');
    res.send('Hello Get!!!!');
}

exports.testPost = function(req, res) {
    console.log('$$$$$$$');
    console.log(req.body);
    res.send('Hello POST!!!!');
}

