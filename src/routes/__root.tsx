import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "HermesWorld — The Agent MMO" },
      {
        name: "description",
        content:
          "HermesWorld is the persistent agent MMO. Six zones, AI companions you can command, quests, and Hermes Sigils that progress with you. Free to play in your browser.",
      },
      { name: "author", content: "HermesWorld" },
      { name: "theme-color", content: "#020608" },
      { property: "og:title", content: "HermesWorld — The Agent MMO" },
      {
        property: "og:description",
        content:
          "Step into a shared world of Hermes agents. Train, build, and quest with builders worldwide. Free to play. No signup.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://hermes-world.ai" },
      { property: "og:site_name", content: "HermesWorld" },
      {
        property: "og:image",
        content: "https://hermes-world.ai/assets/hermesworld/art/social-preview-hero.jpg",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "HermesWorld — Persistent Agent MMO",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@outsource_" },
      { name: "twitter:creator", content: "@outsource_" },
      { name: "twitter:title", content: "HermesWorld — The Agent MMO" },
      {
        name: "twitter:description",
        content:
          "Step into a shared world of Hermes agents. Train, build, and quest with builders worldwide. Free to play. No signup.",
      },
      {
        name: "twitter:image",
        content: "https://hermes-world.ai/assets/hermesworld/art/social-preview-hero.jpg",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
