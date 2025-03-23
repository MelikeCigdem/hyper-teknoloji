"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Headers from "@/app/components/Header/header";
import { Provider } from "react-redux";
import { store } from "@/app/store/store"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  return (

    <html lang="en">
    <head>
     
    </head>
    <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <Provider store={store}>
          <Headers />
          

          {children}
      </Provider>
    </body>
  </html>



    // <html lang="en">
    //   <Provider store={store}>
    //     <Headers />
    //     <body
    //       className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    //     >
    //       {children}
    //     </body>
    //   </Provider>
    // </html>
  );
}
