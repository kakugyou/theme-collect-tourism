/*window.moveHeader = function(ScrollTop){
	var Header = $('#header');
	ScrollTop > 200 ? Header.addClass('on') : Header.removeClass('on');
};
window.showTopBtn = function(ScrollTop){
	var toTop = $('#toTop');
	ScrollTop > 200 ? toTop.addClass('on') : toTop.removeClass('on');
};

function toTop(){
	var Top = $('#toTop');
	$('html,body').animate({scrollTop:0},500);
}
*/
function NotCopy(){
	$('body').on('copy',function(){return false;});
}

function menuChange(){
	$('.card').click(function(){
		var index = $('.card').index(this);
		$(this).addClass('on').siblings('.card').removeClass('on');
		$('.des').eq(index).show().siblings('.des').hide();	
	})
}

$(function(){
	menuChange();
    changeCate.onClick();
    PhoneMenu.run();
});

var PhoneMenu = {
    Menu : $('#menu'),
    Btn : $('#menu-btn'),
    Item : $('#menu .nav-item'),
    SubNav : $('#menu .sub-nav'),
    SubTitle : $('#menu .sub-title'),
    Close : $('#menu .menu-close'),
    TriggerWidth : 992,
    OpenClass : 'open-menu',
    checkWidth : function(){
        return window.innerWidth <= this.TriggerWidth;
    },
    slideMenu : function(Action){
        if(Action){
            this.Menu.addClass(this.OpenClass);
            $('html,body,#header,#website').addClass(this.OpenClass);
        }else{
            this.Item.removeClass('on');
            this.SubNav.removeClass('open');
            this.Menu.removeClass(this.OpenClass);
            $('html,body,#header,#website').removeClass(this.OpenClass);
        }
    },
    slideSub : function(Action,Sub){
        if(Action){
            Sub.addClass('open');
            Sub.parents('.nav-item').addClass('on');
            this.Menu.animate({scrollTop:0},300);
        }else{
            Sub.removeClass('open')
            Sub.parents('.nav-item').removeClass('on');
        }
    },
    run : function(){
        var thisObj = this;
        thisObj.Btn.click(function(){ if(thisObj.checkWidth()){ thisObj.slideMenu(true) } });
        thisObj.Close.click(function(){ if(thisObj.checkWidth()){ thisObj.slideMenu(false) } });
        thisObj.Item.find('.item-a').click(function(){
            if(thisObj.checkWidth()){
                var Sub = $(this).next(thisObj.SubNav);
                if(Sub.length){	//有二级导航
                    thisObj.slideSub(true,Sub);
                    return false;	//阻止链接跳转页面
                }
            }
        });
        thisObj.SubTitle.click(function(){ if(thisObj.checkWidth()){ thisObj.slideSub(false,$(this).parent()); } });
    }
}

var changeCate = {
    btn : $('#products .categorys a'),
    list : $('#products .item'),
    class : 'swiper-slide',
    change : function(cid){
        var This = this;
        This.btn.removeClass('on');
        $('#products .categorys a[cid='+cid+']').addClass('on');
        if(cid){
            This.list.each(function(){
                var id = $(this).attr('fid');
                id == cid ? $(this).addClass(This.class) : $(this).removeClass(This.class);
            });
        }else{
            This.list.addClass(This.class);
        }
        proSwiper.update();
    },
    onClick : function(){
        var This = this;
        This.btn.click(function(){
            var cid = $(this).attr('cid'),
                cate = $(this).text();
            This.change(cid);
            $('#products .dropdown button').html(cate+' <span class="caret"></span>');
        });
    }
};

var bannerSwiper = new Swiper('.banner', {
    touchEventsTarget: 'wrapper',
    spaceBetween: 0,
    prevButton: '.banner .prev',
    nextButton: '.banner .next',
    onInit:function(swiper){
        var active = swiper.slides[swiper.activeIndex],
            color = $(active).attr('color');
        $('#header').attr('color',color);
    },
    onSlideChangeStart: function(swiper){
        var active = swiper.slides[swiper.activeIndex],
            color = $(active).attr('color');
        $('#header').attr('color',color);
    }
});

var bigimgSwiper = new Swiper('#products .big-imgs', {
    pagination: '#products .small-img-wrap .swiper-wrapper',
    paginationType: 'custom',
    paginationClickable: true
});

var smallimgSwiper = new Swiper('#products .small-img-wrap', {
    spaceBetween: 10,
    slidesPerView: 4,
    onTap: function(swiper){
        bigimgSwiper.slideTo(swiper.clickedIndex);
    }
});

var proSwiper = new Swiper('.products-list.swiper-container', {
    slidesPerView: 4,
    slidesPerGroup: 4,
    prevButton: '#products .opt .prev',
    nextButton: '#products .opt .next',
    breakpoints:{
        992:{
            slidesPerView: 2,
            slidesPerGroup: 2
        }
    }
});