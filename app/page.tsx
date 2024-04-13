import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-full w-full flex-col items-center justify-center px-6 pb-[7.813rem] pt-[9.75rem]">
      <Image
        src="/images/logo.svg"
        alt="hangman logo"
        width={263}
        height={130}
        className="z-10"
      />
      <div className="z-0 -mt-20 flex w-full flex-col items-center gap-14 rounded-[48px] bg-gradient-to-b from-[#344ABA] to-[#001479]/[0.83] px-8 pb-16 pt-[8.5rem] shadow-[inset_0_-8px_0px_4px_rgba(20,14,102,1),_inset_0_6px_0px_8px_rgba(38,99,255,1)]">
        <Link
          href="/category"
          className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-b from-[#FE71FE] to-[#7199FF] shadow-[inset_0_-4px_0px_5px_rgba(36,48,65,1),_inset_0_-12px_0px_11px_rgba(157,45,245,1)]"
        >
          <Image
            src="/images/icon-play.svg"
            alt="play icon"
            width={53}
            height={50}
          />
        </Link>
        <Link
          href="/how-to-play"
          className="w-full rounded-[40px] bg-blue px-16 py-3 text-center text-[2rem] uppercase leading-[120%] tracking-[1.6px] text-white shadow-[inset_0_-2px_0px_3px_rgba(20,14,102,1),_inset_0_1px_0px_6px_rgba(60,116,255,1)]"
        >
          How to play
        </Link>
      </div>
    </main>
  );
}
