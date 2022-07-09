const SqlString = require("sqlstring");
const { execSQL } = require("../db/mysql");

// 获取博客列表
const getBlogList = (author, keyWord) => {
  let sql = `select * from blogs where state='1' `;
  if (author) {
    sql += `and author='${author}'`;
  }
  if (keyWord) {
    sql += `and title like '%${keyWord}%'`;
  }

  sql += ";";

  return execSQL(sql);
};

// 获取博客详情
const getBlogDetail = (id) => {
  let sql = `select * from blogs where id=${SqlString.escape(" or 1 =1--max ")}`;
  console.log("sql 语句", sql);
  return execSQL(sql).then((rows) => {
    return rows[0] || {};
  });
};

// 创建博客
const createNewBlog = (blogData = {}) => {
  const title = blogData.title;
  const content = blogData.content;
  const author = blogData.author;

  let sql = `
  insert into blogs (title,content,author,create_time) values ('${title}','${content}','${author}',now())
  ;`;

  return execSQL(sql).then((res) => {
    return {
      id: res.insertId,
    };
  });
};

// 更新博客
const updatedBlog = (id, blogData = {}) => {
  const title = blogData.title;
  const content = blogData.content;
  let sql = `update blogs set title='${title}', content='${content}' where id=${id};`;
  return execSQL(sql).then((updateRes) => {
    if (updateRes.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

// 删除博客
const deleteBlog = (id) => {
  // 软删除 （逻辑删除）
  const sql = `update blogs set state='0' where id=${id};`;
  // 硬删除 （物理删除）
  // const sql = `delete from blogs where id=${id};`;

  return execSQL(sql).then((deleteDataRes) => {
    if (deleteDataRes.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

module.exports = {
  getBlogList,
  getBlogDetail,
  createNewBlog,
  updatedBlog,
  deleteBlog,
};
