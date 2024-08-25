import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Breadcrumbs, Container, Typography, Link } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { usePageContext } from '../providers/PageProvider';
import { formatParams } from '../utils';

function Page({ children }) {
    const { pageProps } = usePageContext();
    const { pathname } = useLocation();
    const pathParts = pathname.split("/").filter(Boolean);

    return (
    
            <Box id="main" width="100%" sx={{ backgroundColor: pageProps.bgcolor}} >
                <Helmet>
                    <title>{pageProps.title} | Fantasy Bros</title>
                </Helmet>

                {!pageProps.hideBreadcrumbs && pathParts.length > 1 && (
                        <Breadcrumbs sx={{ p: 2 }}>
                        {pathParts.map((path, index) => {
                            const pathTo = `/${pathParts.slice(0, index + 1).join('/')}`;
                            const isLast = index === pathParts.length - 1;
                            const formattedPath = formatParams(path);

                            if (!isLast) {
                                return (
                                    <Link sx={{ textDecoration: 'none' }} key={index} component={RouterLink} to={pathTo}>
                                        <Typography color="white">{formattedPath}</Typography>
                                    </Link>
                                );
                            } else {
                                return <Typography color="tertiary" key={index}>{formattedPath}</Typography>;
                            }
                        })}
                    </Breadcrumbs>
                )}
               <Container maxWidth="xl">
                {children}
               </Container>
            </Box>
      
    );
}

export default Page;
