/**
 * Copyright (c) 2018 Edison Lee, Phil Wang
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

//	Our onLoad handler kicks off the collection of entropy for key generation
function nowLoaded() {
    ce();	    	    	    	// Add time we got here to entropy
    mouseMotionEntropy(60);   	// Initialise collection of mouse motion entropy
}
function genkey() {
    //8 byte / 64 bit Key (DES) or 192 bit Key
    var strvalue = Generate_key();//generate key returns a 32 byte / 64 hex / 256 bit key.
    document.getElementById("key").value = strvalue.slice(0, 48);
    document.getElementById("vector").value = strvalue.slice(48, 64);
}
// end key generator stuff
function chars_from_hex(inputstr) {
    var outputstr = '';
    inputstr = inputstr.replace(/^(0x)?/g, '');
    inputstr = inputstr.replace(/[^A-Fa-f0-9]/g, '');
    inputstr = inputstr.split('');
    for (var i = 0; i < inputstr.length; i += 2) {
        outputstr += String.fromCharCode(parseInt(inputstr[i] + '' + inputstr[i + 1], 16));
    }
    return outputstr;
}
function hex_from_chars(inputstr) {
    var delimiter = '';
    var outputstr = '';
    var hex = "0123456789abcdef";
    hex = hex.split('');
    var i, n;
    var inputarr = inputstr.split('');
    for (var i = 0; i < inputarr.length; i++) {
        if (i > 0) outputstr += delimiter;
        if (!delimiter && i % 32 == 0 && i > 0) outputstr += '\n';
        n = inputstr.charCodeAt(i);
        outputstr += hex[(n >> 4) & 0xf] + hex[n & 0xf];
    }
    return outputstr;
}
function encrypt_string() {
    var input = document.getElementById("input").value;
    var key = document.getElementById("key").value;
    key = chars_from_hex(key);
    var vector = document.getElementById("vector").value;
    vector = chars_from_hex(vector);
    var vector = (vector.length > 7) ? vector : null;
    var output = des(key, input, 1, vector ? 1 : 0, vector);
    document.getElementById("output").value = hex_from_chars(output);
}
function decrypt_string() {
    var input = document.getElementById("input").value;
    var key = document.getElementById("key").value;
    key = chars_from_hex(key);
    var vector = document.getElementById("vector").value;
    vector = chars_from_hex(vector);
    var vector = (vector.length > 7) ? vector : null;
    input = chars_from_hex(input);
    document.getElementById("output").value = des(key, input, 0, vector ? 1 : 0, vector);
}
function swap() {
    var src = document.getElementById("input");
    var dst = document.getElementById("output");
    var tmp = src.value;
    src.value = dst.value;
    dst.value = tmp;
}

$("#genkey").click(function () {
    genkey();
});

console.log("DES v1.0.0");
console.log("Copyright (c) 2018 Edison Lee, Phil Wang. All rights reserved.\n");