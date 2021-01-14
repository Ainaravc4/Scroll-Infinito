//API Stars Wars

 
var cont=0;
var i=1;
var n=-1;
var peticionEnCurso=false;
function loadDoc() {
    
    if($(window).scrollTop() + $(window).height() >= $(document).height()-10){
        if(!peticionEnCurso){
            
            peticionEnCurso=true;
            if(i!=11){
                $.get("https://www.swapi.tech/api/people/"+i)
                .done(function( datos ) {
                    peticionEnCurso=false;
                    i++;
                    n++;
                    maquetar(datos);

                })
                .fail(function() {
                    alert( "error" );
                })
            }
            
        }
        
    }
    
}

function maquetar(json){
    
    var imgs=["https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png",
    "https://images-na.ssl-images-amazon.com/images/I/71LFpKcZjGL._AC_SL1305_.jpg",
    "https://images-na.ssl-images-amazon.com/images/I/51YLwhk1HiL._AC_.jpg",
    "https://www.cinemascomics.com/wp-content/uploads/2020/06/poder-darth-vader.jpg",
    "https://hipertextual.com/files/2013/03/carrie-fisher-sera-leia.jpg",
    
    "https://blogdesuperheroes.es/imagen-noti/86258_big-1280x720.jpg",
    "https://1.bp.blogspot.com/_wIW55V-xC00/Sy_eNc3mGfI/AAAAAAAACts/xXvuorug67g/s280/beru+joven+2.jpg",
    
    "https://atlantica30.com/content/images/thumbs/0021492_star-wars-figura-16-r5-d4-22-cm.jpeg",
    "https://lumiere-a.akamaihd.net/v1/images/image_606ff7f7.jpeg?region=0%2C0%2C1560%2C780",
    "https://spoiler.bolavip.com/__export/1604585512125/sites/bolavip/img/2020/11/05/00-44_crop1604585147413.jpg_1910439964.jpg"]

    $(".window-notice").hide();

        var div=$("<div></div>").css({
            "background-color": "rgba(255,0,0,0.7)",
            "width":"60%",
            "height":"65vh",
            "margin":"1rem",
            "border-radius":"50px"
        }).addClass("personaje");

        div.attr("url",json.result.properties.url)
        
        $('div.personaje').click(function(){
            $.get($(this).attr('url'))
            .done(function( msg ) {
                console.log(msg)
                maquetarInformacion(msg);
            });
        })


        var img=document.createElement("img");
        img.src=imgs[n];
        img.style.width="50%";
        img.style.borderRadius="20px";
        img.style.height="80%";

        var nombre= document.createElement("p");
        nombre.style.textAlign="center";
        nombre.style.color="white";
        nombre.style.fontSize="20px"
        nombre.textContent=json.result.properties.name;

        $(".subir").hide();
        if(i==11){
            $(".subir").show().click(function(){
                $("html").animate(
                    {scrollTop: 0},4000);
            });
        }
        div.append(nombre);
        div.append(img);
        $("div#demo").append(div);
        cont++;
    
}


function maquetarInformacion(json){
    $(".window-notice").show();
    $("button").click(function(){$(".window-notice").hide();})
    var info=document.getElementById("datos");
    
    info.style.backgroundColor="rgba(0,0,255,0.9)";
    info.style.opacity="0.7";

    //creacion de los datos
    var alto=document.getElementById("altura");
    var peso=document.getElementById("peso");
    var pelo=document.getElementById("pelo");
    var piel=document.getElementById("piel");

    
    //contenido de los datos
    alto.textContent="Height: "+json.result.properties.height+" cm";
    peso.textContent="Mass: "+json.result.properties.mass+" Kg";
    pelo.textContent="Hair Color: "+json.result.properties.hair_color;
    piel.textContent="Skin Color: "+json.result.properties.skin_color;
}


window.onload=()=>{
    setInterval(loadDoc,400)
}