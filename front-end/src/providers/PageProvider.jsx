import React, { createContext, useContext, useState } from 'react';

  const PageContext = createContext();

  export const usePageContext = () => useContext(PageContext);
  
  export const PageProvider = ({ children }) => {
    const [pageProps, setPageProps] = useState({
      title: '',
      hideBreadcrumbs: false,
      maxWidth: '100% !important',
      bgcolor:''

    });

  return (
    <PageContext.Provider value={{ pageProps, setPageProps }}>
      {children}
    </PageContext.Provider>
  );
};
