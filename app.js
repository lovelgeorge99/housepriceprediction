
function onPageLoad(){
  console.log("Document Loaded");
  var url="https://lovelgeorge.pythonanywhere.com/get_location_names";
  $.get(url,function(data,status){
      console.log("Got response from location request");
     ;
     var d={};
     var location=data.locations;
     for(var i in location){
       d[location[i].toUpperCase()]=null;
       
     }
      $('input.autocomplete').autocomplete({
        data:d,
      });
      

  })
} 

function get_Values(){
  var area=parseFloat(document.getElementById("area").value);
  var bhk=parseInt(document.getElementById("bhk").value);
  var bath=parseInt($("input[name='uibath']:checked").val());
  var location=document.getElementById("location").value.toLowerCase();

  return [area,bhk,bath,location];
}
function getEstimatedPrice(){
  console.log("Estimate price button clicked");
  list=get_Values()
  var sqft =list[0]
  var bhk = list[1]
  var bathrooms = list[2]
  var location = list[3]

  var url = "https://lovelgeorge.pythonanywhere.com/predict_home_price"; 
  $.post(url,{
      total_sqft:sqft,
      bhk: bhk,
      bath: bathrooms,
      location: location
  },function(data, status) {
      var result=document.getElementById("result")
      result.innerHTML=data.estimated_price;
      console.log(status);
  });
}

$(document).ready(function(){
  onPageLoad();
  $('select').formSelect();
  

  
});
