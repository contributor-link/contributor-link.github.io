/* ============================== */
/*  MENU
/* ============================== */

$(document).ready(function(){
    var $screen = $("<div class='contributor-link-nav-shelf-screen'></div>").appendTo("body"),
        $nav_shelf = $(".contributor-link-nav-shelf"),
        $toggle_wrapper = $('.contributor-link-nav-toggle-wrapper'),
        $toggle = $toggle_wrapper.find('.btn-toggle');
    
    initNav();
    
    function openNav(panel){
        if (panel != undefined && $(panel).length > 0) {
            $(panel).collapse('show');
        }
        $screen.on("click", function(){ closeNav(); });
        $toggle.addClass("active");
        $nav_shelf.addClass("shelf-open");
        $screen.addClass("shelf-open");
        $("body").css("overflow","hidden");
    }
    
    function closeNav(){
        $screen.removeClass("shelf-open");
        $('.btn-toggle').removeClass("active");
        $nav_shelf.find(".accordion-panel").collapse('hide');
        $nav_shelf.removeClass("shelf-open");
        $("body").css("overflow","auto");
    }
    
    function initNav(){
        $(".accordion-panel").on("show.bs.collapse", function(){
            var $wrapper = $(this).parent(".nav-group-wrapper");
            $wrapper.css("backgroundPosition","left 0px");
        });
        
        $(".accordion-panel").on("hide.bs.collapse", function(){
            var $wrapper = $(this).parent(".nav-group-wrapper");
            $wrapper.css("backgroundPosition","left 100px");
        });
        
        $("[data-toggle='nav-shelf']").on("click", function(e){
            console.log('click it');
            e.preventDefault();
            return $nav_shelf.hasClass("shelf-open") ? closeNav() : openNav($(this).data("toggle-panel"));
        });
    }
    
});