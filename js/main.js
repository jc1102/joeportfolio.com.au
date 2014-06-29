/* SetCookie function */
function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}
/* GetCookie function */
function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}
/* show welcome modal based on the cookies */
function showWelcome(){
    if(getCookie("notShowWelcome") == null || getCookie("notShowWelcome") == 0 ){
        $('#welcome').modal('show');
    }
}

function closeWelcome(){
    setCookie("notShowWelcome",$("#notshow-option:checked").length);
}

/* send mail */
function send(){

    var fromName = $("#name").val();
    var fromAdd = $("#email").val();
    var content = $("#message").val();

    $(".form-actions").prepend("<img id='loading' style='float: right; width: 45px; height: 45px;' src='/img/ajaxloading.gif'>");

    $.post("/send_form_email.php", {"fromName":fromName, "fromAdd":fromAdd, "content": content}, function (result) {
        if (result == "sent") {
            $(".form-actions #loading").remove();
            alert("emails have been sent successfully");
        }
        else {
            $(".form-actions #loading").remove();
            alert("error occur");
        }
    });
}
/* send form validation */
function send_form_validation(e) {
    var valid = true;
    e.find(".control-group").each(function(){
        if ($(this).hasClass("error")){
            valid = false;
        }
    });
    return valid;
}

$(document).ready(function(){

    showWelcome();
    $("#welcome").on("hidden.bs.modal",function(){
        closeWelcome();
    })


/* Scroll hire me button to contact page */
	$('.hire-me').click(function(){
		    $('html, body').animate({
        		scrollTop: $( $(this).attr('href') ).offset().top
    		}, 500);
    	return false;
	});

    /* For Bootstrap current state on portfolio sorting */

    $('ul.nav-pills li a').click(function (e) {
        $('ul.nav-pills li.active').removeClass('active')
        $(this).parent('li').addClass('active')
    })

/* portfolio mixitup */

	$(window).load(function(){
    var $container = $('.grid-wrapper');
    $container.isotope({
        filter: '*',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });
 
    $('.grid-controls li a').click(function(){
        $('.grid-controls .current').removeClass('current');
        $(this).addClass('current');
 
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
         });
         return false;
    });
});

/* Sticky menu */
$(".navbar").sticky({topSpacing: 0});


/* Scroll spy and scroll filter */
    $('#main-menu').onePageNav({
        currentClass: "active",
        changeHash: false,
        scrollThreshold: 0.5,
        scrollSpeed: 750,
        filter: "",
        easing: "swing"	
     });

    $('.cs-sidenav').onePageNav({
        currentClass:"active",
        changeHash:false,
        scrollOffset: 255,
        scrollThreshold:0.5,
        ScrollSpeed: 750,
        filter:"",
        easing:"swing"
    });
    $(".cs-sidenav li.active").find("a").css("background-color","#EEEEEE");
    $(window).scroll(function(){
        $(".cs-sidenav li").find("a").css("background-color","transparent");
        $(".cs-sidenav li.active").find("a").css("background-color","#EEEEEE");
    });

/* Charts*/


    $(".chart").easyPieChart({
    	   barColor: '#3498db',
    	   size: '150',
			easing: 'easeOutBounce',
			onStep: function(from, to, percent) {
				$(this.el).find('.percent').text(Math.round(percent));
			}
	 });


/* VEGAS Home Slider */
	
		$.vegas('slideshow', {
			  backgrounds:[
				
				{ src:'img/slider/01.jpg', fade:1000 },
				{ src:'img/slider/02.jpg', fade:1000 },
				{ src:'img/slider/03.jpg', fade:1000 },
				{ src:'img/slider/04.jpg', fade:1000 }
			  ]
			})('overlay', {
			  src:'img/overlays/16.png'
			});
			$( "#vegas-next" ).click(function() {
			  $.vegas('next');
			});
			$( "#vegas-prev" ).click(function() {
			  $.vegas('previous');
		});

/*Contact form */
      $('#contact-form').validate({
        rules: {
            name: {
                minlength: 2,
                required: true
            },
            email: {
                required: true,
                email: true
            },
            message: {
                minlength: 2,
                required: true
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

/*Contact form submit */
    $( "#contact-form .form-actions :submit" ).click(function( event ) {
        event.preventDefault();
        var $contactform = $(this).parent().parent();
        if (!send_form_validation($contactform) || $contactform.find(".control-group").hasClass("ini")) {
            alert("please correct contact detail");
            return;
        }else{
            send();
        }
    });

});


