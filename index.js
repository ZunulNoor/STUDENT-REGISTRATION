const express = require('express')
const app = express()
const port = 2597
const mysql = require('./connection').con
app.set('view engine', 'hbs')
app.set('views', './view')


app.get('/', (req, res) => {
    res.render('index')
})


app.get('/add', (req, res) => {
    res.render('add')
})
app.get('/addstudent', (req, res) => {
    const { name, phone, email, gender } = req.query
    let qry = "select * from users where email=? or phone=?"
    mysql.query(qry, [email, phone], (err, results) => {
        if (err) {
            throw err
        }
        else {
            if (results.length > 0) {
                res.render("add", { checkmesg: true })

            } else {
                let qry2 = "insert into users values(?,?,?,?)"
                mysql.query(qry2, [name, email, phone, gender], (err, results) => {
                    if (results.affectedRows > 0) {
                        res.render("add", { mesg: true })
                    }
                })
            }

        }
    })
})


app.get('/search', (req, res) => {
    res.render('search')
})
app.get("/searchstudent", (req, res) => {
    const { phone } = req.query
    let qry = "select * from users where phone=?"
    mysql.query(qry, [phone], (err, results) => {
        if (err) {
            throw err
        } else {
            if (results.length > 0) {
                res.render("search", { mesg1: true, mesg2: false, data: results })
            } else {
                res.render("search", { mesg1: false, mesg2: true })
            }
        }
    })
})


app.get('/update', (req, res) => {
    res.render('update')
})
app.get("/updatesearch", (req, res) => {
    const { phone } = req.query
    let qry = "select * from users where phone=?"
    mysql.query(qry, [phone], (err, results) => {
        if (err) {
            throw err
        } else {
            if (results.length > 0) {
                res.render("update", { mesg1: true, mesg2: false, data: results })
            } else {
                res.render("update", { mesg1: false, mesg2: true })
            }
        }
    })
})
app.get("/updatestudent", (req, res) => {
    const { phone, name, gender } = req.query
    let qry = "update users set name=? , gender=? where phone=?"
    mysql.query(qry, [name, gender, phone], (err, results) => {
        if (err) {
            throw err
        } else {
            if (results.affectedRows > 0) {
                res.render("update", { umesg: true })
            }
        }
    })
})


app.get('/delete', (req, res) => {
    res.render('delete')
})
app.get("/removestudent", (req, res) => {
    const { phone } = req.query
    let qry = "delete from users where phone=?"
    mysql.query(qry, [phone], (err, results) => {
        if (err) {
            throw err
        } else {
            if (results.affectedRows > 0) {
                res.render("delete", { mesg1: true, mesg2: false })
            } else {
                res.render("delete", { mesg1: false, mesg2: true })
            }
        }
    })
})


app.get('/allStudents', (req, res) => {
    let qry = "select * from users"
    mysql.query(qry, (err, results) => {
        if (err) {
            throw err
        }
        else {
            res.render('allStudents', { data: results })
        }
    })
})





app.listen(port, (err) => {
    if (err) {
        throw err
    } else {
        console.log("Running at ", port)
    }
})