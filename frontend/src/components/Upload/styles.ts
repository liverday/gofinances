import styled, {
  css,
  FlattenSimpleInterpolation,
  ThemeProps,
} from 'styled-components';
import Theme from '../../styles/themes/theme';

interface UploadProps extends ThemeProps<Theme> {
  isDragActive: boolean;
  isDragReject: boolean;
  refKey?: string;
  [key: string]: any;
  type?: 'error' | 'success' | 'default';
}

const dragActive = (props: UploadProps): FlattenSimpleInterpolation => css`
  border-color: ${props.theme.colors.success};
`;

const dragReject = (props: UploadProps): FlattenSimpleInterpolation => css`
  border-color: ${props.theme.colors.danger};
`;

export const DropContainer = styled.div.attrs({
  className: 'dropzone',
})`
  border: 1.5px dashed ${props => props.theme.colors.defaultText};
  border-radius: 5px;
  cursor: pointer;

  transition: height 0.2s ease;

  ${(props: UploadProps): false | FlattenSimpleInterpolation =>
    props.isDragActive && dragActive(props)}

  ${(props: UploadProps): false | FlattenSimpleInterpolation =>
    props.isDragReject && dragReject(props)}
`;

const messageColors = (theme: Theme): any => ({
  default:
    theme.title === 'light' ? theme.colors.primary : theme.colors.secondary,
  error: theme.colors.danger,
  success: theme.colors.success,
});

export const UploadMessage = styled.p`
  display: flex;
  font-size: 16px;
  line-height: 24px;
  padding: 48px 0;

  color: ${({ type, theme }: UploadProps) =>
    messageColors(theme)[type || 'default']};

  justify-content: center;
  align-items: center;
`;
