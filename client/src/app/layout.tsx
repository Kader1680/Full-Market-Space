import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {CartProvider} from "../context/CartContext"
import {OrderProvider} from "../context/OrderContext"
 
import { AuthProvider } from "../context/AuthContext";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <AuthProvider>
              <CartProvider>
               <OrderProvider>
                 <Navbar />
                <main>{children}</main>
                <Footer />
               </OrderProvider>
              </CartProvider>   

          </AuthProvider>
      
      </body>
    </html>
  );
}
