/**
 * 微信API接口调用数据
 */
var wxMeunJson = {
    "button":[
        {
            "name":"茶话会",
            "sub_button":[
                {
                    "type":"view",
                    "name":"简介",
                    "url":"http://gntqant.com:80/src/officialPages/phone/mini/brief.html",
                },
                {
                    "type":"view",
                    "name":"见识闻趣",
                    "url":"http://gntqant.com:80/src/officialPages/phone/interest/index.html",
                },
                {
                    "type":"click",
                    "name":"联系我们",
                    "key":"WX_00003"
                },
                {
                    "type":"view",
                    "name":"加入我们",
                    "url":"http://gntqant.com:80/src/officialPages/phone/mini/joinUs.html",
                },
                {
                    "type":"view",
                    "name":"测试",
                    "url":"http://gntqant.com:80/src/officialPages/phone/test/index.html",
                }]
        },
        {
            "type":"view",
            "name":"研究所",
            "url":"http://gntqant.com:80/src/officialPages/phone/study/index.html",
        },
        {
            "type":"view",
            "name":"微网站",
            "url":"http://gntqant.com:80/src/officialPages/phone/mini/index.html",
        }]

};

module.exports = {
    wxMeunJson: wxMeunJson,
};