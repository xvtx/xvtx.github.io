jQuery(document).ready(function($) {
//点击下一页的链接(即那个a标签)
$('div.post-read-more a').click( function() {
    $this = $(this);
    $this.addClass('loading'); //给a标签加载一个loading的class属性，可以用来添加一些加载效果
    var href = $this.attr("href"); //获取下一页的链接地址
    if (href != undefined) { //如果地址存在
        $.ajax( { //发起ajax请求
            url: href, //请求的地址就是下一页的链接
            type: "get", //请求类型是get
        error: function(request) {
            //如果发生错误怎么处理
        },
        success: function(data) { //请求成功
            $this.removeClass('loading'); //移除loading属性
            var $res = $(data).find(".post"); //从数据中挑出文章数据，请根据实际情况更改
            $('.posts-loop').append($res); //将数据加载加进posts-loop的标签中。
            var newhref = $(data).find(".post-read-more a").attr("href"); //找出新的下一页链接
            if( newhref != undefined ){
                $(".post-read-more a").attr("href",newhref);
            }else{
                $(".post-read-more").hide(); //如果没有下一页了，隐藏
            }
        }
        });
    }
    return false;
});
}); 


//屏蔽a的title前端效果
for(i=0;i<document.links.length;i++){
    document.links[i].title='';
}

//切换暗黑模式
function switchdarkMode(){
    // var dark = document.cookie.replace(/(?:(?:^|.*;\s*)dark\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
    // if(dark == '0'){
    //     document.documentElement.classList.add('dark');
    //     document.cookie = "dark=1;path=/"
    //     console.log('夜间模式开启');
    // }else{
    //     document.documentElement.classList.remove('dark');
    //     document.cookie = "dark=0;path=/"
    //     console.log('夜间模式关闭');
    // }
    if(!jQuery("html").hasClass('dark')){
        document.documentElement.classList.add('dark');
    }else{
        document.documentElement.classList.remove('dark');
    }
}

//定时暗黑模式
(function(){
    var prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches; //获取系统是否开启了暗黑模式
    if(prefersDarkMode || new Date().getHours() > 20 || new Date().getHours() < 6){
        document.documentElement.classList.add('dark');
    }else{
        document.documentElement.classList.remove('dark');
    }
})();

// (function(){
// if(document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") === ''){
// if(new Date().getHours() > 22 || new Date().getHours() < 6){
// //默认22点到6点自动启用，可以自己设置时间
// document.body.classList.add('night');
// document.cookie = "night=1;path=/";
// console.log('夜间模式开启');
// }else{
// document.body.classList.remove('night');
// document.cookie = "night=0;path=/";
// console.log('夜间模式关闭');
// }
// }else{
// var night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
// if(night == '0'){
// document.body.classList.remove('night');
// }else if(night == '1'){
// document.body.classList.add('night');
// }
// }
// })();

//Switch开关
$('.js-tab-underline').css('width', $('.js-tab-link.active').outerWidth());

$(".js-tab-link").click(function(e){
		e.preventDefault();
		$(".js-tab-link").removeClass("js-active-tab");
		$(this).addClass("js-active-tab");
    
    var current = $(this),
        position = current.position();
    $('.js-tab-underline').css('left', position.left);
    $('.js-tab-underline').css('width', $(this).outerWidth());
});


//打开sidebar 
$(document).ready(function(){
    $('.hamRotate').click(function(){
        $('.sidebar').animate({width:'toggle'},200);
        $('body').toggleClass("boom_body");
    });
});


//评论输入礼花及震动特效
(function webpackUniversalModuleDefinition(root,factory){if(typeof exports==='object'&&typeof module==='object')module.exports=factory();else if(typeof define==='function'&&define.amd)define([],factory);else if(typeof exports==='object')exports["POWERMODE"]=factory();else root["POWERMODE"]=factory()})(this,function(){return(function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:false};modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);module.loaded=true;return module.exports}__webpack_require__.m=modules;__webpack_require__.c=installedModules;__webpack_require__.p="";return __webpack_require__(0)})([function(module,exports,__webpack_require__){'use strict';var canvas=document.createElement('canvas');canvas.width=window.innerWidth;canvas.height=window.innerHeight;canvas.style.cssText='position:fixed;top:0;left:0;pointer-events:none;z-index:999999';window.addEventListener('resize',function(){canvas.width=window.innerWidth;canvas.height=window.innerHeight});document.body.appendChild(canvas);var context=canvas.getContext('2d');var particles=[];var particlePointer=0;POWERMODE.shake=true;function getRandom(min,max){return Math.random()*(max-min)+min}function getColor(el){if(POWERMODE.colorful){var u=getRandom(0,360);return'hsla('+getRandom(u-10,u+10)+', 100%, '+getRandom(50,80)+'%, '+1+')'}else{return window.getComputedStyle(el).color}}function getCaret(){var el=document.activeElement;var bcr;if(el.tagName==='TEXTAREA'||(el.tagName==='INPUT'&&el.getAttribute('type')==='text')){var offset=__webpack_require__(1)(el,el.selectionStart);bcr=el.getBoundingClientRect();return{x:offset.left+bcr.left,y:offset.top+bcr.top,color:getColor(el)}}var selection=window.getSelection();if(selection.rangeCount){var range=selection.getRangeAt(0);var startNode=range.startContainer;if(startNode.nodeType===document.TEXT_NODE){startNode=startNode.parentNode}bcr=range.getBoundingClientRect();return{x:bcr.left,y:bcr.top,color:getColor(startNode)}}return{x:0,y:0,color:'transparent'}}function createParticle(x,y,color){return{x:x,y:y,alpha:1,color:color,velocity:{x:-1+Math.random()*2,y:-3.5+Math.random()*2}}}function POWERMODE(){{var caret=getCaret();var numParticles=5+Math.round(Math.random()*10);while(numParticles--){particles[particlePointer]=createParticle(caret.x,caret.y,caret.color);particlePointer=(particlePointer+1)%500}}{if(POWERMODE.shake){var intensity=1+2*Math.random();var x=intensity*(Math.random()>0.5?-1:1);var y=intensity*(Math.random()>0.5?-1:1);document.body.style.marginLeft=x+'px';document.body.style.marginTop=y+'px';setTimeout(function(){document.body.style.marginLeft='';document.body.style.marginTop=''},75)}}};POWERMODE.colorful=false;function loop(){requestAnimationFrame(loop);context.clearRect(0,0,canvas.width,canvas.height);for(var i=0;i<particles.length;++i){var particle=particles[i];if(particle.alpha<=0.1)continue;particle.velocity.y+=0.075;particle.x+=particle.velocity.x;particle.y+=particle.velocity.y;particle.alpha*=0.96;context.globalAlpha=particle.alpha;context.fillStyle=particle.color;context.fillRect(Math.round(particle.x-1.5),Math.round(particle.y-1.5),3,3)}}requestAnimationFrame(loop);module.exports=POWERMODE},function(module,exports){(function(){var properties=['direction','boxSizing','width','height','overflowX','overflowY','borderTopWidth','borderRightWidth','borderBottomWidth','borderLeftWidth','borderStyle','paddingTop','paddingRight','paddingBottom','paddingLeft','fontStyle','fontVariant','fontWeight','fontStretch','fontSize','fontSizeAdjust','lineHeight','fontFamily','textAlign','textTransform','textIndent','textDecoration','letterSpacing','wordSpacing','tabSize','MozTabSize'];var isFirefox=window.mozInnerScreenX!=null;function getCaretCoordinates(element,position,options){var debug=options&&options.debug||false;if(debug){var el=document.querySelector('#input-textarea-caret-position-mirror-div');if(el){el.parentNode.removeChild(el)}}var div=document.createElement('div');div.id='input-textarea-caret-position-mirror-div';document.body.appendChild(div);var style=div.style;var computed=window.getComputedStyle?getComputedStyle(element):element.currentStyle;style.whiteSpace='pre-wrap';if(element.nodeName!=='INPUT')style.wordWrap='break-word';style.position='absolute';if(!debug)style.visibility='hidden';properties.forEach(function(prop){style[prop]=computed[prop]});if(isFirefox){if(element.scrollHeight>parseInt(computed.height))style.overflowY='scroll'}else{style.overflow='hidden'}div.textContent=element.value.substring(0,position);if(element.nodeName==='INPUT')div.textContent=div.textContent.replace(/\s/g,"\u00a0");var span=document.createElement('span');span.textContent=element.value.substring(position)||'.';div.appendChild(span);var coordinates={top:span.offsetTop+parseInt(computed['borderTopWidth']),left:span.offsetLeft+parseInt(computed['borderLeftWidth'])};if(debug){span.style.backgroundColor='#aaa'}else{document.body.removeChild(div)}return coordinates}if(typeof module!="undefined"&&typeof module.exports!="undefined"){module.exports=getCaretCoordinates}else{window.getCaretCoordinates=getCaretCoordinates}}())}])});
POWERMODE.colorful = true; // make power mode colorful  
POWERMODE.shake = false; // turn off shake  
document.body.addEventListener('input', POWERMODE);



//文章右侧目录树
if($("body").hasClass('single-post') && $(".right_box .wznrys h1").length>0){
    var h1Str = '';
    var h1Dom = $(".right_box .wznrys h1");
    for (var i = 0; i < h1Dom.length; i++) {
        var txt = h1Dom[i].innerText;
        h1Str += '<li>'+txt+'</li>';
    }
    var html = '<div id="single-sidebar"><div class="top">文章目录</div><ul>';
    html += h1Str;
    html += '</ul></div>';
    $(".right_box").append(html);
}
var animateGoto = function(postion,callback){
	$("body,html").animate({"scrollTop":postion},800,callback || function(){});
}
$("#single-sidebar li").click(function() {
    var i = $(this).index();
    var jumpTo = $("body").find(".right_box .wznrys h1").eq(i);
    animateGoto(jumpTo.offset().top - 20);
    return false;
});

$("#back2top").click(function(){
    $("html,body").animate({scrollTop:0},2000);
    return false;
});
$(window).scroll(function(){
    if ($(window).scrollTop() > 300) {
        if($("#single-sidebar")) $("#single-sidebar").fadeIn();
        $("#back2top").fadeIn();
    }else{
        if($("#single-sidebar")) $("#single-sidebar").fadeOut();
        $("#back2top").fadeOut();
    };
});