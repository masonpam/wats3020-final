let beerNames = ["IIPA", "Lager", "Porter", "Red Ale", "Stout", "Cider"];
document.getElementById("material-card");

(function($) {
  let MaterialCard = function(element, options) {
    this.options = options;
    this.card = $(element);
    this.button = $(element).children('.mc-btn-action');
    this.icon = $(element).children('.mc-btn-action').children('i');
    this.card_activator = options.card_activator;
    this.timing = this.getTransitionTiming();


    let that = this;

    if (that.card_activator == 'click') {
      if (!this.icon.hasClass(this.options.icon_open)) {
        this.icon.attr('class', this.icon.attr('class').replace(/\bfa-.*\b/g, '')).addClass(this.options.icon_open);
      }
      this.button.on('click', function() {
        that.toggle();
      });
    } else {
      this.button.hide();
    }

    if (that.card_activator == 'hover') {
      this.card.on('mouseenter', function() {
        that.open();
      });
      this.card.on('mouseleave', function() {
        that.close();

      });
    }

  };
  
  document.addEventListener('click', materialCard);

  options = {
    icon_close: 'fa-arrow-left',
    icon_open: 'fa-bars',
    icon_spin: 'fa-spin-fast',
    card_activator: 'click'
  };

  $('.material-card').materialCard('toggle');
  $('.material-card:eq(1)').materialCard('open');
  $('.material-card:eq(2)').materialCard('close');
  if ($('.material-card:eq(3)').materialCard('isOpen') === true) {

  }
  MaterialCard.prototype.toggle = function() {
    this.icon.addClass(this.options.icon_spin);
    return this.isOpen() ? this.close() : this.open();
  };

  MaterialCard.prototype.getTransitionTiming = function() {
    let duration = 0;
    this.card.find('*').each(function() {
      if ((transitionDurationToMilliseconds($(this).css('transition-duration')) + transitionDurationToMilliseconds($(this).css('transition-delay'))) > duration) {
        duration = (transitionDurationToMilliseconds($(this).css('transition-duration')) + transitionDurationToMilliseconds($(this).css('transition-delay')));
      }
    });
    return duration;
  };

  MaterialCard.prototype.close = function() {
    let that = this;
    this.card.trigger('hide.material-card');
    this.card.removeClass('mc-active');
    window.setTimeout(function() {
      that.icon
        .removeClass(that.options.icon_spin)
        .removeClass(that.options.icon_close)
        .addClass(that.options.icon_open);

      that.card.trigger('hidden.material-card');
    }, this.timing);
  };

  MaterialCard.prototype.open = function() {
    let that = this;
    this.card.trigger('show.material-card');
    this.card.addClass('mc-active');

    window.setTimeout(function() {
      that.icon
        .removeClass(that.options.icon_spin)
        .removeClass(that.options.icon_open)
        .addClass(that.options.icon_close);

      that.card.trigger('shown.material-card');
    }, this.timing);
  };

  MaterialCard.prototype.isOpen = function() {
    return this.card.hasClass('mc-active');
  };
});