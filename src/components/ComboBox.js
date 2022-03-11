import React, { useState } from "react";
import ComboBox from "react-responsive-combo-box";
import "react-responsive-combo-box/dist/index.css";
import DatabaseSelection from '../DatabaseSelection';
import "./styles.css";

export default function Combobox() {
  const [selectedOption, setSelectedOption] = useState("");
  const [highlightedOption, setHighlightedOption] = useState("");
  console.log(localStorage.getItem('attributeList'));
  let arr;
  //if(localStorage.getItem('attributeList')!=null){
  let att= localStorage.getItem('attributeList');
  arr= att.split(",");
//}
  const options = [];
  let attributes=localStorage.getItem("wantedAttributeList");
  let attArr;
  if(localStorage.getItem("wantedAttributeList")!=null){
    attArr= attributes.split(",")
    for(var i=0;i< attArr.length; i++){
      let arr1=attArr[i].split("=");
      options.push(arr1[0])
    }
      
  }
  else{
    for(var i=0;i< arr.length; i++)
      options.push(arr[i])
  }

  const handleAttributeChange = ()=>{
     if( localStorage.getItem("imgstochange")=="null")
      alert("Not selected any images for change");
     if(selectedOption.length>0 &&  localStorage.getItem("imgstochange")!="null")
     {

        let imgs= localStorage.getItem("imgstochange");
        let imgArr = imgs.split(",");
        let finArr=[];
        //for(var i=0; i<attArr.length; i++){
          var selected;
        for(var j=0; j<attArr.length; j++){
          let arr=attArr[j].split("=");
          if(arr[0]==selectedOption){
            selected=arr[0];
          }
        }
        for(var i=0; i<imgArr.length; i++){
          let arr2=imgArr[i].split("=");
        
          let att= selected + "=" + arr2[1];
          finArr.push(att); 
          
        }
        console.log("finarr  ",finArr);
        let a =0;
        for(var i=0; i< imgArr.length; i++){
            console.log("finarr ii ", finArr[i])
           
            let imgarr=imgArr[i].split("=");
            console.log("img 0 ", imgarr[0])
            console.log("fin "+finArr)
            let ar=[];
            ar.push(finArr[i]);
            const option = {
              method: "PUT",
              body: JSON.stringify(ar),
              headers: {
                  "Content-Type": "application/json"
              }
            }
          console.log(option.body)
        
          fetch(`https://attribute-search-engine.herokuapp.com/faces/api/v1/search/${imgarr[0]}`, option)
              .then(res => res.json())
              .then(data => {
                  console.log(data)
                  if( data === 'OK')
                  {
                      console.log("Updated")
                      localStorage.setItem("imgstochange", null)
                      if(a==0)
                      alert("Attribute of all images you selected updated");
                      a++;
                  }
                  else{
                      console.log(data)
                  }
              
                
              })
       }
     }

  }


  return (
    <div className="Combobox" style={{marginLeft:'78%'}}>
      <div style={{marginLeft:'5%'}}>
        <h4>Select the attribute you want to change</h4>
        <h4>than select images and click to change button </h4>
      </div>
      {/* <p>
        The selected option -{" "}
        <span style={{ fontWeight: "bold" }}>
          {" "}
          {selectedOption.length > 0 ? selectedOption : "None"}
        </span>
      </p> */}
      {/* <p>
        The highlighted option -{" "}
        <span style={{ fontWeight: "bold" }}>
          {" "}
          {highlightedOption.length > 0 ? highlightedOption : "None"}
        </span>
      </p> */}
      <ComboBox
        options={options}
        placeholder="select attribute"
        defaultIndex={4}
        optionsListMaxHeight={300}
        style={{
          width: "270px",
          margin: "0 auto",
          marginTop: "25px"
        }}
        focusColor="#20C374"
        renderOptions={(option) => (
          <div className="comboBoxOption">{option}</div>
        )}
        onSelect={(option) => setSelectedOption(option)}
        onChange={(event) => console.log(event.target.value)}
        enableAutocomplete
        onOptionsChange={(option) => setHighlightedOption(option)}
      />
      <div class="row">
      <div class="col" style={{marginLeft:'35%', fontSize:'30px'}}>
      <button className="button" type="change" onClick={()=>handleAttributeChange()}>
        Change
      </button>
      </div>
      </div>
    </div>

     
  );
}
