
//--------------

//Server公钥
var server_pubKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCdh9TYXvY+CBaBMgG6vSAC6Z36npFE0k6Hle8YQJdEHU5fddRNcY7Mm/+/GfB4ssN2Z/sv9om9SDIKRePzYuGNulVBWyPdPqgbiARVU7hxISpT1Se60CHUNisVbiAVixUJ8taXrZ+Zu1zsLCelBzOJz4xmk6fAUEmgFMWKW+M/OQIDAQAB";
//app私钥
var app_priKey = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAN4b2kiEzp0Z3TAV35tz3pHWD/YZZUItTl8gT9NzPuFUIh4x58lzoyIaTp+ToGUL3rBL9sr1X9xKPoE+bVwRD8Ci5HSjgp6CtLPKEtf5AK8Pu+/BJErwrCoOoAhpdZWVpzZQN3GKhGw1me5A3P8+YkUp8Q1VD+Deh0fGXxU6ZWoTAgMBAAECgYATpzVGa3H41rwKsDTMBZGxJ9bbuN2L4IRpyGsn06/BsnceYt4WpkPOFbPVTPPJXSaERQR+av3jeTJUr1hv6BaTk8p7sHe+BTOsAKv8IeRnQOe8NO2NzHwqpZpKSY2yyOtrKg/jHdjGtF9te3AFeM776Y/gYZgxOLBXMMxdRlj4iQJBAP8qODBjePregZ/OOGqoEPvfq7wqWC7fCUuNlfBS1zRJ2SPfYFRVSIkCYczK6qzX50CX4og1RaVWK+Kw5SiNAGcCQQDe1fA2ZwnD+f0s34ni0SwrICgXFitZkz9SJonJ94KfxwtwSB9wMjSH/U9+jhbT07R08iJNsH/nDmp2Wf++OQ11AkAtK/o6hsGaF932vnk6WHp5PIWYkB6AXbe1imEq5F94wEISma7h/x8SMjvCF4IoCyjDRKAz4MptlK28Ofi3jw6tAkEAhTwjiVOoWh4Ry4/IsO5iW1K5xbwCpWdON/9E6ZZs6r2nUDY/XeUW1ayWqFOqwHLXdgkEi7EZeHx9GVCMgh84tQJBALyp1x0Ki2a09HsgQ0IY4NhQ0y2uHs+9Uca4eKvMgccVS1yNPQjGUGuTiwm8TFkP1GdKEgvdcP/ugPwiXUyEuRI=";
//时间戳
function rsaTimeStamp() {
    var timeStamp = '';
    $.ajax({
        url: Think.API + "/getservertimestamp",
        get: 'get',
        async: false,
        success: function (res) {
            var code = res.code;
            if (code == 0) {
                timeStamp = res.data;
            }
        }
    });
    return timeStamp;
}

//生成json
function toJsonStr(form) {
    return JSON.stringify(form);
    // return encodeURIComponent(enStr);
}

//生成签名
function rsaSign(data) {
    var rsa = KEYUTIL.getRSAKeyFromPlainPKCS8PEM("-----BEGIN PRIVATE KEY-----" + app_priKey + "-----END PRIVATE KEY-----");
    var result = rsa.signString(data, "md5");
    return base64_encode(code_conversion(result));
}

//生成普通类型签名 3333
function rsaSignWithCommon(data) {
    var timeStamp = rsaTimeStamp();
    var sign = rsaSign(data + timeStamp);
    arr[0] = data;
    arr[1] = timeStamp;
    arr[2] = sign;
    return arr;
}


//生成params类型签名 222
function rsaSignWithParams(formData) {
    var arr = [];
    var jsonForm = toJsonStr(formData);
    var timeStamp = rsaTimeStamp();
    var sign = rsaSign("params=" + jsonForm + timeStamp);
    arr[0] = jsonForm;
    arr[1] = timeStamp;
    arr[2] = sign;
    return arr;
}

//生成formData类型签名 111
function rsaSignWithformData(formData) {
    var arr = [];
    var jsonForm = formParamSort(formData);
    var timeStamp = rsaTimeStamp();
    var sign = rsaSign(jsonForm + timeStamp);
    arr[0] = jsonForm;
    arr[1] = timeStamp;
    arr[2] = sign;
    return arr;
}

//加密
function rsaEncrypt(data) {
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(server_pubKey);
    return encrypt.encrypt(data);
}

//参数升序排序
formParamSort = function (params) {
    var paramStr = "";
    if (typeof params == "string") {
        paramStr = params;
    } else if (typeof params == "object") {
        var arr = [];
        for (var i in params) {
            if (params.hasOwnProperty(i)) {
                arr.push((i + "=" + params[i]));
            }
        }
        paramStr = arr.join(("&"));
    }
    if (paramStr) {
        var newParamStr = paramStr.split("&").sort().join("&");
        return newParamStr;
    }
    return params;
}

