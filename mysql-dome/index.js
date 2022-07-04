const mysql  = require('mysql');

// 创建连接对象
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: 3306,
    database: 'myblog'
});

// 开始连接
// connection.connect();


// 执行SQL语句
const sql = `update blogs set state='1' where id='1'`;
connection.query(sql,(err, result) => {
    if(err) {
        console.error('error ##',err)
        return;
    }
    console.log(result);
})

// 关闭连接
// connection.end();