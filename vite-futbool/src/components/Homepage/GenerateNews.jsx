import axios from "axios";
import { useState, useEffect } from "react";
import HomeNewsCard from '../HomeNewsCard'

function GenerateNews({teamName}) {
  
  let [newsData, setNewsData] = useState([]);
const APIkey = "fc1a9ce83dmsh89bfeafe4258cbcp17a75cjsn1a4934c7ed6d"
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://bing-news-search1.p.rapidapi.com/news/search",
          {
            params: {
              q: `${teamName}+football`,
              setLang: "en",
              freshness: "Month",
              textFormat: "Raw",
              safeSearch: "Moderate"
            },
            headers: {
              "X-BingApis-SDK": "true",
              "X-RapidAPI-Key": 'fc1a9ce83dmsh89bfeafe4258cbcp17a75cjsn1a4934c7ed6d' ,
              "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com"
            }
          }
        );
        if (response.data.value.length > 0) {
          setNewsData(response.data.value);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchNews();
  }, [setNewsData,teamName]);

  return (
    <div className="d-flex  mt-5 container-fluid justify-content-center align-items-center flex-wrap">
      {newsData.map((news) => (
        <HomeNewsCard
          key={news.url}
          url={news.image ? news.image.thumbnail?.contentUrl : 'https://th.bing.com/th/id/OIP.6tdqnVP1s3X_6K3FBYtB7QHaHa?pid=ImgDet&rs=1'}
          title={news.name}
          snippet={news.description}
          articleLink={news.url}
        />
      ))}
    </div>
  );
}

export default GenerateNews;