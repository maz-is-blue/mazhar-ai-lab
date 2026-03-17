export const metadata = {
  title: 'Mazhar Jahjah | AI & Data Engineer',
  description: 'AI & Data Engineer specializing in computer vision systems, scalable data pipelines, and LLM-powered applications.'
};

import './globals.css';
import SiteLayout from '../components/SiteLayout';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
