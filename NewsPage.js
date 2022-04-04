import { useState,useEffect } from "react";
import axios from "axios";
import NewsCard from "./components/NewsCard";

const NewsPage =() => {
    const [article,setArticles] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [totalPages,setTotalPages] = useState(0);


    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try{
               const {data} = await axios.get("https://hn.algolia.com/api/v1/search?");
               const {hits, nbPages} =data;
               setArticles(hits);
               setTotalPages(nbPages);


            }catch(err) {
                console.log(err);

            }finally{
                setIsLoading(true);
            }

        };
        fetchData();

    },[])

    return (
        <div className="container">
            <h1>Hacker news</h1>
            <div className="news-container">
                {
                    isLoading ? <p>Loading...</p> : article.map(article =><NewsCard article={article} key={article.objectId} />)
                }

            </div>
        </div>
    )
}
export default NewsPage;