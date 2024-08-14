import React from 'react'
import { Box } from '@mui/material';

function Background() {
  return (
    <Box
    height="100%"
    width="100%"  
    position="fixed"
    top="0"
    left="0"
    id="svg-bg"
    zIndex={-1}
    sx={{
      objectFit: "cover",
    }}
  > 
    <svg id="visual" viewBox="0 0 900 600"xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><rect x="0" y="0" width="900" height="600" fill="#000000"></rect><g fill="none" stroke="#2C2C2C" stroke-width="1"><circle r="39" cx="850" cy="466"></circle><circle r="1" cx="448" cy="169"></circle><circle r="22" cx="620" cy="506"></circle><circle r="30" cx="172" cy="379"></circle><circle r="11" cx="125" cy="573"></circle><circle r="0" cx="761" cy="395"></circle><circle r="10" cx="808" cy="13"></circle><circle r="23" cx="790" cy="319"></circle><circle r="35" cx="770" cy="175"></circle><circle r="29" cx="653" cy="213"></circle><circle r="11" cx="503" cy="513"></circle><circle r="13" cx="30" cy="414"></circle><circle r="5" cx="181" cy="284"></circle><circle r="13" cx="292" cy="41"></circle></g></svg>
</Box>
  )
}

export default Background