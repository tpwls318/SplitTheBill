import {
    grey800, grey900, blueGrey400,
    amber600,
    grey100, grey300, grey500,
    white, darkBlack, fullBlack
  } from 'material-ui/styles/colors';
  import { fade } from 'material-ui/utils/colorManipulator';
  import spacing from 'material-ui/styles/spacing';
   
  export default {
    spacing: spacing,
    palette: {
      primary1Color: grey800,
      primary2Color: grey900,
      primary3Color: blueGrey400,
      accent1Color: amber600,
      accent2Color: grey100,
      accent3Color: grey500,
      textColor: darkBlack,
      alternateTextColor: white,
      canvasColor: white,
      borderColor: grey300,
      disabledColor: fade(darkBlack, 0.3),
      pickerHeaderColor: grey800,
      clockCircleColor: fade(darkBlack, 0.07),
      shadowColor: fullBlack,
    },
  };
  