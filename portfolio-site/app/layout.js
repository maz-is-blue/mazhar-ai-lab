export const metadata = {
  title: 'Mazhar Jahjah | AI & Data Engineer',
  description: 'AI & Data Engineer specializing in computer vision systems, scalable data pipelines, and LLM-powered applications.'
};

import './globals.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <NavBar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
