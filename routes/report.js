let client=require('../db');
let async=require('async');
module.exports.get=(req,res,next)=>{
    "use strict";
    async.series([
        (callback)=>{
            client.query("SELECT surname,name,patronymic,tel,address FROM users WHERE id=$1",[req.session.userId],(err,result)=>{
                callback(null,result.rows[0])
            });
        },
        (callback)=>{
            client.query("SELECT id,text FROM statements WHERE user_id=$1",[req.session.userId],(err,result)=>{
                callback(null,result.rows[req.params.id])
            });
        }
    ],(err,result)=>{
        console.log(result);
        res.render('report',{
            surname:result[0].surname,
            name:result[0].name,
            patronymic:result[0].patronymic,
            address:result[0].address,
            tel:result[0].tel,
            text:result[1].text,
            number:result[1].id
        })
    })

};