'use client'
import React, { useEffect, useState } from "react";

import  "@/src/i18n";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/navbar";
import Search from "../components/search";
import { fetchCart } from "@/src/rtk/slices/cartSlice";
import Image from "next/image";
import Footer from "../components/footer";



function Checkout() {

  const [t , il8n] = useTranslation() ;
  const cart = useSelector(state => state.cart) ;
  const dispatch = useDispatch() ;
  const [showSearch , setShowSearch] = useState()

  useEffect(() => {
  dispatch(fetchCart())
  },[])


    const  totalPrice = cart.reduce((acc , product) => {
      acc += product.price * product.quantity
      return acc
  },0)
  
  const tax = cart.reduce((acc , product) =>{
    acc +=  totalPrice / 40 ;
    return acc
    },0)

  return (
    <>
  <Navbar setShowSearch = {setShowSearch}/>
  <Search showSearch = {showSearch } setShowSearch = {setShowSearch}/>

  <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">

  <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <div className="mx-auto max-w-5xl">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Payment</h2>

      <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
        <form action="#" className="form-credit">
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="full_name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> {t('Full name')} {t('as displayed on card')}* </label>
              <input type="text" id="full_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder={t('full name')} required />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label htmlFor ="card-number-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> {t('Card number')}* </label>
              <input type="number" id="card-number-input" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="xxxx-xxxx-xxxx-xxxx" pattern="^4[0-9]{12}(?:[0-9]{3})?$" required />
            </div>

            <div>
              <label htmlFor ="card-expiration-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">{t('Card expiration')}* </label>
              <div className="relative">
          
              <input  id="card-expiration-input" type="date" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="12/23" required />
              </div>
            </div>
            <div>
              <label htmlFor="cvv-input" className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                {t('cvv')}*
                <div id="cvv-desc" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                  {t('last3')}
                  <div className="tooltip-arrow" ></div>
                </div>
              </label>
              <input type="number" id="cvv-input"  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="•••" required />
            </div>
          </div>

          <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{t('Pay now')}</button>
        </form>

        <div className="mt-6 grow sm:mt-8 lg:mt-0">
          <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
            <div className="space-y-2">
              <dl className="flex items-center justify-between gap-4">
                <dt className="title-pay-data">{t('Original price')}</dt>
                <dd className="pay-data"> le {totalPrice}</dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="title-pay-data"> {t('Tax')} </dt>
                <dd className="pay-data">le {tax }</dd>
              </dl>
            </div>

            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
              <dt className="title-pay-data">{t('Total')}</dt>
              <dd className="pay-data">le {totalPrice + tax }</dd>
            </dl>
          </div>

          <div className="mt-6 flex items-center justify-center gap-8">
          <Image className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg" 
          alt="paypal logo"  width={80} height={80}/>
          <Image className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
          alt="visa logo"  width={80} height={80}/>
          <Image className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
          alt="mastercard logo" width={80} height={80} />
          </div>

        </div>
        
      </div>
    </div>
  </div>
</section>

    <Footer/>
    </>
  );
}
export default Checkout ;