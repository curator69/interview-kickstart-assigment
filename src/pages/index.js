import { Cards, Navbar, SearchAndFilter } from "@/components";
import { Divider } from "@mui/material";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const [webinars, setWebinars] = useState([]);

  return (
    <div className={`${inter.className} flex flex-col gap-8`}>
      <Navbar setWebinars={setWebinars} />
      <Divider />
      <SearchAndFilter webinars={webinars} setWebinars={setWebinars} />
      <Cards webinars={webinars} setWebinars={setWebinars} />
    </div>
  );
}
