var API = (function () {
    function API() {
    }
    API.Request = function (options) {
        if (options) {
            if (!options.action) {
                return;
            }
            if (!options.data) {
                return;
            }
            var ajaxOpts = {
                url: '',
                async: false,
                cache: false,
                data: {
                    data: options.data,
                    action: options.action
                },
                dataType: 'json',
                type: 'POST'
            };
            console.log(ajaxOpts);
            if (options.callback)
                ajaxOpts.success = options.callback;
            $.ajax(ajaxOpts);
        }
        //else
        //console.error('API.Request : opts parameter is missing');
    };
    return API;
}());
/*
 API.Request({
 'action' : 'get',
 'data' : {
 'user_auth_type' : 'FACEBOOK', // FACEBOOK || MAIL
 'user_auth_id' : '000000000000000' // mail adress || fb id
 },
 'callback' : function(xhr){ console.log(xhr); }
 });
 */ 
var DefaultDeprecated;
(function (DefaultDeprecated) {
    var Core = (function () {
        function Core() {
            this.actionName = 'DefaultDeprecated';
            this.classes = [];
            console.info(':::: Action - ctr : ' + this.actionName);
            this.init();
        }
        Core.prototype.init = function () {
            console.warn(':::: Action : ' + this.actionName + ' - init');
        };
        Core.prototype.clear = function () {
            console.warn(':::: Action : ' + this.actionName + ' - clearing all events');
        };
        Core.prototype.loaded = function () {
            this.classes.push(new Error());
            console.warn(':::: Action : ' + this.actionName + ' - is loaded!');
        };
        Core.prototype.getClassName = function () {
            return this.actionName;
        };
        return Core;
    }());
    DefaultDeprecated.Core = Core;
    var Error = (function () {
        function Error() {
            this.wrapper = $('.main-wrapper.deprecated');
            this.img = this.wrapper.find('.background');
            this.init();
        }
        Error.prototype.init = function () {
            this.getSliderIndex();
        };
        Error.prototype.getSliderIndex = function () {
            this.current = parseInt(this.wrapper.attr('data-slider-index'));
            $(this.img[this.current]).addClass('active');
        };
        return Error;
    }());
    DefaultDeprecated.Error = Error;
})(DefaultDeprecated || (DefaultDeprecated = {}));
var DefaultError;
(function (DefaultError) {
    var Core = (function () {
        function Core() {
            this.actionName = 'DefaultError';
            this.classes = [];
            console.info(':::: Action - ctr : ' + this.actionName);
            this.init();
        }
        Core.prototype.init = function () {
            console.warn(':::: Action : ' + this.actionName + ' - init');
        };
        Core.prototype.clear = function () {
            console.warn(':::: Action : ' + this.actionName + ' - clearing all events');
        };
        Core.prototype.loaded = function () {
            this.classes.push(new Error());
            console.warn(':::: Action : ' + this.actionName + ' - is loaded!');
        };
        Core.prototype.getClassName = function () {
            return this.actionName;
        };
        return Core;
    }());
    DefaultError.Core = Core;
    var Error = (function () {
        function Error() {
            this.wrapper = $('.main-wrapper.error');
            this.img = this.wrapper.find('.background');
            this.init();
        }
        Error.prototype.init = function () {
            this.getSliderIndex();
        };
        Error.prototype.getSliderIndex = function () {
            this.current = parseInt(this.wrapper.attr('data-slider-index'));
            $(this.img[this.current]).addClass('active');
        };
        return Error;
    }());
    DefaultError.Error = Error;
})(DefaultError || (DefaultError = {}));
var ExampleIndex;
(function (ExampleIndex) {
    var Core = (function () {
        function Core() {
            this.actionName = 'ExampleIndex';
            console.info(':::: Action - ctr : ' + this.actionName);
        }
        Core.prototype.init = function () {
            console.warn(':::: Action : ' + this.actionName + ' - init');
        };
        Core.prototype.clear = function () {
            console.warn(':::: Action : ' + this.actionName + ' - clearing all events');
        };
        Core.prototype.loaded = function () {
            console.warn(':::: Action : ' + this.actionName + ' - is loaded!');
        };
        Core.prototype.getClassName = function () {
            return this.actionName;
        };
        return Core;
    }());
    ExampleIndex.Core = Core;
})(ExampleIndex || (ExampleIndex = {}));
var HomeIndex;
(function (HomeIndex) {
    var Core = (function () {
        function Core() {
            this.actionName = 'HomeIndex';
            this.classes = [];
            console.info(':::: Action - ctr : ' + this.actionName);
            this.init();
        }
        Core.prototype.init = function () {
            this.classes.push(new Home());
            this.classes.push(new Slider());
        };
        Core.prototype.clear = function () {
            console.warn(':::: Action : ' + this.actionName + ' - clearing all events');
            for (var c in this.classes)
                this.classes[c].clear();
        };
        Core.prototype.loaded = function () {
            console.warn(':::: Action : ' + this.actionName + ' - is loaded!');
        };
        Core.prototype.getClassName = function () {
            return this.actionName;
        };
        return Core;
    }());
    HomeIndex.Core = Core;
    var Slider = (function () {
        function Slider() {
            // Durations
            this.durations = {
                auto: 4500,
                slide: 1300
            };
            // DOM
            this.dom = {
                body: null,
                wrapper: null,
                container: null,
                project: null,
                description: null,
                current: null,
                next: null,
                bullet: null,
                knob: null,
                arrow: null
            };
            // Misc stuff
            this.paused = false;
            this.length = 0;
            this.current = 0;
            this.next = 0;
            this.isAuto = true;
            this.isPrehome = false;
            this.working = false;
            this.dom.body = $('body');
            this.dom.wrapper = $('.main-wrapper');
            this.dom.container = this.dom.wrapper.find('.projects-slider');
            this.dom.project = this.dom.container.find('.project');
            this.dom.description = this.dom.project.find('.description');
            this.dom.bullet = this.dom.container.find('.bullet');
            this.dom.arrow = this.dom.container.find('.arrow');
            this.length = this.dom.project.length;
            if (this.dom.body.find('.prehome').length > 0) {
                this.isPrehome = true;
                this.getSliderIndex();
            }
            this.init();
            this.events();
        }
        Slider.prototype.runAuto = function () {
            this.paused = false;
            this.auto = setInterval(function () {
                if (!this.paused)
                    this.updateNext();
            }.bind(this), this.durations.auto);
        };
        Slider.prototype.getSliderIndex = function () {
            this.current = parseInt(this.dom.wrapper.attr('data-slider-index'));
        };
        /**
         * Set initial z-indexes & get current project
         */
        Slider.prototype.init = function () {
            $(this.dom.project[this.current]).addClass('first');
            this.setIndex(this.dom.project, 10);
            this.dom.current = $(this.dom.project[this.current]);
            this.dom.next = $(this.dom.project[this.current + 1]);
            this.setIndex(this.dom.current, 30);
            this.setIndex(this.dom.next, 20);
            this.dom.knob = this.dom.bullet.find('.knob');
            this.dom.knob.css('animation-duration', this.durations.auto + 'ms');
            if (!this.isPrehome) {
                this.runAuto();
                $(this.dom.bullet[this.current]).addClass('current');
            }
        };
        /**
         * Initialize events
         */
        Slider.prototype.events = function () {
            var self = this;
            //this.dom.wrapper.on('intro-end', this.runAuto.bind(this));
            if (this.isPrehome) {
                this.dom.wrapper.on('intro-end', function () {
                    this.runAuto();
                    $(this.dom.bullet[this.current]).addClass('current');
                }.bind(this));
            }
            this.dom.arrow.on('click', function () {
                if (self.working)
                    return;
                self.processBtn($(this));
            });
            this.dom.container.swipeLeft(function () {
                if (self.working)
                    return;
                if (this.isAuto) {
                    this.isAuto = false;
                    clearInterval(this.auto);
                }
                this.updateNext();
            }.bind(this));
            this.dom.container.swipeRight(function () {
                if (self.working)
                    return;
                if (this.isAuto) {
                    this.isAuto = false;
                    clearInterval(this.auto);
                }
                this.updatePrevious();
            }.bind(this));
            this.dom.description.on('click', function () {
                $(self.dom.project[self.current]).removeClass('first');
                $(self.dom.project[self.current]).addClass('next');
                for (var i = 0; i < self.dom.project.length; i++) {
                    if (i != self.current)
                        $(self.dom.project[i]).css('display', 'none');
                }
                var middle = $(self.dom.project[self.current]).find('.middle');
                var top = $(self.dom.project[self.current]).find('.top');
                var bottom = $(self.dom.project[self.current]).find('.bottom');
                $(self.dom.project[self.current]).css({
                    'background': 'white'
                });
                top.addClass('close-all');
                bottom.addClass('close-all');
                middle.addClass('open-all');
            });
            this.dom.description.on('mouseenter', function () {
                self.paused = true;
                $(self.dom.project[self.current]).addClass('pause');
                $(self.dom.bullet[self.current]).addClass('pause');
            });
            this.dom.description.on('mouseleave', function () {
                self.paused = false;
                self.dom.project.removeClass('pause');
                self.dom.bullet.removeClass('pause');
            });
            this.dom.bullet.on('click', function () {
                var index = self.dom.bullet.index($(this));
                if (self.working)
                    return;
                if (self.isAuto) {
                    self.isAuto = false;
                    clearInterval(self.auto);
                }
                self.next = index;
                self.process();
            });
        };
        /**
         * Update index of specified Zepto element
         * @param item
         * @param index
         */
        Slider.prototype.setIndex = function (item, index) {
            item.css({
                '-webkit-transform': 'translate3d(0,0,' + (index / 10) + 'px)',
                'transform': 'translate3d(0,0,' + (index / 10) + 'px)',
                'z-index': index
            });
        };
        Slider.prototype.processBtn = function (btn) {
            if (this.isAuto) {
                this.isAuto = false;
                clearInterval(this.auto);
            }
            if (btn.hasClass('next'))
                this.updateNext();
            if (btn.hasClass('previous'))
                this.updatePrevious();
        };
        /**
         * Update next global index
         */
        Slider.prototype.updateNext = function () {
            this.next = (this.current + 1) % this.length;
            this.process();
        };
        /**
         * Update next global index
         */
        Slider.prototype.updatePrevious = function () {
            this.next--;
            if (this.next < 0)
                this.next = this.length - 1;
            this.process();
        };
        /**
         * Process, calculate and switch beetween slides
         */
        Slider.prototype.process = function () {
            var self = this;
            this.working = true;
            this.dom.next = $(this.dom.project[this.next]);
            this.setIndex(this.dom.current, 30);
            this.setIndex(this.dom.next, 20);
            // Hide current
            this.dom.current.addClass('hide');
            this.dom.current.removeClass('next first');
            this.updateBullet();
            setTimeout(function () {
                self.setIndex(self.dom.current, 10);
                self.setIndex(self.dom.next, 30);
                self.dom.current.removeClass('hide');
                self.dom.current = self.dom.next;
                self.current = self.next;
                self.dom.next.addClass('next');
                self.working = false;
            }, this.durations.slide);
        };
        /**
         * Update bullets & set knob ease
         */
        Slider.prototype.updateBullet = function () {
            $(this.dom.knob[this.current]).css('transition-duration', '0ms');
            $(this.dom.bullet[this.current]).removeClass('current');
            $(this.dom.knob[this.next]).css({
                'transition-duration': (!this.isAuto) ? this.durations.slide + 'ms' : this.durations.auto + 'ms',
                '-webkit-transition-duration': (!this.isAuto) ? this.durations.slide + 'ms' : this.durations.auto + 'ms'
            });
            $(this.dom.bullet[this.next]).addClass('current');
        };
        Slider.prototype.clear = function () {
            this.dom.arrow.off('click');
            if (this.isAuto)
                clearInterval(this.auto);
        };
        return Slider;
    }());
    HomeIndex.Slider = Slider;
    var Home = (function () {
        function Home() {
            this.duration = {
                animation: 1200,
                remove: 1800
            };
            this.body = $('body');
            this.prehome = this.body.find('.prehome');
            this.wrapper = this.body.find('.main-wrapper');
            this.picture = this.prehome.find('.main-picture .project');
            this.home = this.body.find('.home-index');
            this.menu = this.body.find('.header-container');
            this.footer = this.body.find('.footer');
            this.setSlider();
            this.init();
        }
        Home.prototype.setSlider = function () {
            var index = Math.floor(Math.random() * this.picture.length) + 0;
            this.picture.css('display', 'none');
            $(this.picture[index]).css('display', 'block');
            this.wrapper.attr('data-slider-index', index);
        };
        Home.prototype.init = function () {
            this.menu.addClass('normal white-menu');
            this.footer.addClass('normal');
            this.wrapper.addClass('show-anim');
            // Check if Prehome Exist
            if (this.prehome.length > 0) {
                this.body.find('.menu-white-bar').addClass('intro');
                setTimeout(function () {
                    this.body.find('.menu-white-bar').removeClass('intro');
                }.bind(this), 8000);
                this.body.on('prehome-hide', function () {
                    this.home.addClass('animated');
                }.bind(this));
            }
            else {
                this.home.addClass('animated fast');
            }
            setTimeout(function (e) {
                this.home.removeClass('fast');
            }.bind(this), 1000);
        };
        Home.prototype.clear = function () {
        };
        return Home;
    }());
    HomeIndex.Home = Home;
})(HomeIndex || (HomeIndex = {}));
var HomeLegalMentions;
(function (HomeLegalMentions) {
    var Core = (function () {
        function Core() {
            this.actionName = 'HomeLegaMentions';
            this.classes = [];
            console.info(':::: Action - ctr : ' + this.actionName);
            this.init();
        }
        Core.prototype.init = function () {
            console.warn(':::: Action : ' + this.actionName + ' - init');
        };
        Core.prototype.clear = function () {
            console.warn(':::: Action : ' + this.actionName + ' - clearing all events');
            for (var c in this.classes)
                this.classes[c].clear();
        };
        Core.prototype.loaded = function () {
            console.warn(':::: Action : ' + this.actionName + ' - is loaded!');
        };
        Core.prototype.getClassName = function () {
            return this.actionName;
        };
        return Core;
    }());
    HomeLegalMentions.Core = Core;
})(HomeLegalMentions || (HomeLegalMentions = {}));
var PressArticle;
(function (PressArticle) {
    var Core = (function () {
        function Core() {
            this.actionName = 'PressArticle';
            this.classes = [];
            console.info(':::: Action - ctr : ' + this.actionName);
            this.init();
        }
        Core.prototype.init = function () {
            console.warn(':::: Action : ' + this.actionName + ' - init');
        };
        Core.prototype.clear = function () {
            console.warn(':::: Action : ' + this.actionName + ' - clearing all events');
            for (var c in this.classes)
                this.classes[c].clear();
        };
        Core.prototype.loaded = function () {
            this.classes.push(new Slider());
            console.warn(':::: Action : ' + this.actionName + ' - is loaded!');
        };
        Core.prototype.getClassName = function () {
            return this.actionName;
        };
        return Core;
    }());
    PressArticle.Core = Core;
    var Slider = (function () {
        function Slider() {
            this.scaleImg = 1.01;
            this.durations = {
                null: 0,
                slide: 0.6,
                zoom: 0.8,
                closeZoom: 0.5,
                video: 0.4
            };
            this.current = 0;
            this.isZoomed = false;
            this.windows = $(window);
            this.wrapper = $('.main-wrapper');
            this.wrapperPress = this.wrapper.find('.wrapper-press');
            this.contentPress = this.wrapper.find('.content');
            this.slider = this.contentPress.find('.wrapper-pict');
            this.slides = this.slider.find('.page');
            this.pressImg = this.slides.find('.press-img');
            this.img = this.slides.find('img');
            this.bullets = this.contentPress.find('.bullets');
            this.bullet = this.bullets.find('.bullet');
            this.arrows = this.bullets.find('.arrow');
            this.singleArticle = this.contentPress.find('.wrapper-single-article');
            this.zoomImg = this.singleArticle.find('.zoom-img');
            this.initVars();
            this.initEvents();
        }
        Slider.prototype.initVars = function () {
            var margins = (2 * (this.slides.css('margin-left').slice(0, 2)));
            this.wSlide = (this.slides.width() + margins);
            this.nbSlides = this.slides.length;
            this.wSlider = (this.nbSlides * this.wSlide);
            this.origin = this.slider.position().left;
            this.slider.css('width', this.wSlider);
            if ($(this.slider).hasClass('video'))
                this.slider.css('height', (this.wSlider / (16 / 9)));
            this.setPositionElement();
        };
        Slider.prototype.setPositionElement = function () {
            this.toggleSlide(this.current, this.durations.slide);
            if (!this.isZoomed) {
                var offsetContent = this.contentPress.offset().top;
                //var offsetPress:number = this.slides.offset().top;
                var offsetPress = this.slides.offset().top - (((this.slides.width() * this.scaleImg) - this.slides.width()) / 2);
                this.zoomImg.width(this.slides.width() * this.scaleImg);
                this.zoomImg.css({ 'top': offsetPress - offsetContent });
            }
        };
        Slider.prototype.updateCursor = function () {
            var self = this;
            this.slides.each(function (index, element) {
                $(element).find('.press-img').removeClass('next prev');
                if ($(element).index() < self.current) {
                    $(element).find('.press-img').addClass('prev');
                }
                else if ($(element).index() > self.current) {
                    $(element).find('.press-img').addClass('next');
                }
                else {
                    $(element).find('.press-img').removeClass('next prev');
                }
            });
        };
        Slider.prototype.initEvents = function () {
            var self = this;
            this.slides.on('click', function (e) {
                var index = $(e.currentTarget).index();
                var type = ($(e.currentTarget).hasClass('video')) ? 'video' : 'image';
                //var index = $(this.img).index($(e.target));
                if (index !== this.current)
                    this.toggleSlide(index, this.durations.slide);
                else
                    this.zoom(type);
            }.bind(this));
            this.windows.resize(function () {
                this.initVars();
            }.bind(this));
            this.arrows.on('click', function (e) {
                var index = self.current;
                if ($(this).hasClass('next')) {
                    if (self.current == self.bullet.length - 1) {
                        index = 0;
                    }
                    else {
                        index++;
                    }
                }
                else {
                    if (self.current == 0) {
                        index = self.bullet.length - 1;
                    }
                    else {
                        index--;
                    }
                }
                self.toggleSlide(index, self.durations.slide);
            });
            this.wrapperPress.swipeLeft(function () {
                var index = self.current;
                if (self.current == self.bullet.length - 1) {
                    index = 0;
                }
                else {
                    index++;
                }
                self.toggleSlide(index, self.durations.slide);
            });
            this.wrapperPress.swipeRight(function () {
                var index = self.current;
                if (self.current == 0) {
                    index = self.bullet.length - 1;
                }
                else {
                    index--;
                }
                self.toggleSlide(index, self.durations.slide);
            });
            this.slides.on('mouseenter', function (e) {
                $(this).addClass('hover');
                self.animSlider();
            });
            this.slides.on('mouseleave', function (e) {
                $(this).removeClass('hover');
                self.pressImg.removeClass('small large');
            });
            this.zoomImg.on('click', this.closeZoom.bind(this));
        };
        Slider.prototype.toggleSlide = function (index, duration) {
            TweenMax.to(this.slider, duration, { left: (this.wrapper.width() / 2) - (this.wSlide * index) - (this.wSlide / 2), ease: Power3.ease, onComplete: function () {
                    this.current = index;
                    this.updateCursor();
                }.bind(this) });
            this.bullet.removeClass('current');
            this.bullet.eq(index).addClass('current');
        };
        Slider.prototype.zoom = function (type) {
            this.isZoomed = true;
            if (type === 'image') {
                console.log('type image');
                TweenMax.to(this.singleArticle, 0.5, { display: "block", opacity: 1, ease: Circ.easeOut, onComplete: function () {
                        TweenMax.to(this.zoomImg, this.durations.zoom, { top: 0, width: '60%', ease: Circ.easeOut, onComplete: function () {
                                this.zoomImg.addClass('active');
                            }.bind(this) });
                        this.wrapperPress.addClass('cache');
                    }.bind(this) });
            }
        };
        Slider.prototype.closeZoom = function () {
            this.isZoomed = false;
            this.singleArticle.scrollTop(0);
            var offsetContent = this.contentPress.offset().top;
            var offsetPress = this.slides.offset().top;
            this.wrapperPress.removeClass('cache');
            TweenMax.to(this.zoomImg, this.durations.closeZoom, { top: offsetPress - offsetContent, width: this.slides.width(), ease: Power3.ease, onComplete: function () {
                    TweenMax.to(this.singleArticle, 0.5, { opacity: 0, display: "none", ease: Power3.ease, onComplete: function () {
                            this.zoomImg.attr('src', '');
                            this.zoomImg.removeClass('active');
                            this.initVars();
                        }.bind(this) });
                }.bind(this) });
        };
        Slider.prototype.animSlider = function () {
            var self = this;
            this.pressImg.removeClass('small large');
            this.slides.each(function (index, element) {
                if ($(element).hasClass('hover') && $(element).hasClass('picture')) {
                    $(element).find('.press-img').addClass('large');
                    var uploadImg = $(element).find('img').attr('src');
                    self.zoomImg.attr('src', uploadImg);
                }
                else {
                    $(element).find('.press-img').addClass('small');
                }
            });
        };
        Slider.prototype.clear = function () {
            this.slides.off('click');
            this.arrows.off('click');
            this.windows.off("resize");
            this.slides.off('mouseenter');
            this.slides.off('mouseleave');
            this.zoomImg.off('click');
        };
        return Slider;
    }());
    PressArticle.Slider = Slider;
})(PressArticle || (PressArticle = {}));
var PressIndex;
(function (PressIndex) {
    var Core = (function () {
        function Core() {
            this.actionName = 'PressIndex';
            this.container = null;
            this.target = null;
            this.country = null;
            this.agency = null;
            this.project = null;
            this.filters = null;
            this.containerScroll = null;
            this.isiPad = false;
            this.latestKnownScrollY = 0;
            this.ticking = false;
            this.nbrItemL = 0;
            // Instances
            this.sortableFilters = [];
            console.info(':::: Action - ctr : ' + this.actionName);
            this.windows = $(window);
            this.body = $('body');
            this.filters = this.body.find('.filter-source');
            this.container = this.body.find('.list-item-filter');
            this.country = this.body.find('.filter-source.country');
            this.agency = this.body.find('.filter-source.agency');
            this.project = this.body.find('.filter-source.project');
            this.target = this.body.find('.filter-target');
            this.containerScroll = this.body.find('.container-scroll');
            this.latestKnownScrollY = 0;
            this.ticking = false;
            this.isiPad = navigator.userAgent.match(/iPad/i) != null;
            this.init();
            this.initEvents(this.isiPad);
            this.Scroll = new Scroll();
            //requestAnimationFrame(this.update.bind(this));
        }
        Core.prototype.init = function () {
            console.warn(':::: Action : ' + this.actionName + ' - init');
            this.sortableFilters.push(new SortableFilter({
                'axis': 'y',
                'move': 75,
                'duration': 0.25,
                'delay': 0.005,
                'default_sorting': null,
                'source': {
                    'items': this.country,
                    'data': 'country-id'
                },
                'target': {
                    'items': this.target,
                    'container': this.container,
                    'detachContainer': this.container,
                    'triggerSorted': null
                }
            }));
            this.sortableFilters.push(new SortableFilter({
                'axis': 'y',
                'move': 75,
                'duration': 0.25,
                'delay': 0.005,
                'default_sorting': null,
                'source': {
                    'items': this.agency,
                    'data': 'agency'
                },
                'target': {
                    'items': this.target,
                    'container': this.container,
                    'detachContainer': this.container,
                    'triggerSorted': null
                }
            }));
            this.sortableFilters.push(new SortableFilter({
                'axis': 'y',
                'move': 75,
                'duration': 0.25,
                'delay': 0.005,
                'default_sorting': null,
                'source': {
                    'items': this.project,
                    'data': 'project-id'
                },
                'target': {
                    'items': this.target,
                    'container': this.container,
                    'detachContainer': this.container,
                    'triggerSorted': null
                }
            }));
            this.calculLines();
        };
        Core.prototype.calculLines = function () {
            this.removeClass();
            var targetSize = 250;
            var containerSize = this.container.width();
            var num = Math.floor(containerSize / targetSize);
            if (num % 2) {
                if (num == 5) {
                    this.container.find('.item:nth-child(5n+2), .item:nth-child(5n+4)').addClass('slow');
                }
                if (num == 3) {
                    this.container.find('.item:nth-child(3n +2)').addClass('slow');
                }
            }
            else {
                this.container.find('.item:nth-child(even)').addClass('slow');
            }
        };
        Core.prototype.removeClass = function () {
            $(this.container).find('.slow').css({
                'transform': 'translate3d(0, 0, 0)',
                '-webkit-transform': 'translate3d(0, 0, 0)',
                '-moz-transform': 'translate3d(0, 0, 0)',
                '-ms-transform': 'translate3d(0, 0, 0)',
                '-o-transform': 'translate3d(0, 0, 0)'
            });
            this.container.find('.item').removeClass('slow');
        };
        Core.prototype.initEvents = function (ipad) {
            this.isiPad = ipad;
            this.windows.resize(function () {
                this.calculLines();
            }.bind(this));
            this.filters.on('click', function () {
                $(this.container).find('.item').css({
                    'transition': 'initial',
                    '-webkit-transition': 'initial',
                    '-moz-transition': 'initial',
                    '-ms-transition': 'initial',
                    '-o-transition': 'initial',
                    'transition-delay': 'initial',
                    '-webkit-transition-delay': 'initial',
                    '-moz-transition-delay': 'initial',
                    '-ms-transition-delay': 'initial',
                    '-o-transition-delay': 'initial'
                });
                setTimeout(function () {
                    this.calculLines();
                }.bind(this), 1000);
            }.bind(this));
            if (!this.isiPad) {
                this.containerScroll.on('mousewheel DOMMouseScroll', function () {
                    //this.animItem();
                    this.latestKnownScrollY = this.containerScroll.scrollTop();
                    this.requestTick();
                }.bind(this));
            }
        };
        Core.prototype.requestTick = function () {
            if (!this.ticking) {
                //requestAnimationFrame(this.update.bind(this));
                var scroll = window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    window.oRequestAnimationFrame;
                scroll(this.update.bind(this));
            }
            this.ticking = true;
        };
        Core.prototype.update = function () {
            this.ticking = false;
            var currentScrollY = this.latestKnownScrollY;
            var top = 1 + (currentScrollY / 40);
            $(this.container).find('.slow').css({
                'transform': 'translate3d(0, -' + top + 'px, 0)',
                '-webkit-transform': 'translate3d(0, -' + top + 'px, 0)',
                '-moz-transform': 'translate3d(0, -' + top + 'px, 0)',
                '-ms-transform': 'translate3d(0, -' + top + 'px, 0)',
                '-o-transform': 'translate3d(0, -' + top + 'px, 0)',
                'transition': 'transform 0s linear',
                '-webkit-transition': 'transform 0s linear',
                '-moz-transition': 'transform 0s linear',
                '-ms-transition': 'transform 0s linear',
                '-o-transition': 'transform 0s linear',
                'transition-delay': '0.s',
                '-webkit-transition-delay': '0.s',
                '-moz-transition-delay': '0.s',
                '-ms-transition-delay': '0.s',
                '-o-transition-delay': '0.s'
            });
        };
        Core.prototype.clear = function () {
            console.warn(':::: Action : ' + this.actionName + ' - clearing all events');
            for (var i = 0; i < this.sortableFilters.length; i++)
                this.sortableFilters[i].clear();
        };
        Core.prototype.loaded = function () {
            console.warn(':::: Action : ' + this.actionName + ' - is loaded!');
        };
        Core.prototype.getClassName = function () {
            return this.actionName;
        };
        return Core;
    }());
    PressIndex.Core = Core;
})(PressIndex || (PressIndex = {}));
var ProjectIndex;
(function (ProjectIndex) {
    var Core = (function () {
        function Core() {
            this.actionName = 'ProjectIndex';
            this.classes = [];
            this.body = $('body');
            this.scroll = this.body.find('.scroll-move');
            this.isiPad = navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/Android/i) != null;
            //this.init();
            if (!this.isiPad) {
                this.Scroll = new Scroll();
            }
            //this.ScrollProject = new ScrollProject();
            this.init(this.isiPad);
        }
        Core.prototype.init = function (ipad) {
            this.isiPad = ipad;
            this.classes.push(new ProjectSlider());
            // this.classes.push(new ScrollProject());
            if (!this.isiPad) {
                this.classes.push(new ScrollProject());
            }
            else {
                setTimeout(function () {
                    this.ipad();
                }.bind(this), 2.45);
            }
        };
        Core.prototype.ipad = function () {
            this.scroll.each(function (index, element) {
                $(element).height($(element).find('img').height());
                $(element).find('.img-container').addClass('no-pseudo');
                $('.to-animate').addClass('no-pseudo no-animation');
            });
        };
        Core.prototype.clear = function () {
            console.warn(':::: Action : ' + this.actionName + ' - clearing all events');
            for (var c in this.classes)
                this.classes[c].clear();
        };
        Core.prototype.loaded = function () {
            console.warn(':::: Action : ' + this.actionName + ' - is loaded!');
            // this.classes[1].updateSizeBlockAfterLoad();
        };
        Core.prototype.getClassName = function () {
            return this.actionName;
        };
        return Core;
    }());
    ProjectIndex.Core = Core;
    var ProjectSlider = (function () {
        function ProjectSlider() {
            this.state = false;
            this.durations = {
                popin: 0.6,
                header: 0.5,
                picture: 0.25,
                slider: 0.4
            };
            this.move = 40;
            this.length = null;
            this.current = null;
            this.next = 0;
            this.initPosImg = '-50%';
            this.header = $('.header');
            this.wrapper = $('.main-wrapper');
            this.clicables = this.wrapper.find('.project-picture-open-popin');
            this.popin = this.wrapper.find('.slider-popin');
            this.mainContainer = this.popin.find('.pictures-container');
            this.btnClose = this.popin.find('.btn-close');
            this.close = this.popin.find('.btn-close, .background');
            this.container = this.mainContainer.find('.pictures');
            this.pictures = this.container.find('.picture-container');
            this.picture = this.container.find('.picture-container img');
            this.bullet = this.popin.find('.bullet');
            this.arrows = this.popin.find('.arrow');
            this.length = this.pictures.length;
            this.events();
        }
        ProjectSlider.prototype.events = function () {
            var self = this;
            this.clicables.on('click', function () {
                var index = self.clicables.index(this);
                if (!self.state) {
                    self.prepare(index + 1);
                    self.openPopin();
                    self.next = index + 1;
                    self.state = true;
                }
            });
            this.close.on('click', function (e) {
                self.closePopin();
                self.state = false;
            });
            this.bullet.on('click', function (e) {
                //console.log($(this).index());
                //console.log($(e.currentTarget).index());
                var index = $(e.currentTarget).index() - 1;
                this.process(index, false);
            }.bind(this));
            this.arrows.on('click', function () {
                self.run($(this));
            });
            this.mainContainer.swipeLeft(function () {
                this.updateNext();
            }.bind(this));
            this.mainContainer.swipeRight(function () {
                this.updatePrevious();
            }.bind(this));
            //$(window).on('resize', function(){
            //    self.setHeight();
            //});
            $(window).on('resize', function () {
                this.setHeight();
            }.bind(this));
        };
        ProjectSlider.prototype.clear = function () {
            this.clicables.off('click');
            this.close.off('click');
            this.arrows.off('click');
            $(window).off('resize');
        };
        ProjectSlider.prototype.run = function (arrow) {
            if (arrow.hasClass('next'))
                this.updateNext();
            if (arrow.hasClass('previous'))
                this.updatePrevious();
        };
        /**
         * Update next global index
         */
        ProjectSlider.prototype.updateNext = function () {
            this.next = (this.current + 1) % this.length;
            this.process('next', true);
        };
        /**
         * Update next global index
         */
        ProjectSlider.prototype.updatePrevious = function () {
            this.next--;
            if (this.next < 0)
                this.next = this.length - 1;
            this.process('previous', true);
        };
        ProjectSlider.prototype.process = function (way, clickArrow) {
            var current = $(this.pictures[this.current]);
            if (clickArrow) {
                var x1 = (way == 'next') ? '-=' + this.move + 'px' : '+=' + this.move + 'px';
                var x2 = (way == 'next') ? '+=' + this.move + 'px' : '-=' + this.move + 'px';
            }
            else {
                this.next = way;
                var x1 = (way > this.current) ? '-=' + this.move + 'px' : '+=' + this.move + 'px';
                var x2 = (way > this.current) ? '+=' + this.move + 'px' : '-=' + this.move + 'px';
            }
            var next = $(this.pictures[this.next]);
            TweenLite.to(next, 0, { 'autoAlpha': 0, 'x': x1 });
            TweenLite.to(next, this.durations.slider, { 'autoAlpha': 1, 'x': this.initPosImg });
            this.current = this.next;
            this.setBullet();
            TweenLite.to(current, this.durations.slider, { 'autoAlpha': 0, 'x': x2, 'onComplete': function () {
                    TweenLite.to(current, 0, { 'x': '0' });
                    //this.current = this.next;
                    //this.setBullet();
                }.bind(this) });
        };
        ProjectSlider.prototype.prepare = function (index) {
            this.current = index;
            var pic = $(this.pictures[this.current]);
            TweenLite.to(this.pictures, 0, { 'x': this.initPosImg });
            pic.css({
                'visibility': 'visible',
                'opacity': '1'
            });
            this.setBullet();
        };
        ProjectSlider.prototype.setBullet = function () {
            this.bullet.removeClass('active');
            $(this.bullet[this.current]).addClass('active');
        };
        ProjectSlider.prototype.openPopin = function () {
            this.popin.css('display', 'block');
            this.popin.css('top', this.wrapper.scrollTop() + 'px');
            this.setHeight();
            this.wrapper.addClass('no-scroll');
            TweenLite.to(this.header, this.durations.header, { 'autoAlpha': 0 });
            TweenLite.to(this.popin, this.durations.popin, { 'autoAlpha': 1, 'onComplete': function () {
                    this.popin.addClass('opened');
                }.bind(this) });
        };
        ProjectSlider.prototype.setHeight = function () {
            var pic = $(this.picture[this.current]);
            this.container.css('height', pic.height() + 'px');
            var top = this.mainContainer.offset().top;
            this.btnClose.css('top', (top + 140 + 'px'));
        };
        ProjectSlider.prototype.closePopin = function () {
            this.wrapper.removeClass('no-scroll');
            this.popin.removeClass('opened');
            TweenLite.to(this.popin, this.durations.popin, { 'autoAlpha': 0, 'onComplete': function () {
                    TweenLite.to(this.header, this.durations.header, { 'autoAlpha': 1 });
                    this.popin.css('display', 'none');
                    this.pictures.css({
                        'visibility': 'hidden',
                        'opacity': '0'
                    });
                }.bind(this) });
        };
        return ProjectSlider;
    }());
    ProjectIndex.ProjectSlider = ProjectSlider;
    var ScrollProject = (function () {
        function ScrollProject() {
            this.body = $('body');
            this.window = $(window);
            this.mainWrapper = this.body.find('.main-wrapper');
            this.scroll = this.mainWrapper.find('.scroll-move');
            this.init();
        }
        ScrollProject.prototype.init = function () {
            var self = this;
            this.mainWrapper.on('mousewheel DOMMouseScroll', function (e) {
                self.slideElement();
            });
            // avoid height 0 on img which didn't load yet
            setTimeout(function () {
                this.updateSizeBlock();
            }.bind(this), 1.5);
            // firefox hack
            setTimeout(function () {
                this.updateSizeBlock();
            }.bind(this), 2500);
            $(window).on('resize', function () {
                this.updateSizeBlock();
            }.bind(this));
        };
        ScrollProject.prototype.updateSizeBlock = function () {
            this.scroll.each(function (index, element) {
                $(element).height(((100 * $(element).find('img').height()) / 120) + 150);
            });
            this.slideElement();
        };
        ScrollProject.prototype.updateSizeBlockAfterLoad = function () {
            // this.scroll.each(function(index,element){
            //     $(element).height((100*$(element).find('img').height())/120);
            // });
            // this.setPositionImg();
            this.updateSizeBlock();
        };
        ScrollProject.prototype.slideElement = function () {
            var pos = $(this.mainWrapper).scrollTop();
            for (var i = 1; i < this.scroll.length; ++i) {
                var objectOffset = $(this.scroll[i]).offset().top;
                var bottomWindow = $(window).scrollTop() + $(window).height();
                var objectEndOffset = $(this.scroll[i]).offset().top + $(this.scroll[i]).height();
                //if (objectOffset <= bottomWindow && objectEndOffset > $(window).scrollTop() ){
                var heightImg = $(this.scroll[i]).find('.img-container img').height();
                var halfHeightImg = heightImg / 2;
                var coefDeplacement = 40;
                var extensionImg = 120;
                var heightCadreImg = (heightImg * 100) / extensionImg;
                var top = ((pos - objectOffset) / coefDeplacement) - halfHeightImg;
                var limitMin = -1 * (halfHeightImg + ((heightImg - heightCadreImg) / 2));
                var limitMax = -1 * (halfHeightImg - ((heightImg - heightCadreImg) / 2));
                if (top < limitMin) {
                    top = limitMin;
                }
                else if (top > limitMax) {
                    top = limitMax;
                }
                $(this.scroll[i]).find('.img-container img').css({
                    'transform': 'translate3d(-50%,' + top + 'px,0)',
                    '-webkit-transform': 'translate3d(-50%,' + top + 'px,0)',
                    '-moz-transform': 'translate3d(-50%,' + top + 'px,0)',
                    '-ms-transform': 'translate3d(-50%,' + top + 'px,0)',
                    '-o-transform': 'translate3d(-50%,' + top + 'px,0)',
                    'transition': 'none',
                    '-webkit-transition': 'none',
                    '-moz-transition': 'none',
                    '-ms-transition': 'none',
                    '-o-transition': 'none'
                });
            }
        };
        // private setPositionImg():void {
        //     var pos = $(this.mainWrapper).scrollTop();
        //     for (var i = 0; i < this.scroll.length; ++i) {
        //         var objectOffset = $(this.scroll[i]).offset().top;
        //         var heightImg:number = $(this.scroll[i]).find('.img-container img').height();
        //         var halfHeightImg:number = heightImg/2;
        //         var coefDeplacement:number = 40;
        //         var extensionImg:number = 120;
        //         var heightCadreImg:number = (heightImg * 100) / extensionImg;
        //         var top = ( (pos-objectOffset) / coefDeplacement) - halfHeightImg;
        //         var limitMin:number = -1* (halfHeightImg + ( (heightImg-heightCadreImg) /2 ));
        //         var limitMax:number = -1* (halfHeightImg - ( (heightImg-heightCadreImg) /2 ));
        //         if(top < limitMin) {
        //             top = limitMin;
        //         }else if(top > limitMax){
        //             top = limitMax;
        //         }
        //         $(this.scroll[i]).find('.img-container img').css({
        //             'transform': 'translate3d(-50%,' + top+ 'px,0)',
        //             '-webkit-transform': 'translate3d(-50%,' + top+ 'px,0)',
        //             '-moz-transform': 'translate3d(-50%,' + top+ 'px,0)',
        //             '-ms-transform': 'translate3d(-50%,' + top+ 'px,0)',
        //             '-o-transform': 'translate3d(-50%,' + top+ 'px,0)',
        //             'transition': '0.8s linear transform',
        //             '-webkit-transition': '0.8s linear transform',
        //             '-moz-transition': '0.8s linear transform',
        //             '-ms-transition': '0.8s linear transform',
        //             '-o-transition': '0.8s linear transform'
        //         });
        //     }
        // }
        ScrollProject.prototype.clear = function () {
            this.mainWrapper.off('mousewheel DOMMouseScroll');
            $(window).off('resize');
        };
        return ScrollProject;
    }());
    ProjectIndex.ScrollProject = ScrollProject;
})(ProjectIndex || (ProjectIndex = {}));
var StudioChronology;
(function (StudioChronology) {
    var Core = (function () {
        function Core() {
            this.actionName = 'StudioChronology';
            this.container = null;
            this.target = null;
            this.category = null;
            this.year = null;
            // Instances
            this.sortableFilters = [];
            this.body = $('body');
            this.container = this.body.find('.list-item-filter');
            this.category = this.body.find('.filter-source.category');
            this.year = this.body.find('.filter-source.year');
            this.target = this.body.find('.filter-target');
            this.init();
            this.Scroll = new Scroll();
        }
        Core.prototype.init = function () {
            console.warn(':::: Action : ' + this.actionName + ' - init');
            this.sortableFilters.push(new SortableFilter({
                'axis': 'y',
                'move': 75,
                'duration': 0.25,
                'delay': 0.005,
                'default_sorting': null,
                'source': {
                    'items': this.category,
                    'data': 'category-id'
                },
                'target': {
                    'items': this.target,
                    'container': this.container,
                    'detachContainer': this.container,
                    'triggerSorted': null
                }
            }));
            this.sortableFilters.push(new SortableFilter({
                'axis': 'y',
                'move': 75,
                'duration': 0.25,
                'delay': 0.005,
                'default_sorting': null,
                'source': {
                    'items': this.year,
                    'data': 'category-year'
                },
                'target': {
                    'items': this.target,
                    'container': this.container,
                    'detachContainer': this.container,
                    'triggerSorted': null
                }
            }));
        };
        Core.prototype.clear = function () {
            console.warn(':::: Action : ' + this.actionName + ' - clearing all events');
            for (var i = 0; i < this.sortableFilters.length; i++)
                this.sortableFilters[i].clear();
        };
        Core.prototype.loaded = function () {
            console.warn(':::: Action : ' + this.actionName + ' - is loaded!');
            this.Scroll.startAnimElement();
        };
        Core.prototype.getClassName = function () {
            return this.actionName;
        };
        return Core;
    }());
    StudioChronology.Core = Core;
})(StudioChronology || (StudioChronology = {}));
var StudioContact;
(function (StudioContact) {
    var Core = (function () {
        function Core() {
            this.actionName = 'StudioContact';
            this.classes = [];
            console.info(':::: Action - ctr : ' + this.actionName);
            this.init();
        }
        Core.prototype.init = function () {
            console.warn(':::: Action : ' + this.actionName + ' - init');
            this.classes.push(new Form());
        };
        Core.prototype.clear = function () {
            console.warn(':::: Action : ' + this.actionName + ' - clearing all events');
            for (var c in this.classes)
                this.classes[c].clear();
        };
        Core.prototype.loaded = function () {
            console.warn(':::: Action : ' + this.actionName + ' - is loaded!');
        };
        Core.prototype.getClassName = function () {
            return this.actionName;
        };
        return Core;
    }());
    StudioContact.Core = Core;
    var Form = (function () {
        function Form() {
            this.contact = {
                id: null,
                lastname: null,
                firstname: null,
                object: null,
                message: null
            };
            this.body = $('body');
            this.inputSelect = this.body.find('.select-object');
            this.labelSelect = this.inputSelect.find('.label');
            this.listChoiceSelect = this.inputSelect.find('ul');
            this.choiceSelect = this.listChoiceSelect.find('li');
            this.submitForm = this.body.find('.valid-form');
            this.inputFom = this.body.find('.input, .textarea');
            this.inputValid = this.body.find('.input-valid');
            this.confirmSend = this.body.find('.mail-send');
            this.events();
        }
        /**
         * Initialize contact events
         */
        Form.prototype.events = function () {
            var self = this;
            this.labelSelect.on('click', function (e) {
                e.preventDefault();
                //self.listChoiceSelect.toggle();
                self.listChoiceSelect.toggleClass('active');
            });
            this.choiceSelect.on('click', function (e) {
                e.preventDefault();
                self.labelSelect.data('value', $(this).data('value'));
                self.labelSelect.empty().html($(this).data('text'));
                //self.listChoiceSelect.hide();
                self.listChoiceSelect.toggleClass('active');
            });
            this.submitForm.on('click', function (e) {
                e.preventDefault();
                self.validForm();
            });
            this.inputFom.on('focus', function (e) {
                $(this).parent().addClass('active');
            });
            this.inputFom.on('blur', function (e) {
                $(this).parent().removeClass('active');
            });
        };
        Form.prototype.validForm = function () {
            var errorForm = false;
            this.inputFom.each(function () {
                if (!$(this).val() && !$(this).hasClass('optional')) {
                    $(this).addClass('error');
                    errorForm = true;
                }
                else {
                    $(this).removeClass('error');
                }
            });
            if (this.labelSelect.data('value') == '') {
                this.inputSelect.addClass('error');
                errorForm = true;
            }
            else {
                this.inputSelect.removeClass('error');
            }
            if (errorForm) {
                return false;
            }
            else {
                // Envoi
                this.contact.lastname = $('input.lastname').val();
                this.contact.firstname = $('input.firstname').val();
                this.contact.object = this.labelSelect.data('value').toUpperCase();
                this.contact.message = $('textarea.message').val();
                this.set();
            }
        };
        Form.prototype.set = function () {
            var self = this;
            API.Request({
                'action': 'set',
                'data': {
                    'user_name': this.contact.lastname,
                    'user_firstname': this.contact.firstname,
                    'user_object': this.contact.object,
                    'user_message': this.contact.message
                },
                'callback': function (xhr) {
                    if (!xhr.error) {
                        TweenMax.to($('.form'), 0.5, { opacity: 0, display: 'none', ease: Power3.easeInOut, onComplete: function () {
                                TweenMax.to(self.confirmSend, 0.5, { opacity: 1, display: 'block', ease: Power3.easeInOut });
                            } });
                    }
                }
            });
        };
        Form.prototype.clear = function () {
            this.labelSelect.off('click');
            this.choiceSelect.off('click');
            this.submitForm.off('click');
        };
        return Form;
    }());
    StudioContact.Form = Form;
})(StudioContact || (StudioContact = {}));
var StudioJPN;
(function (StudioJPN) {
    var Core = (function () {
        function Core() {
            this.actionName = 'StudioJPN';
            console.info(':::: Action - ctr : ' + this.actionName);
            this.body = $('body');
            this.wrapper = this.body.find('.studio-jpn');
            this.Scroll = new Scroll();
            this.init();
        }
        Core.prototype.init = function () {
            console.warn(':::: Action : ' + this.actionName + ' - init');
        };
        Core.prototype.scroll = function () {
        };
        Core.prototype.clear = function () {
            console.warn(':::: Action : ' + this.actionName + ' - clearing all events');
        };
        Core.prototype.loaded = function () {
            console.warn(':::: Action : ' + this.actionName + ' - is loaded!');
        };
        Core.prototype.getClassName = function () {
            return this.actionName;
        };
        return Core;
    }());
    StudioJPN.Core = Core;
})(StudioJPN || (StudioJPN = {}));
var StudioNews;
(function (StudioNews) {
    var Core = (function () {
        function Core() {
            this.actionName = 'StudioNews';
            console.info(':::: Action - ctr : ' + this.actionName);
            this.body = $('body');
        }
        Core.prototype.init = function () {
            console.warn(':::: Action : ' + this.actionName + ' - init');
        };
        Core.prototype.clear = function () {
            console.warn(':::: Action : ' + this.actionName + ' - clearing all events');
        };
        Core.prototype.loaded = function () {
            console.warn(':::: Action : ' + this.actionName + ' - is loaded!');
            this.Scroll = new Scroll();
        };
        Core.prototype.getClassName = function () {
            return this.actionName;
        };
        return Core;
    }());
    StudioNews.Core = Core;
})(StudioNews || (StudioNews = {}));
var StudioTeam;
(function (StudioTeam) {
    var Core = (function () {
        function Core() {
            this.actionName = 'StudioTeam';
            console.info(':::: Action - ctr : ' + this.actionName);
            this.Scroll = new Scroll();
        }
        Core.prototype.init = function () {
            console.warn(':::: Action : ' + this.actionName + ' - init');
        };
        Core.prototype.clear = function () {
            console.warn(':::: Action : ' + this.actionName + ' - clearing all events');
        };
        Core.prototype.loaded = function () {
            console.warn(':::: Action : ' + this.actionName + ' - is loaded!');
        };
        Core.prototype.getClassName = function () {
            return this.actionName;
        };
        return Core;
    }());
    StudioTeam.Core = Core;
})(StudioTeam || (StudioTeam = {}));
/// <reference path="../generics/zepto.d.ts" />
/// <reference path="../generics/gsap.d.ts" />
/**
 * Core App Module
 */
var Core;
(function (Core) {
    var Kernel = (function () {
        function Kernel() {
            this.Prehome = new Prehome();
            this.Menu = new Menu();
            this.Footer = new Footer();
            this.Device = new Device();
            this.Browser = new Browser();
            this.Nav = new Core.Nav();
        }
        return Kernel;
    }());
    Core.Kernel = Kernel;
    var Browser = (function () {
        function Browser() {
            Core.Browser.set();
        }
        Browser.set = function () {
            var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
            if (isOpera)
                Core.Browser.browser = 'opera';
            var isFirefox = typeof InstallTrigger !== 'undefined';
            if (isFirefox)
                Core.Browser.browser = 'firefox';
            var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
            if (isSafari)
                Core.Browser.browser = 'safari';
            var isIE = false || !!document.documentMode;
            if (isIE)
                Core.Browser.browser = 'ie';
            var isEdge = !isIE && !!window.StyleMedia;
            if (isEdge)
                Core.Browser.browser = 'edge';
            var isChrome = !!window.chrome && !!window.chrome.webstore;
            if (isChrome)
                Core.Browser.browser = 'chrome';
        };
        Browser.get = function () {
            return Core.Browser.browser;
        };
        Browser.browser = '_default';
        return Browser;
    }());
    Core.Browser = Browser;
    var Device = (function () {
        function Device() {
            this.body = null;
            this.body = $('body');
            Core.Device._MobileDetect = new MobileDetect(window.navigator.userAgent);
            this.set();
        }
        Device.prototype.isTablet = function () {
            return (Core.Device._MobileDetect.tablet() !== null) ? true : false;
        };
        Device.prototype.set = function () {
            if (Core.Device._MobileDetect.tablet() !== null)
                this.body.addClass('is-tablet');
            else
                this.body.addClass('is-not-tablet');
        };
        return Device;
    }());
    Core.Device = Device;
    /**
    *    Prehome
    */
    var Prehome = (function () {
        function Prehome() {
            this.duration = {
                body: 1
            };
            this.delay = {
                animate: 250,
                end: 2100
            };
            this.state = false;
            console.info(':::: Generic - ctr : Prehome');
            this.body = $('body');
            this.prehome = this.body.find('.prehome');
            this.wrapper = this.body.find('.main-wrapper');
            this.picture = this.prehome.find('.main-picture .project');
            this.home = this.body.find('.home-index');
            this.menu = this.body.find('.menu-container');
            this.footer = this.body.find('.footer');
            this.setSlider();
            this.events();
        }
        Prehome.prototype.events = function () {
            $(window).on('load', function () {
                TweenLite.to(this.body, this.duration.body, { 'autoAlpha': 1, 'onComplete': this.init.bind(this) });
            }.bind(this));
        };
        Prehome.prototype.setSlider = function () {
            this.picture.css('display', 'none');
            var index = Math.floor(Math.random() * this.picture.length) + 0;
            this.wrapper.attr('data-slider-index', index);
            $(this.picture[index]).css('display', 'block');
        };
        Prehome.prototype.init = function () {
            this.prehome.addClass('intro');
            // this.home.addClass('animated');
            this.menu.addClass('normal');
            this.prehome.on('webkitAnimationEnd', function () {
                setTimeout(function () {
                    this.endAnimation();
                }.bind(this), this.delay.end);
            }.bind(this));
            this.prehome.on('animationend', function () {
                setTimeout(function () {
                    this.endAnimation();
                }.bind(this), this.delay.end);
            }.bind(this));
        };
        Prehome.prototype.endAnimation = function () {
            if (!this.state) {
                this.state = true;
                this.wrapper.addClass('show-anim');
                this.prehome.remove();
                this.wrapper.trigger('intro-end');
                this.body.trigger('prehome-hide');
            }
        };
        return Prehome;
    }());
    Core.Prehome = Prehome;
    /**
     * JPN Kernel class, manages, retrieves all Web site
     */
    var Nav = (function () {
        function Nav() {
            // Classes
            this.Action = null;
            // Logo
            this.logo = {
                dom: null
            };
            this.wrappers = {
                current: null,
                next: null
            };
            this.url = '';
            this.requested = '';
            this.firstLoad = true;
            this.working = false;
            this.clicked = false;
            // Retrieve vars
            this.retrieve = {
                url: '',
                retrieved: false,
                ajax: null,
                html: null,
                timeout: null,
                delay: 100,
                delayLoading: 300,
                delayLoadingTimeout: null,
                changeHash: null,
                changeHashInterval: 500,
                interval: null
            };
            console.info(':::: ctr : Core:Nav');
            this.body = $('body');
            this.main = this.body.find('.main-container');
            this.header = this.body.find('.header-container');
            this.wrappers.current = this.main.find('.page-container');
            this.logo.dom = this.body.find('.logo');
            this.footer = this.body.find('.footer');
            this.url = window.location.href;
            this.events();
            this.initClass();
            this.setProperties();
        }
        /**
         * Static events - no mutation
         */
        Nav.prototype.events = function () {
            var self = this;
            if ((Core.Device._MobileDetect.tablet() !== null) && (navigator.userAgent.match(/iPad/i) == null)) {
                this.tabletClick();
            }
            else {
                this.desktopClick();
            }
            // Detect page changing
            this.retrieve.changeHashInterval = setInterval(function () {
                if ((window.location.href != self.url) && !self.clicked) {
                    self.clicked = true;
                    self.requested = window.location.href;
                    self.retrieve.url = window.location.href;
                    self.get();
                    self.process(100);
                }
            }, this.retrieve.changeHash);
        };
        Nav.prototype.tabletClick = function () {
            var self = this;
            this.body.on('click', '.async', function (e) {
                e.preventDefault();
                if ($(this).hasClass('inactive-async'))
                    return;
                self.clicked = true;
                if (self.working)
                    return;
                var link = $(this);
                self.requested = link.attr('href');
                var delay = parseInt(link.attr('data-inject-delay'));
                self.process(delay);
                var btn = $(this);
                self.retrieve.url = btn.attr('href');
                self.retrieve.timeout = setTimeout(function () {
                    self.retrieve.retrieved = false;
                    self.get();
                }, self.retrieve.delay);
                if (btn.hasClass('project-container') || btn.hasClass('menu-link') || btn.hasClass('item-press') || btn.hasClass('home-link')) {
                    self.process(delay);
                }
                else {
                    setTimeout(function () {
                        btn.trigger("click");
                    }, 200);
                }
            });
        };
        Nav.prototype.desktopClick = function () {
            var self = this;
            console.log('desktop');
            // Inject HTML
            this.body.on('click', '.async', function (e) {
                e.preventDefault();
                if ($(this).hasClass('inactive-async'))
                    return;
                self.clicked = true;
                if (self.working)
                    return;
                var link = $(this);
                self.requested = link.attr('href');
                var delay = parseInt(link.attr('data-inject-delay'));
                self.process(delay);
            });
            // Preload
            this.body.on('mouseenter', '.async', function (e) {
                e.preventDefault();
                if ($(this).hasClass('inactive-async'))
                    return;
                var btn = $(this);
                self.retrieve.url = btn.attr('href');
                self.retrieve.timeout = setTimeout(function () {
                    self.retrieve.retrieved = false;
                    self.get();
                }, self.retrieve.delay);
            });
            // Cancel preloading
            this.body.on('mouseleave', '.async', function (e) {
                e.preventDefault();
                if (self.clicked)
                    return;
                clearTimeout(self.retrieve.timeout);
                if (self.retrieve.ajax)
                    self.retrieve.ajax.abort();
            });
        };
        Nav.prototype.process = function (delay) {
            var self = this;
            if ((this.retrieve.url != this.requested) || (this.url == this.requested))
                return;
            if (!isNaN(delay))
                setTimeout(this.inject.bind(this), delay);
            else {
                this.inject();
                delay = 0;
            }
            this.retrieve.delayLoadingTimeout = setTimeout(function () {
                if (!self.retrieve.retrieved)
                    self.body.addClass('loading');
            }, this.retrieve.delayLoading + delay);
        };
        /**
         * Retrieve new Action
         * @param btn : clicked btn
         */
        Nav.prototype.get = function () {
            if (this.url == this.retrieve.url)
                return;
            this.retrieve.retrieved = false;
            var ajaxOpts = {
                url: this.retrieve.url,
                async: true,
                cache: false,
                dataType: 'html',
                type: 'GET',
                success: this.store.bind(this)
            };
            this.retrieve.ajax = $.ajax(ajaxOpts);
        };
        /**
         * Store retrieved dom
         * @param xhr : HTML page
         */
        Nav.prototype.store = function (xhr) {
            this.retrieve.retrieved = true;
            this.html = xhr;
        };
        /**
         * Inject new container when is loaded
         */
        Nav.prototype.inject = function () {
            var self = this;
            this.url = this.retrieve.url;
            history.pushState({
                path: this.retrieve.url
            }, this.retrieve.url, this.retrieve.url);
            ga('send', 'pageview', location.pathname);
            if (this.retrieve.retrieved) {
                this.working = false;
                this.clicked = false;
                if (this.retrieve.delayLoadingTimeout != null) {
                    clearTimeout(this.retrieve.delayLoadingTimeout);
                    this.retrieve.delayLoadingTimeout = null;
                }
                this.main.append(this.html);
                this.prepare();
            }
            else {
                this.working = true;
                this.retrieve.interval = setInterval(function () {
                    if (self.retrieve.retrieved) {
                        clearInterval(self.retrieve.interval);
                        self.inject();
                    }
                }, this.retrieve.delay);
            }
        };
        /**
         * Prepare containers, switch containers, add show & hide classes
         */
        Nav.prototype.prepare = function () {
            var self = this;
            this.body.trigger('changing-page');
            this.wrappers.current.removeClass('page-container');
            this.wrappers.next = this.main.find('.page-container');
            this.wrappers.current.removeClass('show');
            // Case if project list are open
            if (!this.wrappers.current.hasClass('strict-hide'))
                this.wrappers.current.addClass('hide');
            else
                this.wrappers.current.empty();
            // this.wrappers.current.find('.next-project').hide();
            this.main.addClass('middle-line');
            // Current
            var _out = parseInt(this.wrappers.current.attr('data-out'));
            var _in = parseInt(this.wrappers.current.attr('data-in'));
            self.body.removeClass('loading');
            setTimeout(function () {
                self.wrappers.current.remove();
                self.wrappers.current = self.wrappers.next;
                //self.body.removeClass('loading');
                self.setProperties();
                self.initClass();
                self.wrappers.next.removeClass('hide');
                self.wrappers.next.addClass('show');
                // fire method when next page is shown
                setTimeout(self.callLoadedAction.bind(self), _in);
            }, _out);
            setTimeout(function () {
                self.main.removeClass('middle-line');
                self.wrappers.current.addClass('smooth');
            }, _in + _out);
        };
        /**
         * Set logo color, white or black
         */
        Nav.prototype.setProperties = function () {
            // Color
            var _defaultColor = 'black';
            var color = this.wrappers.current.attr('data-logo-color');
            this.logo.dom.removeClass('white');
            this.logo.dom.removeClass('black');
            this.logo.dom.addClass((color) ? color : _defaultColor);
            // / Color
            // Is home
            var isHome = (this.wrappers.current.attr('data-is-home')) ? true : false;
            this.body.removeClass('is-home');
            if (isHome)
                this.body.addClass('is-home');
            // / Is home
        };
        /**
         * Instance manager, retrieve class name from current wrapper and create page instance
         */
        Nav.prototype.initClass = function () {
            if (this.Action !== null)
                this.Action.clear();
            this.Action = null;
            var className = this.wrappers.current.attr('data-class');
            if (typeof window[className].Core == 'function') {
                this.Action = Object.create(window[className].Core.prototype);
                this.Action.constructor.apply(this.Action);
                if (this.firstLoad) {
                    this.firstLoad = false;
                    this.Action.loaded();
                }
            }
            else
                console.error('/!\\ Core::Kernel : page "' + className + '" does not exists. Please check if "' + className + '.action.ts" module exists ! /!\\');
        };
        /**
         * Call loaded method when action is visible
         */
        Nav.prototype.callLoadedAction = function () {
            if (typeof this.Action.loaded === 'function')
                this.Action.loaded();
            else
                console.error('/!\\ Core::Kernel : loaded() method in "' + this.Action.getClassName() + '" does not exists. /!\\');
        };
        return Nav;
    }());
    Core.Nav = Nav;
})(Core || (Core = {}));
document.addEventListener('DOMContentLoaded', function () {
    new Core.Kernel();
});
;
var SortableFilter = (function () {
    function SortableFilter(opts) {
        this.source = {
            'items': null,
            'data': ''
        };
        this.axis = 'y';
        this.move = 150;
        this.duration = {
            'null': 0,
            'animation': 0.15,
            'delay': 0.015
        };
        this.wrapper = $('.main-container');
        // set options
        this.source.items = opts.source.items;
        this.source.data = opts.source.data;
        this.target = opts.target.items;
        this.container = opts.target.container;
        this.detachContainer = opts.target.detachContainer;
        this.triggerSorted = opts.target.triggerSorted;
        this.move = opts.move;
        this.axis = opts.axis;
        this.duration.animation = opts.duration;
        this.duration.delay = opts.delay;
        /*
        if(opts.default_sorting != null){
            this.process($(this.source.items[opts.default_sorting]));
        }
        */
        this.events();
    }
    /**
     * Initialize Events
     */
    SortableFilter.prototype.events = function () {
        var self = this;
        this.source.items.on('click', function () {
            self.process($(this));
        });
        this.wrapper.on('clear-filters', function () {
            this.reset();
        }.bind(this));
    };
    SortableFilter.prototype.setByIndex = function (index) {
        this.process($(this.source.items[index]), true);
    };
    /**
     * Detect target items to show from clicked item
     * @param item
     */
    SortableFilter.prototype.process = function (item, noDuration) {
        if (noDuration === void 0) { noDuration = false; }
        var params = {};
        params['autoAlpha'] = 0;
        params[this.axis] = '-' + this.move + 'px';
        params['force3D'] = true;
        var duration = this.duration.animation;
        if (noDuration)
            duration = 0;
        this.target.removeClass('to-show');
        this.target.removeClass('visible');
        if (item.hasClass('active')) {
            this.wrapper.trigger('clear-filters');
            TweenMax.staggerTo(this.target, duration, params, this.duration.delay, this.showItems.bind(this, this.target));
            return;
        }
        else {
            this.wrapper.trigger('clear-filters');
            $(item).parents('.filter').addClass('active');
            item.addClass('active');
            var sortable = item.attr('data-' + this.source.data);
            for (var i = 0; i < this.target.length; i++) {
                var item = $(this.target[i]);
                var sortableTarget = item.attr('data-' + this.source.data);
                if (sortable === sortableTarget)
                    item.addClass('to-show');
            }
            TweenMax.staggerTo(this.target, duration, params, this.duration.delay, this.show.bind(this));
        }
    };
    /**
     * Clear events
     */
    SortableFilter.prototype.clear = function () {
        this.source.items.off('click');
    };
    /**
     * Show selected items
     */
    SortableFilter.prototype.show = function () {
        this.target.css('display', 'none');
        var toShow = this.container.find('.to-show');
        this.showItems(toShow);
    };
    /**
     * Show specified items
     * @param items : items to shows
     */
    SortableFilter.prototype.showItems = function (items) {
        items.css('display', 'inline-block');
        items.addClass('visible');
        if (this.detachContainer != null)
            items.detach().prependTo(this.detachContainer);
        var params = {};
        params[this.axis] = this.move + 'px';
        TweenMax.to(items, this.duration.null, params);
        var params = {};
        params[this.axis] = 0;
        params['autoAlpha'] = 1;
        params['force3D'] = true;
        if (this.triggerSorted)
            this.triggerSorted.trigger('sorting');
        setTimeout(function () {
            if (this.triggerSorted)
                this.triggerSorted.trigger('sorted');
        }.bind(this), 150); // delocalise time @todo
        TweenMax.staggerTo(items, this.duration.animation, params, this.duration.delay);
    };
    SortableFilter.prototype.resetAll = function () {
        this.reset();
        this.target.removeAttr('style');
    };
    /**
     * Clear all active filters
     */
    SortableFilter.prototype.reset = function () {
        this.source.items.removeClass('active');
        this.source.items.parents('.filter').removeClass('active');
    };
    return SortableFilter;
}());
/**
 * @class Footer.ts
 * @type TypeScript File
 * @desc Manage Footer
 **/
var Footer = (function () {
    /**
     * Footer constructor
     */
    function Footer() {
        this.body = $('body');
        this.footer = this.body.find('.footer');
        this.fullscreen = this.footer.find('.fullscreen');
        this.init();
    }
    /**
     * Init method
     */
    Footer.prototype.init = function () {
        var self = this;
        this.fullscreen.on('click', function (e) {
            e.preventDefault();
            if ($(this).hasClass('active')) {
                self.exitFullscreen();
            }
            else {
                self.fullScreen(document.documentElement);
            }
        });
        document.addEventListener("fullscreenchange", function () {
            this.fullscreen.removeClass('active');
        }, false);
        document.addEventListener("mozfullscreenchange", function () {
            this.fullscreen.removeClass('active');
        }, false);
        document.addEventListener("webkitfullscreenchange", function () {
            this.fullscreen.removeClass('active');
        }, false);
        document.addEventListener("msfullscreenchange", function () {
            this.fullscreen.removeClass('active');
        }, false);
    };
    Footer.prototype.fullScreen = function (element) {
        this.fullscreen.addClass('active');
        if (element.requestFullscreen) {
            element.requestFullscreen();
        }
        else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }
        else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
        else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    };
    Footer.prototype.exitFullscreen = function () {
        this.fullscreen.removeClass('active');
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    };
    return Footer;
}());
/**
 * @class Menu.ts
 * @type TypeScript File
 * @desc Manage Menu
 **/
var Menu = (function () {
    function Menu() {
        // States
        this.state = {
            header: false,
            project: false,
            menu: false
        };
        // DOM
        this.btn = {
            menu: null,
            project: null
        };
        this.dom = {
            menu: null,
            footer: null,
            logo: null,
            project: {
                list: null,
                top: null,
                middle: null,
                bottom: null,
                nav: null,
                items: null,
                slider: null
            },
            menu: {
                items: null,
                mentions: null,
                mask: null
            }
        };
        this.nav = {
            previous: null,
            next: null
        };
        // Misc
        this.index = 0;
        this.current = -1;
        this.delay = {
            menu: 500,
            project: 1200,
            close: 1200,
            slide: 600
        };
        this.duration = {
            project: 0.5
        };
        this.slider = {
            index: 0,
            current: 0,
            length: [],
            item: null,
            items: []
        };
        this.Filters = [];
        this.mouse = {
            timeout: null,
            release: 150,
            running: false,
            slide: {
                way: 0,
                limit: 25,
                current: 0,
                limits: {
                    opera: 25,
                    firefox: 10,
                    safari: 15,
                    ie: 15,
                    edge: 25,
                    chrome: 15,
                    _default: 25
                }
            },
            scale: {
                delta: 0.001,
                current: 1,
                limit: 0.95
            }
        };
        this.body = $('body');
        this.dom.menu = this.body.find('.menu-container');
        this.dom.footer = this.body.find('.footer');
        this.dom.logo = this.body.find('.logo');
        this.dom.project.list = this.body.find('.projects-list');
        this.dom.project.top = this.dom.project.list.find('.line.top .project-category');
        this.dom.project.middle = this.dom.project.list.find('.line.middle .project-category');
        this.dom.project.bottom = this.dom.project.list.find('.line.bottom');
        this.dom.project.nav = this.dom.project.list.find('.line.middle .nav');
        this.dom.project.slider = this.dom.project.list.find('.line.middle .slider-container');
        this.dom.project.items = this.dom.project.list.find('.line.middle .project-category .project-container');
        this.dom.menu.items = this.dom.menu.find('.menu .menu-link');
        this.dom.menu.mask = this.dom.menu.find('.mask');
        this.dom.menu.mentions = this.dom.footer.find('.mentions');
        this.nav.previous = this.dom.project.list.find('.line.middle .nav.previous');
        this.nav.next = this.dom.project.list.find('.line.middle .nav.next');
        this.btn.menu = this.body.find('.menu-btn');
        this.btn.project = this.dom.menu.find('.menu-realisation');
        this.initSlider();
        this.initFilters();
        this.events();
    }
    Menu.prototype.initFilters = function () {
        for (var i = 0; i < this.dom.project.top.length; i++) {
            var top = $(this.dom.project.top[i]);
            var filters = top.find('.sub-category-filter');
            if (filters.length > 0) {
                var middle = $(this.dom.project.middle[i]);
                var container = middle.find('.projects-category-container');
                var target = middle.find('.sub-category-filter-target');
                this.Filters.push(new SortableFilter({
                    'axis': 'x',
                    'move': 150,
                    'duration': 0.25,
                    'delay': 0.1,
                    'source': {
                        'items': filters,
                        'data': 'sub-category-id'
                    },
                    'target': {
                        'items': target,
                        'container': container,
                        'detachContainer': container,
                        'triggerSorted': this.dom.project.slider
                    }
                }));
            }
            else {
                this.Filters.push(null);
            }
        }
    };
    Menu.prototype.events = function () {
        var self = this;
        this.btn.menu.on('click', this.toggleHeaderFooter.bind(this));
        this.dom.menu.items.on('click', this.toggleHeaderFooter.bind(this));
        this.dom.menu.mentions.on('click', this.toggleHeaderFooter.bind(this));
        this.dom.logo.on('click', function () {
            if (self.state.header)
                self.toggleHeaderFooter();
        });
        this.dom.menu.mask.on('click', function () {
            if (self.state.header)
                self.toggleHeaderFooter();
        });
        this.dom.project.slider.on('sorting', function () {
            self.slide($(window).width(), 0, 0);
        });
        this.dom.project.slider.on('sorted', function () {
            self.slider.current = 0;
            self.slider.index = 0;
            self.slider.item = self.getVisibleItems();
            self.slider.length[self.current] = self.slider.item.length;
            self.setProjectMasks();
            self.slide(0);
        });
        this.body.on('click', '.project-entry-back', function (e) {
            e.preventDefault();
            var projectCategoryId = $(this).attr('data-project-category-id');
            for (var i = 0; i < self.btn.project.length; i++) {
                var category = $(self.btn.project[i]);
                if (category.attr('data-project-category-id') == projectCategoryId)
                    self.index = i;
            }
            self.prepareProjectsOpening(false);
        });
        this.dom.project.list.on('mousewheel', this.mouseWheelHandler.bind(this));
        this.dom.project.list.on('DOMMouseScroll', this.mouseWheelHandler.bind(this));
        this.btn.project.on('click', function (e) {
            e.preventDefault();
            self.index = self.btn.project.index($(this));
            if (!$(this).hasClass('single-project'))
                self.prepareProjectsOpening(true);
            else
                self.prepareSingleProjectOpening();
        });
        this.dom.project.items.on('click', function (e) {
            e.preventDefault();
            var index = self.slider.item.index($(this));
            if (index == self.slider.current) {
                if (window.location.href == $(this).attr('href')) {
                    self.closeProjectList();
                    self.body.find('.main-wrapper').removeClass('strict-hide');
                }
            }
        });
        this.dom.project.items.on('mouseenter', function (e) {
            e.preventDefault();
            var index = self.slider.item.index($(this));
            if (index == self.slider.current)
                self.dom.project.bottom.addClass('hover');
        });
        this.dom.project.items.on('mouseleave', function (e) {
            e.preventDefault();
            self.dom.project.bottom.removeClass('hover');
        });
        this.dom.project.nav.on('click', function (e) {
            var isNext = ($(this).hasClass('next')) ? true : false;
            if (self.slider.current >= (self.slider.length[self.current] - 1) && isNext) {
                self.nav.next.addClass('hide');
                return;
            }
            else
                self.nav.next.removeClass('hide');
            if (self.slider.current == 0 && !isNext) {
                self.nav.next.addClass('hide');
                return;
            }
            else
                self.nav.next.removeClass('hide');
            if ($(this).hasClass('next'))
                self.slider.index++;
            if ($(this).hasClass('previous'))
                self.slider.index--;
            self.runSlider();
        });
        this.body.on('changing-page', this.closeProjectList.bind(this));
        $(window).on('resize', this.resize.bind(this));
    };
    Menu.prototype.prepareSingleProjectOpening = function () {
        if (this.state.menu)
            this.toggleHeaderFooter();
        else {
            this.toggleHeaderFooter();
            this.closeProjectList();
        }
    };
    Menu.prototype.prepareProjectsOpening = function (openHeaderFooter) {
        if (openHeaderFooter === void 0) { openHeaderFooter = true; }
        // Prevent same item click
        if (this.index == this.current)
            return;
        // In each case close Menu
        if (openHeaderFooter)
            this.toggleHeaderFooter();
        // Update slider params
        this.resetSlider();
        var delay = this.delay.menu;
        // If project list is not opened
        if (!this.state.project) {
            this.state.project = true;
            this.dom.project.list.css('display', 'block');
            setTimeout(this.openProjectList.bind(this), this.delay.menu);
            delay = this.delay.project + this.delay.menu;
        }
        else
            this.closeProjectCategory();
        this.slider.item = $(this.slider.items[this.index]);
        // this.slider.item = this.getVisibleItem();
        setTimeout(this.openProjectCategory.bind(this), delay);
    };
    /**
     * Mouse Wheel event handler
     */
    Menu.prototype.mouseWheelHandler = function (e) {
        if (this.mouse.running)
            return;
        var e = window.event || e; // old IE support
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        if (delta == this.mouse.slide.way) {
            this.mouse.slide.current++;
            if (this.mouse.slide.current > this.mouse.slide.limits[Core.Browser.get()]) {
                this.mouse.slide.current = 0;
                var isNext = (delta == -1) ? true : false;
                if (this.slider.current >= (this.slider.length[this.current] - 1) && isNext)
                    return;
                if (this.slider.current == 0 && !isNext)
                    return;
                if (isNext)
                    this.slider.index++;
                else
                    this.slider.index--;
                this.mouse.running = true;
                this.runSlider();
                setTimeout(function () { this.mouse.running = false; }.bind(this), 800);
            }
        }
        else {
            this.mouse.slide.way = delta;
            this.mouse.slide.current = 0;
        }
        // this.mouseScale(this.mouse.scale.current, 0);
        if (this.mouse.timeout)
            clearTimeout(this.mouse.timeout);
        this.mouse.timeout = setTimeout(this.resetMouse.bind(this), this.mouse.release);
    };
    Menu.prototype.resetMouse = function () {
        this.mouseScale(1, 300);
        this.mouse.scale.current = 1;
    };
    Menu.prototype.mouseScale = function (s, duration) {
        if (duration === void 0) { duration = 0; }
        var project = $(this.dom.project.middle[this.index]);
        project.css({
            'transition-duration': duration + 'ms',
            '-webkit-transition-duration': duration + 'ms',
            'transform': 'scale(' + s + ')',
            '-webkit-transform': 'scale(' + s + ')'
        });
    };
    /**
     * Set slider animation
     * @param x: x
     */
    Menu.prototype.slide = function (x, duration, delay) {
        if (duration === void 0) { duration = 600; }
        if (delay === void 0) { delay = 0; }
        this.dom.project.slider.css({
            'transition-delay': delay + 'ms',
            '-webkit-transition-delay': delay + 'ms',
            'transition-duration': duration + 'ms',
            '-webkit-transition-duration': duration + 'ms',
            'transform': 'translate3d(' + x + 'px, 0, 0)',
            '-webkit-transform': 'translate3d(' + x + 'px, 0, 0)'
        });
    };
    /**
     * Calculate and resize slider
     */
    Menu.prototype.resize = function () {
        var w = ($(window).width() / 2) - (this.getItemWidth() / 2) - this.getItemMargin();
        this.dom.project.nav.css('width', w);
        this.slide(-(this.slider.current * (this.getItemWidth() + this.getItemMargin())));
    };
    /**
     * Initialize slider.
     * Get and calculate projects length for each category
     */
    Menu.prototype.initSlider = function () {
        for (var i = 0; i < this.dom.project.middle.length; i++) {
            var items = $(this.dom.project.middle[i]).find('.project-container');
            this.slider.items[i] = items;
            this.slider.length[i] = items.length;
        }
    };
    /**
     * Reset slider
     */
    Menu.prototype.resetSlider = function () {
        this.slider.current = 0;
        this.slider.index = 0;
    };
    /**
     * Get current project visible items
     * @returns {ZeptoCollection}: all visible project items
     */
    Menu.prototype.getVisibleItems = function () {
        var current = $(this.dom.project.middle[this.current]);
        var item = current.find('.visible');
        if (item.length == 0)
            item = current.find('a');
        return item;
    };
    Menu.prototype.getVisibleItem = function () {
        var current = $(this.dom.project.middle[this.current]);
        var item = $(current.find('.visible')[0]);
        if (item.length == 0)
            item = $(current.find('a')[0]);
        return item;
    };
    Menu.prototype.getItemWidth = function () {
        return this.getVisibleItem().width();
    };
    Menu.prototype.getItemMargin = function () {
        return parseInt(this.getVisibleItem().css('margin-right'));
    };
    Menu.prototype.runSlider = function () {
        this.slide(-(this.slider.index * (this.getItemWidth() + this.getItemMargin())));
        if (navigator.userAgent.match(/iPad/i) != null) {
        }
        else {
            TweenMax.staggerFromTo(this.slider.item, 0.15, { 'x': -100, rotation: 0, force3D: true }, { 'x': 0, rotation: 0.01, force3D: true }, 0.05, this.resize.bind(this));
        }
        this.slider.current = this.slider.index;
        this.setProjectMasks();
    };
    Menu.prototype.setProjectMasks = function () {
        this.slider.item.removeClass('active-mask');
        $(this.slider.item[this.slider.current]).addClass('active-mask');
    };
    Menu.prototype.openProjectCategory = function () {
        $(this.dom.project.top[this.index]).addClass('open');
        this.body.find('.main-wrapper').addClass('strict-hide');
        var project = $(this.dom.project.middle[this.index]);
        var items = project.find('.project-container');
        this.setProjectMasks();
        project.css('display', 'block');
        project.addClass('open');
        this.slide($(window).width() / 2, 0, 0);
        setTimeout(function () {
            this.slide(0);
            TweenMax.staggerFromTo(items, 0.25, { 'autoAlpha': 0, 'x': -150 }, { 'autoAlpha': 1, 'x': 0 }, 0.10, this.resize.bind(this));
        }.bind(this), 150);
        if (!this.dom.logo.hasClass('black')) {
            this.dom.logo.removeClass('white black');
            this.dom.logo.addClass('black');
        }
        this.current = this.index;
    };
    Menu.prototype.closeProjectCategory = function () {
        $(this.dom.project.top[this.current]).removeClass('open');
        var project = $(this.dom.project.middle[this.current]);
        var items = project.find('.project-container');
        project.removeClass('open');
        TweenMax.staggerTo(items, 0.25, { 'autoAlpha': 0, 'x': 250 }, 0.10, function () {
            project.css('display', 'none');
        });
        this.slider.items[this.current] = items;
        this.slider.length[this.current] = items.length;
        for (var i = 0; i < this.Filters.length; i++) {
            if (this.Filters[i] !== null)
                this.Filters[i].resetAll();
        }
        var wrapper = this.body.find('.main-wrapper');
        var home = wrapper.attr('data-is-home');
        if (home) {
            this.dom.logo.removeClass('white black');
            this.dom.logo.addClass('white');
        }
    };
    Menu.prototype.openProjectList = function () {
        this.state.menu = !this.state.menu;
        this.dom.project.list.css('display', 'block');
        this.dom.project.list.addClass('open');
    };
    Menu.prototype.closeProjectList = function () {
        var self = this;
        this.dom.project.list.addClass('close');
        var to = setTimeout(function () {
            clearTimeout(to);
            self.state.project = false;
            self.dom.project.list.css('display', 'none');
            self.dom.project.list.removeClass('close');
            self.dom.project.list.removeClass('open');
            self.slide(0);
            self.closeProjectCategory();
            self.current = -1;
            self.slider.current = 0;
        }, this.delay.close);
    };
    Menu.prototype.toggleHeaderFooter = function () {
        var self = this;
        var wrapper = this.body.find('.main-wrapper');
        var home = wrapper.attr('data-is-home');
        if (!this.state.project)
            this.dom.logo.removeClass('white black');
        if (!this.state.header) {
            if (home == 'true')
                this.dom.logo.addClass('black');
            this.dom.menu.css('visibility', 'visible');
        }
        else {
            if (home == 'true')
                this.dom.logo.addClass('white');
            setTimeout(function () {
                self.dom.menu.css('visibility', 'hidden');
            }, this.delay.close);
        }
        this.dom.menu.toggleClass('open');
        this.dom.footer.toggleClass('open');
        this.state.header = !this.state.header;
    };
    return Menu;
}());
/**
 * @class Scroll.ts
 * @type TypeScript File
 * @desc Manage Scroll anim
 **/
var Scroll = (function () {
    function Scroll() {
        this.body = $('body');
        this.mainWrapper = this.body.find('.main-wrapper');
        this.animate = this.mainWrapper.find('.to-animate');
        this.scroll = this.mainWrapper.find('.scroll-move');
        this.img = this.animate.find('img');
        this.init();
    }
    Scroll.prototype.init = function () {
        var self = this;
        this.mainWrapper.on('mousewheel DOMMouseScroll scroll', function (e) {
            self.animElement();
            //self.slideElement();
        });
        //this.setSize();
        window.onresize = function () {
            //this.setSize();
        }.bind(this);
    };
    Scroll.prototype.setSize = function () {
        for (var i = 0; i < this.img.length; ++i) {
            $(this.img[i]).parent().width($(this.img[i]).width() - 1);
        }
    };
    Scroll.prototype.slideElement = function () {
        var pos = $(this.mainWrapper).scrollTop();
        for (var i = 0; i < this.scroll.length; ++i) {
            var top = pos * (i * 0.01);
            $(this.scroll[i]).css({
                'transform': 'translateY(' + (-top) + 'px)',
                'transition': 'transform 0.1s'
            });
        }
    };
    Scroll.prototype.animElement = function () {
        for (var i = 0; i < this.animate.length; ++i) {
            var objectOffset = $(this.animate[i]).offset().top;
            var bottomWindow = $(window).scrollTop() + $(window).height();
            if (bottomWindow >= objectOffset + 100) {
                $(this.animate[i]).addClass('show-elements');
            }
        }
    };
    Scroll.prototype.startAnimElement = function () {
        for (var i = 0; i < this.animate.length; ++i) {
            var objectOffset = $(this.animate[i]).offset().top;
            var bottomWindow = $(window).scrollTop() + $(window).height();
            if (bottomWindow >= objectOffset) {
                $(this.animate[i]).addClass('start-show-elements');
            }
        }
    };
    return Scroll;
}());

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdlbmVyaWNzL0FQSS5wbHVnaW4udHMiLCJkZXNrdG9wL0RlZmF1bHREZXByZWNhdGVkLmFjdGlvbi50cyIsImRlc2t0b3AvRGVmYXVsdEVycm9yLmFjdGlvbi50cyIsImRlc2t0b3AvRXhhbXBsZS5hY3Rpb24udHMiLCJkZXNrdG9wL0hvbWVJbmRleC5hY3Rpb24udHMiLCJkZXNrdG9wL0hvbWVMZWdhbE1lbnRpb25zLnRzIiwiZGVza3RvcC9QcmVzc0FydGljbGUuYWN0aW9uLnRzIiwiZGVza3RvcC9QcmVzc0luZGV4LmFjdGlvbi50cyIsImRlc2t0b3AvUHJvamVjdEluZGV4LmFjdGlvbi50cyIsImRlc2t0b3AvU3R1ZGlvQ2hyb25vbG9neS5hY3Rpb24udHMiLCJkZXNrdG9wL1N0dWRpb0NvbnRhY3QuYWN0aW9uLnRzIiwiZGVza3RvcC9TdHVkaW9KUE4uYWN0aW9uLnRzIiwiZGVza3RvcC9TdHVkaW9OZXdzLmFjdGlvbi50cyIsImRlc2t0b3AvU3R1ZGlvVGVhbS5hY3Rpb24udHMiLCJkZXNrdG9wL19jb3JlLnRzIiwiZGVza3RvcC9maWx0ZXIudHMiLCJkZXNrdG9wL2Zvb3Rlci50cyIsImRlc2t0b3AvbWVudS50cyIsImRlc2t0b3Avc2Nyb2xsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtCQTtJQUVJO0lBQWUsQ0FBQztJQUVULFdBQU8sR0FBZCxVQUFlLE9BQW1CO1FBRTlCLEVBQUUsQ0FBQSxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUM7WUFDUixFQUFFLENBQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDO2dCQUFFLE1BQU0sQ0FBQztZQUFDLENBQUM7WUFDL0IsRUFBRSxDQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQztnQkFBQyxNQUFNLENBQUM7WUFBQyxDQUFDO1lBRTVCLElBQUksUUFBUSxHQUFzQjtnQkFDOUIsR0FBRyxFQUFJLEVBQUU7Z0JBQ1QsS0FBSyxFQUFH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LFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNqRCxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFTSxpQ0FBZ0IsR0FBdkI7UUFDSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFFM0MsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUM7WUFDbkQsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUU5RCxFQUFFLENBQUMsQ0FBQyxZQUFZLElBQUksWUFBYSxDQUFDLENBQUEsQ0FBQztnQkFDL0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUN2RCxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0ExRUEsQUEwRUMsSUFBQSIsImZpbGUiOiJhcHAtd3d3Lmpwbi5kZXNrdG9wLmpzIiwic291cmNlc0NvbnRlbnQiOltudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=