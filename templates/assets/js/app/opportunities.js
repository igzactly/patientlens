$( document ).ready(function() {
    getAll();
    
   
});

$( document ).ready(function() {
    getAll();
    
   
});




function getAll(){
    // $.blockUI({ message: '<h4><img src="../assets/img/loading.gif" /></h4>',css: {
    //     backgroundColor: 'transparent',
    //   border: '0'
    //   } }); 
    blockPage();
    var postdata="";
    postBack("opportunities/getAllOpenOpportunities","postdata="+postdata,function(response){
          var json=JSON.parse(response);
          opportunities = json.data
          var output=eval(json.data);
          console.log(output);
           $("#tableBody").html("");
            for (var i = 0; i < output.length; i++) {

                var tableData = "<tr>";
                tableData +=  "<td><div class='d-flex px-2 py-1'><div class='d-flex flex-column justify-content-center'><h6 class='mb-0 text-sm'>" +output[i].role+"</h6>"

                 tableData +=   "<p class='text-xs text-secondary mb-0'>"+ output[i].manager +"</p></div></div> </td> <td><p class='text-xs font-weight-bold mb-0'>"+output[i].posted_by +"</p>";
                 tableData += " <p class='text-xs text-secondary mb-0'>"+"Mumbai"+"</p></td>";
                if(output[i].status=="1")
                    {tableData+="<td class='align-middle text-center text-sm'><span class='badge badge-sm bg-gradient-success'>OPEN</span>";}
                else{tableData+="<td class='align-middle text-center text-sm'><span class='badge badge-sm bg-gradient-warning'>CLOSED</span>";}
                tableData+="</td>";
                tableData+="<td class='align-middle'>  <a href='javascript:;' class='text-secondary font-weight-bold text-xs' data-toggle='tooltip' data-original-title='Edit user'> Edit</a></td></tr>";
                 tableData += "</tr>";
                $("#tableBody").append(tableData);
               

                
          }
          $.unblockUI();
          
             
             });
 }