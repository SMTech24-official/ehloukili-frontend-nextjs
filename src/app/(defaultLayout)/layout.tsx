import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import ClientLayout from '../ClientLayout';

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] bg-white">
        <ClientLayout>
          {children}
        </ClientLayout>
      </main>
      <Footer />
    </>
  );
}
