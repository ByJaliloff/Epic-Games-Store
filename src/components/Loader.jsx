export default function Loader() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
      background: "linear-gradient(to right, #011E3E, #021837)"
  }}
    >
      <img
        src="/images/epic-loader.gif"
        alt="Loading..."
        style={{ width: 800, height: "auto" }}
      />
    </div>
  );
}
