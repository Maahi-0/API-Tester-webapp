import "./global.css";
import { ConvexClientProvider } from "../components/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "API Tester",
  description: "Test APIs with ease",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
