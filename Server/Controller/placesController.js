const getPlacesUrl = (lat,lon,place)=>{
    return `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=50000&types=${place}&key=AIzaSyA8C9hXpJyZ8Cg5h1XuiJAqPYFrXcImPtc`;
}

const getImageUrl = (photos)=>{
    if(photos)
    {
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${photos.width}&photoreference=${photos.photo_reference}&key=AIzaSyA8C9hXpJyZ8Cg5h1XuiJAqPYFrXcImPtc`;
    }
    else{
        return `https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2029&q=80`;
    }
}


const handleGetPlaces = async (req,res)=>{
    const {lat,lon,place} = req.body;
    
    const placeUrl = getPlacesUrl(lat,lon,place);

    try {
        const preData = await fetch(placeUrl);
        const data = await preData.json();

        let mydata = "";
        
        if(place === "restaurant")
        {
           mydata =  getRestautantDetails(data);
        }
        else if(place === 'shopping_mall')
        {
            mydata = getShoppingMallDetails(data);
        }
        else if(place === 'park')
        {
            mydata = getParkDetails(data);
        }
        else if(place === 'gym')
        {
            mydata = getGymDetails(data);
        }
        else if(place === 'library')
        {
            mydata = getLibraryDetails(data);
        }



        res.json({'message':'success',"data":mydata});
        // create a new array with the necessary data and send the array back to the client
        
        
    } catch (error) {
        console.error(error);
        res.json({'message':'failed'});
    }

   
   
}

const getRestautantDetails = (data)=>{

    const mydata = data.results.map(element => {
        const imgUrl = getImageUrl(element.photos ? element.photos[0]:null);
                return {"name":element.name,
                        "img":imgUrl,
                        "address":element.vicinity,
                        "opening":element.opening_hours? element.opening_hours.open_now :true,
                        "priceindicator":element.price_level,
                        "rating":element.rating,
                        "totalrating": element.user_ratings_total}
    });

    return mydata;
    
}

const getShoppingMallDetails = (data)=>{


    const mydata = data.results.map(element => {
        const imgUrl = getImageUrl(element.photos ? element.photos[0]:null);
                return {"name":element.name,
                        "img":imgUrl,
                        "address":element.vicinity,
                        "opening":element.opening_hours? element.opening_hours.open_now :true,
                        "priceindicator":element.price_level,
                        "rating":element.rating,
                        "totalrating": element.user_ratings_total}
    });

    return mydata;

}

const getParkDetails = (data)=>{
  
    const mydata = data.results.map(element => {
        const imgUrl = getImageUrl(element.photos ? element.photos[0]:null);
                return {"name":element.name,
                        "img":imgUrl,
                        "address":element.vicinity,
                        "opening":element.opening_hours? element.opening_hours.open_now :true ,
                        "rating":element.rating,
                        "totalrating": element.user_ratings_total}
    });

    return mydata;
}

const getGymDetails = (data)=>{

    const mydata = data.results.map(element => {
        const imgUrl = getImageUrl(element.photos ? element.photos[0]:null);
                return {"name":element.name,
                        "img":imgUrl,
                        "address":element.vicinity,
                        "opening":element.opening_hours? element.opening_hours.open_now :true ,
                        "rating":element.rating,
                        "totalrating": element.user_ratings_total}
    });

    return mydata;

}

const getLibraryDetails = (data)=>{
    const mydata = data.results.map(element => {
        const imgUrl = getImageUrl(element.photos ? element.photos[0]:null);
                return {"name":element.name,
                        "img":imgUrl,
                        "address":element.vicinity,
                        "opening":element.opening_hours? element.opening_hours.open_now :true ,
                        "rating":element.rating,
                        "totalrating": element.user_ratings_total}
    });

    return mydata;

}

module.exports = {handleGetPlaces};