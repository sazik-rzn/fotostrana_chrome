var photoland = {
    plugin_wrap: "plugin_wrap",
    initial_url: undefined,
    header_btn: function (name, id, onclick) {
        $("#" + id).remove();
        $('#' + this.plugin_wrap).append('<button id="' + id + '" class="ibtn ibtn-orange ibtn-orange" style="width:100%;">' + name + '</button>');
        $("#" + id).click(function () {
            onclick();
        });
    },
    init_functions: [],
    registerInitFunction: function (init_function) {
        photoland.init_functions[photoland.init_functions.length] = init_function;
    },
    init: function () {
        this.initial_url = window.location.href;
        this.run();
        setInterval(function () {
            var url = window.location.href;
            if (url !== photoland.initial_url) {
                photoland.initial_url = url;
                photoland.run();
            }
        }, 1000);
    },
    run: function () {
        $('#' + this.plugin_wrap).remove();
        this.init_functions = [];
        $('body').append("<div id='" + this.plugin_wrap + "' style='position:fixed; top:50px; left:5px; z-index:1000000;'></div>");

        this.registerInitFunction(this.golosovanie.init);
        this.registerInitFunction(this.vstrechi.init);
        this.registerInitFunction(this.like.init);
        this.registerInitFunction(this.litsoSOblogki.init);
        this.registerInitFunction(this.ludi.init);
        this.registerInitFunction(this.goryatsieSerdtsa.init);
        this.registerInitFunction(this.user.init);
        this.registerInitFunction(this.putKSlave.init);

        $.each(this.init_functions, function (index, value) {
            value();
        });
    },
    user: {
        init: function () {
            if ($("#add-friend").length > 0 && $("#remove-friend").css("display") !== "block") {
                photoland.user.addFriend();
            }
        },
        addFriend: function () {
            if ($("#add-friend").attr("style") !== "display: none;") {
                $("#add-friend").find(".btn-inner").click();
            }
        }
    },
    golosovanie: {
        init: function () {
            if (window.location.href.indexOf("/contest/") > -1) {
                photoland.golosovanie.button();
            }
        },
        id: undefined,
        state: false,
        button: function () {
            if (this.state) {
                photoland.header_btn('Не голосовать', 'golos', photoland.golosovanie.stop);
            } else {
                photoland.header_btn('Голосовать', 'golos', photoland.golosovanie.start);
            }
        },
        start: function () {
            this.state = true;
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
            if (this.id !== undefined) {
                clearInterval(this.id);
                this.state = false;
            }
        }
    },
    vstrechi: {
        init: function () {
            if (window.location.href.indexOf("/meeting/") > -1) {
                photoland.vstrechi.button();
            }
        },
        id: undefined,
        state: false,
        button: function () {
            if (this.state) {
                photoland.header_btn('Встречи off', 'vstr', photoland.vstrechi.stop);
            } else {
                photoland.header_btn('Встречи on', 'vstr', photoland.vstrechi.start);
            }
        },
        start: function () {
            this.state = true;
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
            this.state = false;
            if (this.id !== undefined) {
                clearInterval(this.id);
            }
        }
    },
    like: {
        init: function () {
            if ((window.location.href.indexOf("/albums/") > -1 || window.location.href.indexOf("/album/") > -1) && $(".photo-info-like-bg:not(.on)").length > 0) {
                photoland.like.button();
            }
        },
        id: undefined,
        state: false,
        button: function () {
            if (this.state) {
                photoland.header_btn('Лакается...', 'liker', function () {});
            } else {
                photoland.header_btn('Пролайкать', 'liker', photoland.like.all);
            }
        },
        all: function () {
            this.state = true;
            this.id = setInterval(function () {
                if ($(".photo-info-like-bg:not(.on)").length > 0) {
                    $(".photo-info-like-bg:not(.on)")[0].click();
                } else {
                    photoland.like.clear();
                }
            }, 500);
        },
        clear: function () {
            this.state = false;
            clearInterval(photoland.like.id);
            $("#liker").remove();
        }
    },
    litsoSOblogki: {
        init: function () {
            if (window.location.href.indexOf("/rating/") > -1) {
                photoland.litsoSOblogki.button();
            }
        },
        id: undefined,
        state: false,
        button: function () {
            if (this.state) {
                photoland.header_btn('Лицо с обложки off', 'litso', photoland.litsoSOblogki.stop);
            } else {
                photoland.header_btn('Лицо с обложки on', 'litso', photoland.litsoSOblogki.start);
            }
        },
        start: function () {
            this.state = true;
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
            this.state = false;
            if (this.id !== undefined) {
                clearInterval(this.id);
            }
        }
    },
    ludi: {
        init: function () {
            if (window.location.href.indexOf("/people/") > -1) {
                photoland.header_btn('Люди on', 'ludi', photoland.ludi.start);
            }
        },
        id: undefined,
        stopped: 0,
        start: function () {
            photoland.header_btn('Люди off', 'ludi', photoland.ludi.stop);
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
            photoland.header_btn('Люди on', 'ludi', photoland.ludi.start);
            if (this.id !== undefined) {
                clearInterval(this.id);
                console.log("Stopped");
            }
        }
    },
    goryatsieSerdtsa: {
        init: function () {
            if(window.location.href.indexOf("/hothearts/") > -1){
                photoland.goryatsieSerdtsa.button();
            }
        },
        id: undefined,
        state: false,
        button: function () {
            if (this.state) {
                photoland.header_btn('Горячие сердца off', 'goryatsieSerdtsa', photoland.goryatsieSerdtsa.stop);
            } else {
                photoland.header_btn('Горячие сердца on', 'goryatsieSerdtsa', photoland.goryatsieSerdtsa.start);
            }
        },
        start: function () {
            this.state = true;
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
            this.state = false;
            if (this.id !== undefined) {
                clearInterval(this.id);
                console.log("Stopped");
            }
        }
    },
    putKSlave: {
        init: function () {
            if(window.location.href.indexOf("season/fame") > -1){
                photoland.putKSlave.button();
            }
        },
        id: undefined,
        state: false,
        prev: 0,
        button: function () {
            if (this.state) {
                photoland.header_btn('Путь к славе off', 'slava', photoland.putKSlave.stop);
            } else {
                photoland.header_btn('Путь к славе on', 'slava', photoland.putKSlave.start);
            }
        },
        start: function () {
            this.state = true;
            this.id = setInterval(function () {
                
                if($("._skip").length > 0){
                    $("._skip").find(".jslink").click();
                }
                if($('.fame2016-card_answers').find('.fame2016-card_answer').length===3){
                    if($($('.fame2016-card_answers').find('.fame2016-card_answer')[photoland.putKSlave.prev]).find(".fame2016-card_answer_price").text() === "Бесплатно"){
                        $($('.fame2016-card_answers').find('.fame2016-card_answer')[photoland.putKSlave.prev]).click();
                    }
                    if(photoland.putKSlave.prev === 2){
                        photoland.putKSlave.prev = 0;
                    }
                    else{
                        photoland.putKSlave.prev++;
                    }
                }
            }, 700);
        },
        stop: function () {
            this.state = false;
            if (this.id !== undefined) {
                clearInterval(this.id);
                console.log("Stopped");
            }
        }
    }
};
