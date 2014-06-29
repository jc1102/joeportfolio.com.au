/**
 * Created by joech_000 on 25/03/14.
 */


/* jTable begins */
var returnData = "";
filters = [];
globalFilters = "";
var isMessageboardPopupLoaded = false;

/*Call this function to create filters for JTable*/
function generateFilterData( colNum, obj){
    filterByIdFields = ["m_sender"];
    result = [];
    keys = [];
    if(returnData.Result == "OK"){
        var objData = returnData.Records;
        $.each(objData,function(i,v){
            try{
                if($.inArray(colNum,filterByIdFields) > -1){
                    e = v[colNum];
                    fid = v[colNum+'_fid'];
                    if ($.inArray(fid, keys) == -1) {
                        result.push([e,fid]);
                        keys.push(fid);
                    }
                }else{

                    e = v[colNum];

                    if ($.inArray(e, result) == -1) {
                        result.push(e);
                    }


                }

            }
            catch(e){

            }
        });

        var outputHTML = "<option value='' >Show All</option>";
        result.sort();
        $.each(result,function(i,v){

            if($.inArray(colNum,filterByIdFields) > -1){
                outputHTML += "<option value='"+v[1]+"' >"+v[0]+"</option>";

            }else{
                outputHTML += "<option value='"+v+"' >"+v+"</option>";

            }
        });


        $(obj).html(outputHTML);
    }
    else{

    }

    return result;
}

/*
 * Call this function to apply search investigation filter which filter based on the keyword in  #search-xxxx
 * This filter should be applied when the user type on the search box and when JTable is loaded.
 * */
function applyGlobalFilter(){

    var keyword = $("#search-messages").val();
//    console.log(keyword);
    $( "table.jtable tbody tr").css("display","none");
    if(keyword.length > 0){
        $("#clear-btn").parent().find(".glyphicon-remove").css("display","block");
        var re =  RegExp(keyword ,"i");
        $( "table.jtable tbody tr td" ).filter(function() {
            return re.test($(this).text());
        }).each(function() {
            $(this).closest("tr").css("display","table-row");
        });
    }else{
        $("#clear-btn").css("display","none");
        $( "table.jtable tbody tr").css("display","table-row");
    }
}

/* jTable finish */

function showLeaveMessagePopup(){
    $("#visitorRegister").modal("show");
}

function saveMessage(){
    var visitorName = $("#visitorname").val();
    var visitorPhone = $("#visitorphone").val();
    var visitorMessage = $("#visitormessage").val();

    $("#visitor-register-form .form-actions").prepend("<img id='loading' style='float: right; width: 45px; height: 45px;' src='/img/ajaxloading.gif'>");

    $.post("/leave_message_form.php", {"visitorName":visitorName, "visitorPhone":visitorPhone, "visitorMessage": visitorMessage}, function (result) {
        if (result == "message added") {
            $("#visitor-register-form .form-actions #loading").remove();
            alert("message added");
            $(".messageboardTableContainer").jtable("reload");
        }
        else {
            $("#visitor-register-form .form-actions #loading").remove();
            alert("error occur");
        }
    });
}

function filterCheatsheet() {
    var keyword = $('#cs-search').val();
    if (keyword.length > 0) {
        $(".cs-sidebar .nav li a").each(function(){
            if($(this).html().toLowerCase().indexOf(keyword) >= 0 )
                $(this).trigger("click");
        });
    }
}

function enableClearButton(inputId,callbackFn){

    var clearBtnHTML = '<i class="glyphicon glyphicon-remove"></i>';
    $("#"+inputId).after(clearBtnHTML);

    $("#"+inputId+" ~ .glyphicon-remove").bind("click",function(){
        $(this).parent().find("input#"+inputId).val("");
        if(callbackFn != null)
            setTimeout(callbackFn, 0);
        $(this).css("display","none");
    });

    $("#"+inputId).keyup(function(event) {
        var keyword = $(this).val();
        var clearBtn = $(this).parent().find(".glyphicon-remove");
        clearBtn.css("display","none");

        if(keyword.length > 0){
            clearBtn.css({
                display: "-moz-box",
                cursor: "pointer"
            });
        }else{
            clearBtn.css("display","none");
        }
    });
}

//var colorschemeSettingnotshow = true;
//var settingWidth = 225;
//function dropColorScheme(){
//    if (colorschemeSettingnotshow){
//        $(".themecolorchange").animate({
//            left: 20
//        }, 500, function() {
//            // Animation complete
//        });
//        colorschemeSettingnotshow = false;
//        console.log(colorschemeSettingnotshow);
//    }
//}
$(document).ready(function(){
    /* jTable start */
    $('.messageboardTableContainer').jtable({
        /*title: 'Action',*/
        paging: false,
        pageSize: 100,
        columnResizable: false,
        columnSelectable: false,
        defaultDateFormat: 'dd M yy',
        defaultSorting: 'vt_name ASC',
        sorting: true,
        actions: {
            listAction: '/jtable/Action_messageboard.php?action=list'
        },
        recordsLoaded: function(event, data) {
            applyGlobalFilter();
            $(".messageboardTableContainer").scrollTop(0);
            $(".messageboardTableContainer").perfectScrollbar('update');
        },

        fields: {
            vt_id: {
                key: true,
                create: false,
                edit: false,
                list: false
            },
            vt_name: {
                title: 'Name',
                width: '20%',
                display: function (data) {
                    return '<div style="text-align: center;text-overflow:ellipsis;">'+data.record.vt_name+'</div>';
                }
            },
            vt_phone: {
                title: 'Phone',
                width: '20%',
                display: function (data) {
                    return '<div style="text-align: center;text-overflow:ellipsis;" title="'+data.record.vt_phone+'">'+data.record.vt_phone+'</div>';
                }
            },

            vt_message: {
                title: 'Message',
                width: '60%',
                display: function (data) {
                    return '<div style="text-align: center;text-overflow:ellipsis;" title="'+data.record.vt_message+'">'+data.record.vt_message+'</div>';
                }
            }
        },
        fieldtags: {

        }
    });
    $(".duptable select").die("change");
    $(".duptable select").live("change",function(){
        // prepare filter list

        filters["filter-name"] = $(".duptable .filter-name option:selected").val();
        filters["filter-phone"] = $(".duptable .filter-phone option:selected").val();

        $('.messageboardTableContainer').jtable('load',{

            /**
             * filter data
             */
            filterName: filters["filter-name"],
            filterPhone: filters["filter-phone"]

        },function(){

        });
    });

    //Load message list from server
    if(!isMessageboardPopupLoaded){
        isMessageboardPopupLoaded = true;
        $('.messageboardTableContainer').jtable('load',{

        },function(){

            //callback from jtable

            $('.messageboardTableContainer thead').prepend('<tr class="filter-jtable">' +
                '<th><select class="filter-name"><option>opt 1</option><option>opt 2</option></select></th>' +
                '<th><select class="filter-phone"><option>opt 1</option><option>opt 2</option></select></th>' +
                '<th></th>' +
                '</tr>');

            var table = $("<table class='jtable duptable dup-jtable' style='width: 100%' ></table>");
            var divContainer = $("<div class='jtable-main-container'></div>");
            $('.messageboardTableContainer .jtable thead').clone(true,true).appendTo(table);


            divContainer.append(table);
            $('.messageboardTableContainer').before(divContainer);


            $('.duptable tr:last').live("click",function(){
                // update header
                $('.duptable').html("");
                $('.messageboardTableContainer .jtable thead').clone(true,true).appendTo($(".duptable"));
            });



            $('.messageboardTableContainer').perfectScrollbar({
                wheelSpeed: 20,
                wheelPropagation: false
            });


            generateFilterData("vt_name",$(".filter-name"));
            generateFilterData("vt_phone",$(".filter-phone"));

            $(".duptable .filter-name").on("change",function(){
                var selectedVal = $(this).val();
                $(".messageboardTableContainer .filter-name option[value='"+selectedVal+"']").prop("selected",true);
            });
        });
    }

    $("#clear-btn").bind("click",function(){
        $("#search-messages").val("");
        applyGlobalFilter();
    });

    $("#search-messages").keyup(function() {
        applyGlobalFilter();
        $(".messageboardTableContainer").scrollTop(0);
        $('.messageboardTableContainer').perfectScrollbar('update');
    });
    /* jTable finish */

    /* Message leaving float start */
    $(".hm").append('<div class="messagefloat" style="cursor: pointer; position: absolute; right: 25px; top: 105px;z-index: 999;" onclick = "showLeaveMessagePopup()"><img style="width: 126px;height: 126px;background-color: transparent;" src="/img/message.png"></div>');

    $(document).scroll(function() {

        var currentpx = 105;

        var scrolledpx = parseInt($(document).scrollTop());

        var sum = currentpx+scrolledpx;

        $( ".messagefloat" ).animate({

            top: sum

        }, 20, function() {

            // Animation complete.

        });

    })
    /* Message leaving float finish */

    /*Leave Message form */
    $('#visitor-register-form').validate({
        rules: {
            visitorname: {
                minlength: 2,
                required: true
            },
            visitorphone: {
                required: true,
                digits: true,
                minlength:10
            },
            visitormessage: {
                minlength: 2,
                required: true,
                maxlength: 37
            }
        },
        highlight: function (element) {
            $(element).closest('.control-group').removeClass('ini').removeClass('success').addClass('error');
        },
        success: function (element) {
            element.text('OK!').addClass('valid')
                .closest('.control-group').removeClass('ini').removeClass('error').addClass('success');
        }
    });
    /*Visitor-register-form submit */
    $( "#visitor-register-form .form-actions :submit" ).click(function( event ) {
        event.preventDefault();
        var $visitorform = $(this).parent().parent();
        console.log($visitorform);
        if (!send_form_validation($visitorform) || $visitorform.find(".control-group").hasClass("ini")) {
            alert("please correct contact detail");
            return;
        }else{
            saveMessage();
        }
    });
    /* Color Scheme Setting float start */
    $("body").floating_modal({
        floating_top:"140px",
        float_position:"left",
        float_range:20,
        float_modal_url:"/colorscheme.html",
        init_callback: function(){
            $(".floating_icon").find("img").css("width","45px");
        }
    });

    /*  previous work before plugin swaped */
//    $("body").append('<div class="themecolorchange" style="cursor: pointer; position: absolute; top: 140px;z-index: 999;"><img onclick = "dropColorScheme()" style="width: 45px;height: 45px;background-color: transparent;" src="/img/Setting-icon.png"></div>');
//
//    $(".themecolorchange").find("img").after('<div style="vertical-align: top; width: 225px; float: left;"><div class="colorscheme" > </div></div>');
//    $.ajax({
//        url: "/colorscheme.html",
//        type: "GET"
//    }).done(function (data) {
//        $(".colorscheme").html(data);
//    });
//    $(".themecolorchange").css({
//        width: function () {
//            return $(this).width() + settingWidth;
//        },
//        left: - settingWidth
//    });
//
//    $(document).scroll(function() {
//
//        var currentpx = 140;
//
//        var scrolledpx = parseInt($(document).scrollTop());
//
//        var sum = currentpx+scrolledpx;
//
//        $( ".themecolorchange" ).animate({
//
//            top: sum
//
//        }, 20, function() {
//
//            // Animation complete.
//
//        });
//
//    })
    /* Color Scheme Setting float finish */

    /* Search Cheatsheet enable */
    $('#cs-search').keyup(function (event) {
        filterCheatsheet();
    });
    enableClearButton("cs-search", filterCheatsheet);
    $(".glyphicon-remove").css("display","none");
    /* Search Cheatsheet end */
});