import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import ClientLayout from '../ClientLayout';

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh]">
       <ClientLayout>
                 {children}
               </ClientLayout>
      </main>
      <Footer />
    </>
  );
}
