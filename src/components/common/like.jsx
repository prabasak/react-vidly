import React from 'react';

const Like = props => {
  let classes = "fa-heart fa";
  classes += props.liked ? "s" : "r";
  return (<i className={classes} onClick={props.onClick}></i>);
}
 
export default Like;