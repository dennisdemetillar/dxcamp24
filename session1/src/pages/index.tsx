import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  const pushTo = (value: boolean) => {
    if (value) {
      router.push("/blog");
    } else {
      router.push("/blog-1");
    }
  };
  return (
    <div>
      <div>HELLO THIS IS HOME</div>
      <div className="flex flex-col gap-y-2">
        <a href="/blog" className="border">
          BLOG A
        </a>
        <Link href={"/blog"} className="border">
          BLOG LINK
        </Link>
        <button onClick={() => pushTo(false)} className="">
          BLOG BUTTON ROUTER
        </button>
      </div>
    </div>
  );
}
