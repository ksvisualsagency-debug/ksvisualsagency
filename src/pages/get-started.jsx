import React from 'react';

import SEO from 'components/shared/seo/seo';
import SEO_DATA from 'constants/seo-data';

import ContactPage from './contact';

const GetStartedPage = () => <ContactPage />;

export default GetStartedPage;

export const Head = () => <SEO {...SEO_DATA.contact} />;
