"use strict";
var version = "1.0";
function boot() {
    // updateSite和①中的route保持一致，"/script-api/"为固定字符串，后面的可以自定义保持和route一直
    jj.registerHandler("POST", "/script-api/updateSite", "updateSite", false);
    jj.registerHandler("GET", "/script-api/l2-operator/getToSite", "getToSite", false);//请求数据库库位信息
}
function updateSite(params) {
    jj.scriptLog("11","111","11")
    try {
        // 选择修改的库位id
        var siteId = JSON.parse(params)["params"][0]["value"];
        // 设置库位内容
        var content = JSON.parse(params)["params"][1]["value"];
        var inputParams = {
            "siteId": siteId,
            "content": content
        };
        //创建任务
        var taskParam = {
            // 天风任务的名称
            "taskLabel": "updateSite",
            // 天风任务生成的需要的入参
            "inputParams": JSON.stringify(inputParams)
        };
        jj.newThreadToSetOrder(JSON.stringify(taskParam));
        var res = { code: 200, msg: "设置成功" };
        return { code: 200, body: JSON.stringify(res) };
    }
    catch (error) {
        var res = { code: 400, msg: "设置失败" };
        return { code: 400, body: JSON.stringify(res) };
    }
}
function getToSite() {
    
     
 
    var sql = "select id, site_id  from t_worksite where group_name = 'TZ' and locked = 0";
    var resultJson = jj.jdbcQuery(sql);
    var siteList = JSON.parse(resultJson);
    let siteOptionList = [];
    for (let i = 0; i < siteList.length; i++) {
        let siteOption = new SelectOption();
        siteOption.label = siteList[i]["site_id"];
        siteOption.value = siteList[i]["site_id"];
        siteOptionList.push(siteOption);
    }
    let response = new ScriptRepsonseEntity();
    response.body = JSON.stringify(siteOptionList);
    
    
    return response;
}
class SelectOption {
    constructor() {
        this.value = "";
        this.label = "";
    }
}
class ScriptRepsonseEntity {
    constructor() {
        this.code = 200;
        this.body = "OK";
    }
}
