module.exports = function(app, db) {
    /*
        POST TO localhost:5001/orders A JSON WITH THE FOLLOWING FORMAT, RETURNS SUCCESS OR FAILURE DEPENDING ON A SIMPLE DATA CHECK
        {
            "totalemployees":30, 
            "vegFree": 5,
            "gluttenFree":8,
            "nutFree":1,
            "fishFree":10
        }
        */
    app.post('/orders', (req, res) => {
        let order = {
            numOfEmployees:req.body.totalemployees, 
            vegetarianRestrictions: req.body.vegFree,
            gluttenRestrictions:req.body.gluttenFree,
            nutRestrictions:req.body.nutFree,
            fishRestrictions:req.body.fishFree
        }
        console.log(req.body);
        
        //IF DEALING WITH DATABASES APPLY FAIL, SUCCESS
        //BASIC DATA VALIDATION
        let completeInfo = true;
        for (let element in order){
            if (order[element] == "") completeInfo = false;
        }
        if (completeInfo){
            // TODO: TIE ORDER TO CALCULATIONS WITH FUNCTIONS TO GET ORDER. 
            res.send('Success');
        }    
        else 
            res.send('Failure');
      });
};