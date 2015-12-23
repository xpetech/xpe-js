/**
 * 
 * MD5 (Message-Digest Algorithm) http://www.webtoolkit.info/
 * 
 */

XPE.MD5 = function(string) {

    function RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            }
            return (lResult ^ 0x40000000 ^ lX8 ^ lY8);

        }
        return (lResult ^ lX8 ^ lY8);
    }

    function F(xx, y, z) {
        return (xx & y) | ((~xx) & z);
    }

    function G(xx, y, z) {
        return (xx & z) | (y & (~z));
    }

    function H(xx, y, z) {
        return (xx ^ y ^ z);
    }

    function I(xx, y, z) {
        return (y ^ (xx | (~z)));
    }

    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }

    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }

    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }

    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }

    function ConvertToWordArray(str) {
        var lWordCount;
        var lMessageLength = str.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    }

    function WordToHex(lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    }

    function Utf8Encode(str) {
        str = str.replace(/\r\n/g, "\n");
        var utftext = "";

        for ( var n = 0; n < str.length; n++) {

            var c = str.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    }

    var array = Array();
    var k, AA, BB, CC, DD, aa, bb, cc, dd;
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

    string = Utf8Encode(string);

    array = ConvertToWordArray(string);

    aa = 0x67452301;
    bb = 0xEFCDAB89;
    cc = 0x98BADCFE;
    dd = 0x10325476;

    for (k = 0; k < array.length; k += 16) {
        AA = aa;
        BB = bb;
        CC = cc;
        DD = dd;
        aa = FF(aa, bb, cc, dd, array[k + 0], S11, 0xD76AA478);
        dd = FF(dd, aa, bb, cc, array[k + 1], S12, 0xE8C7B756);
        cc = FF(cc, dd, aa, bb, array[k + 2], S13, 0x242070DB);
        bb = FF(bb, cc, dd, aa, array[k + 3], S14, 0xC1BDCEEE);
        aa = FF(aa, bb, cc, dd, array[k + 4], S11, 0xF57C0FAF);
        dd = FF(dd, aa, bb, cc, array[k + 5], S12, 0x4787C62A);
        cc = FF(cc, dd, aa, bb, array[k + 6], S13, 0xA8304613);
        bb = FF(bb, cc, dd, aa, array[k + 7], S14, 0xFD469501);
        aa = FF(aa, bb, cc, dd, array[k + 8], S11, 0x698098D8);
        dd = FF(dd, aa, bb, cc, array[k + 9], S12, 0x8B44F7AF);
        cc = FF(cc, dd, aa, bb, array[k + 10], S13, 0xFFFF5BB1);
        bb = FF(bb, cc, dd, aa, array[k + 11], S14, 0x895CD7BE);
        aa = FF(aa, bb, cc, dd, array[k + 12], S11, 0x6B901122);
        dd = FF(dd, aa, bb, cc, array[k + 13], S12, 0xFD987193);
        cc = FF(cc, dd, aa, bb, array[k + 14], S13, 0xA679438E);
        bb = FF(bb, cc, dd, aa, array[k + 15], S14, 0x49B40821);
        aa = GG(aa, bb, cc, dd, array[k + 1], S21, 0xF61E2562);
        dd = GG(dd, aa, bb, cc, array[k + 6], S22, 0xC040B340);
        cc = GG(cc, dd, aa, bb, array[k + 11], S23, 0x265E5A51);
        bb = GG(bb, cc, dd, aa, array[k + 0], S24, 0xE9B6C7AA);
        aa = GG(aa, bb, cc, dd, array[k + 5], S21, 0xD62F105D);
        dd = GG(dd, aa, bb, cc, array[k + 10], S22, 0x2441453);
        cc = GG(cc, dd, aa, bb, array[k + 15], S23, 0xD8A1E681);
        bb = GG(bb, cc, dd, aa, array[k + 4], S24, 0xE7D3FBC8);
        aa = GG(aa, bb, cc, dd, array[k + 9], S21, 0x21E1CDE6);
        dd = GG(dd, aa, bb, cc, array[k + 14], S22, 0xC33707D6);
        cc = GG(cc, dd, aa, bb, array[k + 3], S23, 0xF4D50D87);
        bb = GG(bb, cc, dd, aa, array[k + 8], S24, 0x455A14ED);
        aa = GG(aa, bb, cc, dd, array[k + 13], S21, 0xA9E3E905);
        dd = GG(dd, aa, bb, cc, array[k + 2], S22, 0xFCEFA3F8);
        cc = GG(cc, dd, aa, bb, array[k + 7], S23, 0x676F02D9);
        bb = GG(bb, cc, dd, aa, array[k + 12], S24, 0x8D2A4C8A);
        aa = HH(aa, bb, cc, dd, array[k + 5], S31, 0xFFFA3942);
        dd = HH(dd, aa, bb, cc, array[k + 8], S32, 0x8771F681);
        cc = HH(cc, dd, aa, bb, array[k + 11], S33, 0x6D9D6122);
        bb = HH(bb, cc, dd, aa, array[k + 14], S34, 0xFDE5380C);
        aa = HH(aa, bb, cc, dd, array[k + 1], S31, 0xA4BEEA44);
        dd = HH(dd, aa, bb, cc, array[k + 4], S32, 0x4BDECFA9);
        cc = HH(cc, dd, aa, bb, array[k + 7], S33, 0xF6BB4B60);
        bb = HH(bb, cc, dd, aa, array[k + 10], S34, 0xBEBFBC70);
        aa = HH(aa, bb, cc, dd, array[k + 13], S31, 0x289B7EC6);
        dd = HH(dd, aa, bb, cc, array[k + 0], S32, 0xEAA127FA);
        cc = HH(cc, dd, aa, bb, array[k + 3], S33, 0xD4EF3085);
        bb = HH(bb, cc, dd, aa, array[k + 6], S34, 0x4881D05);
        aa = HH(aa, bb, cc, dd, array[k + 9], S31, 0xD9D4D039);
        dd = HH(dd, aa, bb, cc, array[k + 12], S32, 0xE6DB99E5);
        cc = HH(cc, dd, aa, bb, array[k + 15], S33, 0x1FA27CF8);
        bb = HH(bb, cc, dd, aa, array[k + 2], S34, 0xC4AC5665);
        aa = II(aa, bb, cc, dd, array[k + 0], S41, 0xF4292244);
        dd = II(dd, aa, bb, cc, array[k + 7], S42, 0x432AFF97);
        cc = II(cc, dd, aa, bb, array[k + 14], S43, 0xAB9423A7);
        bb = II(bb, cc, dd, aa, array[k + 5], S44, 0xFC93A039);
        aa = II(aa, bb, cc, dd, array[k + 12], S41, 0x655B59C3);
        dd = II(dd, aa, bb, cc, array[k + 3], S42, 0x8F0CCC92);
        cc = II(cc, dd, aa, bb, array[k + 10], S43, 0xFFEFF47D);
        bb = II(bb, cc, dd, aa, array[k + 1], S44, 0x85845DD1);
        aa = II(aa, bb, cc, dd, array[k + 8], S41, 0x6FA87E4F);
        dd = II(dd, aa, bb, cc, array[k + 15], S42, 0xFE2CE6E0);
        cc = II(cc, dd, aa, bb, array[k + 6], S43, 0xA3014314);
        bb = II(bb, cc, dd, aa, array[k + 13], S44, 0x4E0811A1);
        aa = II(aa, bb, cc, dd, array[k + 4], S41, 0xF7537E82);
        dd = II(dd, aa, bb, cc, array[k + 11], S42, 0xBD3AF235);
        cc = II(cc, dd, aa, bb, array[k + 2], S43, 0x2AD7D2BB);
        bb = II(bb, cc, dd, aa, array[k + 9], S44, 0xEB86D391);
        aa = AddUnsigned(aa, AA);
        bb = AddUnsigned(bb, BB);
        cc = AddUnsigned(cc, CC);
        dd = AddUnsigned(dd, DD);
    }

    var temp = WordToHex(aa) + WordToHex(bb) + WordToHex(cc) + WordToHex(dd);

    return temp.toLowerCase();
};
