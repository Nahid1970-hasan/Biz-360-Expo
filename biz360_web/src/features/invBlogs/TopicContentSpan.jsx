import { SingleTopicCard } from "./SingleTopicCard";

  
export const TopicContentSpan = ({
     data
})=>{
    
    return(
        <>   
        {/* {
           data.map((d,i)=>
            <SingleTopicCard key={i} position={i}  data={d}></SingleTopicCard>  
          ) 
        } */}

<SingleTopicCard ></SingleTopicCard>  
            
        </>
    );
};