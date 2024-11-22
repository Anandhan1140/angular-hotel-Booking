export class Country{
    constructor(
        public  countryId : number,
        public  countryName:string

    ){}
}


export class State{
    constructor(
        public stateId : number,
        public stateName : string,
        public  countryId : number,

    ){}
}

export class District{
    constructor(
        public districtId : number,
        public districtName : string,
        public stateId : number,
    ){}
}


export class HotelFacility{
    constructor(
        public hotelFacility_Id : number,
        public hotelFacilityName : string
    ){}
}