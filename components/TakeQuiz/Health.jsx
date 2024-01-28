import { FaHeart } from "react-icons/fa";
function Health({ points }) {
  const hp = [];
  for (let i = 0; i < points; i++) {
    hp.push(i);
  }

  return (
    <p className="text-lg font-bold">
      HP:
      {hp.map((heart) => (
        <FaHeart className="inline ms-2 text-red-700" />
      ))}
    </p>
  );
}

export default Health;
