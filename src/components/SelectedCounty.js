import React, { useState } from 'react';
import CountrySelect from 'react-bootstrap-country-select';
import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN

const SelectedCounty = () => {
    const [value, setValue] = useState(null);

    return (
        <CountrySelect
            value={value}
            onChange={setValue}
        />
    );
};

export default SelectedCounty;


