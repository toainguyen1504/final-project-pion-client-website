import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '@/routes';
import DefaultLayout from '@/layouts';
import ScrollToTop from '@/components/ScrollToTop';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { HelmetProvider } from 'react-helmet-async';

function App() {
    return (
        <HelmetProvider>
            <Router>
                <ScrollToTop />
                <div>
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;

                            if (route.layout === null) {
                                Layout = Fragment;
                            } else if (typeof route.layout === 'function') {
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={route.layout({ children: <Page /> })}
                                    />
                                );
                            } else if (route.layout) {
                                Layout = route.layout;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </HelmetProvider>
    );
}

export default App;
