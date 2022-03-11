import React from "react";
import "./attributeSlider.css"
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
class CheckboxComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onlyCheck: true,
    };

  }
  render() {
    const checkboxList = this.props.checkboxList;
    //const checkboxList = this.props.onlyCheck;
    let min=parseInt(this.props.checkboxList[0].min);
    let max=parseInt(this.props.checkboxList[0].max);
    let step=parseInt(this.props.checkboxList[0].step);
    let val1= min + step;
    let val2= min + step*2;
    let val3= min + step*3;
    return (
      <>

      {checkboxList.map((option) => (
        <div className = "checkbox"  key={option.id}>
      
        <table className="table table-style" >

          <tbody>

            <tr >

              <td htmlFor={option.id} style={{marginLeft:'0px'}} class="cont_for_att">
                <h1>{option.name}</h1>
                
              </td>

              <td >
                {console.log("only ch ", this.state.onlyCheck)}
                <div class="content">
                <input
                className="form-check-input"
                  type="checkbox"
                  style={{ marginRight: '10.0',marginLeft: '10.0'}}
                  value={min.toString()}
                  checked1={this.state.onlyCheck==true ? option.isChecked : false}
                  // {...this.state.onlyCheck==true ? this.state.onlyCheck= !option.isChecked : null}
                  onChange={(e) => this.props.onChange(e,option)}
                />
                {val1 < max ? (
                  <input
                  className="form-check-input"
                  style={{ marginRight: '10.0',marginLeft: '10.0'}}
                    type="checkbox"
                    value={val1.toString()}
                    checked2={this.state.onlyCheck==true ? option.isChecked : false}
                    // {...this.state.onlyCheck==true ? this.state.onlyCheck= !option.isChecked : null}
                    onChange={(e) => this.props.onChange(e,option)}
                  />
                ) : (
                <></>
                )}
                {val2 < max ? (
                  <input
                  className="form-check-input"
                  style={{ marginRight: '10.0',marginLeft: '10.0'}}
                    type="checkbox"
                    value={val2.toString()}
                    checked3={option.isChecked}
                    onChange={(e) => this.props.onChange(e,option)}
                  />
                ) : (
                <></>
                )}
                  {val3 < max ? (
                  <input
                  className="form-check-input"
                  style={{ marginRight: '10.0',marginLeft: '10.0'}}
                    type="checkbox"
                    value={val3.toString()}
                    checked4={option.isChecked}
                    onChange={(e) => this.props.onChange(e,option)}
                  />
                ) : (
                <></>
                )}
                   <input
                className="form-check-input"
                style={{alignItems:'end'}}
                  type="checkbox"
                  value={max.toString()}
                  checked5={this.state.onlyCheck==true ? option.isChecked : false}
                  
                  // {...this.state.onlyCheck==true ? this.state.onlyCheck= !option.isChecked : this.state.onlyCheck= option.isChecked}
                  onChange={(e) => this.props.onChange(e,option)}
                />
                </div>
              </td>
              </tr>

      </tbody>

      </table>

</div>
          
        ))}
    </>
    );
  }
}
export default CheckboxComponent;