import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'
import { VColor } from './constants'

Wordpress2016.overrideThemeStyles = () => ({
  a: {
    color: VColor.blue
  },
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
  'p code': {
    fontSize: '1.1rem',
  },
  ol: {
    paddingLeft: '1.3rem',
  },
  'ol li': {
    marginBottom: '0',
  },
  'h1, h2,h3,h4,h5,h6': {
    fontStyle: 'normal',
  },
  'p':{
    fontStyle: 'normal',
  }

})

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
