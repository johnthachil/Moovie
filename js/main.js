$(document).ready(function(){

    var table = $("table").stupidtable();
    table.on("aftertablesort", function (event, data) {
      var th = $(this).find("th");
      th.find(".arrow").remove();
      var dir = $.fn.stupidtable.dir;
      var arrow = data.direction === dir.ASC ? '<i class="fa fa-angle-up"></i>' : '<i class="fa fa-angle-down"></i>';
      th.eq(data.column).append('<span class="arrow">' + arrow +'</span>');
    });


    var tbody = $("#container");
    var template = $("#template").clone();
    var count = 1;
    var search = " ";
    $("#prevpage").hide();
    $("#pagecount").html(count);
    myFunction(count,search);
    $("#nextpage").click(function(e){
      e.preventDefault();
      count++;
      myFunction(count,search);
      if(count>1){
        $("#prevpage").show();
      }
    });
    $("#prevpage").click(function(e){
      e.preventDefault();
      count--;
      myFunction(count,search);
      if(count<2){
        $("#prevpage").hide();
      }
    });
    function myFunction(pageno,search)
    {
      $.ajax(
      {
        url: "https://yts.ag/api/v2/list_movies.json?page="+pageno+"&limit=50&query_term="+search,
        type: 'GET',
        dataType: "json",
        crossDomain: false,
        beforeSend: function() {
          $("#wholecontainer").fadeOut(1);
          $("#footer").fadeOut(1);

          $("#pulse").fadeIn("fast");

    	   },
         error: function (responseData, textStatus, errorThrown)
             {
                 console.warn(responseData, textStatus, errorThrown);
                 alert('CORS failed - ' + textStatus);
             },
        success: function(result){

          $("#pulse").fadeOut(1);
          $("#wholecontainer").fadeIn("slow");
          $("#footer").fadeIn("slow");

          $("#pagecount").html(count);
          tbody.empty();
          var obj = result.data;
          if (obj.movie_count<50) {
              $("#nextpage").hide();
              $("#prevpage").hide()
              $("#backbtn").show();


          }else {
            $("#nextpage").show();
            $("#backbtn").hide();


          }

          var movieslist = obj.movies;
          for (var m in movieslist)
          {
            var movie = movieslist[m];
            var title = movie.title;
            var id    = movie.id;
            var rating    = movie.rating;
            var year    = movie.year;
            var torrents = movie.torrents;
            var mparating = movie.mpa_rating;
            if (!mparating)
            {
            	mparating = "Not-Rated"
            }
            var tempvar = template.clone();
            tempvar.find("#id").html(id);
            tempvar.find("#name").html(title);
            tempvar.find("#name").attr('data-id',id);

            tempvar.find("#rating").html(rating);
            tempvar.find("#year").html(year);
            tempvar.find("#mparating").html(mparating);

            tempvar.find("#torrent1").attr('href',torrents[0].url);

            tempvar.find("#seeds").html(torrents[0].seeds);



            $("#container").append(tempvar);
          }
        }
      });
    }

    $("#searchform").on('submit',function(e) {
       e.preventDefault();
       search=$(this).find("#searchquery").val();
       $(this).find("#searchquery").val("");
       count = 1;
       myFunction(1,search);

     });


});
