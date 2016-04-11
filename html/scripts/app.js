var query = function(word){
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
              console.log(word);
              textWord = '"' + word[0] + '"';
              html = "<a class='word' href='#' onClick='query(" + textWord + "); return false;' style='font-size:" + Math.pow(word[1],2)*40 + "px'>"+word[0]+"</a> ";
              console.log(html);
              $("#results").append(html);
            }
          }
      },
      error: function(jqXHR, textStatus, errorThrown) {
          console.log(errorThrown);
      }
  })
}

var runScript = function(e) {
    if (e.keyCode == 13) {
        var word = $("#scriptBox").val();
        query(word);
    }
    if (e.which === 32){
      return false;
    }
}
