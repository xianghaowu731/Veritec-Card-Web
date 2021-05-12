import React from 'react'

import Typography from '@material-ui/core/Typography'

export default function Footer(props) {

  return (
      
    <footer style={{ position: 'absolute', bottom: -10, width: '100%' }}>
      <div style={{ textAlign: 'center' }}>
        <Typography variant="subtitle2" gutterBottom>
          Powered by Veritec © 2020
        </Typography>
      </div>
    </footer>
  )
}
