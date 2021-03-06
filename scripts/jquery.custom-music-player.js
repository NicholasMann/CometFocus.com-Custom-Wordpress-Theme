(function ($, Howl) {
    "use strict";

    var volumn = '<input \n        type="range"\n        min="0.0"\n        step="0.01"\n        max="1.0"\n    />';
    var styles = {
        inactive: {
            '-webkit-transition': 'all 200ms ease-in',
            '-webkit-transform': 'scale(1)',
            '-ms-transition': 'all 200ms ease-in',
            '-ms-transform': 'scale(1)',
            '-moz-transition': 'all 200ms ease-in',
            '-moz-transform': 'scale(1)',
            'transition': 'all 200ms ease-in',
            'transform': 'scale(1)'
        },
        focus: {
            '-webkit-transition': 'all 200ms ease-in',
            '-webkit-transform': 'scale(1.1)',
            '-ms-transition': 'all 200ms ease-in',
            '-ms-transform': 'scale(1.1)',
            '-moz-transition': 'all 200ms ease-in',
            '-moz-transform': 'scale(1.1)',
            'transition': 'all 200ms ease-in',
            'transform': 'scale(1.1)'
        },
        active: {} //left blank intentionally
    };
    var isCssInjected = false;
    var css = '\n.custom-music-player {\n    opacity: 0.4;\n}\n.custom-music-player.active {\n    opacity: 1;\n}\n.custom-music-player svg,\n.custom-music-player input[type=range] {\n    display: block;\n    margin: 0 auto;\n}\n.custom-music-player input[type=range] {\n    margin-top: 20px;\n  /*removes default webkit styles*/\n  -webkit-appearance: none;\n  /*fix for FF unable to apply focus style bug */\n  border: none;\n  /*required for proper track sizing in FF*/\n  width: 300px;\n}\n\n.custom-music-player input[type=range]::-webkit-slider-runnable-track {\n  width: 300px;\n  height: 2px;\n  background: #ED1745;\n  border: none;\n  border-radius: 3px;\n}\n\n.custom-music-player input[type=range]::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  border: none;\n  height: 16px;\n  width: 16px;\n  border-radius: 50%;\n  background: #ED1745;\n  margin-top: -6px;\n}\n\n.custom-music-player input[type=range]:focus {\n  outline: none;\n}\n\n.custom-music-player input[type=range]:focus::-webkit-slider-runnable-track {\n  background: #ED1745;\n}\n\n.custom-music-player input[type=range]::-moz-range-track {\n  width: 300px;\n  height: 2px;\n  background: #ED1745;\n  border: none;\n  border-radius: 3px;\n}\n\n.custom-music-player input[type=range]::-moz-range-thumb {\n  border: none;\n  height: 16px;\n  width: 16px;\n  border-radius: 50%;\n  background: #ED1745;\n}\n\n\n/*hide the outline behind the border*/\n\n.custom-music-player input[type=range]:-moz-focusring {\n  outline: none;\n  outline-offset: -1px;\n}\n\n.custom-music-player input[type=range]::-ms-track {\n  width: 300px;\n  height: 3px;\n  /*remove bg colour from the track, we\'ll use ms-fill-lower and ms-fill-upper instead */\n  background: transparent;\n  /*leave room for the larger thumb to overflow with a transparent border */\n  border-color: transparent;\n  border-width: 6px 0;\n  /*remove default tick marks*/\n  color: transparent;\n}\n\n.custom-music-player input[type=range]::-ms-fill-lower {\n  background: #ED1745;\n  border-radius: 10px;\n}\n\n.custom-music-player input[type=range]::-ms-fill-upper {\n  background: #ED1745;\n  border-radius: 10px;\n}\n\n.custom-music-player input[type=range]::-ms-thumb {\n  border: none;\n  height: 16px;\n  width: 16px;\n  border-radius: 50%;\n  background: #ED1745;\n}\n\n.custom-music-player input[type=range]:focus::-ms-fill-lower {\n  background: #ED1745;\n}\n\n.custom-music-player input[type=range]:focus::-ms-fill-upper {\n  background: #ED1745;\n}\n';
    $.fn.customMusicPlayer = function () {

        if (!isCssInjected) {
            this.append("<style type='text/css'> " + css + "</style>");
        }
        var self = this;
        this.howls = [];
        this.each(function (index, value) {
            var soundSources = [];
            $('audio', value).each(function (index, $audio) {
                $('source', $audio).each(function (index, $source) {
                    soundSources.push($source.src);
                });
                $audio.remove();
            });
            var $player = $(value);
            var $volume = $(volumn);
            var $control = $('svg', $player);
            var howl = new Howl({
                src: soundSources,
                loop: true,
                volume: $volume[0].value
            });
            $player.addClass('custom-music-player');
            $player.append($volume);
            $control.css(styles.inactive);
            $control.click(function (event) {
                event.preventDefault();
                $player.toggleClass('active');
                if (howl.playing()) {
                    howl.pause();
                    $control.css(styles.inactive);
                } else {
                    howl.play();
                    $control.css(styles.active);
                }
            });
            $control.hover(function () {
                $control.css(styles.focus);
            }, function () {
                if (howl.playing()) {
                    $control.css(styles.active);
                } else {
                    $control.css(styles.inactive);
                }
            });
            $volume.on('change', function () {
                howl.volume(this.value);
            });
            self.howls.push(howl);
        });
        return this;
    };
})(jQuery, Howl);
