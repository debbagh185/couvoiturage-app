export default class Path{
    id=""
    dep={}
    dest={}
    dateAller={}

    constructor(){

    }

    setId(id_path){
        this.id=id_path;
    }

    getId(){
        return this.id;
    }
}