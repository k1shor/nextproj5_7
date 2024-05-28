import "@/styles/globals.css";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import AdminSidebar from "./components/admin/AdminSidebar";
import { useParams } from "next/navigation";
import StoreProvider from "./StoreProvider";

export default function App({ Component, pageProps }) {
  let [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    getUser()
      .then(user => {
        if (user.role === "admin") {
          setIsAdmin(true)
        }
        else {
          setIsAdmin(false)
        }
      })

    async function getUser() {
      return localStorage.getItem("jwt") ?
        await JSON.parse(localStorage.getItem("jwt")).user : false
    }
  }, [useParams()])

  return <>
    <StoreProvider>

      {
        isAdmin ?
          <div className="flex">
            <div className="w-1/4"><AdminSidebar /></div>
            <div className="w-3/4">
              <Component {...pageProps} />
            </div>
          </div>
          :
          <>
            <Header />
            <Component {...pageProps} />
          </>
      }
    </StoreProvider>

  </>
}
