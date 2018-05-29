import React, { Component } from 'react'
import { Menu , Icon } from 'semantic-ui-react'
import {Link,NavLink} from 'react-router-dom'



export default class NavMenu extends Component {
    render() {
        return (
 
            <div id="side-menu" open={this.props.open} vertical fixed='right'  >
                <div className="overlay"></div>
                <i className="close-menu--mobile appet-cross" name="close" onClick={this.props.close}>
                </i>
                {/* <Menu.Item as={NavLink} name='خانه' to={'/'}  onClick={this.handleItemClick}/> */}

                <Link  to={'/'} onClick={this.handleItemClick} >خانه</Link>
                
                {/* <Menu.Item as={NavLink} name='فروشگاه' to={'/editShop'}  onClick={this.handleItemClick} /> */}
                <Link  to={'/editShop'} onClick={this.handleItemClick} >فروشگاه</Link>

                {/* <Menu.Item as={NavLink} name='محصولات' to={'/myProducts'}  onClick={this.handleItemClick} /> */}
                <Link  to={'/myProducts'} onClick={this.handleItemClick} >محصولات</Link>
                
                {/* <Menu.Item as={NavLink} name='تراکنش های مالی' to={'/myTransactions'}  onClick={this.handleItemClick} /> */}

                 <Link  to={'/myTransactions'} onClick={this.handleItemClick} >تراکنش های مالی</Link>

                {/* <Menu.Item as={NavLink} name='بازدید روزانه' to={'/visitCount'}  onClick={this.handleItemClick} /> */}

                 <Link  to={'/visitCount'} onClick={this.handleItemClick} >بازدید روزانه</Link>

                {/* <Menu.Item as={NavLink} name='بازدید محصول' to={'/visitPerProductCount'}  onClick={this.handleItemClick} /> */}

                <Link  to={'/visitPerProductCount'} onClick={this.handleItemClick} >بازدید محصول</Link>
            </div>

    )
}
}