import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem';
import PropTypes from 'prop-types'
import Spinner from './Spinner';
import  InfiniteScroll  from 'react-infinite-scroll-component';
const News = (props) =>{
  const [articles,setArticles] = useState([]);
  const [loading,setLoading] = useState(true);
  const [page,setPage] = useState(1);
  const [totalResults,setTotalResults] = useState(0)

  const Capitalize = (string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1).toLowerCase();
  }
    document.title = `NewsMonkey - ${Capitalize(props.category)}`;
  


  const updateNews = async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ad6f30a39e3348cd97b00b05a2addc1b&page=${props.page}&pagesize=${props.pageSize}`;

    let data = await fetch(url);
    props.setProgress(40);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    props.setProgress(70);
    setTotalResults(parsedData.totalResults);
    setLoading(true)
    props.setProgress(100);
   

  }
  useEffect(()=>{
    updateNews();

  },[])
 
 
  const fetchMoreData = async ()=>{
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ad6f30a39e3348cd97b00b05a2addc1b&page=${page+1}&pagesize=${props.pageSize}`;
    setPage(page+1);

    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    



  };
  



    return (
      
      <>
        <h1 className='text-center' style={{margin:'35px',marginTop:'90px'}}>News Monkey Top {Capitalize(props.category)} Headlines</h1>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          style={{ display: 'flex', flexDirection: 'column' }} //To put endMessage and loader to the top.      
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
         
        >
          <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-3  mx-3 my-3" key={element.url}>

                <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={
                  element.description ? element.description.slice(0, 80) : "No description available"
                } imgurl={element.urlToImage ? element.urlToImage : 'https://www.livemint.com/lm-img/img/2023/08/10/600x3320230805-PAT-SK-MN--Vande-Bharat--02-0_1691656842757_1691656853272.JPG'} newsurl={element.url} author={element.author} date={new Date(element.publishedAt).toGMTString()} source={element.source.name} />

              </div>



            })}
          </div>
          </div>
          </InfiniteScroll>
        


      </>
    )
  }

export default News;


News.defaultProps = {
  country: 'in',
  pageSize: 10,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
