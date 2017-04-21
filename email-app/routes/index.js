const express = require('express');
const router = express.Router();
const helper = require('sendgrid').mail;
const config = require('../config')
const fs = require('fs');

const tempalte = fs.readFileSync('./email/dist/hero.html', 'utf-8');

let from_email = new helper.Email('test@gmail.com');
let subj = 'Here is your email';
let content = new helper.Content("text/html", tempalte);
const sg = require('sendgrid')(config.get("sengrid"));

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/', (req, res, next) => {
    if (req.body.email) {
        let userData = {
            email: req.body.email
        };

        let to_email = new helper.Email(req.body.email);
        const mail = new helper.Mail(from_email, subj, to_email, content);
        var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON()
        });

        sg.API(request, function(error, response) {
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
        })
    } else {
        var error = new Error('Fill email field')
        error.status = 404;
        return next(error);
    }
    res.redirect('/success');

});

router.get('/suc', function(req, res, next) {
    res.render('suc', { title: 'yeah' });
});


module.exports = router;