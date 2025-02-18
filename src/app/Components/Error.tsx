interface ErrorProps {
    msg?: string; // input bersifat opsional (boleh ada, boleh tidak)
}

const Error: React.FC<ErrorProps> = ({ msg = "Terjadi kesalahan" }) => {
    return msg ? <p className="text-red-500">{msg}</p> : null;
};

export default Error;