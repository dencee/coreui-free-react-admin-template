// Taken on March 25, 2022 from: https://github.com/LarvenLLC/react-sticky-table-thead

import React from "react";
import PropTypes from 'prop-types';
import $ from 'jquery';

export default class StickyTable extends React.Component {
    
    componentDidMount() {
        const el = this.tableContainer;
        $(el).on("scroll", function() {
            let translate = "translate(0," + $(this).scrollTop() + "px)";
            $(this).find("thead").css("transform", translate);
        });
    }

    render(){
        const props = this.props;
        return (
            <div style={{overflow:"hidden", height:props.hiddenHorizontalScrollbar ? props.height - 15 : ""}}>
                <div ref={(el) => (this.tableContainer = el)} className={this.props.className} style={{overflow:"auto", height:props.height, width:props.hiddenVerticalScrollbar ? "calc(100% + 15px)" : "100%"}}>
                    {props.children}
                </div>
            </div>
        )
    }
}
StickyTable.defaultProps = {
    height: 450,
    hiddenVerticalScrollbar: false,
    hiddenHorizontalScrollbar: false,
    className: ""
}

StickyTable.propTypes = {
    height: PropTypes.number,
    hiddenVerticalScrollbar: PropTypes.bool,
    hiddenHorizontalScrollbar: PropTypes.bool,
    className: PropTypes.string
}