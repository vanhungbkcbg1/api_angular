/**
 * Created by vanhung on 4/9/2016.
 */

var mysql = require('mysql');
var dbinfo = {

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
};

var pool = null;
function selectQuery(query, param, success, error) {
    if (!(param instanceof Array)) {
        if (error) {
            error('Param not an array');
            return;
        }
    }
    initConnection();
    pool.getConnection(function (err, connection) {
        // Use the connection
        if (err) {
            error(err);
            connection.release();
            return;
        }
        connection.query(query, param, function (err, rows, field) {
            // And done with the connection.

            if (err) {
                error(err);
                connection.release();
                return;
            }
            if (success) {
                success(rows);
                connection.release();
            }


        });
    });

}

function initConnection() {
    pool = mysql.createPool(dbinfo);
}
function execureQuery(query,param,success,error)
{
    initConnection();
    pool.getConnection(function (err, connection) {
        // Use the connection
        if (err) {
            error(err);
            connection.release();
            return;
        }
        connection.query(query, param, function (err, rows, field) {
            // And done with the connection.

            if (err) {
                error(err);
                connection.release();
                return;
            }
            if (success) {
                success(rows);
                connection.release();
            }


        });
    });
}


module.exports.selectQuery = selectQuery;
module.exports.excuteQuery=execureQuery;

