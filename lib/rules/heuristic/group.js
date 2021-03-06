
'use strict';

exports.name = 'heuristic.group';

exports.check = function (sr, done) {
    var patterns = /.+ interest group$|.+ community group$|.+ working group$/i
    ,   candidates = []
    ,   candidate
    ,   item
    ,   i;

    sr.$('a').each(function () {
        item = sr.$(this);

        if (patterns.exec(item.text())) {
            candidate = {homepage: item.attr('href'), name: item.text()};

            /* Temporarily disabled; see
               https://github.com/w3c/specberus/pull/131#issuecomment-69811565
               and
               https://github.com/w3c/specberus/issues/130#issuecomment-69754763

            if (item.attr('data-deliverer-id') && /\d+/.test(item.attr('data-deliverer-id'))) {
                candidate.id = item.attr('data-deliverer-id');
            } */

            candidates.push(candidate);
        }
    });

    if (candidates.length > 0) {
        for (i = 0; i < candidates.length; i ++) {
            sr.info(exports.name, 'candidate', {name: candidates[i].name, url: candidates[i].homepage});
        }
        sr.metadata('deliverers', candidates);
    }
    else {
        sr.error(exports.name, 'not-found');
    }

    return done();

};

