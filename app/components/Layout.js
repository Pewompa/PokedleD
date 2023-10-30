const Layout = ({ children }) => {
  return (
    <div className="flex flex-col items-center">
      <header>
        <title>PokéDLE</title>
        <h2 className="text-6xl pt-8">PokéDLE</h2>
      </header>
      <main className="text-center">{children}</main>
    </div>
  );
};

export default Layout;
