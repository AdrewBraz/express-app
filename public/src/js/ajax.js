$(function(){
  var $news = $('#news'),
      $photos = $('#inst'),
      $stats = $('#stats'),
      $container,
      $feed,
      $team = $('#team').html();
      $inner = $('.page-inner');
  console.log(typeof $team)
  
  function getTeam(selector){
    var str = selector;
    console.log(str);
    var result = str.toLowerCase().split(' ').slice(-1).join('');
    console.log(result);
    return result;
  }
  
  function photoTeam(selector){
    var str = selector.split(' ').join('');
    return str
  }
  
  var photoTeam = photoTeam($team);
  var value = getTeam($team);
  
  var options = {
    "instagram": {
      get: 'tagged',
      tagName: photoTeam,
      accessToken: '4786090295.ba4c844.bab13836d76a4803a38aed980f5df923',
      sortBy: 'most-recent',
      limit: '21',
      resolution: 'standard_resolution',
      template: '<a class="instagram__link" href="{{link}}"><img src="{{image}}" class="instagram__img" /></a>'
    },
    
    "stats": {
      async: true,
      type: "GET",
      url: "https://www.mysportsfeeds.com/api/feed/pull/nba/2016-2017-regular/daily_game_schedule.json?fordate=" + getNumericDate(),
      dataType: 'json',
      async: false,
      headers: {
        "Authorization": "Basic " + btoa("MsHeat" + ":" + "Rem32123")
        }
    },
    
    "news":{
      url:"https://api.fantasydata.net/v3/nba/scores/json/News?",
       beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "32905143dab9472997b2463013036a07");
                  },
       type: "GET",
       data: "{body}"
  
      }
  }
  
  $feed = new Instafeed(
      options["instagram"]);

  
  
  function getNumericDate(){
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = '0' + (currentDate.getMonth() + 1);
    var day = currentDate.getDate();
    var str = "" + year + month + day;
    return str;
  }
  
  function getDate(date){
    var stringDate = new Date(date);
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    return stringDate.toLocaleString("en", options);
  }
  
  function createWrapper(id){
    var wrap = document.createElement("DIV");
    wrap.setAttribute("id", "" + id);
    wrap.classList.add(id + "-wrapper");
    $inner.append(wrap);
  }
  
  $news.on('click', function(){
    createWrapper('newsfeed');
    var $article = $('.article');
    $.ajax(options.news)
     .done(function(data){
        var data = data;
        data.length = 10;
        for(var i = 0; i < data.length; i++){
          var newItem = $article.clone().removeClass('article-tmpl');
          $('#newsfeed').append(newItem);
          newItem.find('.article__header-title').html(data[i].Title);
          newItem.find('.article__header-date').html(getDate(data[i].Updated));
          newItem.find('.article__content').html(data[i].Content);
          newItem.find('.article__link').html("read more").attr("href", data[i].Url)
        }
      });
  })
  
  $stats.on('click', function(){
    var $schedule = $('.schedule');
    createWrapper("statsfeed");
    $.ajax(options.stats)
     .done(function(data){
        var arr = data['dailygameschedule']['gameentry'];
        for(var i = 0; i < arr.length; i++){
          var newItem = $schedule.clone().removeClass('schedule-tmpl');
          $('#statsfeed').append(newItem);
          newItem.find('.schedule__details-date').html(arr[i].date + ' ' +arr[i].time)
          newItem.find('.schedule__details-location').html(arr[i].location);
          newItem.find('.matchup__awayteam-name').html(arr[i].awayTeam.City + " " + arr[i].awayTeam.Name);
          newItem.find('.matchup__hometeam-name').html(arr[i].homeTeam.City + " " + arr[i].homeTeam.Name);
        }
      })        
  })
  
    $photos.on('click', function(){
      $container = $('<div id = "instafeed"></div>');
      console.log($container)
      $('.page-inner').append($container);
      $feed.run();
    })
})