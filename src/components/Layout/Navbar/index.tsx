import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import { SessionPopover } from "./SessionPopover";

export function Navbar() {
  return (
    <Container>
      <nav className="relative mx-auto flex items-center justify-between pb-2 pt-8">
        <Link href="/" passHref className="cursor-pointer">
          <Logo full dark className="hidden w-64 sm:block" />
          <Logo dark className="w-10 sm:hidden" />
        </Link>

        <SessionPopover />
      </nav>
    </Container>
  );
}
