/**
 * Created by jojopoper on 2017/04/12.
 */

var IndexController = {
    uiViews:{},
    queryInput: null,
    queryWaiting: null,
    queryResultTab: null,
    queryContext: null,

    initController : function(){
        this.getManageAccount();
        this.initStrings();
        this.initView();
    },

    initStrings : function() {
        if(mLanguage == 'cn') {
            this.uiViews.id_free_anchor_memo_head_cap = '流程说明';
            this.uiViews.id_free_anchor_query_head_cap = '查询资产';
            this.uiViews.id_free_anchor_memo_body_cap = '人人都能发资产';
            this.uiViews.id_famb_step1_cap = '第一 确认账户';
            this.uiViews.id_famb_step1_memo = '确定你发布资产的Stellar账户，并且确认这个账户已经被激活';
            this.uiViews.id_famb_step2_cap = '第二 学会发送XLM';
            this.uiViews.id_famb_step2_memo = '你已经知道如何发送XLM到其他账户，并且知道发送前如何填写Memo内容';
            this.uiViews.id_famb_step3_cap = '第三 Memo的格式';
            this.uiViews.id_famb_step3_memo = 'Memo格式为：<strong>[命令]:[资产名称]:[昵称]</strong> <br>注意必须以冒号分割，资产名称只支持英文字母和数字';
            this.uiViews.id_famb_step3_1_cap = '第一次发布资产';
            this.uiViews.id_famb_step3_1_memo = '比如：<br>我要发布的资产名称是NiuBi，我不想用昵称，那么我在MemoText中写如下内容<br><strong>:NiuBi:</strong><br>如果我想使用昵称Gorun，那么我在MemoText中写如下内容<br><strong>:NiuBi:Gorun</strong><br>';
            this.uiViews.id_famb_step3_2_cap = '发多少XLM？';
            this.uiViews.id_famb_step3_2_memo = '每天只需要1个XLM，一年365天只需要365个XLM，随时可以充值，不用就不充值';
            this.uiViews.id_famb_step3_3_cap = '昵称有什么用？';
            this.uiViews.id_famb_step3_3_memo = '当你设置了昵称，那么你的网关就支持了昵称解析。<br><label style="color: red">注意昵称不能重复，所以在选择昵称前先查询确认昵称未被占用！</label>比如：我设置的昵称是Gorun，那么其他人就可以通过Gorun*anchor.ledgercn.com直接找到我的地址添加信任';
            this.uiViews.id_famb_step3_4_cap = '怎么充值？';
            this.uiViews.id_famb_step3_4_memo = '不管你在我们这里的资产是否已经超时，当你想继续使用充值时候，就按照第一次发布资产的时候的格式发送XLM到我们指定的地址即可。<br>注意：<br><strong>充值时候必须指定资产和昵称，缺一不可，如果只填写了资产名称，我们只会找到第一个您的账户地址进行充值</strong> <br> 比如：我有一个地址下有2个资产NiuBi1和NiuBi2，对应昵称分别为A1和A2，如果我想给NiuBi2充值，那么我得MemoText就要填写<br><strong>:NiuBi2:A2</strong>';
            this.uiViews.id_famb_step3_5_cap = '删除我的记录？';
            this.uiViews.id_famb_step3_5_memo = '如果你不想保留你的资产记录，请发送<br><strong>rm::</strong><br>如果你只想删除你多条记录中的一条，必须指定资产名称';
            this.uiViews.id_famb_step4_cap = '发送地址';
            this.uiViews.id_famb_step4_memo = '<label style="color: red;"><strong>请务必使用发送资产账户发送XLM！<br>再次提醒发送时注意MemoText内容</strong></label><br>我们的接收地址：<br>';

            this.uiViews.id_query_input_cap = '查询内容';
            this.uiViews.id_query_input_memo = '请输入昵称或恒星账户地址进行查询';

            this.uiViews.asking_with_server = '正在与服务器通信...';
            this.uiViews.error_lost_server = '与服务器失去联系！';
            this.uiViews.tab_asset_addr_cap = '资产地址：';
            this.uiViews.tab_asset_name_cap = '资产名称：';
            this.uiViews.tab_nick_name_cap = '账户昵称：';
            this.uiViews.tab_close_time_cap = '关闭时间：';
            this.uiViews.tab_hash_cap = '激活Hash：';
            this.uiViews.tab_share_link = '转到分享页面';
        } else {
            this.uiViews.id_free_anchor_memo_head_cap = 'Flow Description';
            this.uiViews.id_free_anchor_query_head_cap = 'Search Asset';
            this.uiViews.id_free_anchor_memo_body_cap = '查询资产';
            this.uiViews.id_free_anchor_memo_body_cap = 'Everyone can publish assets';
            this.uiViews.id_famb_step1_cap = 'Step 1';
            this.uiViews.id_famb_step1_memo = 'Make sure you publish the stellar account for the asset and confirm that the account has been activated';
            this.uiViews.id_famb_step2_cap = 'Step 2';
            this.uiViews.id_famb_step2_memo = 'You already know how to send XML to other accounts and know how to fill Memo content before sending';
            this.uiViews.id_famb_step3_cap = 'Memo Format';
            this.uiViews.id_famb_step3_memo = 'MemoText Format: <strong>[Command]:[Asset Name]:[Nickname]</strong> <br>Have to separated by a colon, and the asset name only supports English letters and numbers';
            this.uiViews.id_famb_step3_1_cap = 'First Publish';
            this.uiViews.id_famb_step3_1_memo = 'For example:<br>I want to publish the asset name is NiuBi, I do not want to use nickname, then I am in the MemoText write the following: <br><strong>:NiuBi:</strong><br>If I want to use the nickname is Gorun, then I write the following in MemoText<br><strong>:NiuBi:Gorun</strong><br>';
            this.uiViews.id_famb_step3_2_cap = 'How many XLM ?';
            this.uiViews.id_famb_step3_2_memo = 'One day an XLM, that is 365 days a year only 365 XLM can be';
            this.uiViews.id_famb_step3_3_cap = 'What is Nickname?';
            this.uiViews.id_famb_step3_3_memo = 'When you set up a nickname, then your gateway to support the nickname resolution. <br><label style="color: red">Note that nicknames can not be repeated, so check your nickname before selecting your nickname.</label><br> For example: I set the nickname is Gorun, then other people can be directly through the Gorun*anchor.ledgercn.com find my address to add trust';
            this.uiViews.id_famb_step3_4_cap = 'How to recharge?';
            this.uiViews.id_famb_step3_4_memo = 'Regardless of whether or not your assets in us have timed out, when you want to continue to use the recharge time, according to the first release of assets when the format to send XLM to our designated address can be.<br> Note: <br> <strong> recharge must be specified asset and nickname, and if only the name of the asset is filled in, we will only find the first account for your account. </strong> <br>I have an address under 2 assets NiuBi1 and NiuBi2, corresponding to nicknames A1 and A2, respectively, if I want to recharge NiuBi2, then I have MemoText to fill in <br><strong>:NiuBi2:A2 </strong>';
            this.uiViews.id_famb_step3_5_cap = 'Remove asset';
            this.uiViews.id_famb_step3_5_memo = 'If you do not want to keep your asset record, please send <br><strong>rm::</strong> <br> If you only want to delete one of your multiple records, you must specify the asset name';
            this.uiViews.id_famb_step4_cap = 'Our Address';
            this.uiViews.id_famb_step4_memo = '<label style="color: red;"><strong>Please be sure to use the send asset account to send XML! <br> Note again when sending attention to MemoText content</strong></label><br>Our Stellar Account ID: <br>';

            this.uiViews.id_query_input_cap = 'Query';
            this.uiViews.id_query_input_memo = 'Please enter nickname or stellar account id for query';

            this.uiViews.asking_with_server = 'Asking with server...';
            this.uiViews.error_lost_server = 'Lost connection with server!';
            this.uiViews.tab_asset_addr_cap = 'Asset Addr: ';
            this.uiViews.tab_asset_name_cap = 'Asset Name: ';
            this.uiViews.tab_nick_name_cap = 'Nickname: ';
            this.uiViews.tab_close_time_cap = 'Close time: ';
            this.uiViews.tab_hash_cap = 'Active Hash: ';
            this.uiViews.tab_share_link = 'To share web page';
        }
    },

    initView : function() {
        if (mLanguage == 'cn') {
            $(document).attr("title", '资产 - Ledgercn');
        } else {
            $(document).attr("title", 'Free Anchor - Ledgercn');
        }

        this.queryInput = $('#id_query_input_text');
        this.queryInput.val('');
        this.queryWaiting = $('#id_query_result_waiting_div');
        this.queryWaiting.css('display','none');
        this.queryResultTab = $('#id_query_result_table_tbody');
        this.queryResultTab[0].innerHTML = '';
        this.queryContext = $('#id_query_context_cap');
        this.queryContext[0].innerText = '';
        this.queryContext.css('display','none');

        $('#id_free_anchor_memo_head_cap')[0].innerText = this.uiViews.id_free_anchor_memo_head_cap;
        $('#id_free_anchor_query_head_cap')[0].innerText = this.uiViews.id_free_anchor_query_head_cap;
        $('#id_free_anchor_memo_body_cap')[0].innerText = this.uiViews.id_free_anchor_memo_body_cap;
        $('#id_famb_step1_cap')[0].innerText = this.uiViews.id_famb_step1_cap;
        $('#id_famb_step1_memo')[0].innerText = this.uiViews.id_famb_step1_memo;
        $('#id_famb_step2_cap')[0].innerText = this.uiViews.id_famb_step2_cap;
        $('#id_famb_step2_memo')[0].innerText = this.uiViews.id_famb_step2_memo;
        $('#id_famb_step3_cap')[0].innerText = this.uiViews.id_famb_step3_cap;
        $('#id_famb_step3_memo')[0].innerHTML = this.uiViews.id_famb_step3_memo;
        $('#id_famb_step3_1_cap')[0].innerText = this.uiViews.id_famb_step3_1_cap;
        $('#id_famb_step3_1_memo')[0].innerHTML = this.uiViews.id_famb_step3_1_memo;
        $('#id_famb_step3_2_cap')[0].innerText = this.uiViews.id_famb_step3_2_cap;
        $('#id_famb_step3_2_memo')[0].innerHTML = this.uiViews.id_famb_step3_2_memo;
        $('#id_famb_step3_3_cap')[0].innerText = this.uiViews.id_famb_step3_3_cap;
        $('#id_famb_step3_3_memo')[0].innerHTML = this.uiViews.id_famb_step3_3_memo;
        $('#id_famb_step3_4_cap')[0].innerText = this.uiViews.id_famb_step3_4_cap;
        $('#id_famb_step3_4_memo')[0].innerHTML = this.uiViews.id_famb_step3_4_memo;
        $('#id_famb_step3_5_cap')[0].innerText = this.uiViews.id_famb_step3_5_cap;
        $('#id_famb_step3_5_memo')[0].innerHTML = this.uiViews.id_famb_step3_5_memo;
        $('#id_famb_step4_cap')[0].innerText = this.uiViews.id_famb_step4_cap;
        $('#id_famb_step4_memo')[0].innerHTML = this.uiViews.id_famb_step4_memo + this.uiViews.asking_with_server;
        $('#id_query_input_cap')[0].innerText = this.uiViews.id_query_input_cap;
        $('#id_query_input_memo')[0].innerText = this.uiViews.id_query_input_memo;
    },

    getManageAccount : function() {
        $.ajax({
            url: AnchorServerUrl + '/query?t=ask',
            cache :false,
            async : true,
            success: function(data, status, xhr) {
                console.log(data);
                jsonobj=eval("("+data+")");
                if(jsonobj.codeid == 0) {
                    $('#id_famb_step4_memo')[0].innerHTML = IndexController.uiViews.id_famb_step4_memo + '<br><p style="word-wrap: break-word; word-break: break-all;color: black;" class="text-center"><strong>' + jsonobj.data + '</strong></p>';
                    $('#qrcode').qrcode({
                        render: "canvas", //table方式
                        width:  200, //宽度
                        height: 200, //高度
                        text: jsonobj.data,
                    });
                } else {
                    $('#id_famb_step4_memo')[0].innerHTML = IndexController.uiViews.id_famb_step4_memo + '<br><p style="word-wrap: break-word; word-break: break-all;color: red;" class="text-center"><strong>' + jsonobj.error + '</strong></p>';
                }
            },
            error: function (xhr, status, e) {
                $('#id_famb_step4_memo')[0].innerHTML = IndexController.uiViews.id_famb_step4_memo + '<br><p style="word-wrap: break-word; word-break: break-all; color: red;" class="text-center"><strong>' + IndexController.uiViews.error_lost_server + '</strong></p>';
            }
        })
    },

    queryBtnClick : function() {
        if(this.queryWaiting.css('display') == 'block' || this.queryInput.val().length == 0){
            return
        }
        this.queryContext[0].innerText = '';
        this.queryContext.css('display','none');
        this.queryResultTab[0].innerHTML = '';
        this.queryWaiting.css('display','block');
        var param = '';
        if(this.queryInput.val().length == 56) {
            param = 'ac=';
        } else {
            param = 'nn=';
        }
        param += encodeURIComponent(this.queryInput.val());

        $.ajax({
            url: AnchorServerUrl + '/query?t=get&'+ param,
            type: 'GET',
            cache :false,
            async : true,
            success: function(data, status,xhr){
                console.log(data);
                jsonobj=eval("("+data+")");
                if (jsonobj.codeid == 0) {
                    IndexController.updateQueryResult(jsonobj.data);
                }
            },
            error: function (xhr, status, e) {
                console.log(xhr);
                console.log(status);
                console.log(e);
                IndexController.queryContext.css('display','block');
                IndexController.queryContext[0].innerText = IndexController.uiViews.error_lost_server;
            },
            complete: function() {
                IndexController.queryWaiting.css('display','none');
            }
        })
    },

    updateQueryResult : function(ret) {
        if(ret == null) {
            return;
        }
        for(var idx = 0 ; idx < ret.assets.length; idx++) {
            c = '<tr><td rowspan="6" class="text-center" style="min-width: 50px;vertical-align: middle;background-color: #EFFFFF;word-wrap: break-word; word-break: break-all;">';
            c += (idx+1) + '</td>';
            c += '<td style="min-width: 50px;vertical-align: middle;background-color: #EFFFFF;word-wrap: break-word; word-break: break-all;"><strong>' + IndexController.uiViews.tab_asset_addr_cap + '</strong>' + ret.asset_addr + '</td></tr>';
            c += '<tr><td style="min-width: 50px;vertical-align: middle;background-color: #EFFFFF;word-wrap: break-word; word-break: break-all;"><strong>' + IndexController.uiViews.tab_asset_name_cap + '</strong>' + ret.assets[idx].code + '</td></tr>';
            c += '<tr><td style="min-width: 50px;vertical-align: middle;background-color: #EFFFFF;word-wrap: break-word; word-break: break-all;"><strong>' + IndexController.uiViews.tab_nick_name_cap + '</strong>' + ret.assets[idx].nick_name + '</td></tr>';
            c += '<tr><td style="min-width: 50px;vertical-align: middle;background-color: #EFFFFF;word-wrap: break-word; word-break: break-all;"><strong>' + IndexController.uiViews.tab_close_time_cap + '</strong>' + getLocalDateTimeString(ret.assets[idx].close_time,true,mLanguage) + '</td></tr>';
            c += '<tr><td style="min-width: 50px;vertical-align: middle;background-color: #EFFFFF;word-wrap: break-word; word-break: break-all;"><strong>' + IndexController.uiViews.tab_hash_cap + '</strong>' + ret.assets[idx].hash + '</td></tr>';
            c += '<tr><td style="min-width: 50px;vertical-align: middle;background-color: #EFFFFF;word-wrap: break-word; word-break: break-all;">';
            c += '<a href="shared.html?l=' + mLanguage + '&acid=' + ret.asset_addr + '&acode=' + ret.assets[idx].code + '&nn=' + ret.assets[idx].nick_name + '&' + randomParam() + '"><strong>' + IndexController.uiViews.tab_share_link + '</strong></a></td></tr>';
            this.queryResultTab[0].innerHTML += c;
        }

    }
};