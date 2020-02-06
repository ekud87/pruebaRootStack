class Persona {

    location;
    name;
    gender;
    
    email;
    phone;
    age;


    constructor (datos) {
        this.location = new Location(datos['location']['city'], datos['location']['state'], datos['location']['country']);
        this.name =  datos['name']['first'] +" "+ datos['name']['last'];
        this.gender = datos['gender'];
        this.email = datos['email'];
        this.phone = datos['phone'];
        this.age = datos['dob']['age'];
    }
    
  }

  class Location{

    city;
    state;
    country;

    constructor (city, state, country) {
        this.city = city;
        this.state = state;
        this.country = country;
    }
  }