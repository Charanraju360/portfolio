import type {Metadata} from 'next';
import './globals.css';
import Providers from '@/components/providers';
import CustomCursor from '@/components/Cursor';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

export const metadata: Metadata = {
  title: 'Portfolio - Interactive 3D Experience',
  description: 'A living UI playground blending smooth physics-driven scroll, immersive 3D scenes, and subtle micro-interactions.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning>
        <Providers>
          <CustomCursor />
          <Header />
          <main className="relative z-10 w-full overflow-hidden">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
