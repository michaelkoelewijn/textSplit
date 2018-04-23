import '../src/style.css';
const $ = require('jquery');

export function init(options) {
    new TextSplit(options)
}

class TextSplit {
    constructor(options) {
        this.name = options.name;
        this.item = options.element;
        this.offset = options.offset;

        this.animSpeed = options.speed; //in MS
        this.animOptions = {
            'transform': 'translate3d(0,0,0)',
            'transition-timing-function': options.easing
        }
        this.text = this.item.text();
        this.window = $(window);
        this.init();
        this.resize();
        this.window.on('resize', this.resize.bind(this));
        this.window.on('scroll', this.scroll.bind(this));
    }

    resize() {
        this.position = this.item.offset().top;
        this.height = this.item.outerHeight();
        this.windowHeight = this.window.outerHeight();
    }

    scroll() {
        const rect = this.item[0].getBoundingClientRect();
        if(rect.bottom > 0 && (rect.top + this.height + this.offset) < window.innerHeight) {
            this.textUpper.css(this.animOptions);
            this.textLower.css(this.animOptions);
        }
    }

    init()  {
        this.item.addClass('has-loaded');
        this.item.css({ 'position': 'relative' })

        let textOriginal = $('<span class="js-textsplit-original" />')
        .text(this.text);
        
        let textSplitUpper = $('<span class="js-textsplit-half js-textsplit-half-upper" />')
                            .html($(`<span class="js-textsplit-upper" style="transform: translate3d(0,100%,0);transition: ${this.animSpeed}ms;" />`)
                            .text(this.text));
    
        let textSplitLower = $('<span class="js-textsplit-half js-textsplit-half-lower" />')
                            .html($(`<span class="js-textsplit-lower" style="transform: translate3d(0,-100%,0);transition: ${this.animSpeed}ms;" />`)
                            .text(this.text));
        
        this.item.html('').append(textOriginal, textSplitUpper, textSplitLower)
        this.textUpper = this.item.find('.js-textsplit-upper');
        this.textLower = this.item.find('.js-textsplit-lower');

    }

    
}