var paperwork = require('paperwork');

module.exports = function (app) {
    var blogPostTemplate = {
        article_id: Number
    };
    app.post('/api/postding', function (req, res) {

        paperwork(blogPostTemplate, req.body, function (err, validated) {
            if (err) {
                // err is the list of incorrect fields
                console.error(err);
            } else {
                // JSON was validated, extra fields were removed.
                console.log(req.body);
            }
        });
    });

}