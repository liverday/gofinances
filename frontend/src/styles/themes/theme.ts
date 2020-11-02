export default interface Theme {
  title: string;

  colors: {
    primary: string;
    secondary: string;
    default: string;
    background: string;
    success: string;
    danger: string;
    overlay: string;

    primaryText: string;
    secondaryText: string;
    defaultText: string;
    successText: string;
    dangerText: string;
  };
}
