module.exports = function(req, res, params) {
    
    return {
        "code": 0,
        "msg": "post成功",
        "data": {
            "id": Math.floor(Math.random()*10),
            "assetName": "资产方名称",
            "contract": "签约主体",
            "contractDate": "2014-09-07",
            "contacts": "联系人",
            "contactsPhone": "13567876787"
        }
    }
}
