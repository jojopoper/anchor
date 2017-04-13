/**
 * Created by jojopoper on 2017/04/13.
 */

var SharedController = {
    uiView: {},
    addr: '',
    code: '',
    nickname: '',

    initController : function(){
        this.readParam();
        this.initStrings();
        this.initView();
    },

    readParam : function () {
        this.addr = getUrlParam('acid');
        if (this.addr != '' && this.addr != undefined) {
            this.code = getUrlParam('acode');
            $('#qrcode').qrcode({
                render: "canvas", //table方式
                width:  200, //宽度
                height: 200, //高度
                text: this.code + ' - ' + this.addr,
            });
        }
        this.nickname = getUrlParam('nn');
    },

    initStrings : function() {
        if(mLanguage == 'cn') {
            this.uiView.id_shared_header_h2 = '这个是我发布的资产';
            this.uiView.id_shared_header_label = '请添加信任';
            this.uiView.id_addr_badge = '<span class="badge">地址</span>';
            this.uiView.id_code_badge = '<span class="badge">代码</span>';
            this.uiView.id_nickname_h4 = '通过昵称就能找到我的地址';
            this.uiView.id_scan_qrcode_header_cap = '用LumenStar扫码添加轻松添加信任';
        } else {
            this.uiView.id_shared_header_h2 = 'This is my Asset';
            this.uiView.id_shared_header_label = 'Please add trust';
            this.uiView.id_addr_badge = '<span class="badge">Addr</span>';
            this.uiView.id_code_badge = '<span class="badge">Code</span>';
            this.uiView.id_nickname_h4 = 'You can find my address as nickname';
            this.uiView.id_scan_qrcode_header_cap = 'Use LumenStar to scan two-dimensional code to add easy to add trust';
        }
    },
    initView : function() {
        if (mLanguage == 'cn') {
            $(document).attr("title", '分享资产 - Ledgercn');
        } else {
            $(document).attr("title", 'Share Anchor - Ledgercn');
        }

        $('#id_shared_header_h2')[0].innerHTML = this.uiView.id_shared_header_h2 + ' <span class="label label-warning">'+this.uiView.id_shared_header_label+'</span>';
        $('#id_addr_badge')[0].innerHTML = this.uiView.id_addr_badge + this.addr;
        $('#id_code_badge')[0].innerHTML = this.uiView.id_code_badge + this.code;
        if(this.nickname != undefined && this.nickname.length > 0) {
            $('#id_nickname_h4')[0].innerHTML = this.uiView.id_nickname_h4 + ' <span class="label label-default">' + this.nickname + '*anchor.ledgercn.com</span>';
        } else {
            $('#id_nickname_h4')[0].innerHTML = ''
        }
        $('#id_scan_qrcode_header_cap')[0].innerText = this.uiView.id_scan_qrcode_header_cap;
    },
};