function openwindow(el) {
  var newval = $(el).attr("data-id");

  var modtemp = $(".modcontainer").clone();
  $.ajax({
    url: "https://yts.ag/api/v2/movie_details.json?movie_id=" + newval,
    type: 'GET',
    dataType: "json",
    crossDomain: true,
    success: function(result) {
      $('.modcontainer').empty();
      $('#justcontainer').empty();

      var obj          = result.data;
      var movie        = obj.movie;
      var title        = movie.title_long;
      var summary      = movie.summary;
      var rating       = movie.rating;
      var image        = movie.medium_cover_image;
      var torrents     = movie.torrents;
      var trailer      = movie.yt_trailer_code;
      var trailer_link = "//www.youtube.com/watch?v=" + trailer;
      var genres       = movie.genres[0]
      var tempmod      = modtemp.clone();

      if (movie.genres[1]) {
        genres = genres + "," + movie.genres[1];
      }
      if (movie.genres[2]) {
        genres = genres + "," + movie.genres[2];
      }

      tempmod.find("#myModalLabel").html(title);
      tempmod.find("#modsummary").html(summary);
      tempmod.find("#modimg").attr('src', image);
      tempmod.find("#modrating").attr('data-rating', rating);
      tempmod.find("#modrat").html(rating);
      tempmod.find("#genres").html(genres);
      tempmod.find("#watch").attr('href', trailer_link);
      tempmod.find("#modlink").attr('href', torrents[0].url);
      tempmod.find("#modlink1").attr('href', torrents[1].url);
      $("#justcontainer").append(tempmod);
      console.log(summary.length);
      if (summary.length > 600) {
        $("#modsummary").css({"box-shadow": "inset 0 -3px 3px -4px  #000000"});
      }else{
        $("#modsummary").css({"box-shadow": "none"});

      }

      openmodal1();
    }
  });

  function openmodal1() {
    $('.ratebox').raterater();
    $('#myModal').modal('toggle');
  }

}
