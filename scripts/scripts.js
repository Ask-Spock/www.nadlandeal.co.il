
go();
window.addEventListener('resize', go);

function go() {
  document.querySelector('.width').innerText = document.documentElement.clientWidth;
}

/*





//easing in use:easeInOutExpo,easeOutExpo
jQuery.extend(jQuery.easing, {
  easeInOutSine: function (x, t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
  },
  easeOutExpo: function (x, t, b, c, d) {
    return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
  },
  easeInOutExpo: function (x, t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
  }
});

// function popunder(options){

//   var is_mobile = navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Mobile|Tablet/);

//   if(!is_mobile){

//     // if($.cookie('popunder')!="opened"){

//     // continue after all dependencies loaded
//     $.when(
//         $.getScript("/scripts/jquery.cookie.js"),
//         $.getScript("/scripts/jquery.popunder.js"),
//         $.Deferred(function(deferred){
//             $(deferred.resolve);
//         })
//     ).done(function(){

//         $("<a id='popunder_mask'></a>")
//         .css({
//           "display":"block",
//           "width":"100%",
//           "height":"100%",
//           "position":"fixed",
//           "top":0,
//           "left":0,
//           "cursor":"default"
//         })
//         .appendTo("body");

//         options.height = options.height||$(window).height();
//         options.width = options.width||$(window).width();

//         window.aPopunder = [
//             [options.url,{
//               window:{height:options.height,width:options.width},
//               cookie:"__puc",
//               name:"__puc",
//               blocktime:false,
//               cb:function(){
//                 $("#popunder_mask").remove();
//                 // $.cookie('popunder','opened',{path:"/"});
//               }
//             }]
//         ];

//         $("#popunder_mask").click(function(){
//           $.popunder();
//           return false;
//         });

//     });

//     // }

//   }

// }

$(document).ready(function () {

  if (window.location.toString().indexOf("mode=dev") == -1) {
    $(".header,.side *,.frames,.share,.content *").not(":has(form),form,form *,.banner").disableTextSelect();
    $(".disableTextSelect").disableTextSelect();

    $(document).keydown(function (event) {
      if ((event.ctrlKey == true || event.metaKey == true) && (event.which == '67' || event.which == '65')) {
        // v=86 , c=67, a=65
        event.preventDefault();
      }
    });

    $("body")
      .bind("contextmenu", function (e) {
        return false;
      });
    //      .keydown(function(e,h){
    //        var k =e.keyCode;
    //        if(k==67||k==65){
    //          return(false);
    //        }
    //      });

  }

  var dir = $("body").css("direction");

  var menu = {
    container: $(".menu"),
    show: function (sub) {
      if (!sub.data("height")) {
        sub
          .data("height", sub.outerHeight())
          .css("height", 0).show();
      }
      sub
        .attr("status", "show")
        .stop()
        .css("display", "block")
        .animate({
          height: sub.data("height")
        }, 500, "easeInOutExpo");
    },
    hide: function (sub) {
      sub.attr("status", "hide");
      window.setTimeout(function () {
        if (sub.attr("status") == "hide") {
          sub.stop().animate({
            height: 0,
            display: "none"
          }, 500, "easeInOutExpo", function () {
            $(this).hide();
          });
        }
      }, 100);
    },
    init: function () {
      this.container.find(".sub").each(function () {
        var sub = $(this);
        var parent = sub.prev();
        var distance = (dir == "rtl") ? (menu.container.width() - parent.position().left - parent.outerWidth()) : parent.position().left;
        sub.css((dir == "rtl") ? "right" : "left", distance);
        if (parent.width() > sub.width()) {
          sub.width(parent.width());
        }

        sub
          .mouseenter(function () {
            menu.show($(this));
          })
          .mouseleave(function () {
            menu.hide($(this));
          })
          .children("a")
          .focus(function () {
            menu.show($(this).parent());
          })
          .blur(function () {
            menu.hide($(this).parent());
          });

        parent
          .mouseenter(function () {
            menu.show($(this).next());
          })
          .mouseleave(function () {
            menu.hide($(this).next());
          })
          .focus(function () {
            menu.show($(this).next());
          })
          .blur(function () {
            menu.hide($(this).next());
          });

        var menu_index = 0;
        $("a", menu.container).each(function () {
          menu_index++;
          $(this).attr("tabIndex", menu_index);
        });
      });
    }
  }
  menu.init();

  $(".search input[name=q]").attr("autocomplete", "off").change(function () {
    var o = $(this);
    if (o.val() != "") {
      o.css("background", "#fff");
    } else {
      o.removeAttr("style");
    }
  });

  // $(".side_menu .parent").click(function(){
  //   $(this).toggleClass("open");
  //   $(this).next().slideToggle(500,"easeInOutSine",function(){
  //     window.location=$(this).prev().attr("href");
  //   });
  //   return(false);
  // });

  var news = {
    floater: $(".news>.floater"),
    interval: null,
    curr: null,
    start: function () {
      with(news) {
        curr = curr || floater.children(":first-child");
        curr.addClass("curr");
        interval = window.setInterval(function () {
          floater.animate({
            top: "-=" + curr.outerHeight()
          }, 1000, "easeInOutSine");
          curr.removeClass("curr").next().addClass("curr");
          curr = curr.next();
          if (curr.length == 0) {
            curr = floater.children(":first-child");
            floater.animate({
              top: 0
            }, 1000, "easeInOutExpo");
          }
        }, 4000);
      }
    },
    stop: function () {
      window.clearInterval(news.interval);
    },
    init: function () {
      with(news) {
        if (floater.length > 0) {
          if (floater.height() > floater.parent().height()) {
            floater.parent()
              .mouseenter(stop)
              .mouseleave(start);
            start();
          }
        }
      }
    }
  };
  news.init();

  // var web2mail = $(".contact");
  // if(web2mail.length>0){
  //   if($("input[name=recipient]",web2mail).length==0){
  //     web2mail.prepend("<input type=\"hidden\" name=\"recipient\" value=\""+web2mail.attr("action").replace(" AT ","@")+"\" />");
  //   }
  //   if($("input[name=subject]",web2mail).length==0){
  //     web2mail.prepend("<input type=\"hidden\" name=\"subject\" value=\"פניה חדשה מקבוצת נדלן דיל\" />");
  //   }
  //   if($("input[name=redirect]",web2mail).length==0){
  //     web2mail.prepend("<input type=\"hidden\" name=\"redirect\" value=\"[referer]?action=sent\" />");
  //   }
  //   web2mail
  //     .prepend("<input type=\"hidden\" name=\"language\" value=\"he\" />")
  //     .attr("target","hidden_iframe")
  //     .attr("action","http://"+window.location.hostname+"/lead.asp"); // domain is hard coded to concentrate all leads to one cms
  // }

  // $(".contact").submit(validation);

  $(".add").click(function () {
    if (window.location.toString().indexOf("recommendations") != -1) {
      $("html,body").animate({
        scrollTop: $(".recommendations").offset().top
      }, 2000, function () {
        $("input[name='שם']").focus();
      });
    }
  });

  $(".content ul>li").prepend("<span></span>");

  $(".share a")
    .mouseenter(function () {
      $(this).animate({
        opacity: 0.5
      }, 200, "easeInOutSine");
    })
    .mouseleave(function () {
      $(this).animate({
        opacity: 1
      }, 200, "easeInOutSine");
    });

  $("a[rel*=external]").attr("target", "_blank");

  // quotation teaser
  // $("#quotation_teaser>div>div").each(function(){
  //   var container=$(this);
  //   var strong = $("strong:first",container);
  //   container.attr("title",strong.text());
  //   var image = $("img",strong).attr("src");
  //   // if(image){
  //   //   image = image.substring(image.indexOf("path=")+5,image.length);
  //   // }
  //   container.data("image",image);
  //   strong.remove();
  //   container.cycle({
  //     pager:$(".pager",container),
  //     fx:"scrollHorz",
  //     timeout:0,
  //     speed:200,
  //     rev:1,
  //     pagerAnchorBuilder:function(index,DOMelement){
  //       var anchor = "<a href=\"\">";
  //       if($("img",DOMelement).length){anchor+="<img src=\""+$("img",DOMelement).attr("src")+"\" width=\"33\" height=\"33\" alt=\"\" />";}
  //       anchor+="<span>"+$("strong",DOMelement).text()+"</span>"+"</a>";//+$("p",DOMelement).text()
  //       return anchor;
  //     }
  //   });
  // });

  // $("#quotation_teaser>div").cycle({
  //   pager:$("#quotation_teaser>div>.pager"),
  //   fx:"scrollHorz",
  //   timeout:0,
  //   speed:200,
  //   rev:1,
  //   pagerAnchorBuilder:function(index,DOMelement){
  //     var anchor = "<a href=\"\">";
  //     if($(DOMelement).data("image")){anchor+="<img src=\""+$(DOMelement).data("image")+"\" width=\"33\" height=\"33\" alt=\"\" />";}
  //     anchor+="<span>"+$(DOMelement).attr("title")+"</span></a>";
  //     return anchor;
  //   }
  // });

  //   var quotation_teaser = $("#quotation_teaser");
  //   if(quotation_teaser.length){

  //     $("#quotation_teaser>div>div>.pager>a:first-child").after("<a href='' class='back'>&laquo; חזור</a>");
  //     $("#quotation_teaser>div>div>.pager").append("<a href='' class='back'>&laquo; חזור</a>");

  //     $(".back",quotation_teaser).click(function(){
  //       var parent = $(this).parent();

  //       if(parent.hasClass("pager")){
  //         parent.parent().parent().cycle(0);
  //       }else{      
  //         parent.parent().cycle(0);
  //       }
  //       return(false);
  //     });

  //     $(".scroll",quotation_teaser)
  //       .mouseenter(function(test){
  //         var visible = $("div:visible:last","#quotation_teaser>div");

  //         if($(this).hasClass("up")){
  //           var destination = 0;
  //           var distance = Math.abs(parseInt(visible.css("top")));
  //           var duration = distance/200*1000; // px per second

  //           // console.log("destination="+destination);
  //           // console.log("distance="+distance);
  //           // console.log("duration="+duration);

  //           visible.stop().animate({top:destination},duration);
  //         }else{ // down

  //           var destination = (visible.prop("scrollHeight")-visible.height())*-1;
  //           var distance = Math.abs(destination-parseInt(visible.css("top")));
  //           var duration = distance/200*1000; // px per second

  //           // console.log("destination="+destination);
  //           // console.log("distance="+distance);
  //           // console.log("duration="+duration);

  //           visible.stop().animate({top:destination},duration);
  //         }
  //       })
  //       .mouseleave(function(){
  //         var visible = $("div:visible:last","#quotation_teaser>div");
  //         visible.stop();
  //       })
  //       .click(function(){return(false)});
  //       // $(">div",quotation_teaser).mousewheel(function(event,delta){
  //       //   quotation_teaser.data("trigger","wheel");
  //       //   $(".scroll."+(delta>0?"up":"down"),quotation_teaser).mouseenter("testtt");
  //       //   return(false);
  //       //   // var visible = $("div:visible:last","#quotation_teaser>div");
  //       //   // var distance = delta*50;
  //       //   // // var duration = Math.abs(distance)/500*1000;
  //       //   // 
  //       //   // var scroll_max = (visible.prop("scrollHeight")-visible.height())*-1;
  //       //   // scroll_max = scroll_max-parseInt(visible.css("top"));
  //       //   // 
  //       //   // if(delta<0&&distance>scroll_max){distance=scroll_max;}
  //       //   // if(delta>0&&destination<0){destination=0;}
  //       //   // 
  //       //   // var top_action = (delta<0?"+":"-")+"="+distance;
  //       //   // var destination = (visible.prop("scrollHeight")-visible.height())*-1;
  //       //   // console.log("destination="+destination);
  //       //   // visible.animate({top:top_action},0);
  //       //   // return(false);
  //       // })

  //   }

});

function validation(form) {

  var required = $(".required", form);
  for (var i = 0; i < required.length; i++) {
    if (required[i].value == "") {
      window.alert("אנא מלא " + required[i].name);
      required[i].focus();
      return (false);
    }
  }

  if ($(form).hasClass("recommendations")) {
    return (true);
  } else {
    var data = "";
    $("input,select,textarea", form).each(function (i, o) {
      if (this.name != "conversion_code") {
        if (data != "") {
          data += "&";
        }
        data += this.name + "=" + this.value.replace(/ /g, "%20");
      }
    });

    var conversion_code = $(".conversion_code", form).val();
    //    $.ajax({
    //      type: 'get',
    //      url: this.action,
    //      data: data,
    //      success: function(){
    $("#conversion_code_container").append(conversion_code);
    $(".sent", form).slideDown(400);
    //      }
    //    });
    //    return(false);
  }
}
*/