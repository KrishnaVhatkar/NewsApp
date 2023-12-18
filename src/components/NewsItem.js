import React from "react";
const NewsItem=(props)=>{




    let {title, description,imgurl,newsurl,author,date,source} = props;
    return (
      <div>
        
        <div className="card" >
        <div style={{display:'flex',position:'absolute',right:0}}>
        <span className=" badge rounded-pill bg-danger" >{source}</span>
        </div>
          <img src={imgurl?imgurl:'https://bsmedia.business-standard.com/_media/bs/img/article/2021-02/09/full/1612811807-2748.jpg'} style={{height:"150px"}} className="card-img-top" alt="..." />
          <div className="card-body">
        
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {description}...
            </p>
            <p className="card-text"><small className="text-body-secondary text-danger">By {author?author:'Unknown'} on {date}</small></p>
            <a href={newsurl} target='_blank' className="btn btn-primary">
             Read More
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;

