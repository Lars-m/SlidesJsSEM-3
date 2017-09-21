/*
 Lars Mortensen, Summer 2014
 */

function getType(str) {
  var index = str.lastIndexOf(".") + 1;
  return str.substr(index);
}

function getNamePlain(str) {
  var index = str.lastIndexOf("/") + 1;
  return str.substr(index);
}

function isImage(str) {
  var index = str.lastIndexOf(".") + 1;
  var type = str.substr(index);
  return (type==="png" || type==="jpg" || type==="svg");
}

var entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': '&quot;',
  "'": '&#39;',
  "/": '&#x2F;'
};

function escapeHtml(string) {
  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
}
var imageStyle = "";

function makeHandler(path, fileName, content, iframe, btnDiv, comment, first, showThisAllways,include) {
  return function () {
    file = path + fileName;
    btnDiv.children().each(function (i, e) {
      $(e).attr("class", "btn btn-default");
    })
    $(this).attr("class", "btn btn-primary");
    if (showThisAllways) {
      iframe.attr("src", path + showThisAllways);
    }
    else if (fileName.toLowerCase().indexOf("index") === 0) { // In order to show live on slides file must be named indexXXXXX
      iframe.attr("src", file);
    }
    var type = getType(file);
    if (isImage(file)) {
      var data = "<img src='"+file+"' style='"+imageStyle+"'>";
      console.log(imageStyle);
      content.html(data);

    }
    else $.ajax({
      url: file,
      dataType : "text"  //Text since script will trigger the script
    }).done(function (data) {
        if (type === 'html') {
          //Get Comments for slide if any
          var start = data.search("<!--commentForSlides");
          var end = data.length;
          if (start > -1 && end > -1) {
            start += "<!--commentForSlides".length;
            end -= "commentForSlides-->;".length;
            var commentText = data.substr(start, end - start);

            comment.html(commentText);
          }
//                else {
//                    comment.html("");
//                }
        }
        if (type === "js") {  //Do this before escaping data
          //Get comment if any
          var start = data.indexOf("/**#");
           var end = data.indexOf("#**/");
          if (start > -1 && end > -1) {
            start += "/**#".length;
            //end -= "##//".length;
            var commentText = data.substr(start, end - start);
            comment.html(commentText);
          }
          var showStart = (include instanceof Object && include.start!= null && include.end != null) ?
                           include.start : "//ShowStart";
          var showEnd = (include instanceof Object && include.start!= null && include.end != null) ? include.end : "//ShowEnd";
          //console.log(showStart + ", "+showEnd);
          //Get JavaScript to show
          var start = data.search(showStart);
          var end = data.search(showEnd);
          if (start > -1 && end > -1) {
            start += showStart.length;
            data = data.substr(start, end - start);
          }
        }
        data = escapeHtml(data);  //We escape everything, JavaScript could have inline HTML strings
        if (type === "html") {

          //Get HTML to show
          var start = data.search("&lt;!--show--&gt;");
          var end = data.search('&lt;!--&#x2F;show--&gt;');
          if (start > -1 && end > -1) {
            start += 18;
            data = data.substr(start, end - start);
          }
        }
        content.html(data);
        if (typeof(prettyPrint) == "function") {
          prettyPrint();
        }
    });
  };
}

//Code to allow for more than one show section
//if(getType(file)==="html") {
//    var start = 0;
//    while(start > -1) {
//        start = data.search("&lt;!--show--&gt;");
//        var end = data.search('&lt;!--&#x2F;show--&gt;');
//        if (start > -1 && end > -1) {
//            start += 18;
//            var sepatator = "";
//            if(dataToShow !== ""){
//                sepatator = "\n....\n";
//            }
//            dataToShow = dataToShow + sepatator + data.substr(start, end - start);
//            data = data.slice(0, start-18) + data.slice(end+20);
//        }
//    }
//}

(function ($) {
  $.fn.exPresenter = function (options) {

    var settings = $.extend({
      directory: '',
      codeClass: '',
      presenterClass: "",
      codeStyle: '',
      presenterStyle: '',
      commentClass: "",
      commentStyle: "",
      btnDivStyle: "",
      manifest:"manifest.json"
    }, options);
    var control = this;
    if(settings.imageStyle) {
      imageStyle = settings.imageStyle;
    }

    this.append("<div></div>");
    var btnDiv = this.children(":first");
    btnDiv.attr("style", settings.btnDivStyle)

    this.append("<pre></pre>");
    var content = this.children().eq(1);
    content.attr("class", settings.codeClass);
    content.attr("style", settings.codeStyle);

    this.append("<iframe ></iframe>");
    var iframe = this.children().eq(2);
    iframe.attr("class", settings.presenterClass);
    iframe.attr("style", settings.presenterStyle);


    this.append("<div><div></div></div>");//inner div to allow for the slides build behaviour
    var comment = this.children().eq(3);
    comment.attr("class", settings.commentClass);
    comment.attr("style", settings.commentStyle);
    var comment = comment.children(":first");

    $.getJSON(settings.directory + settings.manifest, function (data) {
      var i = 0;
      var firstBtn;
      var file= "";
      var title;
      var include;
      data.files.forEach(function (fileInfo) {
          title=null;
          if(fileInfo instanceof Object){
          file = fileInfo.fileName;
          if(fileInfo.title !=null){
            title = fileInfo.title;
          }
          if(fileInfo.include instanceof Object){
            include = fileInfo.include;
          }
        }
        else{
          file= fileInfo;
        }
        title = title!= null ? title : file;
//                if (getType(file) === "md") {
//                    return;
//                }
        //Hardcoded to allow for only one image

        if(isImage(file)){
          title = settings.imageTitle ? settings.imageTitle : file;
        }

        title = getNamePlain(title);
        btnDiv.append("<button class='btn btn-default'>" + title + "</button>");
        var btn = btnDiv.children().eq(i);
        var showThisAlways = data.showThisAlways;
        btn.click(makeHandler(settings.directory, file, content, iframe, btnDiv, comment, i === 0, showThisAlways,include));
        i++;
      });


      if (data.usePlunk) {
        btnDiv.append("<button class='btn btn-success'>Edit in Plunker</button>");
        var btn = btnDiv.children().eq(i);
        btn.click(function () {
          var url = "http://plnkr.co/edit/?p=preview";
          var form = $('<form id="as321weht5" style="display: none;" method="post" action="' + url + '"></form>');
          var promises = [];
          data.filesOnlyForPlunkr.forEach(function (file) {
            var uri = settings.directory + file;
            var request = $.ajax({
              url: uri,
              cache: false,
              dataType: "text"
            }).done(function (content) {
              var n = "files[" + file + "]";
              var el = $('<input type="hidden" name=' + n + '>');
              el.attr("value", content);
              form.append(el);
            }).fail(function (xhr, ajaxOptions, thrownError) {
              console.log("error" + xhr.status + ": File: "+file+", " + thrownError);
              // alert( "error"+xhr.status+"\n"+thrownError );
            });
            promises.push(request);
          });


          $.when.apply(null, promises).then(function () {
            var el = $('<input type="hidden" name="description" value=' + data.description + '>');
            form.append(el);
            el = $('<input type="hidden" name="private" value="true">');
            form.append(el);

            //Submitting without appending to the page seems to work in Chrome, but not in FireFox and IE
            //Need to append to the page to work in these two browsers
            $('body').append(form);
            var formtosubmit = $("#as321weht5");
            formtosubmit.submit();
            formtosubmit.remove();

          });

        });
      }
      btnDiv.children(":first").click();

    });
    //});
  };
})(jQuery);
