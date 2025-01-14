const PageTitle = ({ title }: { title: string }) => {
  return (
    <header className="flex text-3xl font-semibold">
      <span className="whitespace-nowrap">{title}</span>
    </header>
  );
};

export default PageTitle;
