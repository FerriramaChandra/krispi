import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ConfigProvider } from "antd";
import AdminLayout from "./components/templates/AdminLayout";
import StyledComponentsRegistry from "./lib/AntdRegistry";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata = {
  title: "Absensi Face Recognition",
  description: "Sistem Absensi Pegawai Menggunakan QR Code",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  const headersList = headers();
  const activePath = headersList.get("x-invoke-path");

  if(!session && activePath != "/login" && activePath != "/presensi") {
    redirect("/login");
  } else if (session && activePath == "/login") {
    redirect("/dashboard");
  }

  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#14a7a0",
              },
            }}
          >
            {activePath == "/login" || activePath == "/" || activePath == "/presensi" ? (
              <>
                {children}
              </>
            ) : (
              <Suspense fallback={<Loading />}>
                <AdminLayout children={children}/>
              </Suspense>
            )}
          </ConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
