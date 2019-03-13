console.log(1111);
require(['./js/jquery-1.9.1',"./js/jquery.ztree.excheck-3.5.js", "./js/jquery.ztree.exedit-3.5", "./js/jquery.ztree.exhide-3.5",'./js/jquery.ztree.core-3.5'],function ($) {
        var test
        /*
        * 同步加载
        * */
        function load1() {
            $("#treeDemo").empty()
            var zTreeObj;
            var setting = {};
            var zNodes = [
                {
                    name: "test1", open: true, children: [
                        {name: "test1_1"}, {name: "test1_2"}]
                },
                {
                    name: "test2", open: true, children: [
                        {name: "test2_1"}, {name: "test2_2"}]
                }
            ];
            zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        }
        /*
        * 单选默认不带单选按钮
        * */
        function load2() {
            $("#treeDemo").empty()
            var zTreeObj;
            var setting = {
                async: {
                    enable: true,   //设置启用异步加载
                    type: "get",   //异步加载类型:post和get
                    contentType: "application/json", //定义ajax提交参数的参数类型，一般为json格式
                    url: "package.json",  //定义数据请求路径
                },
                check: {}

            }
            zTreeObj = $.fn.zTree.init($("#treeDemo"), setting);
        }
        /*
        * 单选默认带单选按钮
        * */
        function load3() {
            $("#treeDemo").empty()
            var zTreeObj;
            var setting = {
                async: {
                    enable: true,   //设置启用异步加载
                    type: "get",   //异步加载类型:post和get
                    contentType: "application/json", //定义ajax提交参数的参数类型，一般为json格式
                    url: "package.json",  //定义数据请求路径
                },
                check: {
                    enable: true,
                    chkStyle: "radio",
                    radioType: "all"
                }

            }
            zTreeObj = $.fn.zTree.init($("#treeDemo"), setting);
        }
        /*
        * 多选
        * */
        function load4() {
            $("#treeDemo").empty()
            var zTreeObj;
            var setting = {
                async: {
                    enable: true,   //设置启用异步加载
                    type: "get",   //异步加载类型:post和get
                    contentType: "application/json", //定义ajax提交参数的参数类型，一般为json格式
                    url: "package.json",  //定义数据请求路径
                },
                check: {
                    enable: true,
                    chkStyle: "checkbox",
                    autoCheckTrigger: true
                },
                callback: {
                    onCheck: function (e, treeId, treeNode) {
                        console.log(treeId, treeNode);
                    }
                }

            }
            zTreeObj = $.fn.zTree.init($("#treeDemo"), setting);
        }
        /*
        * 设置根节点不显示删除和修改按钮
        * */
        function load5() {
            $("#treeDemo").empty()

            var zTreeObj;
            var setting = {
                async: {
                    enable: true,   //设置启用异步加载
                    type: "get",   //异步加载类型:post和get
                    contentType: "application/json", //定义ajax提交参数的参数类型，一般为json格式
                    autoParam: ["id=1"],
                    url: "package.json",  //定义数据请求路径
                },
                view: {
                    showIcon: true,
                    showLine: true,
                    showTitle: false,
                    selectedMulti: true,
                    addHoverDom: addHoverDom,
                    removeHoverDom: removeHoverDom,
                },
                check: {
                    enable: true,
                    chkStyle: "checkbox",
                    autoCheckTrigger: true
                },
                callback: {
                    onAsyncError: function (event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
                        alert("异步加载失败的回调")
                    },
                    onAsyncSuccess: function (event, treeId, treeNode, msg) {
                        alert("异步加载成功的回调")
                        var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                        console.log(treeObj.getNodes());
                    },
                    onCheck: function (e, treeId, treeNode) {
                        console.log(treeId, treeNode);
                    },
                    onClick: function (event, treeId, treeNode) {
                        console.log("单击节点事件的回调")
                    },
                    onRightClick: function (event, treeId, treeId) {
                        alert("右击事件的回调")
                    },
                    beforeRename: function (treeId, treeNode, newName, isCancel) {

                        if (treeNode.level > 0) {
                            if (isCancel) alert("重命名前的回调，未重命名")
                            else alert("重命名前的回调，新名称为：" + newName)
                            return true
                        } else {
                            if (treeNode.name == newName) {
                                return true
                            } else {
                                alert("根节点不能修改")
                                return false
                            }

                        }


                    },

                    beforeRemove: function (treeId, treeNode) {
                        if (treeNode.level > 0) {
                            alert("删除前的回调，删除了" + treeNode.tId)
                            return true
                        } else {
                            alert("根节点不能删除")
                            return false
                        }

                    },
                },
                edit: {
                    enable: true,
                    drag: {
                        isCopy: false,
                        isMove: true,
                        prev: true,
                        next: true,
                        inner: false
                    },
                    showRemoveBtn: setRemoveBtn,
                    showRenameBtn: setRenameBtn
                }

            }
            zTreeObj = $.fn.zTree.init($("#treeDemo"), setting);

            var newCount = 1;

            function addHoverDom(treeId, treeNode) {
                var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                var sObj = $("#" + treeNode.tId + "_span"); //获取删除修改span
                if (treeNode.editNameFlag || $("#" + treeNode.tId + "_add").length > 0) return;
                var addStr = "<span class='button add' id='" + treeNode.tId + "_add' title='add' onfocus='this.blur();'></span>";  //添加add  span
                sObj.after(addStr);          // 把删除修改 span 放到 add 后面
                var btn = $("#" + treeNode.tId + "_add");
                if (btn) btn.bind("click", function () {
                    console.log(treeNode);
                    var nodes = treeObj.addNodes(treeNode, {id: (treeNode.id + newCount), name: "新建节点"});
                    //后台添加节点数据
                    return false;
                });
            }

            function removeHoverDom(treeId, treeNode) {
                $("#" + treeNode.tId + "_add").unbind().remove();
            };

            function setRemoveBtn(treeId, treeNode) {
                return !treeNode.isParent;
            };

            function setRenameBtn(treeId, treeNode) {
                return !treeNode.isParent;
            }
        }
        /*
        * 不显示图标
        * */
        function load6() {
            $("#treeDemo").empty()
            var zTreeObj;
            var setting = {
                async: {
                    enable: true,   //设置启用异步加载
                    type: "get",   //异步加载类型:post和get
                    contentType: "application/json", //定义ajax提交参数的参数类型，一般为json格式
                    url: "package.json",  //定义数据请求路径
                },
                view: {
                    showIcon: false
                }


            }
            zTreeObj = $.fn.zTree.init($("#treeDemo"), setting);
        }


        var zTreeObj;
        var setting = {
            async: {
                enable: true,   //设置启用异步加载
                type: "get",   //异步加载类型:post和get
                contentType: "application/json", //定义ajax提交参数的参数类型，一般为json格式
                autoParam: ["id=1"],
                url: "package.json",  //定义数据请求路径
            },
            view: {
                showIcon: true,
                showLine: true,
                showTitle: false,
                selectedMulti: true,
                addHoverDom: addHoverDom,
                removeHoverDom: removeHoverDom,
            },
            check: {
                enable: true,
                chkStyle: "checkbox",
                autoCheckTrigger: true
            },
            callback: {
                onAsyncError: function (event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
                    alert("异步加载失败的回调")
                },
                onAsyncSuccess: function (event, treeId, treeNode, msg) {
                    alert("异步加载成功的回调")
                    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                    console.log(treeObj.getNodes());
                },
                onCheck: function (e, treeId, treeNode) {
                    console.log(treeId, treeNode);
                },
                onClick: function (event, treeId, treeNode) {
                    console.log("单击节点事件的回调")
                },
                onRightClick: function (event, treeId, treeId) {
                    alert("右击事件的回调")
                },
                beforeRename: function (treeId, treeNode, newName, isCancel) {

                    if (treeNode.level > 0) {
                        if (isCancel) alert("重命名前的回调，未重命名")
                        else alert("重命名前的回调，新名称为：" + newName)
                        return true
                    } else {
                        if (treeNode.name == newName) {
                            return true
                        } else {
                            alert("根节点不能修改")
                            return false
                        }

                    }


                },

                beforeRemove: function (treeId, treeNode) {
                    if (treeNode.level > 0) {
                        alert("删除前的回调，删除了" + treeNode.tId)
                        return true
                    } else {
                        alert("根节点不能删除")
                        return false
                    }

                },
                beforeDrop: function (treeId, treeNodes, targetNode, moveType, isCopy) {
                    var str = " "
                    treeNodes.forEach(function (val, index) {
                        str = str + val.name;
                    })

                    alert("将" + str + "移动到了" + targetNode.name + "的" + moveType)
                }
            },
            edit: {
                enable: true,
                drag: {
                    isCopy: false,
                    isMove: true,
                    prev: true,
                    next: true,
                    inner: false
                },
            }

        }
        zTreeObj = $.fn.zTree.init($("#treeDemo"), setting);
        var newCount = 1;
        function addHoverDom(treeId, treeNode) {
            var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
            var sObj = $("#" + treeNode.tId + "_span"); //获取删除修改span
            if (treeNode.editNameFlag || $("#" + treeNode.tId + "_add").length > 0) return;
            var addStr = "<span class='button add' id='" + treeNode.tId + "_add' title='add' onfocus='this.blur();'></span>";  //添加add  span
            sObj.after(addStr);          // 把删除修改 span 放到 add 后面
            var btn = $("#" + treeNode.tId + "_add");
            if (btn) btn.bind("click", function () {
                console.log(treeNode);
                var nodes = treeObj.addNodes(treeNode, {id: (treeNode.id + newCount), name: "新建节点"});
                //后台添加节点数据
                return false;
            });
        }
        function removeHoverDom(treeId, treeNode) {
            $("#" + treeNode.tId + "_add").unbind().remove();
        };
        return test = {
            load1: load1,
            load2: load2,
            load3: load3,
            load4: load4,
            load5: load5,
            load6: load6
        }

    })
