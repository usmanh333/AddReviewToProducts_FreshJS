import { AppProps } from "$fresh/server.ts";
import Navbar from "../components/Navbar.tsx";

export default function App({ Component }: AppProps) {
  return (
    <html class="bg-[#212121] text-[#fff]">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Product Review</title>
      </head>
      <body>
        <Navbar/>
        <Component />
      </body>
    </html>
  );
}
