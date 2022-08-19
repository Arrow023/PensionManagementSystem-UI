export class PensionerDetails {
    constructor (
        public name : string,
        public dateOfBirth : Date,
        public pan : string,
        public aadhaarNumber : number,
        public salaryEarned : number,
        public allowances : number,
        public pensionTypeNumber : number,
        public bank : any
    ){}

    get pensionType() : string
    {   
        if(this.pensionTypeNumber == 0)
            return "Self";
        else
            return "Family";
    }
    

    get bankType() : string 
    {
        if(this.bank.type == 0)
            return "Public";
        else
            return "Private";
    }
}