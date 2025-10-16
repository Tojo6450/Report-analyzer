import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="text-center py-10">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
            <p className="text-gray-600 mt-2">
                Sorry, the page you are looking for does not exist.
            </p>
            <div className="mt-6">
                <Link
                    to="/"
                    className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
                >
                    Go Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;