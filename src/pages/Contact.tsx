import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

const Contact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Get in Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg"
            >
              We're here to help and answer any questions you might have. We
              look forward to hearing from you.
            </motion.p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="lg:col-span-1 space-y-6"
              >
                <motion.div
                  variants={itemVariants}
                  className="bg-white p-6 rounded-lg shadow-md flex items-start"
                >
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <MapPin className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Our Location</h3>
                    <p className="text-gray-600">
                      123 Education Street
                      <br />
                      San Francisco, CA 94103
                      <br />
                      United States
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-white p-6 rounded-lg shadow-md flex items-start"
                >
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Mail className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Email Us</h3>
                    <p className="text-gray-600 mb-1">
                      <a
                        href="mailto:info@edupress.com"
                        className="text-primary hover:underline"
                      >
                        info@edupress.com
                      </a>
                    </p>
                    <p className="text-gray-600">
                      <a
                        href="mailto:support@edupress.com"
                        className="text-primary hover:underline"
                      >
                        support@edupress.com
                      </a>
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-white p-6 rounded-lg shadow-md flex items-start"
                >
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Phone className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Call Us</h3>
                    <p className="text-gray-600 mb-1">
                      <a
                        href="tel:+1-800-123-4567"
                        className="text-primary hover:underline"
                      >
                        +1 (800) 123-4567
                      </a>
                    </p>
                    <p className="text-gray-600">
                      <a
                        href="tel:+1-800-765-4321"
                        className="text-primary hover:underline"
                      >
                        +1 (800) 765-4321
                      </a>
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-white p-6 rounded-lg shadow-md flex items-start"
                >
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Clock className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Working Hours</h3>
                    <p className="text-gray-600 mb-1">
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-gray-600">
                      Saturday: 10:00 AM - 4:00 PM (Support Only)
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              <div className="lg:col-span-2">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg overflow-hidden shadow-md h-[400px] w-full"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0968143067447!2d-122.41941492392031!3d37.77492997197701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1691084800000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="EduPress Location"
              ></iframe>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
