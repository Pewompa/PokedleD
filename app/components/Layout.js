import Image from 'next/image';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col items-center">
      <header>
        <title>PokéDLE</title>
        <Image
          alt="pokeLogo"
          width={350}
          height={350}
          priority={true}
          src={'/pokeLogo.png'}
        />
      </header>
      <main className="text-center">{children}</main>
    </div>
  );
};

export default Layout;
