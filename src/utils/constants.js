
export const VColor = {
  blue: '#6D8EB5',
  darkblue:'#557396',
  opacityBlue: '#DFE3ED',
  black: '#000000',
  white: '#FFFFFF',
  opacityWhite: '#C4D2E1',
  gray: '#979797',
  lightGray: '#F4F4F4',
  darkGray: '#666666',
  red: '#B00020',
  lightGreen:'#B4FC9B',
  opacityBlack:'#0009',
  transparent:'#0000'
};


export const Constants = {
  
  cardSize:{
    width: 338,
    height: 213,
    codeSize: 106,
    margin: 15,
    paddingTop:'63.01%',
    codeRate : 106 / (338 - 30),
    photoRate: 90/120 * (106 / (338 - 30)),
    getPhotoSize: (codeSize)=>{
      return 120 / codeSize * 90
    },
    getMargin:(cardW)=>{
      return cardW / Constants.cardSize.width * Constants.cardSize.margin
    },
    getCodeH:(cardH)=>{
      return cardH / Constants.cardSize.height * Constants.cardSize.codeSize
    },
    getHeight:  (w)=>{
      return w / Constants.cardSize.width * Constants.cardSize.height
    },
    getWidth: (h)=>{
      return h / Constants.cardSize.height * Constants.cardSize.width
    }     
  }
} 

export default Constants
