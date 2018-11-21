var drive2 = {
    id: 0,
    getId: function () {
        var result = "dive2crack" + drive2.id;
        drive2.id++;
        return result;
    },
    toolbar: {
        selector: '#customMenu',
        init: function () {
            $('.l-body').append('<header class="l-header" data-role="sticky" style="bottom: 10px; background-color:black;"><r-yvnv class="c-top"><r-yvnv class="c-top__container"><r-yvnv class="c-top__wrapper"><r-yvnv id="customMenu" class="c-top__main-nav" data-slot="sitesearch.nav"><r-yvnv class="c-top-nav"><a class="c-top-nav__link" href="http://autogramm.ru" target="_blank">Autogramm(@agmm_channel)<span class="c-notification-bubble c-notification-bubble--top" >!</span></a></r-yvnv></r-yvnv></r-yvnv></r-yvnv></r-yvnv></header>');
        },
        createLink: function (id, name, onclick) {
            var link = '<r-yvnv class="c-top-nav" id="' + id + '"><a class="c-top-nav__link" style="cursor:pointer;">' + name + '</a></r-yvnv>';
            $(drive2.toolbar.selector).append(link);
            $('#' + id).click(function () {
                onclick();
            });
        }
    },
    init: function () {
        drive2.toolbar.init();
        drive2.subscribtion.init();
        drive2.like.init();
    },
    automation: {
        selectors: {
            "Автолайки": '.c-like__button',
            "Автоподписки": '.c-button--subs',
        },
        buttons: [],
        intervals: [],
        startButtons: [],
        stopButtons: [],
        start: function (selector) {},
        stop: function (selector) {},
        init: function () {
            for (var i = 0; i < this.selectors.length; i++) {
                var selector = this.selectors[i];
                drive2.automation.startButtons[] = drive2.getId();
                        drive2.like.btnOffId = drive2.getId();
                drive2.toolbar.createLink(drive2.like.btnOnId, 'Включить ' + selector.name, () => {
                    drive2.automation.start(selector);
                });
                drive2.toolbar.createLink(drive2.like.btnOffId, 'Выключить ' + selector.name, () => {
                    drive2.automation.stop(selector);
                });
                $("#" + drive2.like.btnOffId).hide();
            }
        },
    },
    like: {
        btnLikeSelector: '.c-like__button',
        buttons: [],
        counter: 0,
        stopped: false,
        btnOnId: undefined,
        btnOffId: undefined,
        interval: undefined,
        start: function () {
            $("#" + drive2.like.btnOnId).hide();
            $("#" + drive2.like.btnOffId).show();
            drive2.like.interval = setInterval(() => {
                if (drive2.like.counter >= $(drive2.like.buttons).length - 1) {
                    drive2.like.buttons = $(drive2.like.btnLikeSelector);
                }
                $(drive2.like.buttons[drive2.like.counter]).click();
                $('html, body').animate({
                    scrollTop: $(drive2.like.buttons[drive2.like.counter]).offset().top
                }, 300);
                drive2.like.counter++;
            }, 500);
        },
        stop: function () {
            $("#" + drive2.like.btnOnId).show();
            $("#" + drive2.like.btnOffId).hide();
            clearInterval(drive2.like.interval);
        },
        init: function () {
            drive2.like.btnOnId = drive2.getId();
            drive2.toolbar.createLink(drive2.like.btnOnId, 'Включить автолайки', function () {
                drive2.like.start();
            });
            drive2.like.btnOffId = drive2.getId();
            drive2.toolbar.createLink(drive2.like.btnOffId, 'Выключить автолайки', function () {
                drive2.like.stop();
            });
            $("#" + drive2.like.btnOffId).hide();
        }
    },
    subscribtion: {
        btnSubscriptionSelector: '.c-button--subs',
        buttons: [],
        counter: 0,
        stopped: false,
        btnOnId: undefined,
        btnOffId: undefined,
        start: function (init) {
            if (init === true) {
                $("#" + drive2.subscribtion.btnOnId).hide();
                $("#" + drive2.subscribtion.btnOffId).show();
                drive2.subscribtion.stopped = false;
            }

            if (drive2.subscribtion.counter >= $(drive2.subscribtion.buttons).length - 1) {
                drive2.subscribtion.buttons = $(drive2.subscribtion.btnSubscriptionSelector);
                drive2.subscribtion.start();
            } else {
                setTimeout(() => {
                    $(drive2.subscribtion.buttons[drive2.subscribtion.counter]).click();
                    $('html, body').animate({
                        scrollTop: $(drive2.subscribtion.buttons[drive2.subscribtion.counter]).offset().top - 150
                    }, 300);
                    drive2.subscribtion.counter++;
                    if (!drive2.subscribtion.stopped) {
                        drive2.subscribtion.start();
                    }
                }, 350);
            }
        },
        stop: function () {
            $("#" + drive2.subscribtion.btnOnId).show();
            $("#" + drive2.subscribtion.btnOffId).hide();
            drive2.subscribtion.stopped = true;
        },
        init: function () {
            drive2.subscribtion.btnOnId = drive2.getId();
            drive2.toolbar.createLink(drive2.subscribtion.btnOnId, 'Включить автоподписку', function () {
                drive2.subscribtion.start(true);
            });
            drive2.subscribtion.btnOffId = drive2.getId();
            drive2.toolbar.createLink(drive2.subscribtion.btnOffId, 'Выключить автоподписку', function () {
                drive2.subscribtion.stop();
            });
            $("#" + drive2.subscribtion.btnOffId).hide();
        }
    }
};
