// 获取博客列表
const getBlogList = (author, keyWord) => {
  return [
    {
      id: 1,
      title: "标题1",
      content: "内容1",
      author: "zhangsan",
      createdAt: 1656819215636,
    },
    {
      id: 2,
      title: "标题2",
      content: "内容2",
      author: "lisi",
      createdAt: 1656819241268,
    },
    {
      id: 3,
      title: "标题3",
      content: "内容3",
      author: "chen",
      createdAt: 1656819245737,
    },
    {
      id: 4,
      title: "标题4",
      content: "内容4",
      author: "wangwu",
      createdAt: 1656819252335,
    },
  ];
};

// 获取博客详情
const getBlogDetail = (id) => {
  return {
    id: 1,
    title: "标题1",
    content: "内容1",
    author: "zhangsan",
    createdAt: 1656819215636,
  };
};

// 创建博客
const createNewBlog = (blogData = {}) => {
  console.log(blogData);
};

// 更新博客
const updatedBlog = (id, blogData = {}) => {
  console.log(blogData);
  return true;
};

// 删除博客
const deleteBlog = (id) => {
  console.log(id);
  return true;
};

module.exports = {
  getBlogList,
  getBlogDetail,
  createNewBlog,
  updatedBlog,
  deleteBlog,
};
