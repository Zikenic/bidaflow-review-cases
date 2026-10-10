import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BidaFlow - Quản lý quán bida",
    short_name: "BidaFlow",
    description: "Hệ thống vận hành quán bida đa vai trò",
    start_url: "/",
    display: "standalone",
    background_color: "#f2f6f4",
    theme_color: "#0b2f27",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
