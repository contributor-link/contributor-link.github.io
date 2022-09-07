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

    var projectObj;

    $.getJSON('../assets/js/projects.json', function(responseObject){
        projectObj = responseObject;
    });

    let $filters = [];
    let $selectedProjects = {};
    const $container = $("#filtered-cards");
    let $unfiltered = [];
    const $resetContainer = $("#unfiltered-cards");

    /* Collect filters to apply */
    $(".form-check-input").change(function() {
        if(this.checked) {

            /* Handle previously selected projects */
            $container.empty();
            $("#filtered-cards").css('display', 'flex');

            /* Make array of selected project objects */
            for (var i=0; i<projectObj.length; i++){
                
                if (projectObj[i].Interest == $(this).val() || projectObj[i].Contributions.includes($(this).val())){
                        $selectedProjects.name = projectObj[i].ProjectName;
                        $selectedProjects.url = projectObj[i].ProjectUrl;
                        $selectedProjects.urlText = projectObj[i].UrlText;
                        $selectedProjects.description = projectObj[i].ProjectDescription;
                        $selectedProjects.interest = projectObj[i].Interest;

                    console.log('selected'+ $selectedProjects);
                    /* Add selected projects to array */
                    if (! $filters.includes($selectedProjects)){
                        $filters.push($selectedProjects);
                        console.log('select: ' + $selectedProjects);
                    }
                    
                    updateProducts($filters);
                }
            }

            $('#unfiltered-cards').css('display', 'none');
            //updateProducts($filters);
            
        }else if($filters.length > 1){
            /*$filters = $filters.filter((n) => {return n != $(this).val()});
            updateProducts($filters);*/
            console.log('else');
            for (var i=0; i<projectObj.length; i++){
                
                if (projectObj[i].Interest == $(this).val() || projectObj[i].Contributions.includes($(this).val())){
                        $selectedProjects.name = projectObj[i].ProjectName;
                        $selectedProjects.url = projectObj[i].ProjectUrl;
                        $selectedProjects.urlText = projectObj[i].UrlText;
                        $selectedProjects.description = projectObj[i].ProjectDescription;
                        $selectedProjects.interest = projectObj[i].Interest;

                    if ($filters.includes($selectedProjects)){
                        var index = $filters.indexOf($selectedProjects);
                        $filters.splice(index, 1);
                        console.log('select: ' + $selectedProjects);
                    }
                    
                    updateProducts($filters);
                }
            }
            //updateProducts($filters);
        } else {
            console.log('empty');
            $('#unfiltered-cards').css('display', 'block');
            $("#filtered-cards").css('display', 'none');


            for (var i=0; i<projectObj.length; i++){
                $selectedProjects.name = projectObj[i].ProjectName;
                $selectedProjects.url = projectObj[i].ProjectUrl;
                $selectedProjects.urlText = projectObj[i].UrlText;
                $selectedProjects.description = projectObj[i].ProjectDescription;
                $selectedProjects.interest = projectObj[i].Interest;

                if (! $unfiltered.includes($selectedProjects)){
                        $unfiltered.push($selectedProjects);
                }
               
                //unfilteredProducts($unfiltered);
            }
        }

        console.log($filters.toString());
        return $filters.toString();

    });


    updateProducts = function (collection) {
        //$container.empty();
        for (var i = 0; i < collection.length; i++) {
            $container.append("<div class='card bg-white border mb-4 mx-2 ml-lg-0 w-100 project-card'><div class='card-header bg-teal-dark py-1'><h4 class='text-white interest'>" + collection[i].interest + "</h4></div><div class='card-body'><h3 class='mb-2'>" + collection[i].name + "</h3>" + collection[i].description + "</div><div class='card-footer pt-0'><a href='" + collection[i].url + "' class='btn btn-link' title='" + collection[i].name + "'>" + collection[i].urlText + "</a></div></div>");
        }
    }

    unfilteredProducts = function (collection) {
        //$container.empty();
        for (var i = 0; i < collection.length; i++) {
            $resetContainer.append("<div class='card bg-white border mb-4 mx-2 ml-lg-0 w-100 project-card'><div class='card-header bg-teal-dark py-1'><h4 class='text-white interest'>" + collection[i].interest + "</h4></div><div class='card-body'><h3 class='mb-2'>" + collection[i].name + "</h3>" + collection[i].description + "</div><div class='card-footer pt-0'><a href='" + collection[i].url + "' class='btn btn-link' title='" + collection[i].name + "'>" + collection[i].urlText + "</a></div></div>");
        }
    }

});