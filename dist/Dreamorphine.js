function R(t,e){return Math.floor(Math.random()*(e-t)+t)}function template(t){var e="<ul>",a=$("#container").width(),i=400,o=200,s=200;window.innerWidth<=800&&(i=200,o=100,s=100),t=t.split("@@").shuffle();for(var n=0;n<t.length;n++){var r,l;r=R(-s/8,i-s/8*7),n%3===0&&(l=R(0,a/3-o/8*7)),n%3===1&&(l=R(-o/8,a/3-o/8*7)),n%3===2&&(l=R(-o/8,a/3-o)),t[n]=t[n].split(","),1==t[n].length?(r>70&&(r=70),l>37&&(l=37),e+='<li class="static" style="margin-top:'+r+"px;margin-left:"+l+'px"><h2>'+t[n][0].split("##")[0]+"</h2><p>"+t[n][0].split("##")[1]+"</p></li>"):e+='<li data-u="'+t[n][0]+'" data-w="'+t[n][2]+'" data-h="'+t[n][3]+'" data-c="'+t[n][1]+'" data-m="'+t[n][4]+'" data-r="'+t[n][5]+'" style="margin-top:'+r+"px;margin-left:"+l+'px"><img src="thumbnails/'+t[n][0]+'.jpg?0" /><div></div></li>',(n+1)%3===0&&(e+="</ul><ul>")}return e+="</ul>",e.split("<ul></ul>")[0]}Array.prototype.shuffle=function(){for(var t,e,a=this.length;a--;)t=Math.floor(Math.random()*a),t>0&&(e=this[a],this[a]=this[t],this[t]=e);return this};var svg='<svg x="0px" y="0px" width="36px" height="36px" viewBox="0 0 36 36"><circle fill="none" stroke="#2a76e8" stroke-width="2" cx="18" cy="18" r="16" style="transition: stroke-dashoffset .3s ease;" stroke-dasharray="100 100" stroke-dashoffset="100" transform="rotate(-90 18 18)"></circle></svg>';$(function(t){window.onload=function(){t(".static h2").addClass("font")};var e,a,i,o,s=t("#container"),n=t("#mark"),r=0;(i=function(e){t(template(e)).appendTo(s).find("img").each(function(){var e=t(this);e.on("load",function(){e.css("opacity",1).off("load")}),e.prop("complete")&&setTimeout(function(){e.trigger("load")},0)})}).call(window,cover0),t(window).on("DOMMouseScroll mousewheel touchmove",function(e){return n.hasClass("show")?void e.preventDefault():(clearTimeout(a),void(a=setTimeout(function(){if(parseInt(t(window).scrollTop())+1e3>s.height()){if(t("body").hasClass("loading")||1==t("body").data("end"))return;t("body").addClass("loading"),r++,setTimeout(function(){t.ajax({type:"GET",url:"pages/"+r,success:function(e){i(e),setTimeout(function(){t("body").removeClass("loading")},0)},error:function(e,a,i){t("body").removeClass("loading"),404==e.status&&t("body").data("end",1)}})},0)}},300)))}),s.on("click",function(a){if("DIV"==a.target.tagName||"LI"==a.target.tagName){if(o&&(o.abort(),e.find("div").html("")),e="LI"==a.target.tagName?t(a.target):t(a.target).parent(),"static"==e.attr("id"))return;if(1!=e.find("img").css("opacity"))return;e.css("z-index","1");var i="covers/"+e.data("u")+".jpg?0";t("#canvas").attr("src",i),o=new CBFimage(t("#canvas")[0],{start:function(){e.find("div").append('<p style="color:'+e.data("c")+'">0</p>'),e.find("div").append(svg).find("circle").attr("stroke",e.data("c"))},progress:function(t,a){e.find("circle").attr("stroke-dashoffset",100-t/a*100),e.find("p").html(Math.ceil(t/a*100))},complete:function(t){n.addClass("show"),n.find(".inner").width(e.data("w")).height(e.data("h")),n.find(".bg").css("background-color",e.data("c")),n.find(".info").html("<h2>"+e.data("m")+"</h2><h3>"+e.data("r")+"</h3>")}})}}),n.on("click",function(t){s.data("loading",0),n.removeClass("show").addClass("loading"),e.css("z-index",""),e.find("div").html("")})}),function(t,e){function a(t,e){if(this.option={start:function(){},progress:function(t,e){},complete:function(t){}},e&&"object"==typeof e)for(var a in e)this.option[a]=e[a];if(t&&""!==t.getAttribute("src")){this.element=t,this.src=t.getAttribute("src");var i=parseInt(t.getAttribute("blur"));this.blur=i>0&&10>=i?i:0,this.loadImg()}}function i(t){for(var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",a="",i=0;i<t.length;){var o,s,n=255&t.charCodeAt(i++),r=255&t.charCodeAt(i++),l=255&t.charCodeAt(i++),d=n>>2,c=(3&n)<<4|r>>4;isNaN(r)?o=s=64:(o=(15&r)<<2|l>>6,s=isNaN(l)?64:63&l),a+=e.charAt(d)+e.charAt(c)+e.charAt(o)+e.charAt(s)}return a}a.prototype.canvasImg=function(t){this.element.width=t.width,this.element.height=t.height;var e=this.element.getContext("2d");if(e.drawImage(t,0,0),this.blur>0){e.globalAlpha=.5;for(var a=-this.blur;a<=this.blur;a+=2)for(var i=-this.blur;i<=this.blur;i+=2)e.drawImage(this.element,i+1,a+1),i>=0&&a>=0&&e.drawImage(this.element,-(i-1),-(a-1));e.globalAlpha=1}},a.prototype.loadImg=function(){var t=this;this.request=new XMLHttpRequest,this.request.onloadstart=function(){t.option.start()},this.request.onprogress=function(e){0!==parseInt(e.total)&&t.option.progress(e.loaded,e.total)},this.request.onload=function(e){if(this.status>=200&&this.status<400){var a=new Image;a.onload=function(){t.canvasImg(a),t.option.complete(a)};var o=t.src.substr(t.src.lastIndexOf(".")+1).substr(0,3);"jpg"==o&&(o="jpeg"),a.src="data:image/"+o+";base64,"+i(t.request.responseText)}},this.request.open("GET",t.src,!0),this.request.overrideMimeType("text/plain; charset=x-user-defined"),this.request.send(null)},a.prototype.abort=function(){this.request.abort()},t.CBFimage=a}(window);