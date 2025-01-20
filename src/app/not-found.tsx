import Link from "next/link";

import Container from "@/components/Container";
import ROUTES from "@/config/routes";

const NotFound = () => {
  return (
    <>
      <Container>
        <div className="flex justify-center">
          <div className="py-10 flex flex-col items-center">
            <p className="text-5xl text-center">Oops!</p>
            <p className="text-5xl text-center mt-6">Page 404</p>
            <Link
              href={ROUTES.HOME}
              className="cancel mt-10 mx-auto text-xl text-accent border-accent hover:bg-accent py-2"
            >
              Go to Home Page
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default NotFound;
