var _ = require('underscore'),
    crypto = require('crypto'),
    microtime = require('microtime'),
    qs = require('qs');

var oldNonce = 0;

var Signature = {
    sign: function(endpoint, data, secret) {
        if(_.isObject(data)) {
            data = qs.stringify(data); 
        }

        var signer = crypto.createHmac('sha512', secret);
        var signature = signer.update(endpoint + (new Buffer([0x00])) + data).digest('hex');

        var b = new Buffer(signature);

        return b.toString('base64');
    },
    nonce: function() {
        var date = microtime.now();

        if(oldNonce === date){
        	console.log('nonce overlap');
        }
        
        return date;
    }
};

module.exports = Signature;
