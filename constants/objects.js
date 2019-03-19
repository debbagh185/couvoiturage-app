let objects = {
    Cities: [
        {
            id:"essaouira",
            name: "Essaouira, Maroc",
            lat: 31.511647,
            lng: -9.7740122
        },
        {
            id:"marrakech",
            name: "Marrakech, Maroc",
            lat: 31.6347485,
            lng: -8.0778939
        },
        {
            id:"chichaoua",
            name: "Chichaoua, Maroc",
            lat: 31.5352162,
            lng: -8.7775827
        },

    ],
    Cars:[
        {
            id:"car1",
            vehicule:"Ma-45876022",
        },
        {
            id:"car2",
            vehicule:"Ma-85214796",
        }
    ],
    Paths:[
        {
            id:"path1",
            dep:{
                id:"chichaoua",
                name: "Chichaoua, Maroc",
                lat: 31.5352162,
                lng: -8.7775827
            },
            dest:{
                id:"essaouira",
                name: "Essaouira, Maroc",
                lat: 31.511647,
                lng: -9.7740122
            },
            dateAller:{
                jour: "28 March 2019",
                heure: "21:45"
            },
            dateRoteur:{}
        },
        {
            id:"path2",
            dep:{
                id:"marrakech",
                name: "Marrakech, Maroc",
                lat: 31.6347485,
                lng: -8.0778939
            },
            dest:{
                id:"chichaoua",
                name: "Chichaoua, Maroc",
                lat: 31.5352162,
                lng: -8.7775827
            },
            dateAller:{
                jour: "20 March 2019",
                heure: "09:00"
            },
            dateRoteur:{}
        }

    ],
    Ads:[
        {
            id:"ad1",
            prixParPlace:"40Dh",
            nbrPlaces: 2
        }
    ],
    
}

export default objects;