import React, { useState } from 'react'
import './style.css'
import './responsive.css'

const PropertyData = (props) => {

  // Data from parent component
  const {
    discount,
    built_up_area,
    total_area,
    property_type,
    possession_status,
    seller
  } = props;
  // End data

  // const Units = [
  //   'Acre',
  //   'Bigha',
  //   'Cent',
  //   'Square Feet',
  //   'Square Meter',
  //   'Hectare',
  //   'Square Feet',
  //   'Square Yard', 
  //   'Decimal',
  //   'Square Centimeter',
  //   'Square Kilometer',
  //   'Square Mile',
  //   'Katha',
  //   'Marla',
  //   'Dhur',
  //   'Square Inch'
  // ]
  // const unitOptions = Units.map((unit) => (
  //   <option key={unit} value={unit}>
  //     {unit}
  //   </option>
  // ));

  // const [builtUpArea, setBuiltUpArea] = useState("19.90 Acres");

  // const handleUnitChange = (event) => {
  //   const selectedUnit = event.target.value;

  //   setBuiltUpArea(`19.90 ${selectedUnit}`);
  // };

  return (
    <>
      <table className='proprtyDataTable'>
        <tbody>
          <tr>
            <td>
              <p className='dataTitle'>Estimated Discount</p>
            </td>
            <td>
              <p className='dataValue'>{discount}%</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className='dataTitle'>Built-Up Area</p>
            </td>
            <td>
              <div className='unitSection'>
                <p className='dataValue'>{built_up_area}</p>
                {/* <select onChange={handleUnitChange}>
                  {unitOptions}
                </select> */}
              </div>
              {/* <p className='unitValue' id='builtUpArea'>
                ({builtUpArea})
              </p> */}
            </td>
          </tr>
          <tr>
            <td>
              <p className='dataTitle'>Total Area</p>
            </td>
            <td>
              <div className='unitSection'>
                <p className='dataValue'>{total_area}</p>
                {/* <select onChange={handleUnitChange}>
                  {unitOptions}
                </select> */}
              </div>
              {/* <p className='unitValue' id='builtUpArea'>
                ({builtUpArea})
              </p> */}
            </td>
          </tr>
          <tr>
            <td>
              <p className='dataTitle'>Property Type</p>
            </td>
            <td>
              <p className='dataValue'>{property_type}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className='dataTitle'>Possession Status</p>
            </td>
            <td>
              <p className='dataValue'>{possession_status}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className='dataTitle'>Seller</p>
            </td>
            <td>
              <p className='dataValue'>{seller}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PropertyData;
