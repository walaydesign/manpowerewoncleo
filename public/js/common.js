// menu
$(".header .header_menu").click(function(){
    $(this).toggleClass("active");
    $(".header_link").toggleClass("active");
})

$(".back_header .header_menu").click(function(){
    $(this).toggleClass("active");
    $(".back_header_nav").toggleClass("active");
})

// popup
$(".popup_close, .popup_bg").click(function(){
    $(this).parents(".popup").fadeOut(300);
})

$(".btn-popup").click(function(){
    let popup = $(this).data("popup");
    $(popup).fadeIn(300);
})

// check
$(".check-item").click(function(){
    if(!$(this).hasClass("popup_select_secondLayer_item")) {
        $(this).find(".checkbox").toggleClass("active");
    }
})

// popup選擇
let selectTotal = 0;
$(".popup_select_secondLayer_item").click(function(){
    if($(this).parents(".popup").hasClass("popup-resumeJob")) {
        let selectedText = $(this).find("span").text();
        $(this).parents(".popup_select_secondLayer-wrap").find(".checkbox").removeClass("active");
        $(this).find(".checkbox").addClass("active");
        $(".detail-resume_jobClass").text(selectedText);
        $(this).parents(".popup-resumeJob").fadeOut(300);
    }else {
        let firstLayer = $(this).parents(".popup_select_secondLayer_list").attr("data-firstLayer");
        if(!$(this).hasClass("invalid")) {
            if($(this).find(".checkbox").hasClass("active")) {
                $(this).find(".checkbox").removeClass("active");
                if($(this).hasClass("all")) {
                    // 總數
                    $(this).siblings(".popup_select_secondLayer_item").removeClass("invalid");
                    $(firstLayer).find(".popup_select_firstLayer_selectNum").hide();
                    $(firstLayer).find(".popup_select_firstLayer_selectNum span").text("0");
                    selectTotal = selectTotal - 1;
                    $(this).parents(".popup_select").find(".popup_select_num .selected").text(selectTotal);
                }else {
                    let selectNum =  parseInt($(firstLayer).find(".popup_select_firstLayer_selectNum span").text());
                    selectNum--;
                    if(selectNum<1) {
                        $(firstLayer).find(".popup_select_firstLayer_selectNum").hide();
                    }
                    $(firstLayer).find(".popup_select_firstLayer_selectNum span").text(selectNum);
                    selectTotal = selectTotal - 1;
                    $(this).parents(".popup_select").find(".popup_select_num .selected").text(selectTotal);
                }
            }else {
                let firstLayer = $(this).parents(".popup_select_secondLayer_list").attr("data-firstLayer");
                let selectNum =  parseInt($(firstLayer).find(".popup_select_firstLayer_selectNum span").text());
                if($(this).hasClass("all")) {
                    // 總數
                    selectTotal = selectTotal - selectNum + 1;
    
                    if(selectTotal <= 10) {
                        $(this).find(".checkbox").addClass("active");
                        $(this).siblings(".popup_select_secondLayer_item").addClass("invalid");
                        $(this).siblings(".popup_select_secondLayer_item").find(".checkbox").removeClass("active");
                        $(firstLayer).find(".popup_select_firstLayer_selectNum").show().css("display","flex");
                        $(firstLayer).find(".popup_select_firstLayer_selectNum span").text("1");
                        $(this).parents(".popup_select").find(".popup_select_num .selected").text(selectTotal);
                    }else {
                        selectTotal = selectTotal + selectNum - 1;
                    }
                }else {
                    // 單一類別總數
                    selectNum++;
    
                    // 總數
                    selectTotal = selectTotal + 1;
    
                    if(selectTotal <= 10) {
                        $(this).find(".checkbox").addClass("active");
                        $(firstLayer).find(".popup_select_firstLayer_selectNum").show().css("display","flex");
                        $(firstLayer).find(".popup_select_firstLayer_selectNum span").text(selectNum);
                        $(this).parents(".popup_select").find(".popup_select_num .selected").text(selectTotal);
                    }else {
                        selectTotal = selectTotal - 1;
                    }
                }
            }
        }
    }
})

$(".popup_select_firstLayer_list").click(function(){
    $(this).addClass("active").siblings(".popup_select_firstLayer_list").removeClass("active");
    let secondLayer = $(this).attr("data-secondLayer");
    $(secondLayer).addClass("active").siblings(".popup_select_secondLayer_list").removeClass("active");
    if($(window).width() < 576) {
        $(".popup_select_secondLayer-wrap").show();
    }
})

$(".popup_select_secondLayer_head").click(function(){
    $(this).parents(".popup_select_secondLayer_list").removeClass("active");
    $(this).parents(".popup_select_secondLayer-wrap").hide();
})

$(".popup_select_clear").click(function(){
    $(this).parents(".popup_select").find(".popup_select_firstLayer_selectNum").each(function(){
        $(this).find("span").text("0");
        $(this).hide();
    })
    $(this).parents(".popup_select").find(".popup_select_secondLayer_item").each(function(){
        $(this).find(".checkbox").removeClass("active");
        $(this).removeClass("invalid");
    })
    selectTotal = 0;
    $(".popup_select_num").find(".selected").text("0");
})

$(window).on("resize scroll",function(){
    if($(window).width() > 575) {
        $(".popup_select_secondLayer-wrap").show();
        let secondLayer = $(".popup_select_firstLayer_list.active").attr("data-secondLayer");
        $(secondLayer).addClass("active");
    }
})

$("#filter-place .popup_close").click(function(){
    let selected = parseInt($(this).parents(".popup_select_head").find(".selected").text());
    if(selected > 0) {
        $("#searchjob_filter-place").addClass("active");
    }else {
        $("#searchjob_filter-place").removeClass("active");
    }
})

$("#filter-job .popup_close").click(function(){
    let selected = parseInt($(this).parents(".popup_select_head").find(".selected").text());
    if(selected > 0) {
        $("#searchjob_filter-job").addClass("active");
    }else {
        $("#searchjob_filter-job").removeClass("active");
    }
})

// top鍵
$(".sideBtn_top").click(function(){
    $("html, body").animate({scrollTop: 0},300);
})

// 聊聊
function chatContentHeight(){

    $(".chat_main_right_inner").each(function(){
        let chatMainSearchHeight = $(".chat_main_search").height() + 25;
        let chatMainListHeight = $(window).height() * 0.58;
        let chatMainTitleHeight = $(this).find(".chat_main_title").height() + 30;
        let chatMainInputHeight = $(this).find(".chat_main_input").height();
        let chatMainContentHeight = chatMainListHeight + chatMainSearchHeight - chatMainTitleHeight - chatMainInputHeight;
        $(this).find(".chat_main_content").css("height",chatMainContentHeight);
    })
}

$(".chat_main_list_item").click(function(){
    let chatTarget = $(this).data("chat");
    $(this).addClass("active").siblings(".chat_main_list_item").removeClass("active");
    $(chatTarget).addClass("active").siblings(".chat_main_right_inner").removeClass("active");
    if($(window).width() < 768) {
        $(".chat_main_right").addClass("active");
        $(".chat_head_title").hide();
        $(".chat_head_title-m").show().css("display","flex");
    }
})

$(".chat_back").click(function(){
    $(".chat_main_right").removeClass("active");
    $(".chat_head_title").show().css("display","flex");
    $(".chat_head_title-m").hide()
})

$(".sideBtn_chat, .btn-chat").click(function(){
    $(".chat").addClass("active");
})

$(".chat_head_close").click(function(){
    $(".chat").removeClass("active");
})

// 搜尋人才
$(".recruit_search_advanced_title").click(function(){
    if(!$(this).hasClass("btn-popup")) {
        $(this).toggleClass("active");
        $(this).parents(".recruit_search_advanced_item").find(".recruit_search_advanced_content").slideToggle(300);
    }
})

// 選取
$(".select-item").click(function(){
    if($(this).parents(".select-wrap").hasClass("select-multi")) {
        $(this).toggleClass("active");
    }else {
        $(this).toggleClass("active");
        $(this).siblings(".select-item").removeClass("active");
    }
})

// 儲存
$(".hot-job_item .btn-save").click(function(){
    if($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).text("儲存");
    }else {
        $(this).addClass("active");
        $(this).text("取消儲存");
    }
 });

 $(".company_job_item .btn-save").click(function(){
    if($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).text("儲存");
    }else {
        $(this).addClass("active");
        $(this).text("取消儲存");
    }
 });

 $(".btn-save-common").click(function(){
    if($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).find(".btn-border-blue_text").text("收藏");
    }else {
        $(this).addClass("active");
        $(this).find(".btn-border-blue_text").text("取消收藏");
    }
 })

 $(".btn-border-onlyIcon-save").click(function(){
    $(this).toggleClass("active");
 })

//  內容頁
function detailBanner() {
    let headHeight = $(".detail-head").height() + 50;
    let marginBottom = headHeight / 2;
    $(".detail-banner").css("margin-bottom", marginBottom);
}
detailBanner();

$(window).on("resize scroll",function(){
    detailBanner();
})

$(".detail-lookmore").click(function(){
    if($(this).hasClass("active")) {
        $(this).parents(".detail-content_intro_item").find(".detail-longText-wrap").css("height", 200);
        $(this).parents(".detail-content_intro_item").find(".detail-longText-wrap").removeClass("slideDown");
        $(this).removeClass("active");
    }else {
        let longTextHeight =  $(this).parents(".detail-content_intro_item").find(".detail-longText").height();
        $(this).parents(".detail-content_intro_item").find(".detail-longText-wrap").css("height", longTextHeight);
        $(this).parents(".detail-content_intro_item").find(".detail-longText-wrap").addClass("slideDown");
        $(this).addClass("active");
    }
})

// 詳細頁導覽列
$(".detail-content_nav_list li").click(function(){
    let target = $(this).data("target");
    var top = $(target).offset().top - 100;
    $("html, body").animate({ scrollTop: top }, parseInt(300));
    $(this).addClass("active").siblings("li").removeClass("active");
})

// 上傳大頭照
let brandImg;
$(".upload-pic-brand .upload-pic_btn_input").change(function(e) {
    brandImg = $(this).parents(".upload-pic").find(".upload-pic_main");
    brandReadURL(e.target);
})
function brandReadURL(brandInput) {
    if(brandInput.files && brandInput.files[0]){
        let reader = new FileReader();
        reader.onload = function (e) {
            brandImg.attr('src', e.target.result);
        }
        reader.readAsDataURL(brandInput.files[0]);
    }
}

// 上傳公司banner
let bannerImg;
$(".company-banner .upload-pic_btn_input").change(function(e) {
    bannerImg = $(this).parents(".company-banner").find(".company-banner_main");
    bannerReadURL(e.target);
})
function bannerReadURL(bannerInput) {
    if(bannerInput.files && bannerInput.files[0]){
        let reader = new FileReader();
        reader.onload = function (e) {
            bannerImg.attr('src', e.target.result);
        }
        reader.readAsDataURL(bannerInput.files[0]);
    }
}

// tab
$(".tab_item").click(function(){
    let tab = $(this).data("tab");
    $(tab).addClass("active").siblings(".tab-content_item").removeClass("active");
    $(this).addClass("active").siblings(".tab_item").removeClass("active");
})

// record
$(".record-item").click(function(){
    var btnArea = $("button");
    var linkArea = $("a");
    if (!btnArea.is(event.target) && btnArea.has(event.target).length === 0) {
        if (!linkArea.is(event.target) && linkArea.has(event.target).length === 0) {
            let link = $(this).data("link");
            window.location.assign(link);
        }
    }
 })

//  新增tag
$(".addTag_btn").click(function(){
    let inputVal = $(this).parents(".addTag_form").find(".input").val().toString();
    // console.log(inputVal);
    if(!inputVal == "") {
        let tagText = $("<span></span>").text(inputVal);
        let x = $("<img class='tag-border-gray_x' src='/public/img/x.svg'>");
        let li = $("<li class='tag-border-gray'></li>");
        li.append(tagText, x);
        $(this).parents(".addTag").find(".addTag_content").append(li);
        $(this).parents(".addTag_form").find(".input").val("");
    }
})

// collaspe
$(".detail-resume_collaspe_head").click(function(){
    $(this).toggleClass("active");
    $(this).parents(".detail-resume_collaspe").find(".detail-resume_collaspe_content").slideToggle(300);
})

// 回上頁
$(".btn-back").click(function(){
    history.back();
})

$(".job_item").click(function(){
    var btnArea = $("button");
    var linkArea = $("a");
    if (!btnArea.is(event.target) && btnArea.has(event.target).length === 0) {
        if (!linkArea.is(event.target) && linkArea.has(event.target).length === 0) {
            let link = $(this).data("link");
            window.location.assign(link);
        }
    }
 })

 $(".recruit_item").click(function(){
    var btnArea = $("button");
    var linkArea = $("a");
    if (!btnArea.is(event.target) && btnArea.has(event.target).length === 0) {
        if (!btnArea.is(event.target) && btnArea.has(event.target).length === 0) {
            let link = $(this).data("link");
            window.location.assign(link);
        }
    }
 })


