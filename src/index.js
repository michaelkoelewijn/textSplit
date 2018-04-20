import '../dist/style.css';
const $ = require('jquery');

export function init(options) {
    new TextSplit(options)
}

class TextSplit {
    constructor(options) {
        this.name = options.name;
        this.item = options.element;
        this.after = options.after;
        this.smoothen = options.smoothen;

        this.text = this.item.text();
        this.window = $(window);
        
        this.resize();
        this.window.on('resize', this.resize.bind(this));
        this.window.on('scroll', this.scroll.bind(this));
    }

    resize() {
        this.windowWidth = this.window.outerWidth();
        this.windowHeight = this.window.outerHeight();
        this.height = this.item.outerHeight();

        this.position = this.item.offset();

        this.init();
        this.scroll();
    }

    scroll() {
        let viewportHeight = this.windowHeight;
        let scrollTop = $(window).scrollTop();
        let elementHeight = this.height;
        let elementOffsetTop = this.position.top;
        let percentage, y;
    
        y = 0;
        if(scrollTop >= this.after) {
            percentage = Math.min(100, (((scrollTop - this.after) / this.smoothen)))
            y = ((elementHeight / 2) / 100) * percentage;
        }
        
        this.split(y);
        
    }

    split(y) {
        this.textUpper.css({ transform: `translate3d(0,${y}px,0)` });
        this.textLower.css({ transform: `translate3d(0,${y*-1}px,0)` });
    }

    init()  {

        this.item.css({'position': 'relative'})

        let textOriginal = $('<span class="js-textsplit-original" />')
        .text(this.text);
        
        let textSplitUpper = $('<span class="js-textsplit-half js-textsplit-half-upper" />')
                            .html($(`<span class="js-textsplit-upper" style="transform: translate3d(0,0,0)" />`)
                            .text(this.text));
    
        let textSplitLower = $('<span class="js-textsplit-half js-textsplit-half-lower" />')
                            .html($(`<span class="js-textsplit-lower" style="transform: translate3d(0,0,0)" />`)
                            .text(this.text));
        
        this.item.html('').append(textOriginal, textSplitUpper, textSplitLower)
        this.textUpper = this.item.find('.js-textsplit-upper');
        this.textLower = this.item.find('.js-textsplit-lower');

    }

    
}