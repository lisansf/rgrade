export const LoadingComponent = () => <p className="text-center text-gray-500">Loading...</p>;
export const ErrorComponent = ({ msg }: { msg: string }) => <p className="text-red-500 text-center">{msg}</p>;
