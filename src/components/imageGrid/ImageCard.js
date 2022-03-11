import {React, useState, useContext, useEffect} from "react"
import CloseIcon from '@material-ui/icons/Close';
import "./imageGrid.css"
import TextField from '@material-ui/core/TextField';
import { Style } from "@material-ui/icons";
import { imagesList, storage  } from "../../firebase/index"; //listAll, wantedImg
let ImageArr=[]
export default function ImageCard(props) {

    let results= []
   const [url, setUrl] = useState("");
    const [model, setModel] = useState(false);
    const [tempimgSrc, setTempimgSrc] = useState('');
    const [TextValue, setTextValue] = useState(results);
    //const [ImageArr, setImageArr]= useState([]);
    const [style1, setStyle1] = useState("btn");
    const [style2, setStyle2] = useState("btn");
    const [style3, setStyle3] = useState("btn");
    const [style4, setStyle4] = useState("btn");
    const [style5, setStyle5] = useState("btn");

    const submitValue = () => {
        const fromdetails = {
            'Return_Text' : TextValue,  
        }
        var myArray = fromdetails.Return_Text.split(",")
        //console.log(myArray)
        //query here post 
        if(myArray.length !== 0)
      { 
        const option = {
          method: "PUT",
          body: JSON.stringify(myArray),
          headers: {
              "Content-Type": "application/json"
          }
      }
      console.log(option.body)
  
    fetch(`https://attribute-search-engine.herokuapp.com/faces/api/v1/search/${props.image_id}`, option)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if( data === 'OK')
            {
                console.log("Updated")
            }
            else{
                console.log(data)
            }
        
          
        })
    }
    }

    function closeImageEdit()
    {
        setModel(false)
        // redirect the query back
        //props.attribute 

    }
    

    const getImg = (image) =>{
        setTempimgSrc(image);
        
        fetch(`https://attribute-search-engine.herokuapp.com/faces/api/v1/search/${image}`)
            .then(res => res.json())
            .then(data => {
                console.log("att list");
                console.log(data);
               
                 for (let i = 0; i< data.length; i++){
                    results[i] = data[i]
                 }

                setModel(true);
            })
        
    }

    const addImgToFlip = (image, val) =>{

        if(val==props.vals[0]){
            setStyle1("btn2");
            setStyle2("btn");
            setStyle3("btn");
            setStyle4("btn");
            setStyle5("btn");
        }
        else if(val==props.vals[1]){
            setStyle2("btn2");
            setStyle1("btn");
            setStyle3("btn");
            setStyle4("btn");
            setStyle5("btn");
        }
        else if(val==props.vals[2]){
            setStyle3("btn2");
            setStyle2("btn");
            setStyle1("btn");
            setStyle4("btn");
            setStyle5("btn");
        }
        else if(val==props.vals[3]){
            setStyle4("btn2");
            setStyle2("btn");
            setStyle3("btn");
            setStyle1("btn");
            setStyle5("btn");
        }
        else if(val==props.vals[4]){
            setStyle5("btn2");
            setStyle2("btn");
            setStyle3("btn");
            setStyle4("btn");
            setStyle1("btn");
        }
    
        let valString= image + "=" + val;
        ImageArr.push(valString);
        console.log("im "+ valString)
         //setImageArr(ImageArr);  
        //setImageArr(ImageArr => [...ImageArr, image]);
        console.log(ImageArr);
        // glb.ImageArr.current.push(image);
        // console.log("img arr "+ glb.ImageArr.current)
        // glb.setImageArr(glb.ImageArr.current); 
        if(localStorage.getItem("imgstochange")=='null' && localStorage.getItem("imgstochange")!=undefined) {
            ImageArr=[];
            ImageArr.push(valString);
            console.log("burada")
        } 
      
        localStorage.setItem("imgstochange", ImageArr)
        console.log( localStorage.getItem("imgstochange"))
    }

    function displayVals(imgid){
      
        return(
            
        <div class= "cont" style={{ flexDirection: "row",  justifyContent: 'space-evenly' }}> 
        {props.vals[0] !=null ? (
        <button class={style1} onClick={()=>addImgToFlip(imgid, props.vals[0])}>{props.vals[0]}</button>
          ) : (
          <></>
          )}
        {props.vals[1] !=null ? (
        <button class={style2} onClick={()=>addImgToFlip(imgid, props.vals[1])}>{props.vals[1]}</button>
        ) : (
        <></>
        )}
        {props.vals[2] !=null ? (
        <button class={style3} onClick={()=>addImgToFlip(imgid, props.vals[2])}>{props.vals[2]}</button>
        ) : (
        <></>
        )}
        {props.vals[3] !=null ? (
        <button class={style4} onClick={()=>addImgToFlip(imgid, props.vals[3])}>{props.vals[3]}</button>
        ) : (
        <></>
        )}
        {props.vals[4] !=null ? (
        <button class={style5} onClick={()=>addImgToFlip(imgid, props.vals[4])}>{props.vals[4]}</button>
        ) : (
        <></>
        )}
         </div>
        
        )
    }
    

     function listAll2(folder, imgid){
        const storageRef = storage.ref();
        var listRef = storageRef.child(folder);
        listRef
          .listAll()
          
            .then((res) => {
                  res.prefixes.forEach((folderRef) => {
                    // All the prefixes under listRef.
                    // You may call listAll() recursively on them.
                  });
                  res.items.forEach((itemRef) => {
                    // All the items under listRef.
                       // console.log(itemRef);
                    
                        if (itemRef.name== imgid){
                           itemRef.getDownloadURL().then((url) => {
                          
                            setUrl(url);
                          });
                        
                        }
                  // itemRef.getDownloadURL().then((url) => {
                  // 	console.log("URLL " +url);
                  // 	imagesList.push(url);
            //             });
           
                  });
             
        }).catch((error) => {
          console.log(error);
        });
      }

    return (
    
        <>
        <div className={model? "model open":"model"}>

                <div className="container">
                    <div className="row justify-content-md-center">
                        
                        <div className="col-md-auto">
                            
                            <img src={`../images/${tempimgSrc}`} style={{width: "250px", borderRadius:"5px"}}/>
                            <CloseIcon onClick={closeImageEdit}/>
                        </div>
                        
                    </div>

                    <div className="row justify-content-md-center">
                        
                        <div className="col-md-auto">
                            
                            <TextField
                            label = "Attribute List" 
                            variant="filled"
                            helperText = "Kindly Follow the Format stated above!"
                            inputProps={{style: {fontSize: 20, color:'white'}}}
                            defaultValue={results}
                            onChange={e => setTextValue(e.target.value)}
                            style={{ width: '500px', boxSizing:"border-box"}}
                            
                            />
                
                        </div>
                        
                    </div>
                    <div className="row justify-content-md-center">
                        
                        <div className="col-md-auto">
                        <button type="button" id="submit" 
                             className="btn btn-dark" 
                             style={{ width:"100px", fontSize: "15px"}}
                             onClick={submitValue}>Submit!
                        </button>
                            
                        </div>
                        
                    </div>
                    </div>

        </div>
        {/* <div className="card" className="pics" key={props.image_id} onClick={()=>getImg(props.image_id)}>
            <img src={`../images/${props.image_id}`} className="card--image" />
        </div> */}
    
       {listAll2("images/", props.image_id)} 
        <div class="card" className="pics" key={props.image_id} >     {/* onClick={()=>addImgToFlip(props.image_id)} */}
            <img src={url} alt="Uploaded images" className="card--image" />
            {/* {imagesList.map((url) => (
              <img src={url || ' ' } alt="Uploaded images" height = "300" width ="400"/>
         ))} */}
            {/* //***{`../images/${props.image_id}`} */ }
            {displayVals(props.image_id)}
        </div>
       
        </>
        
    )
}