import { useState } from "react";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Products from "./components/Products";
import Quality from "./components/Quality";
import GlobalMarkets from "./components/GlobalMarkets";
import ShippingAnimation from "./components/ShippingAnimation";
import ExportProcess from "./components/ExportProcess";
import WhyUs from "./components/WhyUs";
import BulkSupply from "./components/BulkSupply";
import Quote from "./components/Quote";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Preloader animation overlay */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <Navbar />

      <main>
        <Hero />
        <About />
        <Products />
        <Quality />
        <GlobalMarkets />

        {/* INDIA → WORLD SHIPPING ANIMATION */}
        <ShippingAnimation />

        <ExportProcess />
        <WhyUs />
        <BulkSupply />
        <Quote />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;