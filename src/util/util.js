export function recibeDe(tipoSangre){
    var res = [];
    switch(tipoSangre){
        case ("A+" || "a+"):
            res = ["A+","A-","0+","0-"];
            break;
        case ("A-" || "a-"):
            res = ["A-","0-"];
            break;
        case ("B+" || "b+"):
            res = ["B+","B-","0+","0-"];
            break;
        case ("B-" || "b-"):
            res = ["B-","0-"];
            break;
        case ("AB+" || "ab+"):
            res = ["A+","A-","B+","B-","AB+","AB-","0+","0-"];
            break;
        case ("AB-" || "ab-"):
            res = ["A-","B-","AB-","0-"];
            break;
        case ("0+"):
            res = ["0+","0-"];
            break;
        case ("0-"):
            res = ["0-"];
            break;
        default: 
            res = []; 
    }
    return res
}
