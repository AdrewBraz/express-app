$(function() {
  var $window = $(window),
      $html = $('html'),
      $body = $('body'),
      $header = $('#header'),
      $headerContent = $header.find('.page-intro__content'),
      $menu = $body.find('.main-nav__icon'),
      $nav = $body.find('.nav-list'),
      $wrapper;
  
  
  $header.scrollex({
    terminate: function() {

      $headerContent.css('opacity', '');

    },
    scroll: function(progress) {
      if (progress > 0.5)
        x = 1 - progress;
      else
        x = progress;
        $headerContent.css('opacity', Math.max(0, Math.min(1, x * 2)));

    }
  });
  
  $body.wrapInner('<div id="wrapper" />');
  $wrapper = $('#wrapper');
  $wrapper.on('scroll', function(){
    $window.trigger('scroll')
  });
  
  $html.addClass('is-touch');
  
  $window.on('load', function() {
    $('.scrolly').scrolly({
      speed: 1500,
      parent: $wrapper,
      pollOnce: true
    });

  });
  
  
  $('.main').each(function(){
    var $this = $(this),
        $img = $this.find('.image.hidden > img'),
        $bg,
        options;
    
    $bg = $('<div class="main-bg" id="' + $this.attr('id') + '-bg"></div>').css('background-image', ('url("' + $img.attr('src') + '")')).appendTo($body);
    
    options = {
      mode: 'middle',
      delay: 200,
      top: '-10vh',
      bottom: '-10vh'
    };
    
    $bg.css('opacity', 1)
       .hide();
    
    options.init = function() { $bg.fadeOut(0); };
    options.enter = function() { $bg.fadeIn(400); };
    options.leave = function() { $bg.fadeOut(400); };
    
    $this.scrollex(options);
    
  })
});