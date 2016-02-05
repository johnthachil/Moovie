$(document).ready(function(){
    var search = " ";
    var count = 1;

    myFunction(count,search);
    function myFunction(pageno,search)
    {
      $.ajax(
      {
        url: "https://yts.ag/api/v2/list_movies.json?page="+pageno+"&limit=20&query_term="+search,
        type: 'GET',
        dataType: "json",
        crossDomain: false,
        beforeSend: function() {
          $("#wholecontainer").fadeOut(1);
          $("#footer").fadeOut(1);
          $("#pulse").fadeIn("fast");

    	   },
        success: function(result){
          $("#pulse").fadeOut(1);
          $("#wholecontainer").fadeIn("slow");
          $("#footer").fadeIn("slow");
          var obj = result.data;
          var movieslist = obj.movies;
          for (var m in movieslist)
          {
            var movie    = movieslist[m];
            var title    = movie.title;
            var id    = movie.id;
            var image    = movie.medium_cover_image;
            $("#scroll").append(
              '<div class="image atvImg '+id+'">'+
                '<div class="atvImg-layer" data-id="'+id+'" data-img="'+image+' "></div>'+
              '</div>'


            )
            atvImg();


          }
          $("#scroll").append('<br>');
          for (var m in movieslist)
          {
            var movie    = movieslist[m];
            var title    = movie.title;
            var id    = movie.id;

            $("#scroll").append('<a id="title" data-id="'+id+'" href="#" class="title">'+title+'</a>');

          }
        }
      });
    }



});
