import { CurrencyProvider } from '@/context/CurrencyContext';
import Navbar from '@/components/Navbar';
import Ticker from '@/components/Ticker';
import Hero from '@/components/Hero';
import Tracking from '@/components/Tracking';
import Services from '@/components/Services';
import OperationsGallery from '@/components/OperationsGallery';
import Fleet from '@/components/Fleet';
import QuoteEngine from '@/components/QuoteEngine';
import Footer, { FloatingWhatsApp } from '@/components/Footer';

function App() {
  return (
    <CurrencyProvider>
      <div className="relative min-h-screen overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <Ticker />
          <Tracking />
          <Services />
          <OperationsGallery />
          <Fleet />
          <QuoteEngine />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </CurrencyProvider>
  );
}

export default App;
