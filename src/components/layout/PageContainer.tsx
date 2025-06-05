interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
}

const PageContainer = ({ children, title }: PageContainerProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {title && (
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          {title}
        </h1>
      )}
      {children}
    </div>
  );
};

export default PageContainer; 