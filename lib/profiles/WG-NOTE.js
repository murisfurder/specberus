
exports.name = "WG Note";
exports.config = {
    status:             "NOTE"
,   longStatus:         "Working Group Note"
,   previousVersion:    false
,   styleSheet:         "W3C-WG-NOTE"
,   stabilityWarning:   true
,   noteStatus:         true
};
exports.rules = require("./TR").rules;
