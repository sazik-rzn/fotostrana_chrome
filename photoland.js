var photoland = {
    header_btn: function(name, id, onclick){
        $("#"+id).remove();
        $('#header').append('<a class="link-text fl-l trebuchet" id="'+id+'">'+name+'</a>');
        $("#"+id).click(function(){
            onclick();
        });
    },
    init_functions:[],
    registerInitFunction:function(init_function){
        photoland.init_functions[photoland.init_functions.length] = init_function;
    },
    init: function () {
        $.each(this.init_functions, function(index, value){
            value();
        });
    },
    golosovanie: {
        init:function(){
            
        },
        id: undefined,
        start: function () {
            photoland.header_btn('Голосование off', 'golos', photoland.golosovanie.stop);
            this.id = setInterval(function () {
                var btn = $("div.contest-popup-buttons-container.js-contest-buttons-container.contest-all-buttons > button");
                if ($(btn).prop("disabled")) {
                    $("div.contest-popup-arrow-next.js-contest-arrow-next").click();
                } else {
                    $(btn).click();
                }
            }, 1500);
        },
        stop: function () {
            photoland.header_btn('Голосование on', 'golos', photoland.golosovanie.start);
            if (this.id !== undefined) {
                clearInterval(this.id);
            }
        }
    },
    vstrechi: {
        id: undefined,
        start: function () {
            photoland.header_btn('Встречи off', 'vstr', photoland.vstrechi.stop);
            this.id = setInterval(function () {
                if ($(".meet-ic.m-close-w.mpopup-close.mtrans").length > 0) {
                    $(".meet-ic.m-close-w.mpopup-close.mtrans").click();
                }
                if ($(".meeting-game-promo-card-wrapper").length > 0) {
                    $(".m-game-btns.meet-btn.blue-btn.meet-nope").click();
                }
                $("#meeting-game-topper-wrapper > div.meeting-game-buttons-wrapper > div.meeting-game-buttons > span.m-game-btns.meet-btn.red-btn.meet-yeap").click();
                $("#meeting-game-image-wrapper > div.meeting-content-img-wrap.meeting-photos-item-0 > div.meeting-content-rate-wrap.mtrans > span.meeting-game-rate-item.it-5").click();
            }, 1500);
        },
        stop: function () {
            photoland.header_btn('Встречи on', 'vstr', photoland.vstrechi.start);
            if (this.id !== undefined) {
                clearInterval(this.id);
            }
        }
    },
    like: {
        id: undefined,
        all: function () {
            this.id = setInterval(function () {
                if ($(".photo-info-like-bg:not(.on)").length > 0) {
                    $(".photo-info-like-bg:not(.on)")[0].click();
                } else {
                    clearInterval(photoland.like.id);                    
                    $("#liker").remove();
                }
            }, 500);
        }
    },
    litsoSOblogki: {
        id: undefined,
        start: function () {
            this.id = setInterval(function () {
                var check = $("#fsr-photo-like-fs.active");
                if ($(check).length > 0) {
                    $(".fsr-photo-unlike").click();
                } else {
                    $(".fsr-photo-like").click();
                }

            }, 1500);
        },
        stop: function () {
            if (this.id !== undefined) {
                clearInterval(this.id);
            }
        }
    },
    ludi: {
        id: undefined,
        stopped: 0,
        start: function () {
            this.id = setInterval(function () {
                if ($(".people-person-like-wrapper:not(.liked-outgoing)").length > 0) {
                    var like = $(".people-person-like-wrapper:not(.liked-outgoing)")[0];
                    $(like).find(".people-person-like").click();
                    photoland.ludi.stopped = 0;
                } else {
                    if (photoland.ludi.stopped >= 1) {
                        peopleFeatures.appendToList();
                        photoland.ludi.stopped++;
                    }
                    if (photoland.ludi.stopped === 0) {
                        window.scrollTo(0, document.body.scrollHeight);
                        photoland.ludi.stopped = 1;
                    }
                    if (photoland.ludi.stopped > 10) {
                        photoland.ludi.stop();
                    }
                }
            }, 500);
        },
        stop: function () {
            if (this.id !== undefined) {
                clearInterval(this.id);
                console.log("Stopped");
            }
        }
    },
    goryatsieSerdtsa: {
        id: undefined,
        start: function () {
            this.id = setInterval(function () {
                var coast = $(".hothearts-page_send_button_cost")[0];
                if ($(coast).text() !== "0.1 ФМ") {
                    $("div.hothearts-page_send_button_basic.hothearts-btn._gray.unselectable").click();
                } else {
                    this.stop();
                }
            }, 500);
        },
        stop: function () {
            if (this.id !== undefined) {
                clearInterval(this.id);
                console.log("Stopped");
            }
        }
    }
};
