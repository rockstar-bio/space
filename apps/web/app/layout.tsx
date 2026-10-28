import type { ReactNode } from "react";
import { Provider } from "rockin";
import { NuqsAdapter } from "rockin/hooks";
import "./globals.css";
import { cn } from "rockin/cn";

export const metadata = {
  title: "Space — Free repair resources",
  description: "A nonprofit, open-source home for legally redistributable mobile repair resources.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
     <html
      lang="en"
      suppressHydrationWarning
      // data-accent={accent}
      data-scroll-behavior="smooth"
      className={cn("antialiased")}
    >
      <body className={cn("root flex min-h-dvh flex-col antialiased")}>
        <Provider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </Provider>
      </body>
    </html>
  );
}
