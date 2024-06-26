import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { HeaderNavigationBar } from "@/app/components";
import theme from "../theme";
import "./globals.css";
import styles from "./page.module.css";
import { WeatherProvider } from "@/store";
import { Box } from "@mui/material";
import { Suspense } from "react";
import Loader from "./loading";
import { ToastProvider } from "@/app/components/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather Forecast",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ToastProvider>
              <WeatherProvider>
                <>
                  <HeaderNavigationBar />
                  <Box
                    component="main"
                    padding={{ xs: 2, sm: 4 }}
                    className={styles.main}
                  >
                    <Suspense fallback={<Loader />}>{children}</Suspense>
                  </Box>
                </>
              </WeatherProvider>
            </ToastProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
        <div id="toast-root"></div>
      </body>
    </html>
  );
}
