
'use strict';

exports.name = 'structure.name';

exports.check = function (sr, done) {

    // Pseudo-constants:
    var EXPECTED_NAME = /\/Overview\.html$/
    ,   OVERVIEW = 'Overview.html'
    ,   ALTERNATIVE_ENDING = /\/$/
    ,   FILE_NAME = /[^\/]+$/;

    var superagent = require('superagent')
    ,   fileName
    ,   file1
    ,   file2;

    if (!sr || !sr.url || EXPECTED_NAME.test(sr.url)) {
        return done();
    }
    else {
        if (!ALTERNATIVE_ENDING.test(sr.url)) {
            fileName = sr.url.match(FILE_NAME);
            if (fileName && 1 === fileName.length) {
                fileName = fileName[0];
                sr.warning(exports.name, 'wrong', {note: ' (instead of <code>' + fileName + '</code>)'});
            }
            else {
                sr.warning(exports.name, 'wrong', {note: ''});
            }
            return done();
        }
        else {
            superagent.get(sr.url).end(function(result1) {
                superagent.get(sr.url + OVERVIEW).end(function(result2) {
                    if (!result1.ok || !result2.ok || result1.text !== result2.text) {
                        sr.warning(exports.name, 'wrong', {note: ''});
                    }
                    return done();
                })
            });
        }
    }

};

