const querystring = require("querystring");

const handlerBlogRoute = require("./src/routes/blog.js");

// 处理 POST 数据
const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }
    if (req.headers["Content-Type"] === "application/json") {
      resolve({});
      return;
    }

    // POST 数据
    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString();
    });

    req.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      }
      console.log(postData);
      // if (typeof postData === "string") {
      //   resolve(JSON.parse(postData));
      // }
      resolve(JSON.parse(postData));
    });
  });
};

const serverHandler = (req, res) => {
  // 设置响应内容格式
  res.setHeader("Content-Type", "application/json");

  const url = req.url;
  req.path = url.split("?")[0];

  // 解析参数 query
  req.query = querystring.parse(url.split("?")[1]);

  const responseData = {
    name: "Chen",
    age: 18,
  };

  // 处理数据的过程
  getPostData(req).then((postData) => {
    req.body = postData;

    // 路由
    let blogDataPromise = handlerBlogRoute(req, res);
    if (blogDataPromise) {
      blogDataPromise.then((blogData) => {
        res.end(JSON.stringify(blogData));
      });
      return;
    }

    // 未匹配到任何路由，则重写返回内容格式
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 Not Found");
    res.end();
  });
};

module.exports = serverHandler;
