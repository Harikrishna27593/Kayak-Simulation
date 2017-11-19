const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        //console.log(res);
        //return res.status;
        //res.data;
    //})
        .catch(error => {
            console.log("doLogin - This is error");
            return error;
        });

        
export const getHotelDetails = (hotelPlace,hotelsDateTo,hotelsDateFrom,hotelsRooms) =>
    fetch(`${api}/getHotelDetails?hotelPlace=`+hotelPlace+`&hotelsDateTo=`+hotelsDateTo+`&hotelsDateFrom=`+hotelsDateFrom+`
    &hotelsRooms=`+hotelsRooms+`
    `)
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });



export const getUserDetails = () =>
    fetch(`${api}/getUserDetails`,{credentials:'include'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const carAvailabilityCheck = (payload) =>
    fetch(`${api}/carAvailabilityCheck`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {

        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const FlightAvailabilityCheck = (payload) =>
    fetch(`${api}/FlightAvailabilityCheck`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {

        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const carDetails = (place,dropoff,pickup) =>
    fetch(`${api}/carDetails?place=`+place+`&dropoff=`+dropoff+`&pickup=`+pickup+``)
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });


export const flightDetails = (placefrom,placeto,datefrom,dateto) =>
    fetch(`${api}/flightDetails?placefrom=`+placefrom+`&placeto=`+placeto+`&datefrom=`+datefrom+`&dateto=`+dateto+``)
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });


export const addAdmin = (payload) =>
    fetch(`${api}/addAdmin`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res =>{return res.status})
        .catch(error => {
            console.log("addAdmin This is error");
            return error;
        });

export const addHotelListing = (payload) =>
    fetch(`${api}/addHotelListing`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res =>{return res.status})
    //console.log(res);
    //{ return res.status;}
    //return res.status;
    //res.data;
    //})
        .catch(error => {
            console.log("doLogin - This is error");
            return error;
        });

export const AddFlightListing = (payload) =>
    fetch(`${api}/AddFlightListing`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {

        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const hotelDetails = (payload) =>
    fetch(`${api}/hotelDetails`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res =>{return res.status})
    //console.log(res);
        //{ return res.status;}
    //return res.status;
    //res.data;
    //})
        .catch(error => {
            console.log("doLogin - This is error");
            return error;
        });



export const welcome = () =>
      fetch(`${api}/welcome`, {
          method: 'POST',
          // headers: {
          //     ...headers,
          //     'Content-Type': 'application/json'
          // },
          credentials:'include',
          //body: JSON.stringify(payload)
      }).then(res => res.json())
          //console.log(res);
          //return res.status;
          //res.data;
      //})
          .catch(error => {
              console.log("welcome - This is error");
              return error;
          });

    export const doSignup = (payload) =>
        fetch(`${api}/signup`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body: JSON.stringify(payload)
        }).then(res => {
            console.log(res);
            return res.status;
        })
            .catch(error => {
                console.log("Sign Up - This is error");
                return error;
            });


export const CheckListingIdExists = (payload) =>
    fetch(`${api}/CheckListingIdExists`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {

        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const GetListingDetails = (Type,ID) =>
    fetch(`${api}/GetListingDetails?Type=`+Type+`&ID=`+ID+``)
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const logout = () =>
    fetch(`${api}/logout`, {
        method: 'POST',
        headers: {
            ...headers
        },
        credentials:'include'
    }).then(res => {
        return res.status;
        //res.data;
    })
        .catch(error => {
            console.log("logout - This is error");
            return error;
        });
