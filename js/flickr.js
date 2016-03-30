$(document).ready(function(){
    
 var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    $('form').submit(function(evt){
        var $submitButton=$("#submit");
        var $searchField=$('#search');
        evt.preventDefault();
        $searchField.prop("disabled",true);
        $submitButton.attr("disabled",true).val("searching..")
        var stuff=$searchField.val();
        var flickrOptions={
            tags:stuff,
            format:"json"
        };
        function displaySearch(data){
            var photoHTML='<ul>';
            $.each(data.items, function(i, photo){
                photoHTML+='<li class="grid-25 tablet-grid-50>';
                photoHTML+='<a href"'+ photo.link + ' " class="image">';
                photoHTML+='<img src= "'+ photo.media.m +'"></a></li>';          
            });
            photoHTML+='</ul';
            $('#photos').html(photoHTML);
            $searchField.prop("disabled",false);
            $submitButton.attr("disabled",false).val("submit");
        }
         $.getJSON(flickerAPI, flickrOptions, displaySearch);

    });
    
    
    $('button').click(function(){
        $("button").removeClass("selected");
        $(this).addClass("selected");
        
        var animal=$(this).text(); //will hold 'cat' when cat button is clicked
        //we need to send this along to flickr
        var flickrOptions={
            tags: animal,
            format: "json"
        };
        function displayPhotos(data){ //data: json data returned by jquery
            var photoHTML='<ul>';
            $.each(data.items, function(i, photo){
                photoHTML+='<li class="grid-25 tablet-grid-50>';
                photoHTML+='<a href"'+ photo.link + ' " class="image">';
                photoHTML+='<img src= "'+ photo.media.m +'"></a></li>';
                
            });
            photoHTML+='</ul';
            $('#photos').html(photoHTML);
        }
        $.getJSON(flickerAPI, flickrOptions, displayPhotos);
    });
});