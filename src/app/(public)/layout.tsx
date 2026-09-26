import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "SKY BUILDS",
  description:
    "SKY BUILDS is a modern web development studio building high-quality digital experiences for ambitious businesses.",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <div className="flex-1" id="main-content">
        <PageTransition>{children}</PageTransition>
      </div>
      <Footer />
    </MotionConfig>
  );
}
