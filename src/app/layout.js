import { Noto_Serif } from "next/font/google";
import "./globals.css";
import "./admin/admin.css";
import "./checkout/checkout.css";
import { Providers } from "../rtk/Provider";
import { SpeedInsights } from '@vercel/speed-insights/next';

const noto_Serif= Noto_Serif({ 
  subsets: ["latin"],

});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={noto_Serif.className}>
        <Providers>
        {children}
        <SpeedInsights />
        </Providers>
        </body>
    </html>
  );
}
