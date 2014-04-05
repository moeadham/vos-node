var _ = require('underscore'),
    Core = require('../core/index'),
    Validator = require('../core/validator'),
    crypto = require('crypto'),
    qs = require('querystring');

function Call(endpoint, options, cb) {
    if(arguments.length === 2) {
         // there are no args!
         var cb = options;
         options = {};
    }

    var params = {};

    // check required params
    if(!_.isUndefined(options.requires)) {
        Validator.check(options.requires, options.params);
        _.each(options.requires, function(v, i) {
            params[v] = options.params[v]; 
        });
    }

    // check optional params
    if(!_.isUndefined(options.optional)) {
        _.each(options.optional, function(v, i) {
            if(!_.isUndefined(options.params[v])) {
                params[v] = options.params[v];
            }
        });
    }
	//console.log(params);
	//console.log(options);
	
    Core.post(endpoint, params, cb, Withdraw.settings);
}

var Withdraw = {
    transfer: function(opts, cb) {
        Call('/withdraw/transfer', {
            requires: 'currency quantity address'.split(' '),
            params: opts
        }, cb);
    }
};

module.exports = function(settings) {
    Withdraw.settings = settings;
    return Withdraw;
};
