var steps = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
    var stepIndex = 0;

$('header .fa').on('click', function(event) {
    $('.tooltip, header .fa').toggleClass('active');
    event.stopPropagation();
});

$('.tooltip').on('click', function(event) {
    event.stopPropagation();
});

$(document).on('click', function(event) {
    $('.tooltip, header .fa').removeClass('active');
});
    
            
       
            
        
//        $('body').on('click', function() {
//            if (tooltip == false) {
//                $('.tooltip, header .fa').removeClass('active');
//                
//                console.log('clicked');
//            }
//        });


    $(document).ready(function () {
        
        
        
        
        // initialise
        $('#intro-page .btn').click(function() {
           $('#intro-page').fadeOut(500); 
        });
        $("#complete-page").hide();
        var notifyIconMaxSize = 40; //Size of the Blinking icon on answer dropped.

        $(".question-number, .question-container, .drop").each(function () {
            $(this).hide();
        });

        $('#one-drop').show();
        $('#0-question-container').show();
        $('#0-question').show();

        $('.hidden').hide();
        $('.nextbtn').hide();


//next button
        $('.nextbtn').click(function () {
            $('body').removeAttr('style');
            $( ".answer" ).css('cursor','pointer');

            $(".drop, .question-number, .question-container").each(function () {
                $(this).hide();
            });
            
            $('#' + stepIndex + '-image').addClass('leave');
            
            stepIndex = stepIndex + 1;

             $('#' + steps[stepIndex] + '-drop').show();
            $('#' + stepIndex + '-question').show();
            $('#' + stepIndex + '-question-container').show();
            $('#' + stepIndex + '-image').addClass('active');

            $('.nextbtn').hide();

            if (stepIndex === steps.length) {
                $("#complete-page").fadeIn(500);
                $("#question-page").fadeOut(500);
            }
            $(".answer").show();
            $( ".answer" ).draggable( "enable" );
            $( ".answer" ).addClass( 'hvr-grow' );
            $(".overlay").hide();
                    
        });
//restart button
        $('.restart-button').click(function () {
            $(".drop, .question-number").each(function () {
                $(this).hide();
            });

            $('#0-question-container').show();
            $('#one-drop').show();
            $('#0-question').show();
            $('.images img').removeClass('active leave');
            $('#0-image').addClass('active');
            $("#question-page").fadeIn(500);

            $("#complete-page").fadeOut(500);

            stepIndex = 0;
        });


        $(".menu .answer").draggable({
            snap: '.ui-droppable',
            scroll: false,
            snapMode: 'inner',
            revert: function (drop) {
                if (!drop) {
                    return true;
                }

                var drop_p = drop.offset();

                if ($.trim($(this).text()).toLowerCase() === $.trim(drop.text()).toLowerCase()) {

                    $('.nextbtn').show();
                    
                    $( ".answer" ).draggable( "disable" );
                    $( ".answer" ).css('cursor','default');
                    $( ".answer" ).removeClass( 'hvr-grow' );
                    drop.removeClass('allowed');
                    drop.addClass('answered');
                    $(this).addClass('answered');
                    $(this).hide();
                    $(".overlay").show();
                    $('body').css('background-color', 'rgba(91,196,191,0.7)');

                    $('#answered-correctly').css({
                        opacity : 0,
                        'font-size': 0,
                        left: drop_p.left + drop.innerWidth()/2 + 10,
                        top: drop_p.top + drop.innerHeight()/2
                    }).show().animate({
                        opacity: 1,
                        'font-size': '+=' + notifyIconMaxSize + 'px',
                        left: drop_p.left + drop.innerWidth() / 2 + 10 - notifyIconMaxSize / 2,
                        top: drop_p.top + drop.innerHeight() / 2 - notifyIconMaxSize / 2
                    }, 500, function () {
                        $('#answered-correctly').animate({
                            opacity: 0,
                            'font-size': '-=' + notifyIconMaxSize + 'px',
                            left: drop_p.left + drop.innerWidth() / 2 + 10,
                            top: drop_p.top + drop.innerHeight() / 2
                        }, 500, function () {
                            $('#answered-correctly').removeAttr('style');
                            $('#answered-correctly').hide();

                            $(".question-container .drop.answered").addClass('allowed');
                            $(".menu .answer").removeClass('answered');
                        });
                    });

                }
                else {

                    $('.nextbtn').hide();
                    
                    $('body').css('background-color', 'rgba(234,94,101,0.7)');
                    $('#answered-wrongly').css({
                        opacity: 0,
                        'font-size': 0,
                        left: drop_p.left + drop.innerWidth()/2 + 10,
                        top: drop_p.top + drop.innerHeight()/2
                    }).show().animate({
                        opacity: 1,
                        'font-size': '+=' + notifyIconMaxSize + 'px',
                        left: drop_p.left + drop.innerWidth()/2 + 10 - notifyIconMaxSize/2,
                        top: drop_p.top + drop.innerHeight()/2 - notifyIconMaxSize/2
                    }, 500, function () {
                        $('#answered-wrongly').animate({
                            opacity: 0,
                            'font-size': '-=' + notifyIconMaxSize + 'px',
                            left: drop_p.left + drop.innerWidth() / 2 + 10,
                            top: drop_p.top + drop.innerHeight() / 2
                        }, 500, function () {
                            $('#answered-wrongly').removeAttr('style');
                            $('#answered-wrongly').hide();

                            $('body').removeAttr('style');
                        });
                    });


                }
                $(this).delay(600);

                return true;
            }

        });

        $(".drop.allowed").droppable({
            accept: ".menu .answer",
            hoverClass: 'drop-hover',
            classes: {
                "ui-droppable-hover": "ui-state-hover"
            },
            drop: function (event, ui) {
                var drop_p = $(this).offset();
                var drag_p = ui.draggable.offset();
                var left_end = drop_p.left - drag_p.left;
                var top_end = drop_p.top - drag_p.top;
                ui.draggable.animate({
                    top: '+=' + top_end,
                    left: '+=' + left_end
                });
                return false;
            }
        });

        $('.restart-button').click(function () {
            $(".drop.answered").addClass('allowed');
            $(".drop.answered").removeClass('answered');
            $(".menu .answer").removeClass('answered');
            $("#complete-page").fadeOut(400);
            $("#question-page").fadeIn(400);

            $('.container').removeClass("pulse");
        });
    });