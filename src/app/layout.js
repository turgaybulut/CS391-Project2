'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navbar';
import './styles/global.css';

export default function Layout({ children }) {
    return (
        <html>
            <body>
                <Navigation />
                <main>{children}</main>
            </body>
        </html>
    );
}
