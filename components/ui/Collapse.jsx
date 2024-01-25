function Collapse({ children, title }) {
  return (
    <div className="collapse bg-base-200 mb-3 ">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">{title}</div>
      <div className="collapse-content">{children}</div>
    </div>
  );
}

export default Collapse;
