const { SuccessModel, ErrorModel } = require("../model/responseModel");
const { getBlogList, getBlogDetail, createNewBlog, updatedBlog, deleteBlog } = require("../controllers/blog");

const handlerBlogRoute = (req, res) => {
  const method = req.method;
  // 用户信息;
  const author = req.query.author || "";
  const keyWord = req.query.keyWord || "";
  // 数据信息;
  const id = req.query.id || "";
  const blogData = req.body;

  // GET 请求
  if (method === "GET") {
    // 获取博客列表路由
    if (req.path === "/api/blog/list") {
      const listDataPromise = getBlogList(author, keyWord);
      return listDataPromise.then((listData) => {
        return new SuccessModel(listData);
      });
    }
    // 获取博客详情路由
    if (req.path === "/api/blog/detail") {
      const detailDataPromise = getBlogDetail(id);
      return detailDataPromise.then((detailData) => {
        return new SuccessModel(detailData);
      });
    }
  }

  //   POST 请求
  if (method === "POST") {
    // 创建博客路由
    if (req.path === "/api/blog/new") {
      const newBlogDataPromise = createNewBlog(blogData);
      return newBlogDataPromise.then((newBlogData) => {
        return new SuccessModel(newBlogData);
      });
    }

    // 更新博客路由
    if (req.path === "/api/blog/update") {
      const updateBlogDataPromise = updatedBlog(id, blogData);
      return updateBlogDataPromise.then((updateBlogData) => {
        if (updateBlogData) {
          return new SuccessModel("更新博客成功");
        } else {
          return new ErrorModel("更新博客失败");
        }
      });
    }

    // 删除博客路由
    if (req.path === "/api/blog/delete") {
      const deleteBlogDataPromise = deleteBlog(id);
      return deleteBlogDataPromise.then((deleteBlogData) => {
        if (deleteBlogData) {
          return new SuccessModel("删除博客成功");
        } else {
          return new ErrorModel("删除博客失败");
        }
      });
    }
  }
};

module.exports = handlerBlogRoute;
