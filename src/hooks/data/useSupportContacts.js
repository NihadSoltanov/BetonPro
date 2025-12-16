import {useState, useEffect} from 'react';

const STATIC_SUPPORT_CONTACTS = {
  person: 'Pardavimai',
  phone: '+370 69002555',
  email: 'uzsakymai@hmobile.lt',
};

const useSupportContacts = () => {
  const [supportContacts, setSupportContacts] = useState(STATIC_SUPPORT_CONTACTS);
  const [error] = useState(null);
  const [isLoading] = useState(false);

  return {
    supportContacts,
    isLoadingSupportContacts: isLoading,
    error,
  };
};

export {useSupportContacts};
