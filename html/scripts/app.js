// wakeup
$.ajax({
    type: "get",
    url: "http://tvieira.pythonanywhere.com/synonyms/acorda"
})

var opts = {
  lines: 11 // The number of lines to draw
, length: 9 // The length of each line
, width: 6 // The line thickness
, radius: 14 // The radius of the inner circle
, scale: 1 // Scales overall size of the spinner
, corners: 1 // Corner roundness (0..1)
, color: '#567356' // #rgb or #rrggbb or array of colors
, opacity: 0.15 // Opacity of the lines
, rotate: 0 // The rotation offset
, direction: 1 // 1: clockwise, -1: counterclockwise
, speed: 1.2 // Rounds per second
, trail: 31 // Afterglow percentage
, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
, zIndex: 2e9 // The z-index (defaults to 2000000000)
, className: 'spinner' // The CSS class to assign to the spinner
, top: '0%' // Top position relative to parent
, left: '50%' // Left position relative to parent
, shadow: false // Whether to render a shadow
, hwaccel: false // Whether to use hardware acceleration
, position: 'absolute' // Element positioning
}
var target = document.getElementById('spinner-tag')
var spinner = new Spinner(opts);

var query = function(word){

  var goSpinnerGo = true;
  setTimeout(
  function() {
    if(goSpinnerGo){
      spinner.spin(target);
      $(".spinner").show();
    }
  }, 1000);

  $("#scriptBox").val(word);
  $.ajax({
      type: "get",
      url: "http://tvieira.pythonanywhere.com/synonyms/"+word,
      success: function(responseData, textStatus, jqXHR) {
          $("#results").html("")
          if("error" in responseData){
            $("#results").append(
              "<span class='not_found'>Ups, nunca vi essa palavra! =(</span>"
            );
          }
          else{
            words = responseData["response"];
            for(i in words){
              word = words[i];
              textWord = '"' + word[0] + '"';
              html = "<a class='word' href='#' onClick='query(" + textWord + "); return false;' style='font-size:" + Math.pow(word[1],2)*40 + "px'>"+word[0]+"</a> ";
              $("#results").append(html);
            }
          }
          spinner.stop();
          $(".spinner").hide();
          goSpinnerGo = false;
      },
      error: function(jqXHR, textStatus, errorThrown) {
          console.log(errorThrown);
          spinner.stop();
          $(".spinner").hide();
          goSpinnerGo = false;
      }
  })
}

var runScript = function(e){
    if (e.keyCode == 13) {
        var word = $("#scriptBox").val();
        query(word);
    }
    if (e.which === 32){
      return false;
    }
}

$('input').keyup(function(){
    this.value = this.value.toLowerCase();
});
