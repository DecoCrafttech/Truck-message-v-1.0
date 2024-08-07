import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import Location from './section-components/location';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';

const LocationPage = () => {
    return <div>
        <PageHeader headertitle="Location" customclassName="mb-0" />
        <Location  />
        <CallToActionV1 />
    </div>
}

export default LocationPage

