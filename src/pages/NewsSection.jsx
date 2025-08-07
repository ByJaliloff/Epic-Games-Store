import { useEffect, useState } from "react";
import SearchNav from "../components/SearchNav";

export default function NewsSection() {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    fetch("/data/newsData.json") // public içindəki fayla birbaşa path
      .then((res) => res.json())
      .then((data) => setNewsData(data));
  }, []);

  return (
    <>
    <SearchNav />
    <div className="bg-[#101014]">
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <h2 className="text-white text-2xl font-bold mb-6">Epic Games News</h2>

      {/* İlk iki xəbəri yan-yana */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {newsData.slice(0, 2).map((news) => (
          <div key={news.id}>
            <img src={news.image} alt={news.title} className="rounded-lg mb-4" />
            <p className="text-gray-400 text-xs mb-2">{news.date}</p>
            <h3 className="text-white font-semibold text-lg mb-2">{news.title}</h3>
            <p className="text-gray-300 mb-3">{news.description}</p>
            <a href={news.link} className="text-white underline">Read more</a>
          </div>
        ))}
      </div>

      {/* Qalan xəbərlər alt-alta */}
      <div className="flex flex-col gap-6">
        {newsData.slice(2).map((news) => (
          <div key={news.id} className="flex gap-4">
            <img src={news.image} alt={news.title} className="w-40 h-24 object-cover rounded-lg" />
            <div>
              <p className="text-gray-400 text-xs mb-1">{news.date}</p>
              <h3 className="text-white font-semibold mb-1">{news.title}</h3>
              <p className="text-gray-300 mb-2">{news.description}</p>
              <a href={news.link} className="text-white underline">Read more</a>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </>
  );
}
