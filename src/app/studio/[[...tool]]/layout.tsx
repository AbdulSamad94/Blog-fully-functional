export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children} {/* Studio content only */}
      </body>
    </html>
  );
}
