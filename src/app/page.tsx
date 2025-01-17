import Link from "next/link";

export default function Home() {
  const _abc = "test";

  function _fn(_a: any, _b: any) {
    console.log("");
  }

  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  );
}
