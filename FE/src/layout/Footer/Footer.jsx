import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl font-bold">É</span>
            </div>
            <p className="text-gray-400 text-sm">
              ÉcolePay makes school fee payments seamless — no more lines, just
              swipe, pay, and done.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Payments
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Analytics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Mobile App
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 ÉcolePay. All rights reserved.
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700"
              >
                <img src="/linkedin.svg" alt="LinkedIn" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700"
              >
                <img src="/github.svg" alt="GitHub" />
              </a>
              <a
                href="mailto:support@ecolepay.com"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700"
              >
                <img src="/mail.svg" alt="Email" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700"
              >
                <img src="/download-cloud.svg" alt="resume link" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
