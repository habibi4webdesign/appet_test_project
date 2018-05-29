import React , {Component} from 'react';
 import {OverlayPanel} from 'primereact/components/overlaypanel/OverlayPanel';
import {Button} from 'primereact/components/button/Button';



class TopNavBar extends Component{
  constructor(){
    super();
    this.state = {
      porfileDropdown : false
  };
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    this.op.toggle(event);
}


  
  render(){

    const trigger = (
              <div>
                  <div id="profile">
                      <div className="profile-img"  onClick={this.onClick} style={{ backgroundImage:`url(${this.props.userInfo.logo})`}} >
                      </div>
                      <OverlayPanel ref={(el) => {this.op = el;}}>
                        <span onClick={this.props.logoutHandel}> 
                        <span className="appet-log-out"></span>
                          خروج
                        </span>
                      </OverlayPanel>
                  </div>
                  <div className="user-name">
                    <span className="profile-name"> 
                      <label > 
                      { `${this.props.userInfo.userDisplayName}` }
                      <span> {`(${this.props.userInfo.shopTitle})`}</span>
                      </label>
                      <span className="faNum">
                        {this.props.userInfo.credit } ریال 
                        {!this.props.userInfo.creditLoading && <i className="appet-loop2" name='refresh' onClick={this.props.creditRefreshHandel} />}
                      </span>

                    </span>
                  </div>
                </div>
    )
    return(
      <div className="content-section top-nav--bar">
        <div className="ui-g">
            <div className="ui-g-12">
              <div className="small-container">       
                {trigger}
                  <div className="hide-on-desktop  toggle-menu--mobile" onClick={this.props.openMenuMobile}>
                         <span className="appet-menu f28"></span>
                   </div>
                </div>
            </div>
        </div>
      </div> 
    )
  }

}



export default TopNavBar;










    /* <div className="top-nav--bar" >
    <Container>
      <div className="row">
        <div className="inner-top--nav">

        <div className="logo">
            </div>

            <div className="hide-on-desktop  toggle-menu--mobile" onClick={props.openMenuMobile}>
              <Icon name='bars' />
            </div>
        
            <div className="profile">
              <Dropdown selectOnNavigation={false} trigger={trigger} options={options} pointing='top left' icon={null}     />
            </div>
            
          </div>
      </div>
    </Container>
    </div> */








    
// const TopNavBar = (props) => {
  
// const options = [
//   { key: 'sign-out', text: 'خروج', icon: 'sign out',value: 'sign-out',onClick:props.logoutHandel }
// ]

// const trigger = (
//   <div className="profile">
//             <span className="profile-name"> 
//               { `${props.userInfo.userDisplayName}(${props.userInfo.shopTitle})` }
//               <br/>
//               { props.userInfo.credit } ریال 
//               {!props.userInfo.creditLoading && <Icon name='refresh' onClick={props.creditRefreshHandel} />}
//                </span>
 
//             <a className="profile-image" style={{ backgroundImage:`url(${props.userInfo.logo})`}} href="#" onClick={(e) => e.preventDefault()}></a>
//   </div>

// )
   

// }