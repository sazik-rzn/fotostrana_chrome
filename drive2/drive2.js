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
        createHref:function(name, href){
            var link = '<r-yvnv class="c-top-nav"><a href="'+href+'" target="_blank" class="c-top-nav__link" style="cursor:pointer;">' + name + '</a></r-yvnv>';
            $(drive2.toolbar.selector).append(link);
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
        drive2.toolbar.createHref("Перенести в autogramm", "http://autogramm.ru/drive?url="+encodeURIComponent(window.location.href)+"&force=true");
        drive2.automation.init();
    },
    automation: {
        selectors: {
            "Автолайки": '.c-like__button',
            "Автоподписки": '.c-button--subs',
        },
        limits:{
			"Автоподписки": 50
		},
        buttons: {},
        intervals: {},
        counters: {},
        startButtons: {},
        stopButtons: {},
        start: function (selectorName) {
            $("#" + drive2.automation.startButtons[selectorName]).hide();
            $("#" + drive2.automation.stopButtons[selectorName]).show();
            drive2.automation.intervals[selectorName] = setInterval(() => {
				if(drive2.automation.limits[selectorName]!==undefined && drive2.automation.counters[selectorName]>=drive2.automation.limits[selectorName]){
					drive2.automation.stop(selectorName);
				}
                if (drive2.automation.counters[selectorName] >= $(drive2.automation.buttons[selectorName]).length - 1) {
                    drive2.automation.buttons[selectorName] = $(drive2.automation.selectors[selectorName]);
                }
                $(drive2.automation.buttons[selectorName][drive2.automation.counters[selectorName]]).click();
                $('html, body').animate({
                    scrollTop: $(drive2.automation.buttons[selectorName][drive2.automation.counters[selectorName]]).offset().top - 100
                }, 0);
                drive2.automation.counters[selectorName]++;
            }, 500);
        },
        stop: function (selectorName) {
            $("#" + drive2.automation.startButtons[selectorName]).show();
            $("#" + drive2.automation.stopButtons[selectorName]).hide();
            clearInterval(drive2.automation.intervals[selectorName]);
        },
        init: function () {
            $.each(drive2.automation.selectors, function (index, selector) {
                drive2.automation.startButtons[index] = drive2.getId();
                drive2.automation.stopButtons[index] = drive2.getId();
                drive2.toolbar.createLink(drive2.automation.startButtons[index], 'Включить ' + index, () => {
                    drive2.automation.start(index);
                });
                drive2.toolbar.createLink(drive2.automation.stopButtons[index], 'Выключить ' + index, () => {
                    drive2.automation.stop(index);
                });
                $("#" + drive2.automation.stopButtons[index]).hide();
                drive2.automation.counters[index] = 0;
                drive2.automation.buttons[index] = [];
            });
        },
    }
};
