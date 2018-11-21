$.get(chrome.extension.getURL('/jquery.js'),
        function (data) {
            var script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.innerHTML = data;
            document.getElementsByTagName("head")[0].appendChild(script);
            $.get(chrome.extension.getURL('/drive2.js'),
                    function (data2) {
                        var script2 = document.createElement("script");
                        script2.setAttribute("type", "text/javascript");
                        script2.innerHTML = data2;
                        document.getElementsByTagName("head")[0].appendChild(script2);
                        document.getElementsByTagName("body")[0].setAttribute("onreset", "drive2.init();");
                        document.getElementsByTagName("body")[0].dispatchEvent(new CustomEvent('reset'));
                        document.getElementsByTagName("body")[0].removeAttribute('onreset');

                    }
            );
        }
);


