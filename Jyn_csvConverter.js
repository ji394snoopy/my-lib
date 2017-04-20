var http = require('http');
var https = require('https');

var path = require('path');
var url = require('url');

var fs = require('fs');
var iconv = require('iconv-lite');
var request = require('request');
var readline = require('readline');

//connect
var saving = checkFilePath(saveFile());
var isTitle = true;
var _Json = {};

//init
_Json['name'] = '日本';
_Json['level'] = '3';
_Json['childNode'] = [];
var levelMap = {
    0: null,
    1: 2,
    2: 3,
    3: 4,
    zip: 1,
    max: 3
};
var _inputPath = './jp_test.txt';
var _outputPath = './jp_test.json';

// main process function
var rl = readline.createInterface({
    input: fs.createReadStream(_inputPath)
});
rl.on('line', function(line) {
    if (isTitle || !line) {
        isTitle = false;
        return;
    }
    var _arr = line.split(',');
    filterRow(_Json.childNode, _arr, 0);
});

rl.on('close', function() {
    saving(_outputPath, JSON.stringify(_Json));
});


function filterRow(parent, arr, level) {
    for (var i = 0; i < parent.length; i++) {
        if (arr[levelMap[level + 1]] == parent[i].name) {
            return filterRow(parent[i].childNode, arr, level + 1);
        }
    }
    return parent.push(makeObj(arr, null, level + 1));
}

function makeObj(arr, parent, level) {
    var cell;
    if (level == levelMap.max) {
        cell = {
            name: arr[levelMap[level]],
            zip: arr[levelMap.zip]
        };
    } else {
        cell = makeObj(arr, {
            name: arr[levelMap[level]],
            childNode: []
        }, level + 1);
    }
    if (parent) parent.childNode.push(cell);
    else parent = cell;
    return parent;
}

function checkFilePath(fn) {
    var callback = fn;
    return function(filepath, body) {
        fs.access(filepath, (err) => {
            if (!err) {
                console.error('File already exists');
                fs.unlink(filepath, function(err) {
                    if (!err) {
                        console.log("unlink file : " + filepath);
                        callback(filepath, body);
                    } else {
                        console.log("unlink Err : " + err);
                    }
                });
                return;
            }
            callback(filepath, body);
        });
    }
}

function saveFile(coding) {
    var code = coding;
    return function(filepath, data) {
        console.log("save File : " + filepath);
        fs.appendFileSync(filepath, data);
    }

}


function encode(chunk, coding) {
    //turn binary to buffer
    //trun buffer to utf-8
    coding = coding || 'utf-8';
    var buf = new Buffer(chunk, 'binary');
    var data = iconv.decode(buf, coding);
    return data;
}

function compose(f, g, h) {
    return function(x) {
        return f(g(h(x)));
    };
}

//example data
//全國地方政府代碼,郵政編碼,國家名稱,城市名稱,鎮域內名
// 1101,600000,北海道,札幌市中央区,以下に掲載がない場合
// 1101,640941,北海道,札幌市中央区,旭ケ丘
// 1101,600031,北海道,札幌市中央区,北一条東
// 1102,10017,北海道,札幌市北区,北十七条西（１～６丁目）
// 1102,600817,北海道,札幌市北区,北十七条西（７～１３丁目）
// 1102,10018,北海道,札幌市北区,北十八条西（１～７丁目）
// 1102,600818,北海道,札幌市北区,北十八条西（８～１３丁目）
// 1102,10019,北海道,札幌市北区,北十九条西（２～７丁目）
// 23113,4630003,愛知県,名古屋市守山区,下志段味
// 23113,4630078,愛知県,名古屋市守山区,瀬古（大字）
