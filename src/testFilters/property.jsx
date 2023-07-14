import React, { useState } from 'react'
import ByState from './ByState';


const MyComponent = () => {
const [property, setproperty] = useState([
  {
    "id": 1,
    "property_id": 26505,
    "property_name": "1,210 SFT Flat in Radiant Elitaire, JP Nagar, Bengaluru",
    "short_description": "",
    "purchasable": 0,
    "slug": "1210-sft-flat-in-radiant-elitaire-jp-nagar-bengaluru",
    "type": "",
    "featured": 0,
    "categories": [
        "Residential Flat"
    ],
    "discount_percentage": "60.00",
    "application_end_date": "2023-03-18T00:00:00.000Z",
    "reserve_price": "3630000.00",
    "estimated_value": "7865000.00",
    "state": "Karnataka",
    "auction_start_date_time": "2023-03-20T14:00:00.000Z",
    "auction_end_date_time": null,
    "city": "Bengaluru",
    "location": null,
    "auction_type": "Open",
    "address": "Flat No. 705, 7th Floor, Jumbo Sawari, Royal County, J P Nagar, 8th Phase, Bengaluru, Karnataka ",
    "bank_name": "Tata Capital Housing Finance",
    "street": "<iframe src=\"https://www.google.com/maps/embed?pb=!4v1676618148634!6m8!1m7!1smxKfwllT24MMQ1JMCRmhlA!2m2!1d12.86627222587831!2d77.58099529427344!3f251.",
    "panoramic_image": "",
    "possession_status": "Physical Possession",
    "built_up_area": "N/A",
    "total_area": "1,210 SFT SBA",
    "latitude": "12.866350292083643",
    "longitude": "77.58051730660176",
    "emd": "363000",
    "auction_time_extension": "10 Minutes",
    "sro_office": "",
    "images": [],
    "created_at": "2023-04-24T10:50:33.000Z",
    "updated_at": "2023-04-24T15:40:05.000Z",
    "minimum_increment": "0.00",
    "hot_property": null,
    "status": 1
},
{
  "id": 2,
  "property_id": 26502,
  "property_name": "1,170 SFT Flat in Radiant Elitaire, JP Nagar, Bengaluru",
  "short_description": "",
  "purchasable": 0,
  "slug": "1170-sft-flat-in-radiant-elitaire-jp-nagar-bengaluru-2",
  "type": "",
  "featured": 0,
  "categories": [
      "Residential Flat"
  ],
  "discount_percentage": "60.00",
  "application_end_date": "2023-03-18T00:00:00.000Z",
  "reserve_price": "3510000.00",
  "estimated_value": "7600000.00",
  "state": "Karnataka",
  "auction_start_date_time": "2023-03-20T14:00:00.000Z",
  "auction_end_date_time": null,
  "city": "Bengaluru",
  "location": null,
  "auction_type": "Open",
  "address": "Flat No. 703, 7th Floor, Jumbo Sawari, Royal County, J P Nagar, 8th Phase, Bengaluru, Karnataka ",
  "bank_name": "Tata Capital Housing Finance",
  "street": "<iframe src=\"https://www.google.com/maps/embed?pb=!4v1676618148634!6m8!1m7!1smxKfwllT24MMQ1JMCRmhlA!2m2!1d12.86627222587831!2d77.58099529427344!3f251.",
  "panoramic_image": "",
  "possession_status": "Physical Possession",
  "built_up_area": "N/A",
  "total_area": "1,170 SFT SBA",
  "latitude": "12.866350292083643",
  "longitude": "77.58051730660176",
  "emd": "351000",
  "auction_time_extension": "10 Minutes",
  "sro_office": "",
  "images": [],
  "created_at": "2023-04-24T10:50:33.000Z",
  "updated_at": "2023-04-24T15:34:03.000Z",
  "minimum_increment": "0.00",
  "hot_property": null,
  "status": 1
},
{
  "id": 3,
  "property_id": 26502,
  "property_name": "1,170 SFT Flat in Radiant Elitaire, JP Nagar, Bengaluru",
  "short_description": "",
  "purchasable": 0,
  "slug": "1170-sft-flat-in-radiant-elitaire-jp-nagar-bengaluru-2",
  "type": "",
  "featured": 0,
  "categories": [
      "Residential Flat"
  ],
  "discount_percentage": "60.00",
  "application_end_date": "2023-03-18T00:00:00.000Z",
  "reserve_price": "3510000.00",
  "estimated_value": "7600000.00",
  "state": "Maharashtra",
  "auction_start_date_time": "2023-03-20T14:00:00.000Z",
  "auction_end_date_time": null,
  "city": "Bengaluru",
  "location": null,
  "auction_type": "Open",
  "address": "Flat No. 703, 7th Floor, Jumbo Sawari, Royal County, J P Nagar, 8th Phase, Bengaluru, Karnataka ",
  "bank_name": "HDFC",
  "street": "<iframe src=\"https://www.google.com/maps/embed?pb=!4v1676618148634!6m8!1m7!1smxKfwllT24MMQ1JMCRmhlA!2m2!1d12.86627222587831!2d77.58099529427344!3f251.",
  "panoramic_image": "",
  "possession_status": "Physical Possession",
  "built_up_area": "N/A",
  "total_area": "1,170 SFT SBA",
  "latitude": "12.866350292083643",
  "longitude": "77.58051730660176",
  "emd": "351000",
  "auction_time_extension": "10 Minutes",
  "sro_office": "",
  "images": [],
  "created_at": "2023-04-24T10:50:33.000Z",
  "updated_at": "2023-04-24T15:34:03.000Z",
  "minimum_increment": "0.00",
  "hot_property": null,
  "status": 1
},
]);

const [selectStateFilter, setSelectStateFilter] = useState([]);

const handleFilterToggle =(type, value)=>{
  if(type === 'state'){
const index = selectStateFilter.indexOf(value);
if(index !== -1){
  setSelectStateFilter(selectStateFilter.filter(filter => filter !== value))
}else{
  setSelectStateFilter([...selectStateFilter, value])
}
  }
}


const filterdProperties = property.filter(property=>{
  const stateFilter = selectStateFilter.length === 0  || selectStateFilter.includes('All') || selectStateFilter.includes(property.state);
  return stateFilter;
})
console.log(filterdProperties);
  return (
    <div>
 <ByState  handleFilterToggle={handleFilterToggle}/>
      {filterdProperties.map(pro=>
        <p key={pro.id}>{pro.bank_name}</p>
        )}
    </div>
  )
}

export default MyComponent