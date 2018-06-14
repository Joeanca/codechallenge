window.onload=()=>{
    let form = document.querySelectorAll("#form input");
    let orderDiv = document.querySelector("#order");
    //CONTAINS THE JSON LIST TO BE IMPORTED ON LOAD FROM THE FILE IN THE ROOT DIRECTORY RESTAURANTS.JSON
    let restaurantList = null

    document.querySelector("#submit").onclick= ()=>getDataToCalculateMeals();
    
    document.querySelector("#randomize").onclick = ()=>randomize();
    
    //ON LOAD OF PAGE RANDOMIZE THE VALUES DISPLAYED IN THE INPUT BOXES 
    randomize();
    function getDataToCalculateMeals() {
        // SETUP THE ORDER WITH THE VALUES FROM THE INPUT
        let order = {
            numOfEmployees: Number(form[0].value),
            vegetarianRestrictions: Number(form[1].value),
            gluttenRestrictions: Number(form[2].value),
            nutRestrictions: Number(form[3].value),
            fishRestrictions: Number(form[4].value)
        };
        calculateMeals(order)
    }

    // CALCULATES THE ORDER PASSED IN WHICH TAKES INTO CONSIDERATION THE QUANTITY OF SPECIFIC MEALS AVAILABLE AT EACH RESTAURANT 
    // THE RESTAURANT LIST HAS BEEN AT THIS POINT ORDERED BY RATING (HIGHEST TO LOWEST)
    function calculateMeals(order) {
        order.numOfEmployees -= (order.vegetarianRestrictions + order.gluttenRestrictions + order.nutRestrictions + order.fishRestrictions);
        if (restaurantList != null){
            for (let restaurant of restaurantList){
                restaurant.order = {};
                if (order.vegetarianRestrictions > 0){
                    let available = restaurant.vegFree;
                    let needed = order.vegetarianRestrictions;
                    let remaining = available - needed;
                    if (remaining>=0){
                        restaurant.order.vegFree = needed;
                        order.vegetarianRestrictions -= needed;
                    }else{
                        let ordered = needed + remaining;
                        order.vegetarianRestrictions-=ordered;
                        restaurant.order.vegFree=ordered;
                    }
                }
                if (order.gluttenRestrictions > 0){
                    let available = restaurant.gluttenFree;
                    let needed = order.gluttenRestrictions;
                    let remaining = available - needed;
                    if (remaining>=0){
                        restaurant.order.gluttenFree = needed;
                        order.gluttenRestrictions -= needed;
                    }else{
                        let ordered = needed + remaining;
                        order.gluttenRestrictions-=ordered;
                        restaurant.order.gluttenFree=ordered;
                    }
                }
                if (order.nutRestrictions > 0){
                    let available = restaurant.nutFree;
                    let needed = order.nutRestrictions;
                    let remaining = available - needed;
                    if (remaining>=0){
                        restaurant.order.nutFree = needed;
                        order.nutRestrictions -= needed;
                    }else{
                        let ordered = needed + remaining;
                        order.nutRestrictions-=ordered;
                        restaurant.order.nutFree=ordered;
                    }
                }
                if (order.fishRestrictions > 0){
                    let available = restaurant.fishFree;
                    let needed = order.fishRestrictions;
                    let remaining = available - needed;
                    if (remaining>=0){
                        restaurant.order.fishFree = needed;
                        order.fishRestrictions -= needed;
                    }else{
                        let ordered = needed + remaining;
                        order.fishRestrictions-=ordered;
                        restaurant.order.fishFree=ordered;
                    }
                }
                if (order.numOfEmployees > 0){
                    let available = restaurant.meals;
                    let needed = order.numOfEmployees;
                    let remaining = available - needed;
                    if (remaining>=0){
                        restaurant.order.standardMeals = needed;
                        order.numOfEmployees -= needed;
                    }else{
                        let ordered = needed + remaining;
                        order.numOfEmployees-=ordered;
                        restaurant.order.standardMeals=ordered;
                    }
                }
                // APPEND TO HTML
                let restaurantOrderDiv = document.createElement("LI");
                orderDiv.appendChild(restaurantOrderDiv.appendChild(document.createTextNode("Order from: " + restaurant.name)));
                let detailsUl = document.createElement("UL");

                orderDiv.appendChild(detailsUl)
                for (let orderDetail in restaurant.order){
                    let innerLi = document.createElement("LI");
                    innerLi.appendChild(document.createTextNode("" + [orderDetail] +": " + restaurant.order[orderDetail]));
                    detailsUl.appendChild(innerLi);
                }
                restaurantOrderDiv.appendChild(detailsUl.appendChild(document.createElement("LI").appendChild(document.createTextNode("Order from: " + restaurant.name))));
                orderDiv.appendChild(document.createElement("BR"));
            }
        }

        
    }
   
    // RANDOMIZES THE INPUT BOXES TO HELP TEST THE PROGRAM    
    function randomize(){
        form[0].value =  Math.floor((Math.random() * (50-30+1)) + 30);
        for (let i = 1; i<5; i++){
            form[i].value= Math.floor(Math.random() * 10) + 1;
        }
        document.querySelector("#order").innerHTML = "";
    }
    
    // LOADS THE JSON FILE VIA XMLHTTLREQUEST
    function loadJSONfile(callback) {   
        let request = new XMLHttpRequest();
        request.overrideMimeType("application/json");
        request.open('GET', 'Restaurants.json', true);
        request.onreadystatechange = function () {
              if (request.readyState == 4 && request.status == "200") {
                callback(request.responseText);
              }
        };
        request.send(null);  
    }
    
    // TRIGGERS LOAD OF FILE BY CALLING loadJSONfile FUNCTION
    function init() {
        loadJSONfile(function(resp) {
            restaurantList = JSON.parse(resp);
            restaurantList.sort((a,b)=>{ let result  =0; if(a.rating>b.rating){result=-1;}else if(b.rating>a.rating){result=1;} return result;});
        });
    }
    init();
    }
    
    

// resources consulted:
//https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript