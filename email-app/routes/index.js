var express = require('express');
var router = express.Router();
var helper = require('sendgrid').mail;
const fs = require('fs');

const tempalte = fs.readFileSync('./email/dist/hero.html', 'utf-8');

let from_email = new helper.Email('remdigger333@gmail.com');
let subj = 'Here is your email';
let content = new helper.Content("text/html", tempalte);
const sg = require('sendgrid')("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");

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