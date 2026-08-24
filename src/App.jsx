import { useState } from "react";
import Preloader from "./components/Preloader";

import Hero from "./components/Hero";
import About from "./components/About";


import GlobalMarkets from "./components/GlobalMarkets";
import ShippingAnimation from "./components/ShippingAnimation";




import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Preloader animation overlay */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      

      <main>
        <Hero />
        <About />
       
       
        <GlobalMarkets />

        {/* INDIA → WORLD SHIPPING ANIMATION */}
        <ShippingAnimation />

        
        
        
        
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;