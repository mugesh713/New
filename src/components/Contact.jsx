function Contact() {
    return (
      <section
        id="contact"
        className="bg-white px-6 py-28 text-black lg:px-10 lg:py-40"
      >
        <div className="mx-auto max-w-[1400px]">
  
          <div className="grid gap-16 lg:grid-cols-12">
  
            {/* LEFT */}
            <div className="lg:col-span-7">
  
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-600">
                Contact
              </p>
  
              <h2 className="mt-6 text-5xl font-medium leading-[0.92] tracking-[-0.05em] md:text-7xl lg:text-[92px]">
                Let's build
                <br />
                <span className="text-gray-300">
                  something global.
                </span>
              </h2>
  
              <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600">
                Have a turmeric sourcing requirement? Tell us about
                your market, quantity and destination and let's start
                a conversation.
              </p>
  
              <a
                href="#quote"
                className="mt-10 inline-flex items-center gap-4 rounded-full bg-black px-7 py-4 text-sm font-medium text-white transition hover:bg-yellow-400 hover:text-black"
              >
                Request a Quote
                <span className="text-lg">→</span>
              </a>
  
            </div>
  
            {/* RIGHT */}
            <div className="lg:col-span-5">
  
              <div className="rounded-[2rem] bg-[#f3f1eb] p-8 md:p-10">
  
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
                  YOURSPICES
                </p>
  
                <div className="mt-12 space-y-8">
  
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                      Email
                    </p>
  
                    <a
                      href="mailto:hello@yourspices.com"
                      className="mt-2 block text-xl font-medium transition hover:text-yellow-600"
                    >
                      hello@yourspices.com
                    </a>
                  </div>
  
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                      Phone
                    </p>
  
                    <a
                      href="tel:+910000000000"
                      className="mt-2 block text-xl font-medium transition hover:text-yellow-600"
                    >
                      +91 00000 00000
                    </a>
                  </div>
  
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                      Location
                    </p>
  
                    <p className="mt-2 text-xl font-medium">
                      India
                    </p>
                  </div>
  
                </div>
  
              </div>
  
            </div>
  
          </div>
  
        </div>
      </section>
    );
  }
  
  export default Contact;