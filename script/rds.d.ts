interface JavaType {
    type: (name: string) => any;
}
declare var Java: JavaType;
declare var jj: JavaBridge;
interface WorkSite{
    id:string;
    projectId:string;
    siteLabel:string;
    working:number;
    locked:number;
    preparing:number;
    filled:number;
    disabled:number;
    content:string;
    area:string;
    rowNum:number;
    colNum:number;
    level:number;
    depth:number;
    no:number;
    incomeCost:number;
    outcomeCost:number;
    tags:string;
}
interface CAgvOperationVo{
    blockId: number;
    blockName: string;
    blockType: string;
    agvId: string;
    targetSiteLabel: string;
    scriptName: string;
}
interface BlockGroup{
    blockGroup:string;
    status:boolean;
}

interface BlockGroupStatus{
    name:string;
    status:boolean;
    ip:string;
}

interface WorkSiteVo{
    siteLabel:string;
    lockSuccess:boolean;
    agvId:string;
}
interface AgvArrivedRequest{
    TargetVehicle: string;
    ArrivalPoint:string
}
interface AgvAction{
    TargetVehicle:string;
    Action: number;
}
interface CallBack{
    orderCode:string;
}

interface JavaBridge {


    /************************************** Deprecated start ******************************************/
    // 终止任务
    abortTasks: (req: string) => void;

    //异步启动任务下单
    newThreadToSetOrder: (param: string) => void;

    //执行运单任务
    setOrder: (param: string) => string;

    //接收外部运单并存入队列
    receiveOrder: (orderParam: string) => boolean;

    //获取缓存数据
    getExtParam: (key: string, retry: boolean) => string;

    //缓存数据
    putExtParam: (key: string, value: string) => void;

    //删除缓存数据
    clearExtParam: (key: string) => void;

    //获取缓存块的全部缓存数据
    getCacheDataBpCache: () => string;

    //校验指定区域的库位是否满位
    checkAreaSiteIsFull: (area: Array<string>) => boolean;

    //校验指定库区的库位是否满位
    checkGroupSiteIsFull: (groupName: Array<string>) => boolean;

    //根据库位id模糊查询空闲状态库位并更新为有货状态
    chooseAndUpdateIdleSite: (siteIdLike: Array<string>) => string;

    //根据库位id模糊查询空闲状态库位
    chooseIdleSite: (likeSiteId: string, retry: boolean) => string;

    //根据区域和货物状态获取库位
    getAreaFilledSite: (area: Array<string>, filledStatus: number) => string;

    //根据锁定和货物状态获取库区内的库位
    getGroupSiteByStatus: (groupNames: Array<string>, filledStatus: number, lockStatus: number) => string;

    //根据id查询库位
    getSiteById: (siteId: string) => string;

    //根据库区获取库位
    getSiteListByGroup: (group: string) => string;

    //根据标签和货物状态获取库位
    getSiteListByTags: (tags: Array<string>, filledStatus: number) => string;

    //根据区域和货物状态获取未锁定库位
    getUnlockAreaFilledSite: (area: Array<string>, filledStatus: number, lockStatus: number) => string;

    //根据标签和货物状态获取未锁定的库位
    getUnlockSiteListByTags: (tags: Array<string>, filledStatus: number, lockStatus: number) => string;

    //根据货物查询指定tags的未锁定库位
    getUnlockTagsSiteByContent: (tags: Array<string>, content: string) => string;

    //根据库位id查询库位状态
    getWorkSiteStatus: (siteIds: Array<string>) => string;

    //根据条件查询库位
    getSiteByCondition: (siteId: string, content: string, filled: number, type: number, groupName: string, locked: boolean, retryPeriod: number, lockedBy: string) => string;

    //根据库区名查询一个空闲的库位
    getSiteByGroupNameRetry: (groupName: string, isRetry: boolean) => string;

    //根据库位id和agvId锁定库位
    lockWorkSite: (siteIds: Array<string>, agvId: string) => string;

    //设置库位的货物（同时库位状态为已占用）
    setFilledWithContentBySiteId: (siteId: string, content: string) => void;

    //根据库位id将库位设置为未占用
    setUnfilledBySiteId: (siteId: string) => void;

    //设置库位的锁定者
    setWorksiteLockedByById: (siteId: string, taskRecordId: string) => void;

    //更新库位货物状态
    updateFilledSite: (area: string, siteId: string, filledStatus: number) => void;

    //更新库位的货物状态
    updateFilledStatusBySiteId: (siteId: string, filledStatus: number) => void;

    //据锁定者将库位的锁定状态清空
    updateSiteUnlockedByLockedBy: (taskRecordId: string) => number;

    //根据库位id锁定未锁定的库位
    updateUnlockSiteLockedBySiteId: (siteId: string, lockedBy: string) => number;

    //根据库位id和agvId解锁库位
    unlockWorkSite: (siteIds: Array<string>, agvId: string) => String;

    //线程休眠指定时间（毫秒）
    sleepThread: (ms: number) => void;

    //向指定url发送post请求
    requestPostJson: (url: string, param: string) => string;

    //使用sql创建数据表
    jdbcCreateTable: (sql: string) => string;

    //执行保存sql
    jdbcSaveSql: (sql: string) => boolean;

    //阻塞查询sql,直到有结果出现
    jdbcQueryRetry: (sql: string, interval: number) => string;

    //保存sql更新结果，sql可通过参数sqlParam拼接
    jdbcSave: (sql: string, ...sqlParam: any) => number;

    //保存sql更新结果，sql可通过参数sqlParam拼接
    jdbcUpdate: (sql: string, ...sqlParam: any) => number;

    //连续读取线圈量期望值
    readCoilStatusByRetry: (ip: string, port: number, slaveId: number, offset: number, expectValue: boolean) => boolean;

    //连续读取保持寄存器期望值
    readHoldingRegisterByRetry: (ip: string, port: number, slaveId: number, offset: number, dataType: number, expectValue: number) => number;

    //读取保持寄存器期望值,
    readHoldingRegisterArrayByRetry: (ip: string, port: number, slaveId: number, offset: Array<number>, dataType: number, expectValue: number) => number;

    //读取保持寄存器多个连续地址值，组装成字符串
    readMultiHoldingRegisters: (ip: string, port: number, slaveId: number, offset: number, addrCount: number, dataType: number) => string;

    //写保持寄存器
    writeHoldingRegisterRetry: (ip: string, port: number, slaveId: number, offset: number, dataType: number, value: number) => boolean;

    //opc读取PLC急停信号值,发送给RDScore,用于区域机器人交通管制的急停
    readOpcEsValueToCore: (address: string) => void;

    //获取缓存数据
    getCache: (key: string) => any;

    //缓存数据
    cache: (key: string, value: string) => void;

    // 取配置文件的值
    getYmlValue: (key: string) => any;

    registerBtn: (label: string, remark: string, scriptFunction: string, level: string) => void;

    /************************************** Deprecated end ******************************************/

    //校验任务参数
    checkTaskParam: (param: string) => boolean;

    //异步启动任务下单
    createWindTask: (param: string) => void;

    //根据id查询任务
    getTaskRecordById: (taskRecordId: string) => string;

    //根据外部订单号查询任务实例列表
    getTaskRecordListByOutOrderNo: (outOrderNo: string) => string;

    // 根据agvId查询任务实例列表
    getTaskRecordByAgvId: (agvId: string) => string;

    //任务封口
    markComplete: (orderId: string) => void;

    // 校验任务实例id是否存在
    isTaskRecordIdExist: (taskRecordId: string) => boolean;

    // 校验任务名是否存在
    isTaskLabelExist: (taskName: string) => boolean;

    // 根据条件查询任务实例列表
    queryTaskRecord: (param: string) => string;

    //接收外部运单并存入队列
    receiveThirdOrder: (orderParam: string) => boolean;

    //保存任务运行时日志
    saveTaskLog: () => void;

    //同步执行运单任务
    syncCreateWindTask: (param: string) => string;

    // 终止任务
    terminateTasks: (req: string) => void;

    // 校验机器人是否存在
    isRobotExist: (robotName: string) => boolean;

    //获取机器人信息
    getRobotsStatus: () => string;

    // 校验站点是否存在
    isPointExist: (pointName: string) => boolean;

    //检查库位是否存在
    checkSiteExistedBySiteId: (siteId: string) => boolean;

    //检查库区是否存在
    checkSiteGroupExistedByGroupName: (groupName: string) => boolean;

    //根据条件获取库位
    findSitesByCondition: (conditions: string, sort: string) => string;

    //根据条件获取有效库位
    findAvailableSitesByCondition: (conditions: string, sort: string) => string;

    //根据条件更新库位
    updateSitesByCondition: (conditions: string, values: string) => number;

    //获取缓存数据(同getExtParam)
    getCacheParam: (key: string) => string;

    //缓存数据(同putExtParam)
    putCacheParam: (key: string, value: string) => void;

    //删除缓存数据（同clearExtParam）
    clearCacheParam: (key: string) => void;

    //获取缓存块的全部缓存数据(同getCacheDataBpCache)
    getAllCacheParams: () => string;

    //通知手持端
    noticeOperator: (workTypes: string, workStations: string, content: string, needConfirm: boolean, keepTime: number) => void;

    //通知手持端用户
    noticeOperatorByUser: (userNames: string, content: string, needConfirm: boolean, keepTime: number) => void;

    //线程休眠指定时间（毫秒）
    sleep: (ms: number) => void;

    //获取当前时间戳
    currentTimeMillis: () => number;

    //获取当前时间
    nowDate: () => string;

    //将时间戳转为日期格式
    timeMillisFormat: (mm: number) => string;

    //向指定uri发送post请求
    requestPost: (uri: string, param: string) => string;

    //向指定url发送get请求
    requestGet: (url: string) => string;

    //记录日志
    getLogger(): Logger;

    //打印脚本日志到页面
    scriptLog: (level: string, functionName: string, content: string) => string;

    //脚本注册函数
    defineScheduledFunctions: (isParallel: boolean, delay: number, period: number, functionName: string, args: any[]) => void;

    //脚本注册初始化数据函数
    defineInitDataFunctions: (functionName: string) => void;

    //注册按钮
    registerButton: (label: string, remark: string, scriptFunction: string, level: String) => void;

    //注册脚本接口
    registerHandler: (method: string, path: string, functionName: string, auth: boolean) => void;

    //注册事件函数
    registerTaskEventFunction: (functionName: string) => void;

    // 取配置文件的值
    getApplicationBusinessConfigValue: (key: string) => any;

    //执行保存sql
    jdbcExecuteSql: (sql: string) => boolean;

    //查询sql对应的list结果
    jdbcQuery: (sql: string) => string;

    //保存sql更新结果，sql可通过参数sqlParam拼接
    jdbcInsertOrUpdate: (sql: string, ...sqlParam: any) => number;

    //查询sql结果的数量
    jdbcQueryCount: (sql: string) => number;

    //读取线圈量
    readCoilStatus: (ip: string, port: number, slaveId: number, offset: number) => boolean;

    //读离散寄存器
    readInputStatus: (ip: string, port: number, slaveId: number, offset: number) => boolean;

    //读取保持寄存器
    readHoldingRegister: (ip: string, port: number, slaveId: number, offset: number, dataType: number) => number;

    //读取输入寄存器
    readInputRegister: (ip: string, port: number, slaveId: number, offset: number, dataType: number) => number;

    //批量读取线圈量
    batchReadCoilStatus: (ip: string, port: number, slaveId: number, offset: number, len: number) => Array<boolean>;

    //批量读取离散寄存器
    batchReadInputStatus: (ip: string, port: number, slaveId: number, offset: number, len: number) => Array<boolean>;

    //批量读取保持寄存器
    batchReadHoldingRegisters: (ip: string, port: number, slaveId: number, offset: number, len: number) => Array<number>;

    //批量读取输入寄存器
    batchReadInputRegisters: (ip: string, port: number, slaveId: number, offset: number, len: number) => Array<number>;

    //写线圈量
    writeCoilStatus: (ip: string, port: number, slaveId: number, offset: number, value: boolean) => boolean;

    //写保持寄存器
    writeHoldingRegister: (ip: string, port: number, slaveId: number, offset: number, dataType: number, value: number) => boolean;

    //批量写线圈量
    batchWriteCoilStatus: (ip: string, port: number, slaveId: number, offset: number, value: Array<boolean>) => boolean;

    //批量写保持寄存器
    batchWriteHoldingRegister: (ip: string, port: number, slaveId: number, offset: number, value: Array<number>) => boolean;

    //通用写入单个地址
    writeSingleModbusValue: (ip: string, port: number, slaveId: number, type: string, offset: number, value: number) => boolean;

    //通用读取单个地址
    readSingleModbusValue: (ip: string, port: number, slaveId: number, type: string, offset: number) => Number;

    //opc读取PLC值
    readOpcValue: (address: string) => any;

    //opc写入PLC值
    writeOpcValue: (address: string, value: any) => boolean;

    // opc写入（type 1:Boolean,2: Word, 3:Short, 4:Long, 5: DWord）
    writeOpcValueByType: (address: string, value: string, type: number) => boolean;

    //创建需求单
    addDemand: (demandJson: string) => string;

    //根据id更新需求单状态为完成
    updateDemandFinishedById: (demandId: string, supplementContent: string, handler: string) => number;

    //根据createBy更新需求单状态为完成
    updateDemandFinishedByCreateBy: (createBy: string, supplementContent: string, handler: string) => number;

    // 根据文件名读取脚本目录下的文件内容
    readFileToString: (fileName: string) => string;

    // 创建唯一的ID编号
    createUuid: () => string;

    // // 校验库位是否存在
    // isSiteExist:(siteName: string) => boolean;
    //
    // // 校验库区是否存在
    // isSiteGroupExist:(siteGroupName: string) => boolean;

    // 发送邮件, MailMessage格式的字符串
    sendMail:(message: string) => void;

}

declare type BtnLevel = "primary" | "secondary" | "success" | "warning" | "danger" | "light" | "";


interface Logger {
    info: (message: string) => void;
    debug: (message: string) => void;
    warn: (message: string) => void;
    error: (message: string, e: any) => void;
}
/** HTTP 调用的结果 */
interface RestfulRequestResult {
    successful: boolean;
    code: number;
    bodyString?: string | null;
}
interface HttpRequest {
    method: string;
    path: string;
    queryParams: {
        [name: string]: string;
    };
    requestBodyText: string;
}
interface HttpResponse {
    code: number;
    body?: string;
    contentType?: string;
}

interface MailMessage {
    from: string           // 发送方
    to: string             // 接收方
    subject: string        // 主题
    text: string           // 内容
    // date?: string          // 发送日期
    cc?: string            // 抄送
    bcc?: string           // 秘密抄送
}