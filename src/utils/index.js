

export function constructHackerNewsData(data){
    let newData = data.hits.map((e)=>{ 
      return {
            "id": e.objectID,
            "author": e.author,
            "title": e.title || e.url,
            "url": e.url,
            'userUrl': 'https://hn.algolia.com/api/v1/users/' + e.author,
            // "submission_count": e.submission_count|| 0,
            }} );
  return newData;
  }

export function updateSubmissionCount(searchData, userData){
        return searchData.map((e)=>{
            let SubmissionCount = 0;
            userData.forEach(element => {
                if(element.username === e.author){
                    SubmissionCount =   element.submission_count;
                }
               
            });
            
            return {
                "id": e.id,
                "author": e.author,
                "title": e.title,
                "url": e.url,
                'userUrl': e.userUrl,
                "submission_count": SubmissionCount,
                }} );
}
  
 export function constructWikiData(data){
    let titles = data[3];
  
    let newdata = data[1].map((item, index)=>{
                return {"id":index, "author":item,
                  "title": titles[index],
                  "url": titles[index],
                  "submission_count":  0,
                  } 
              });
      return newdata;
  }
  
  