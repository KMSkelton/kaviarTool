$(document).ready(function() {

  Handlebars.registerHelper('cycle', function(value, index, block) {
    var values = value.split(' ');
    return values[index % values.length];
  });

  Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
  });

  $("#table_id").hide();
  $("form").submit(function(event) {
      event.preventDefault();
      var kaviarData = {
	"frz": $("select[name=frz]").val(),
	"onebased": $("select[name=onebased]").val(),
	"onebased_output": $("select[name=onebased_output]").val(),
	"variant_type": $("select[name=variant_type]").val()
      };
      var minMaf = $("input[name=min_maf]").val();
      if (minMaf) {
	kaviarData["min_maf"] = minMaf;
      }
      var maxMaf = $("input[name=max_maf]").val();
      if (maxMaf) {
	kaviarData["max_maf"] = maxMaf;
      }
      var ctType = "application/x-www-form-urlencoded; charset=UTF-8"; 
      var process = "true";
      var chromCheck = $("input[name=chr]").val();
      var posCheck = $("input[name=pos]").val();
      var listCheck = $("textarea[name=list]").val();
      var fileCheck = $("input[name=uploaded_file]").val();

      if (chromCheck && posCheck) {
	kaviarData["chr"] = chromCheck;
	kaviarData["pos"] = posCheck;
      }
      else if (listCheck) {
	kaviarData["list"] = listCheck;
      }
      else if (fileCheck) {
	kaviarData["uploaded_file"] = fileCheck;
	var fileInput = $("input[name=uploaded_file]");
	var file = fileInput.get(0).files[0];
	kaviarData = new FormData();
	kaviarData.append('uploaded_file',file);
	ctType = false;
	process = false;
      }	

      $("#loading").show();
      $.ajax({
	type: "POST",
	url: "http://db.systemsbiology.net/kaviar-beta/cgi-pub/Kaviar",
	data: kaviarData,
	contentType: ctType,
	processData: process,
	cache: false,
	//error: function (xhr) {
	   //alert(JSON.stringify(xhr));
	//},
	beforeSend: function(jqXHR, settings) {
	  console.log(settings.url+ '?' + settings.data);
	},
	success: function(data, textStatus, jqXHR){
	  $("#loading").hide();
	  if (data.sites.length === 0 ) { // if all results were filtered out by MAF filters
	     $("#filtered").show();
	     $("#filtered").append("<p>All results filtered by MAF filters</p>");
	  } else {
             //display the table
             var templateFile = location.origin+"/kaviar-beta/templates/table.html";
             $.get(templateFile, function(response) {
               var template = response;
               var templateScript = Handlebars.compile(template);
               var html = templateScript(data);
               $("#result").html(html);
               $("#result").show();
             });
             // display download link for text
             var downloadTemplateFile = location.origin+"/kaviar-beta/templates/text.download.html";
             var downloadLinkName = "Download text.";
             $.get(downloadTemplateFile, function(response) {
               var downloadScript = Handlebars.compile(response);
               var html = downloadScript(data);
               // create download link
               var link = '<a download="kaviar.txt" href="data:text/plain;charset-utf8,'+encodeURIComponent(html)+'">'+downloadLinkName+'</a><br />';
               $("#downloadLink").append(link);
             });
	  
             // display download link for json
             downloadTemplateFile = location.origin+"/kaviar-beta/templates/json.download.html";
             var downloadLinkNameJSON = "Download JSON.";
             $.get(downloadTemplateFile, function(response) {
               var downloadScript = Handlebars.compile(response);
               var html = downloadScript(data);
               // create download link
               var link = '<a download="kaviar.json" href="data:application/json;charset-utf8,'+encodeURIComponent(html)+'">'+downloadLinkNameJSON+'</a>';
               $("#downloadLink").append(link);
             });
	  

          } // end if data
          $("#kaviarSearch").toggleClass("collapsed");
          $("kaviarForm").toggleClass("wrapper");
	},
	error: function(jqXHR, textStatus, errorThrown){
	  console.log(jqXHR + "  jqXHR in error");
	  console.log(textStatus + "  textStatus in error");
	  console.log(errorThrown + "  errorThrown in error");
	}
      });
  }); //end form submit

  $(".expander").click(function() {
    console.log("expander clicked");
    console.log($(this).html());
    buttonText = $(this).html() == '+' ? '-' : '+';
    $("#kaviarSearch").toggleClass("collapsed");
    return false;
  });

});// end document.ready
