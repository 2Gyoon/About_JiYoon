$(document).ready(function(){

    //full page slider
    //mousewheel : 크롬, 익스플로러, 사파리, 오페라
    //DOMMouseScroll : 파이어폭스

    var elm = ".box";  //클래스명을 지목할 문자형 데이터
    $(elm).each(function(index){ //index = 0, 1, 2, 3, 4, 5, 6
        //개별적으로 각 섹션마다 마우스 휠 이벤트를 적용시키기 위함
        $(this).on("mousewheel DOMMouseScroll", function(e){
            e.preventDefault(); //휠 이벤트에 의해서 초기화되는 것을 막는다.
            console.log(e); //이벤트 발생에 의한 모든 것을 가져옴
            var delta = 0;  //마우스 휠을 돌리지 않은 상태에서 초기값으로 설정
            console.log(event.wheelDelta);
            //크롬 브라우저 기준으로 마우스 휠을 내렸을 때 -120 <-> 휠을 올렸을 때 120
            //오페라 브라우저 기준으로 마우스 휠을 내렸을 때 120 <-> 휠을 올렸을 때 -120
            console.log(e.detail);
            //파이어폭스 기준으로 휠의 움직임을 받게되는 값 / 휠을 내렸을 때 3 <-> 휠을 올렸을 때 -3

            if(event.wheelDelta){
                //크롬, 익스플로러, 사파리, 오페라 값을 받아왔다면
                delta = event.wheelDelta / 120;
                //(크롬기준)휠을 내렸을 때 -120 / 120 = -1  // 휠을 올렸을 때 120 / 120 = 1
                //(오페라기준)휠을 내렸을 때 120 / 120 = 1  // 휠을 올렸을 때 -120 / 120 = -1
                if(window.opera){  //오페라 브라우저의 경우는 크롬에서 나온 결과 delta 값을 일치시키기 위함
                    delta = -delta;
                }

            }else if(e.detail){
                //파이어폭스에서 값을 받아왔다면
                delta = -e.detail / 3;  //(파이어폭스 기준)휠을 내렸을 때 -(3/3) = -1 // 휠을 올렸을 때 -(-3/3) = 1


            };

            var moveTo = $(window).scrollTop();  //각 섹션별 상단의 위치값을 파악하여 저장
            var elmIndex = $(elm).eq(index);  //각 섹션별로 순차적으로 접근
            console.log(elmIndex); //이벤트가 발생한 곳을 지칭
            //휠을 내린 상태
            if(delta < 0){
                try{  //시도해라
                    //마우스 휠을 내리는 시점에서 다음 섹션이 존재한다면
                    if($(elmIndex).next() != undefined){
                        moveTo = $(elmIndex).next().offset().top;
                        console.log(moveTo);

                        $(elm).removeClass("active");
                        $(elmIndex).next().addClass("active");
                        var $cur_index = $(".box.active").index();
                        $(".pager li").removeClass("active");
                        $(".pager li").eq($cur_index).addClass("active");
                    }
                }catch(e){  //시도하는 과정에서 문제점(error)이 발생한 곳은 이곳에서 잡는다.
                    console.log("예외처리")
                }
            }else{
                //휠을 올린 상태
                try{ //시도해라
                    //마우스 휠을 내리는 시점에서 이전 섹션이 존재한다면
                    if($(elmIndex).prev() != undefined){
                        moveTo = $(elmIndex).prev().offset().top;

                        $(elm).removeClass("active");
                        $(elmIndex).prev().addClass("active");
                        var $cur_index = $(".box.active").index();
                        $(".pager li").removeClass("active");
                        $(".pager li").eq($cur_index).addClass("active");
                        
                        $(".box.menu").addClass("show");
                    }
                }catch(e){ //시도하는 과정에서 문제점(error)이 발생한 곳은 이곳에서 잡는다.
                    console.log("예외처리")
                }
            }
            $("html, body").stop().animate({scrollTop : moveTo + "px"}, 800);

        });
        
    });

    /*
    [예외처리]
    try{
        시도하는 실행문
    }catch(매개변수){

    }
    :먼저 시도를 하게 하고 처리가 더 이상 안되는 예외파트를 catch라는 스코프

    */

    $("main .box.menu li").click(function(){

        var $index = $(this).index() + 1;
        $("main .box.menu li").removeClass("active");
        $(this).addClass("active");
        $("main .box").removeClass("active");
        $("main .box").eq($index).addClass("active");
        $("html, body").stop().animate({scrollTop : $("main section").eq($index).offset().top}, 1000);
        $(".pager li").removeClass("active");
        $(".pager li").eq($index).addClass("active");

        return false;
    });

    //키보드 이벤트를 통해서 제어
    var key_num = 0;
    $(document).on("keydown", function(event){
        //console.log(event);
        console.log(event.keyCode);
        console.log(typeof event.keyCode);
        key_num = event.keyCode;

        var $target = $(".box.active").index();
        if(key_num == 40 || key_num == 34){ //"아래방향키(40)" 또는 "Page Down(34)" 키보드를 눌렀을 때
            try{
                $("html, body").stop().animate({scrollTop : $(".box").eq($target + 1).offset().top}, 800, function(){
                    $(".box").removeClass("active");
                    $(".box").eq($target + 1).addClass("active");
                    $(".pager li").removeClass("active");
                    $(".pager li").eq($target + 1).addClass("active");
                });
            }catch(event){

            }

        }else if(key_num == 38 || key_num == 33){ //"위방향키(38)" 또는  "Page Up(33)"키보드를 눌렀을 때
            try{
                $("html, body").stop().animate({scrollTop : $(".box").eq($target - 1).offset().top}, 800, function(){
                    $(".box").removeClass("active");
                    $(".box").eq($target - 1).addClass("active");
                    $(".pager li").removeClass("active");
                    $(".pager li").eq($target - 1).addClass("active");
                });
            }catch(event){

            }

        }else if(key_num == 36){  //"Home(36)"키보드를 눌렀을 때, 맨 처음으로 이동
            try{
                $("html, body").stop().animate({scrollTop : $(".box").eq(0).offset().top}, 800, function(){
                    $(".box").removeClass("active");
                    $(".box").eq(0).addClass("active");
                    $(".pager li").removeClass("active");
                    $(".pager li").eq(0).addClass("active");
                });
            }catch(event){

            }
        }else if(key_num == 35){  //"End(35)"키보드를 눌렀을 때, 맨 마지막으로 이동
            try{
                $("html, body").stop().animate({scrollTop : $(".box").last().offset().top}, 800, function(){
                    $(".box").removeClass("active");
                    $(".box").last().addClass("active");
                    $(".pager li").removeClass("active");
                    $(".pager li").last().addClass("active");
                })

            }catch(event){

            }
        }
    });

    //모바일 환경에서는 터치 기반 - touchstart(최초로 화면을 누른 시점에서 발생하는 이벤트), touchend(드래그 이후의 손가락을 화면에서 떼는 시점에서 발생하는 이벤트)

    var $t_start; //최초로 터치한 Y축의 위치값
    var $t_end;
    var $t_move;

    function next(evt){
        console.log(evt);
        try{
            var $target = $(".box.active").index();  //터치가 종료된 시점에서 현재 보여지는 화면의 인덱스번호를 추출
            if($target != $(".box").length - 1){  //현재 위치가 마지막 인덱스 번호를 가져오지 않았다면
                $("html, body").stop().animate({scrollTop : $(".box").eq($target + 1).offset().top}, 500, function(){
                    $(".box").removeClass("active");
                    $(".box").eq($target + 1).addClass("active");
                    $(".pager li").removeClass("active");
                    $(".pager li").eq($target + 1).addClass("active");
                });

            }
        }catch(evt){

        }
    };

    function prev(evt){
        console.log(evt);
        try{
            var $target = $(".box.active").index();  //터치가 종료된 시점에서 현재 보여지는 화면의 인덱스번호를 추출
            if($target != 0){  //현재 위치가 마지막 인덱스 번호를 가져오지 않았다면
                $("html, body").stop().animate({scrollTop : $(".box").eq($target - 1).offset().top}, 500, function(){
                    $(".box").removeClass("active");
                    $(".box").eq($target - 1).addClass("active");
                    $(".pager li").removeClass("active");
                    $(".pager li").eq($target - 1).addClass("active");
                });

            }
        }catch(evt){

        }
    };


    function touchmove(e){
        console.log(e);
        $t_move = $t_start - $t_end;
        if($t_move > 0){        //터치의 이동방향이 위쪽방향
            //하부 내용이 화면으로 들어와야함
            next(e);
        }else if($t_move < 0){  //터치의 이동방향이 아래쪽방향
            //상부 내용이 화면으로 들어와야함
            prev(e);
        }
    };


    $(".box").on("touchstart", function(event){
        console.log("터치 시작", event);
        console.log(event.changedTouches[0].pageY);
        $t_start = event.changedTouches[0].pageY;
        

    });

    $(".box").on("touchend", function(event){
        console.log("터치 종료", event);
        console.log(event.changedTouches[0].pageY);
        $t_end = event.changedTouches[0].pageY;

        touchmove(event);
    });

    // typed

    var typed = new Typed('.typed', {
        strings : ["안녕하세요", "신입 퍼블리셔 이지윤입니다 :)"],  //브라우저 화면에 띄워줄 문구
        stringsElement : null,  //초기 상태에서 공간을 비운다
        typeSpeed : 100,  //타이핑 속도
        backSpeed : 100,  //backspace의 속도
        startDelay : 500,  //1초후 타이핑을 통해서 글자가 작성되도록 시간을 지연시킴
        backDelay : 1000,  //첫번째 문장을 모두 작성되게 한 후, 1초 후에 backspace가 진행되도록 만듬
        loop : true,  //타이핑 문장 반복(true 또는 false)
        showCursor : true,
        cursorChar : '_',  //커서의 형태를 지정
        autoInsertCss : true
    });

    // my skill 파트
    $(window).scroll(function(){
        const $scrollTop = $(this).scrollTop();
        const $screen_h = $(window).height();
        const $standard = $(".skill").offset().top

        if($scrollTop > $standard - $screen_h){ //헷갈리니까 공부하기
            $(".per_bar_frame").each(function(index){
                const $data =  $(this).attr("skill-percent");
                $(this).find(".per_bar").animate({"width" : $data}, 1000);
                $(this).find(".cur_per").text($data)
                $(".skill_8").find(".cur_per").text("Loading...");
            });
        }
    });

    $("#slick-container").slick({
        infinite : true,
        speed : 500,
        autoplay : false,
        slideToShow : 1,
    });








    const port_arr = [
        ["온라인클래스", "PHP, MYSQL을 사용한 온라인 동영상 강의 사이트", "website.png", "http://dnlsl70.dothome.co.kr/website/"],
        ["Fashion Blog", "샘플 사이트를 참고하여 만든 클론사이트", "clone_site1.png", "https://2gyoon.github.io/clone_site1/"],
        ["장사리", "ajax를 활용하여 만든 영화 사이트", "jangsari.png", "https://2gyoon.github.io/jangsari/"],
        ["Weather App", "ajax와 openweathermap을 활용한 날씨웹앱", "weatherapp.png", "https://2gyoon.github.io/weatherapp/"],
        ["Inspace", "건축, 인테리어 사이트", "inspace.png", "https://2gyoon.github.io/inspace/"],
        ["FilmMaker", "영화인 커뮤니티", "audition.png", "https://2gyoon.github.io/audition/"],
        ["Origin", "아이들을 위한 공연 반응형 사이트", "origin.png", "https://2gyoon.github.io/origin/"],
        ["BnO-Play", "음향기기 판매 사이트", "BnO-Play.png", "https://2gyoon.github.io/BnO-Play/"],
        ["TheAisle", "웨딩사이트", "wedding.png", "https://2gyoon.github.io/wedding/"],
        ["극예술연구회", "연극정보 반응형 사이트", "theater.png", "https://2gyoon.github.io/theater/"],
        ["InvestPlan", "투자설계사이트", "investplan.png", "https://2gyoon.github.io/investplan/"],
        ["Cashmere", "온라인 캐시미어 의류사이트", "cashmere.png", "https://2gyoon.github.io/cashmere/"],
        ["세종병원", "세종병원 웹사이트", "hospital.png", "https://2gyoon.github.io/hospital/"],
        ["Kuliner", "레스토랑 소개 웹사이트", "Kuliner.png", "https://2gyoon.github.io/Kuliner/"],
        
    ];

    const port_part = `
    <li>
        <div class="port_img">
            <div class="site_img"></div>
            <div class="monitor_img"></div>
        </div>
        <div class="port_txt">
            <div class="context">
                <h2></h2>
                <p></p>
                <a href="#" target="_blank">Visit Site</a>
            </div>
        </div>
    </li>
    `;

    for(i = 0; i < port_arr.length; i++){
        $(".portfolio .frame ul").append(port_part);
    };


    $(".portfolio .frame ul li").each(function(index){
        $(this).find(".context h2").text(port_arr[index][0]);
        $(this).find(".context p").text(port_arr[index][1]);
        $(this).find(".site_img").css("background-image", `url(./img/portfolio/${port_arr[index][2]})`);
        $(this).find(".context a").attr("href", port_arr[index][3]);
    });


    // $(".prev").click(function(){
    //     const $last = $(".portfolio .frame ul li").last();
    //     $(".portfolio .frame ul").stop().animate({"margin-left" : "0"}, 500, function(){
    //         $(".portfolio .frame ul").prepend($last).css("margin-left", "-100%");
    //     });
    //     return false;
    // });
    // $(".next").click(function(){
    //     const $first = $(".portfolio .frame ul li").first();
    //     $(".portfolio .frame ul").stop().animate({"margin-left" : "-200%"}, 500, function(){
    //         $(".portfolio .frame ul").append($first).css("margin-left", "-100%");
    //     });
    //     return false;
    // });

    $("#slick-container2").slick({
        infinite : true,
        speed : 500,
        autoplay : false,
        slideToShow : 1,
    });




    $(".pager li").click(function(){
        const $index = $(this).index();
        $(".pager li").removeClass("active");
        $(this).addClass("active");
        $("html, body").stop().animate({scrollTop : $(`section:eq(${$index})`).offset().top}, 1000);
    });


    $(".close").click(function(){
        $(".thankyou_message").hide();
        return false;
    });
    


    $(".go_top").click(function(){
        $("html, body").animate({
            "scrollTop" : 0
        }, 1000);
        $(".pager li").removeClass("active");
        $(".pager li:eq(0)").addClass("active");

        return false;
    });






});