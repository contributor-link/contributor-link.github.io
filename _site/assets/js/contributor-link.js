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
        $nav_shelf.removeClass("shelf-open");
        $("body").css("overflow","auto");
    }
    
    function initNav(){
        
        $("[data-toggle='nav-shelf']").on("click", function(e){
            e.preventDefault();
            return $nav_shelf.hasClass("shelf-open") ? closeNav() : openNav($(this).data("toggle-panel"));
        });
    }

/* ================================== */
/*  CHANGE TEXT FOR TOGGLE ON CARDS
/* ================================== */

    if ($(".PFElement").attr("aria-expanded") === "true"){
        console.log('true!');
    }

/* ============================== */
/*  FILTER PROJECTS
/* ============================== */


    var $filters = [];

    $(".form-check-input").change(function() {
        if(this.checked) {
            $filters.push($(this).val());
            
        }else{
            $filters = $filters.filter((n) => {return n != $(this).val()});
        }

        console.log($filters.toString());
        return $filters.toString();

    });

    
});