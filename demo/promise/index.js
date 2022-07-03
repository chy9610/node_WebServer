const fs = require("fs");
const path = require("path");

// // 读取文件内容
// function getFileContent(filename, callback) {
//   // 数据文件的完整路径
//   const fullFilename = path.resolve(__dirname, "data", filename);

//   fs.readFile(fullFilename, (err, data) => {
//     if (err) return new Error(err);

//     callback(JSON.parse(data.toString()));
//   });
// }

// // 回调地狱
// getFileContent("a.json", (data) => {
//   console.log("a文件", data);
//   getFileContent(data.next, (bData) => {
//     console.log("b文件", bData);
//     getFileContent(bData.next, (cData) => {
//       console.log("c文件", cData);
//     });
//   });
// });


// Promise 写法
function getFileContent(filename) {
  return new Promise((resolve, reject) => {
    const fullFilename = path.resolve(__dirname, "data", filename);

    fs.readFile(fullFilename, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(JSON.parse(data.toString()));
    });
  });
}


getFileContent("a.json").then((data) => {
  console.log(data);
  return getFileContent(data.next);
}).then(bData => {
    console.log(bData)
    return getFileContent(bData.next);
}).then(cData => {
    console.log(cData);
});
