import Link from "next/link";

export default function Home() {
  const abc = "test";

  function fn(a: any, b: any) {
    console.log("");
  }

  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  );
}
