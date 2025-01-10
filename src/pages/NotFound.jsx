const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-xl text-gray-700">Oops! Page Not Found</p>
        <p className="mt-2 text-gray-500">
          The page you are looking for doesnt exist or has been moved.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
