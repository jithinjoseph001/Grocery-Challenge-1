function ajax(){
    //Creating XHR object
    
    var xhttp=new XMLHttpRequest();
    
    //Event Listener
    
    xhttp.onreadystatechange=function(){
        //condition
        if(this.readyState==4 && this.status==200){
            var response = JSON.parse(this.responseText);
            var products = response.product;
            var finalPrice = 0;
            var finalPriceText ="";
            var output = "<table><tr><th>S.No</th><th>Item Name</th><th>Quantity</th><th>Unit</th><th>Department</th><th>Notes</th><th>Price</th></tr>";
    
            for(var i=0; i<products.length;i++){
                output += "<tr>"
                output += "<td>" + products[i].serialNo + "</td>";
                output += "<td>" + products[i].name + "</td>";
                output += "<td>" + products[i].quantity + "</td>";
                output += "<td>" + products[i].unit + "</td>";
                output += "<td>" + products[i].department + "</td>";
                output += "<td>" + products[i].notes + "</td>";
                output += "<td>" + products[i].price + "</td>";
                output += "</tr>";
                finalPrice += parseInt(products[i].price);

            }

            output += "</table>"
            finalPriceText = "<p >Total Estimated Price: ₹ " +finalPrice +"</p> <br>";
            document.getElementById("grocery-list-table").innerHTML=output;
            document.getElementById("total-price").innerHTML=finalPriceText;
        }
    }
   
    xhttp.open("GET","items.json",true);
    xhttp.send();
}
    
    
function sortList() {

    var dept = document.getElementById("category-list").value;
    console.log(dept);

    if(dept == "Select") {ajax();}

    else{

            var xhttp=new XMLHttpRequest();
            xhttp.onreadystatechange=function(){
        
                if(this.readyState==4 && this.status==200){
                    var response = JSON.parse(this.responseText);
                    var products = response.product;
                    var finalPrice = 0;
                    var finalPriceText ="";
                    var output = "<table><tr><th>S.No</th><th>Item Name</th><th>Quantity</th><th>Unit</th><th>Department</th><th>Notes</th><th>Price</th></tr>";
                    
                    for(var i=0; i<products.length;i++){
                        if(products[i].department == dept) {
                            output += "<tr>"
                            output += "<td>" + products[i].serialNo + "</td>";
                            output += "<td>" + products[i].name + "</td>";
                            output += "<td>" + products[i].quantity + "</td>";
                            output += "<td>" + products[i].unit + "</td>";
                            output += "<td>" + products[i].department + "</td>";
                            output += "<td>" + products[i].notes + "</td>";
                            output += "<td>" + products[i].price + "</td>";
                            output += "</tr>"
                            finalPrice += parseInt(products[i].price);
                        }
                        else continue;
                    }

                    output += "</table>"
                    finalPriceText = "<p >Total Estimated Price: ₹ " +finalPrice +"</p> <br>";
                    document.getElementById("grocery-list-table").innerHTML=output;
                    document.getElementById("total-price").innerHTML=finalPriceText;
                    
                }
            }
        
            xhttp.open("GET","items.json",true);
            xhttp.send();
        }
}   

var source = new EventSource("index.html");
source.onopen(ajax());