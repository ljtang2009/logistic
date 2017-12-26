var fs = require('fs');
var path = require('path');
var chunksFileName = 'chunks.json';
var modulesFileName = 'modules.json'

function OptimizeIdsPlugin() {

};

OptimizeIdsPlugin.prototype.apply = function (compiler) {
    var rootPath = path.join(__dirname, '../../../');
    var reg = new RegExp(rootPath, 'g');
    var newModules = [];
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('optimize-module-ids', function(modules) {
            if (modules.length > 0 && modules[0]._chunksDebugIdent) {
                //固定module的id
                var modulesFilePath = path.join(__dirname, modulesFileName);
                var originalModules = [];
                var needSaveModules = false;     //是否应该重新保存
                if (fs.existsSync(modulesFilePath)){
                    originalModules = JSON.parse(fs.readFileSync(modulesFilePath, 'utf8'));
                    //获取原有的module的最大id
                    var maxId = 0;
                    originalModules.forEach(function (originalModuleItem){
                        if (originalModuleItem.id > maxId) {
                            maxId = originalModuleItem.id;
                        }
                    });
                    maxId++;
                    //设置modules的id
                    modules.forEach(function (moduleItem) {
                        var needAdd  = true;
                        //把绝对路径转成本地路径
                        if (moduleItem.context) {
                            moduleItem.__context = moduleItem.context.replace(reg, '');
                        }
                        else {
                            moduleItem.__context = moduleItem.context;
                        }
                        // moduleItem.__context = moduleItem.context.replace(reg, '');
                        moduleItem.__userRequest = moduleItem.userRequest ? moduleItem.userRequest.replace(reg, '') : '';
                        originalModules.every(function (originalModuleItem) {
                            if (originalModuleItem.userRequest === moduleItem.__userRequest && originalModuleItem.context === moduleItem.__context) {
                                moduleItem.id = originalModuleItem.id;
                                needAdd = false;
                                return false;
                            }
                            else {
                                return true;
                            }
                        });
                        if (needAdd) {
                            moduleItem.id = maxId;
                            maxId++;
                            originalModules.push({
                                userRequest: moduleItem.__userRequest,
                                context: moduleItem.__context,
                                id: moduleItem.id
                            });
                            needSaveModules = true;
                        }
                    });
                }
                else {
                    needSaveModules = true;
                    modules.forEach(function (moduleItem) {
                        //把绝对路径转成本地路径
                        moduleItem.__context = moduleItem.context.replace(reg, '');
                        moduleItem.__userRequest = moduleItem.userRequest? moduleItem.userRequest.replace(reg, '') : '';
                        originalModules.push({
                            userRequest: moduleItem.__userRequest,
                            context: moduleItem.__context,
                            id: moduleItem.id
                        });
                    });
                }
                if (needSaveModules) {
                    fs.writeFileSync(modulesFilePath, JSON.stringify(originalModules));
                }
            }
        });

        compilation.plugin('optimize-chunk-ids', function (chunks) {
            if (chunks.length > 0 && chunks[0].name) {
                //固定chunk的id
                var chunksFilePath = path.join(__dirname, chunksFileName);
                var needSaveChunks = false;     //是否应该重新保存
                var originalChunks = {}
                //如果有文件则读取
                if (fs.existsSync(chunksFilePath)){
                    originalChunks = JSON.parse(fs.readFileSync(chunksFilePath, 'utf8'));
                    //获取原有的chunk的最大id
                    var maxId = 0;
                    for (var key in originalChunks) {
                        if (originalChunks[key] > maxId) {
                            maxId = originalChunks[key];
                        }
                    }
                    maxId++;
                    //设置chunks的id
                    chunks.forEach(function (chunk) {
                        var id = originalChunks[chunk.name];
                        if (!isNaN(id)) {
                            chunk.id = id;
                            chunk.ids[0] = id;
                        }
                        else {
                            //设置新chunk的id
                            chunk.id = maxId;
                            chunk.ids[0] = maxId;
                            maxId++;
                            needSaveChunks = true;
                        }
                    });
                }
                else {
                    needSaveChunks = true;
                }
                //保存chunk的name和id的关系
                if (needSaveChunks) {
                    chunks.forEach(function (chunk) {
                        originalChunks[chunk.name] = chunk.id;
                    });
                    fs.writeFileSync(chunksFilePath, JSON.stringify(originalChunks));
                }
            }
        });

    });
};

module.exports = OptimizeIdsPlugin;