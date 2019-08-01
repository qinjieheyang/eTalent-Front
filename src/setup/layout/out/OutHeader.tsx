import * as React from "react";

interface IPagesHeaderProps {
    classes: any;
    color: any;
    location: any;
}

interface IState {
    open: boolean;
}
/** 页面布局-头部 */
export default class PagesHeader extends React.Component<IPagesHeaderProps, IState> {
    constructor(props: IPagesHeaderProps) {
        super(props);
        this.state = {
            open: false
        };
    }
    public handleDrawerToggle = () => {
        this.setState({ open: !this.state.open });
    };

    public activeRoute(routeName: string) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
    }
    public componentDidUpdate(e: any) {
        if (e.history.location.pathname !== e.location.pathname) {
            this.setState({ open: false });
        }
    }
    public render() {
        return <div />;
    }
}
