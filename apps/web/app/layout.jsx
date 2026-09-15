import "./globals.css";

export const metadata = {
  title: "Web",
  description: "A minimal Next.js app in a Bun monorepo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
