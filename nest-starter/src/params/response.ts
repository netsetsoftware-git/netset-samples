export class ResponseModel {

    constructor(message:string) {
        this.message = message
    }

    message : string
    data?: any

    setData(key : string, data : any) : ResponseModel {
        if(!this.data)  {
         this.data =  {}
        }
 
        this.data[key] = data
        return this
     }
}