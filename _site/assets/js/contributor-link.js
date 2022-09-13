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
    const $container = $("#filtered-cards");
    let $unfiltered = [];
    const $resetContainer = $("#unfiltered-cards");
    let count = 0;
    


    /* Collect filters to apply */
    $(".form-check-input").change(function() {

        /* Check if all checkboxes are checked*/
         var checked = document.querySelectorAll('input[type="checkbox"]:checked').length;

        if(this.checked) {

            /* Handle if projects were previously selected */
            $resetContainer.css('display', 'none');
            $container.css('display', 'flex');

            /* Make array of selected project objects */
            for (var i=0; i<projectObj.length; i++){

                let $selectedProjects = {};
                
                if (projectObj[i].Interest == $(this).val() || projectObj[i].Contributions.includes($(this).val())){
                        $selectedProjects.name = projectObj[i].ProjectName;
                        $selectedProjects.url = projectObj[i].ProjectUrl;
                        $selectedProjects.urlText = projectObj[i].UrlText;
                        $selectedProjects.description = projectObj[i].ProjectDescription;
                        $selectedProjects.interest = projectObj[i].Interest;

                    /* Add selected projects to array if it doesn't exist*/
                    if (! $filters.includes($selectedProjects.name)){
                        $filters.push($selectedProjects);
                    } 

                }

            }

            filteredProducts($filters);
            

            
        }else if (checked === 0){
            resetProductCards();
        }else {
            
             for (var i=0; i<projectObj.length; i++){

                let $selectedProjects = {};
                
                if (projectObj[i].Interest == $(this).val() || projectObj[i].Contributions.includes($(this).val())){
                        $selectedProjects.name = projectObj[i].ProjectName;
                        $selectedProjects.url = projectObj[i].ProjectUrl;
                        $selectedProjects.urlText = projectObj[i].UrlText;
                        $selectedProjects.description = projectObj[i].ProjectDescription;
                        $selectedProjects.interest = projectObj[i].Interest;

                    /* Remove selected projects from array if it's deselected */
                    const indexOfObject = $filters.findIndex(object => {
                        return object.name === $selectedProjects.name;
                    });

                    $filters.splice(indexOfObject, 1);
                   

                }

            }

            filteredProducts($filters);   

        }

    });

    resetProductCards = function(){
        $('#unfiltered-cards').css('display', 'block');
        $("#filtered-cards").css('display', 'none');

         /* Empty container from previous results */
        $container.empty();
        /* Rebuild all product cards */
            for (var i=0; i<projectObj.length; i++){
                let $selectedProjects = {};

                $selectedProjects.name = projectObj[i].ProjectName;
                $selectedProjects.url = projectObj[i].ProjectUrl;
                $selectedProjects.urlText = projectObj[i].UrlText;
                $selectedProjects.description = projectObj[i].ProjectDescription;
                $selectedProjects.interest = projectObj[i].Interest;

                if (! $unfiltered.includes($selectedProjects)){
                    $unfiltered.push($selectedProjects);
                }
               
            }
    }


    filteredProducts = function (collection) {
        $container.empty();

        /*Check for duplicates first*/
        var noRepeatArray = [];

        $.each(collection, function(key, value) {
            var exists = false;
            $.each(noRepeatArray, function(k, val2) {
              if(value.name == val2.name){ exists = true }; 
            });
            if(exists == false && value.name != "") { noRepeatArray.push(value); }
        });

        for (var i = 0; i < noRepeatArray.length; i++) {
            let prodName = noRepeatArray[i].name
            console.log('name in function: ' + prodName);

            $container.append("<div class='card bg-white border mb-4 mx-2 ml-lg-0 w-100 project-card'><div class='card-header bg-teal-dark py-1'><h4 class='text-white interest'>" + noRepeatArray[i].interest + "</h4></div><div class='card-body'><h3 class='mb-2 prod-name'>" + noRepeatArray[i].name + "</h3>" + noRepeatArray[i].description + "</div><div class='card-footer pt-0'><a href='" + noRepeatArray[i].url + "' class='btn btn-link' title='" + noRepeatArray[i].name + "'>" + noRepeatArray[i].urlText + "</a></div></div>");

        }
    }

    unfilteredProducts = function (collection) {
        for (var i = 0; i < collection.length; i++) {
            $resetContainer.append("<div class='card bg-white border mb-4 mx-2 ml-lg-0 w-100 project-card'><div class='card-header bg-teal-dark py-1'><h4 class='text-white interest'>" + collection[i].interest + "</h4></div><div class='card-body'><h3 class='mb-2'>" + collection[i].name + "</h3>" + collection[i].description + "</div><div class='card-footer pt-0'><a href='" + collection[i].url + "' class='btn btn-link' title='" + collection[i].name + "'>" + collection[i].urlText + "</a></div></div>");
        }
    }

});