export default class Ad{
    id= ""
    prixParPlace= ""
    nbrPlaces= ""
    id_path=""

    constructor(){
       
    }

    setId(id_ad){
        this.id=id_ad;
    }

    getId(){
        return this.id;
    }
}