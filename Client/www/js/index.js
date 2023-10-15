document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

    console.log("Device is ready");
    // depending on the platform set the hostname and port number
    // get the ip address of the server
    
    var platform = cordova.platformId;
    const hostname = platform == "browser" ? "localhost":"10.0.2.2";
    const portNumber = 3000;
    const URL = `http://${hostname}:${portNumber}`;
    $.ajaxSetup({
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        }
    });

    $("#login-error").hide();
    $("#sign-up-error").hide();


    // handle the user login request
    $("#login-form").on("submit", (e) => {
        e.preventDefault();
        let error = "";
        const { usernamel, passwordl } = e.target;
        if (!usernamel.value) {
            error = "Username is required";
            $("#login-error").text(error);
            $("#login-error").show();
        } else if (!passwordl.value) {
            $("#login-error").text(error);
            $("#login-error").show();
            error = "Password is required";
        } else {
            $.post(`${URL}/loginUser`,{"username":usernamel.value,"password":passwordl.value},(reply,status)=>{
                if(reply.authentication === 'success')
                {
                    $("#user-heading").text(`Welcome to you home ${reply.firstname},`)
                    $.mobile.changePage("#dashboard", {
                        transition: "slide"
                    });
                }
                else{
                    alert(reply.message);
                }
                
            })
        }
    });


    // handle the user sign up request
    $("#sign-up-form").on("submit", (e) => {
        e.preventDefault();
        let error = "";
        const { firstname, lastname, username, password, c_password } = e.target;
        if (password.value !== c_password.value) {
            
            error = "Passwords are not matching!";
            $("#sign-up-error").text(error);
            $("#sign-up-error").show();
        }
        else{
            $("#sign-up-error").hide();
            const user = {
                "firstname":firstname.value,
                "lastname":lastname.value,
                "username":username.value,
                "password":password.value
            }
            $.post(`${URL}/createNewUser`,{
                "firstname":firstname.value,
                "lastname":lastname.value,
                "username":username.value,
                "password":password.value
            },(reply,status)=>{
                $("#user-heading").text(`Welcome to you home ${firstname},`)
                $.mobile.changePage("#home",{
                    transition:'slide'
                })
            })
        
            
        }
    });



    // handle the user logout
    $('#logout').click(()=>{
        $.get(`${URL}/logout`,(reply,status)=>{
            alert(reply.message);
            $.mobile.changePage("#home",{
                transition:'slide'
            })
        })
    })


    $('#restaurant-btn').click(()=>{

        // checking if the geo location is available
        if(navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition((p)=>{
                const lattitude = p.coords.latitude;
                const longitude = p.coords.longitude;
                $.post(`${URL}/getNearbyPlace`,{"lat":lattitude,"lon":longitude,"place":"restaurant"},(reply,status)=>{
                    let tableBody = '';
                    reply.data.forEach(element => {
                        tableBody +=`
                    <tr>
                        <td>${element.name}</td>
                        <td> <img src="${element.img}"/>
                        </td>
                        <td>${element.address}</td>
                        <td>${element.opening == true ? "Open":"Closed"}</td>
                        <td>${element.priceindicator? getPriceIndication(element.priceindicator) : "Not Given"}</td>
                        <td>${element.rating}</td>
                        <td>${element.totalrating}</td>
                    </tr>`
                        
                    });
                    

                    // set the table data on the restaurant page
                    $('#table-body').append(tableBody);

                    $.mobile.changePage("#restaurant",{
                        transition:'slide'
                    })
                })
            },(err)=>{
                console.log(err);
            })
        }
 
    })

    $('#shoppingmall-btn').click(()=>{

        // checking if the geo location is available
        if(navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition((p)=>{
                const lattitude = p.coords.latitude;
                const longitude = p.coords.longitude;
                $.post(`${URL}/getNearbyPlace`,{"lat":lattitude,"lon":longitude,"place":"shopping_mall"},(reply,status)=>{
                    let tableBody = '';
                    reply.data.forEach(element => {
                        tableBody +=`
                    <tr>
                        <td>${element.name}</td>
                        <td> <img src="${element.img}"/>
                        </td>
                        <td>${element.address}</td>
                        <td>${element.opening == true ? "Open":"Closed"}</td>
                        <td>${element.priceindicator? getPriceIndication(element.priceindicator) : "Not Given"}</td>
                        <td>${element.rating ? element.rating : "Not given"}</td>
                        <td>${element.totalrating ? element.totalrating : "Not given"}</td>
                    </tr>`
                        
                    });
                    

                    // set the table data on the restaurant page
                    $('#table-body-shopping').append(tableBody);
                    $.mobile.changePage("#shoppingmall",{
                        transition:'slide'
                    })
                })
            },(err)=>{
                console.log(err);
            })
        }
    })

    // handle park requests 
    $('#park-btn').click(()=>{

        // checking if the geo location is available
        if(navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition((p)=>{
                const lattitude = p.coords.latitude;
                const longitude = p.coords.longitude;
                $.post(`${URL}/getNearbyPlace`,{"lat":lattitude,"lon":longitude,"place":"park"},(reply,status)=>{
                    let tableBody = '';
                    reply.data.forEach(element => {
                        tableBody +=`
                    <tr>
                        <td>${element.name}</td>
                        <td> <img src="${element.img}"/>
                        </td>
                        <td>${element.address}</td>
                        <td>${element.opening == true ? "Open":"Closed"}</td>
                        <td>${element.rating ? element.rating : "Not Given"}</td>
                        <td>${element.totalrating ? element.totalrating : "Not Given"}</td>
                    </tr>`
                        
                    });
                    

                    // set the table data on the restaurant page
                    $('#table-body-park').append(tableBody);
                    $.mobile.changePage("#park",{
                        transition:'slide'
                    })
                })
            },(err)=>{
                console.log(err);
            })
        }
    })

    // handle the gym requests
    $('#gym-btn').click(()=>{

        // checking if the geo location is available
        if(navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition((p)=>{
                const lattitude = p.coords.latitude;
                const longitude = p.coords.longitude;
                $.post(`${URL}/getNearbyPlace`,{"lat":lattitude,"lon":longitude,"place":"gym"},(reply,status)=>{
                    let tableBody = '';
                    reply.data.forEach(element => {
                        tableBody +=`
                    <tr>
                        <td>${element.name}</td>
                        <td> <img src="${element.img}"/>
                        </td>
                        <td>${element.address}</td>
                        <td>${element.opening == true ? "Open":"Closed"}</td>
                        <td>${element.rating ? element.rating : "Not Given"}</td>
                        <td>${element.totalrating ? element.totalrating : "Not Given"}</td>
                    </tr>`
                        
                    });
                    

                    // set the table data on the restaurant page
                    $('#table-body-gym').append(tableBody);
                    $.mobile.changePage("#gym",{
                        transition:'slide'
                    })
                })
            },(err)=>{
                console.log(err);
            })
        }
    })

    $('#library-btn').click(()=>{

        // checking if the geo location is available
        if(navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition((p)=>{
                const lattitude = p.coords.latitude;
                const longitude = p.coords.longitude;
                $.post(`${URL}/getNearbyPlace`,{"lat":lattitude,"lon":longitude,"place":"library"},(reply,status)=>{
                    let tableBody = '';
                    reply.data.forEach(element => {
                        tableBody +=`
                    <tr>
                        <td>${element.name}</td>
                        <td> <img src="${element.img}"/>
                        </td>
                        <td>${element.address}</td>
                        <td>${element.opening == true ? "Open":"Closed"}</td>
                        <td>${element.rating ? element.rating : "Not Given"}</td>
                        <td>${element.totalrating ? element.totalrating : "Not Given"}</td>
                    </tr>`
                        
                    });
                    

                    // set the table data on the restaurant page
                    $('#table-body-library').append(tableBody);
                    $.mobile.changePage("#library",{
                        transition:'slide'
                    })
                })
            },(err)=>{
                console.log(err);
            })
        }
    })

    const getPriceIndication = (price)=>{
        if(price == 1)
        {
            return "Cheap";
        }
        else if(price == 2)
        {
            return "Medium";
        }
        else if(price == 3)
        {
            return "Expensive";
        }
        else{
            return "Very Expensive";
        }
    }
}
