var tocData;
function hookupTOCEvents()
{
  // do after tree render
  $('.expand-menu').on('click touchstart', function(elem) {
//      menu = elem.currentTarget.nextElementSibling
    menu = elem.currentTarget.parentElement
    if (menu.classList.contains("menu-closed")) {
      menu.classList.remove("menu-closed")
      menu.classList.add("menu-open")
    } else {
      menu.classList.add("menu-closed")
      menu.classList.remove("menu-open")
    }
    return false;
  });
  $(".currentPage").each(function(){
    $(this).parentsUntil($('.docsidebarnav_section')).addClass("active").removeClass("menu-closed").addClass("menu-open");
  });
  $(".left-off-canvas-menu").css("display","block");
}
jQuery(document).ready(function(){
    hookupTOCEvents();
    $("#TableOfContents ul").empty();

    var prevH2Item = null;
    var prevH2List = null;

    var index = 0;
    var currentHeader = 0, lastHeader = 0;
    var output = "<ul>";
    $("h1, h2, h3, h4").each(function() {
        var li= "<li><a href='" + window.location + "#" + $(this).attr('id') + "'>" + $(this).text().replace("¶","") + "</a></li>";
        if( $(this).is("h2") ){
          // h2
          currentHeader = 2;
        } else if( $(this).is("h3") ){
          // h3
          currentHeader = 3;
        } else if( $(this).is("h4") ) {
          // h4
          currentHeader = 4;
        }
        console.log("currentHeader ",currentHeader, "lastHeader ",lastHeader, "text ", $(this).text());
        if (currentHeader > lastHeader) {
            // nest further
            output += "<ul>"
        }
        if (currentHeader < lastHeader && lastHeader > 0) {
            // close nesting
            console.log("Closing nesting because ", lastHeader, "is <", currentHeader);
            for (i=0; i < (lastHeader - currentHeader); i++)
            {
              output += "</ul>"
            }
        }
        output += li;
        lastHeader = currentHeader;
        /*
        if( $(this).is("h2") ){
            prevH2List = $("<ul></ul>");
            prevH2Item = $(li);
            prevH2Item.append(prevH2List);
            prevH2Item.appendTo("#TableOfContents ul");
        } else {
            prevH2List.append(li);
        }
        index++;*/
    });
    output += "</ul>";
    $("#TableOfContents").html(output);
});
