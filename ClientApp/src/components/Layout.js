import React, { Component } from 'react';
import TopNavBar from './TopBarNav';
import Void from '../container/Void/Void';
import classNames from 'classnames';
import  AppTopbar  from './components/AppTopbar';
import { AppInlineProfile } from './components/AppInlineProfile';
import { AppFooter } from './components/AppFooter';
import { AppMenu } from './components/AppMenu';
import { Route } from 'react-router-dom';
import { MenusDemo } from './components/MenusDemo';
import { EmptyPage } from './components/EmptyPage';
import { ScrollPanel } from 'primereact/components/scrollpanel/ScrollPanel';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { push } from 'react-router-redux'
import { Dialog } from 'primereact/components/dialog/Dialog';


class Layout extends Component {
    constructor() {
        super();
        this.state = {
            layoutMode: 'static',
            profileMode: 'top',
            layoutCompact: true,
            overlayMenuActive: false,
            staticMenuDesktopInactive: false,
            staticMenuMobileActive: false,
            rotateMenuButton: false,
            topbarMenuActive: false,
            activeTopbarItem: null,
            darkMenu: true,
            menuActive: false,
            theme: 'blue',
            layout: 'blue',
            version: 'v4',
        };

        this.onDocumentClick = this.onDocumentClick.bind(this);
        this.onMenuClick = this.onMenuClick.bind(this);
        this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
        this.onTopbarMenuButtonClick = this.onTopbarMenuButtonClick.bind(this);
        this.onTopbarItemClick = this.onTopbarItemClick.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.onRootMenuItemClick = this.onRootMenuItemClick.bind(this);
        this.createMenu();
    }

    onMenuClick(event) {
        this.menuClick = true;
    }
    onMenuButtonClick(event) {
        this.menuClick = true;
        this.setState(({
            rotateMenuButton: !this.state.rotateMenuButton,
            topbarMenuActive: false
        }));

        if (this.state.layoutMode === 'overlay') {
            this.setState({
                overlayMenuActive: !this.state.overlayMenuActive
            });
        }
        else {
            if (this.isDesktop())
                this.setState({ staticMenuDesktopInactive: !this.state.staticMenuDesktopInactive });
            else
                this.setState({ staticMenuMobileActive: !this.state.staticMenuMobileActive });
        }

        event.preventDefault();
    }
    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.setState({ topbarMenuActive: !this.state.topbarMenuActive });
        this.hideOverlayMenu();
        event.preventDefault();
    }
    onTopbarItemClick(event) {
        this.topbarItemClick = true;

        if (this.state.activeTopbarItem === event.item)
            this.setState({ activeTopbarItem: null });
        else
            this.setState({ activeTopbarItem: event.item });

        event.originalEvent.preventDefault();
    }
    onMenuItemClick(event) {
        if (!event.item.items) {
            this.hideOverlayMenu();
        }
    }
    onRootMenuItemClick(event) {
        this.setState({
            menuActive: !this.state.menuActive
        });
        event.originalEvent.preventDefault();
    }
    onDocumentClick(event) {
        if (!this.topbarItemClick) {
            this.setState({
                activeTopbarItem: null,
                topbarMenuActive: false
            });
        }

        if (!this.menuClick) {
            if (this.isHorizontal() || this.isSlim()) {
                this.setState({
                    menuActive: false
                })
            }

            this.hideOverlayMenu();
        }

        if (!this.rightPanelClick) {
            this.setState({
                rightPanelActive: false
            })
        }

        this.topbarItemClick = false;
        this.menuClick = false;
        this.rightPanelClick = false;
    }
    hideOverlayMenu() {
        this.setState({
            rotateMenuButton: false,
            overlayMenuActive: false,
            staticMenuMobileActive: false
        })
    }
    isTablet() {
        let width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    isMobile() {
        return window.innerWidth <= 640;
    }

    isOverlay() {
        return this.state.layoutMode === 'overlay';
    }

    isHorizontal() {
        return this.state.layoutMode === 'horizontal';
    }

    isSlim() {
        return this.state.layoutMode === 'slim';
    }





    changeVersion(version) {
        this.setState({ version: version });
        if (version === 'v3') {
            this.changeStyleSheetUrl('layout-css', this.state.layout, 'layout');
            this.changeStyleSheetUrl('theme-css', this.state.theme, 'theme');
        } else {
            this.changeStyleSheetUrl('layout-css', this.state.layout + '-v4', 'layout');
            this.changeStyleSheetUrl('theme-css', this.state.theme + '-v4', 'theme');
        }
    }
    createMenu() {
        this.menu = [
            { label: 'خانه', command: () => { this.props.history.push('/') } },
         
        ];
    }


    componentDidMount() {
        if (document.documentElement.clientWidth < 1025) {
            this.setState({
                profileMode: 'inline'
            })
        }
    }

    render() {
        
      
        let layoutClassName = classNames('layout-wrapper', 'layout-rtl', {
            'menu-layout-static': this.state.layoutMode !== 'overlay',
            'menu-layout-overlay': this.state.layoutMode === 'overlay',
            'layout-menu-overlay-active': this.state.overlayMenuActive,
            'menu-layout-slim': this.state.layoutMode === 'slim',
            'menu-layout-horizontal': this.state.layoutMode === 'horizontal',
            'layout-menu-static-inactive': this.state.staticMenuDesktopInactive,
            'layout-menu-static-active': this.state.staticMenuMobileActive
        });
        let menuClassName = classNames('layout-menu-container', { 'layout-menu-dark': this.state.darkMenu });

        return (
            <Void>
                <div className={layoutClassName} onClick={this.onDocumentClick}>
                    <div>
                       
                           <AppTopbar/>
                        


                        <div className="layout-main">
                            {this.props.children}
                        </div>

                        <div className={menuClassName} onClick={this.onMenuClick}>
                            <ScrollPanel ref={(el) => this.layoutMenuScroller = el} style={{ height: '100%' }}>
                                <div className="menu-scroll-content">
                                    {(this.state.profileMode === 'inline' && this.state.layoutMode !== 'horizontal') &&
                                        <AppInlineProfile/>}

                                    <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} onRootMenuItemClick={this.onRootMenuItemClick}
                                        layoutMode={this.state.layoutMode} active={this.state.menuActive} />
                                </div>
                            </ScrollPanel>
                        </div>



                        <div className="layout-mask"></div>
                        <AppFooter />

                    </div>
                </div>
            </Void>
        );
    }
}
export default withRouter(Layout);